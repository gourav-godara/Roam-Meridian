import { useCallback, useEffect, useRef, useState } from "react";
import { plannerApi } from "../services/plannerApi";
import { useToast } from "../context/ToastContext";

function usePlanner() {
  const [messages, setMessages] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);
  const { showToast } = useToast();
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
    [showToast]
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const sendMessage = useCallback(
    async (text, tripParams) => {
      const userMessage = { id: Date.now(), role: "user", text, timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      setGenerating(true);

      try {
        const plan = await plannerApi.generate({ prompt: text, ...tripParams });
        setCurrentPlan(plan);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "ai", plan, timestamp: new Date() },
        ]);
        setHistory((prev) => [plan, ...prev]);
      } catch (err) {
        showToast(err?.response?.data?.message || "Couldn't generate your plan. Try again.", "error");
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "ai", error: true, timestamp: new Date() },
        ]);
      } finally {
        setGenerating(false);
      }
    },
    [showToast]
  );

  const regenerateDay = useCallback(
    async (planId, dayNumber) => {
      try {
        const updatedPlan = await plannerApi.regenerateDay(planId, dayNumber);
        setCurrentPlan(updatedPlan);
        setMessages((prev) => prev.map((m) => (m.plan?._id === planId ? { ...m, plan: updatedPlan } : m)));
        showToast(`Day ${dayNumber} regenerated.`, "success");
      } catch {
        showToast("Couldn't regenerate that day.", "error");
      }
    },
    [showToast]
  );

  const savePlan = useCallback(
    async (planId) => {
      try {
        const updated = await plannerApi.save(planId);
        setHistory((prev) => prev.map((p) => (p._id === planId ? updated : p)));
        showToast("Plan saved.", "success");
      } catch {
        showToast("Couldn't save this plan.", "error");
      }
    },
    [showToast]
  );

  const toggleFavorite = useCallback(
    async (planId) => {
      try {
        const updated = await plannerApi.favorite(planId);
        setHistory((prev) => prev.map((p) => (p._id === planId ? updated : p)));
      } catch {
        showToast("Couldn't update favorite.", "error");
      }
    },
    [showToast]
  );

  const duplicatePlan = useCallback(
    async (planId) => {
      try {
        const copy = await plannerApi.duplicate(planId);
        setHistory((prev) => [copy, ...prev]);
        showToast("Plan duplicated.", "success");
      } catch {
        showToast("Couldn't duplicate this plan.", "error");
      }
    },
    [showToast]
  );

  const deletePlan = useCallback(
    async (planId) => {
      try {
        await plannerApi.remove(planId);
        setHistory((prev) => prev.filter((p) => p._id !== planId));
        showToast("Plan deleted.", "success");
      } catch {
        showToast("Couldn't delete this plan.", "error");
      }
    },
    [showToast]
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
