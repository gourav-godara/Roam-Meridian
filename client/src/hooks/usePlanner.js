import { useCallback, useEffect, useRef, useState } from "react";
import { plannerApi } from "../services/plannerApi";
import { useToast } from "../context/ToastContext";

function buildPlanFromConversation(conversation) {
  const trip = conversation.currentTrip;
  if (!trip) return null;

  const budgetBreakdown = trip.budgetBreakdown || {
    stay: 0,
    food: 0,
    transport: 0,
    activities: 0,
  };

  return {
    _id: null,
    destination: conversation.tripContext?.destination,
    days: conversation.tripContext?.duration,
    budget: conversation.tripContext?.budget ?? trip.budget,
    travelers: conversation.tripContext?.travelers,
    travelStyle: conversation.tripContext?.travelStyle,
    favorite: false,
    response: {
      title:
        trip.summary ||
        `${conversation.tripContext?.destination || "Your"} Trip`,
      weather: trip.weather,
      bestTime: trip.bestTime || null,
      budgetBreakdown,
      localTips: trip.travelTips || [],
      packingChecklist: trip.packingChecklist || [],
      nearbyAttractions: trip.nearbyPlaces || [],
      days: (trip.days || []).map((d, index) => {
        const activities = d.activities || [];

        return {
          day: d.dayNumber ?? d.day ?? index + 1,
          title: d.title,
          arrival: null,
          activities,
          restaurants: activities
            .filter((a) => a.category === "restaurant")
            .map((a) => a.title),
          stay: activities.find((a) => a.category === "stay")?.title ?? null,
          estimatedCost: d.estimatedCost,
        };
      }),
    },
  };
}

function usePlanner() {
  const [messages, setMessages] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const { showToast } = useToast();
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  useEffect(() => {
    if (!generating) {
      scrollToBottom();
    }
  }, [messages, generating, scrollToBottom]);

  const loadHistory = useCallback(
    async (search = "") => {
      setHistoryLoading(true);
      try {
        const data = await plannerApi.getHistory(search);
        setHistory(data);
      } catch {
        showToast("Couldn't load your saved plans.", "error");
      } finally {
        setHistoryLoading(false);
      }
    },
    [showToast],
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
  const loadConversation = async () => {
    try {
      const conversation = await plannerApi.getActiveConversation();

      if (!conversation) return;

      setConversationId(conversation._id);

      const plan = buildPlanFromConversation(conversation);

      setCurrentPlan(plan);

      const restoredMessages = conversation.messages.map((m) => ({
        id: crypto.randomUUID(),
        role: m.role === "assistant" ? "ai" : "user",
        text: m.content,
        timestamp: new Date(m.createdAt),
        plan:
          m.tripSnapshot && m.role === "assistant"
          ? buildPlanFromConversation({
            currentTrip: m.tripSnapshot,
            tripContext: conversation.tripContext,
          })
        : undefined,
      }));

      setMessages(restoredMessages);

      const latestTripMessage = [...conversation.messages]
        .reverse()
        .find((m) => m.tripSnapshot);

      if (latestTripMessage) {
        setCurrentPlan(
          buildPlanFromConversation({
            currentTrip: latestTripMessage.tripSnapshot,
            tripContext: conversation.tripContext,
          })
        );
      }

    } catch (err) {
      console.error(err);
    }
  };

  loadConversation();
}, []);

  const sendMessage = useCallback(
    async (text, tripParams) => {
      const userMessage = {
        id: Date.now(),
        role: "user",
        text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setGenerating(true);

      try {
        const conversation = await plannerApi.sendMessage(
          conversationId,
          text,
          tripParams,
        );

        console.log("========== FRONTEND RESPONSE ==========");
        console.log("Conversation received:", conversation);
        console.log("Conversation ID:", conversation?._id);
        console.log("Messages:", conversation?.messages);
        console.log("Current Trip:", conversation?.currentTrip);

        setConversationId(conversation._id);

        const plan = buildPlanFromConversation(conversation);

        console.log("Built plan:", plan);
        setCurrentPlan(plan);

        const latestAssistantMessage = [...conversation.messages]
          .reverse()
          .find((m) => m.role === "assistant");

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "ai",
            plan: plan || undefined,
            text: !plan ? latestAssistantMessage?.content : undefined,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        showToast(
          err?.response?.data?.message ||
            "Couldn't generate your plan. Try again.",
          "error",
        );
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "ai",
            error: true,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setGenerating(false);
      }
    },
    [conversationId, showToast],
  );

  const regenerateDay = useCallback(
    async (planId, dayNumber) => {
      if (!conversationId) return;
      try {
        const conversation = await plannerApi.regenerateConversation(
          conversationId,
          { scope: "day", dayNumber },
        );
        const plan = buildPlanFromConversation(conversation);
        setCurrentPlan(plan);
        setMessages((prev) => prev.map((m) => (m.plan ? { ...m, plan } : m)));
        showToast(`Day ${dayNumber} regenerated.`, "success");
      } catch {
        showToast("Couldn't regenerate that day.", "error");
      }
    },
    [conversationId, showToast],
  );

  const savePlan = useCallback(
    async (planId) => {
      if (!planId) {
        showToast("Save this plan once it's ready — coming soon.", "info");
        return;
      }
      try {
        const updated = await plannerApi.save(planId);
        setHistory((prev) => prev.map((p) => (p._id === planId ? updated : p)));
        showToast("Plan saved.", "success");
      } catch {
        showToast("Couldn't save this plan.", "error");
      }
    },
    [showToast],
  );

  const toggleFavorite = useCallback(
    async (planId) => {
      if (!planId) {
        showToast("Favorite this plan once it's saved — coming soon.", "info");
        return;
      }
      try {
        const updated = await plannerApi.favorite(planId);
        setHistory((prev) => prev.map((p) => (p._id === planId ? updated : p)));
      } catch {
        showToast("Couldn't update favorite.", "error");
      }
    },
    [showToast],
  );

  const duplicatePlan = useCallback(
    async (planId) => {
      if (!planId) {
        showToast("Duplicate this plan once it's saved — coming soon.", "info");
        return;
      }
      try {
        const copy = await plannerApi.duplicate(planId);
        setHistory((prev) => [copy, ...prev]);
        showToast("Plan duplicated.", "success");
      } catch {
        showToast("Couldn't duplicate this plan.", "error");
      }
    },
    [showToast],
  );

  const deletePlan = useCallback(
    async (planId) => {
      if (!planId) {
        showToast("Nothing to delete yet.", "info");
        return;
      }

      try {
        await plannerApi.remove(planId);
        setHistory((prev) => prev.filter((p) => p._id !== planId));
        showToast("Plan deleted.", "success");
      } catch {
        showToast("Couldn't delete this plan.", "error");
      }
    },
    [showToast],
  );

  return {
    messages,
    generating,
    history,
    historyLoading,
    currentPlan,
    messagesEndRef,
    sendMessage,
    regenerateDay,
    savePlan,
    toggleFavorite,
    duplicatePlan,
    deletePlan,
    loadHistory,
  };
}

export default usePlanner;
