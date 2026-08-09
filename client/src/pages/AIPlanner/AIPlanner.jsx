import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PlannerHeader from "../../components/planner/PlannerHeader";
import SuggestionChips from "../../components/planner/SuggestionChips";
import ChatWindow from "../../components/planner/ChatWindow";
import MessageInput from "../../components/planner/MessageInput";
import TripSummary from "../../components/planner/TripSummary";
import RecentPlans from "../../components/planner/RecentPlans";
import TravelTips from "../../components/planner/TravelTips";
import usePlanner from "../../hooks/usePlanner";

const DEFAULT_TRIP_PARAMS = {
  destination: "India",
  days: 4,
  budget: 20000,
  travelers: 2,
  travelStyle: "Balanced",
};

function AIPlanner() {
  const [searchParams] = useSearchParams();

  const destinationIdFromUrl = searchParams.get("destinationId");
  const destinationNameFromUrl = searchParams.get("destinationName");

  const [draft, setDraft] = useState("");
  const [tripParams, setTripParams] = useState({
    ...DEFAULT_TRIP_PARAMS,
    destination: destinationNameFromUrl || DEFAULT_TRIP_PARAMS.destination,
    destinationId: destinationIdFromUrl || null,
  });

  const {
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
  } = usePlanner();

  const handleSend = (text = draft) => {
    if (!text.trim()) return;

    const message = text.trim();

    // Detect "plan ... <destination> trip"
    const match = message.match(/plan\s+\d+\s+days?\s+(.+?)\s+trip/i);

    const updatedTripParams = {
      ...tripParams,
      destination: match ? match[1] : tripParams.destination,
    };

    sendMessage(message, updatedTripParams);
    setDraft("");
  };

  return (
    <div className="h-screen overflow-hidden bg-bg">
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-1 gap-5 px-4 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_310px]">
        <section className="flex h-[calc(100vh-80px)] min-h-0 flex-col overflow-hidden rounded-[2rem] border border-border bg-[#f8faf7] shadow-sm">
          <PlannerHeader />

          {messages.length > 0 && <SuggestionChips onSelect={setDraft} />}

          <div className="flex-1 min-h-0 overflow-hidden">
            <ChatWindow
              messages={messages}
              generating={generating}
              messagesEndRef={messagesEndRef}
              onRegenerateDay={regenerateDay}
              onSave={savePlan}
              onFavorite={toggleFavorite}
              onDuplicate={duplicatePlan}
              onPromptSelect={setDraft}
            />
          </div>

          <MessageInput
            value={draft}
            onChange={setDraft}
            onSend={handleSend}
            disabled={generating}
            tripParams={tripParams}
            onTripParamsChange={setTripParams}
          />
        </section>

        <details className="group rounded-2xl border border-border bg-white xl:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-ink">
            Trip details & recent plans
            <span className="text-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="flex flex-col gap-4 border-t border-border px-4 pb-4 pt-4">
            <TripSummary plan={currentPlan} />

            <RecentPlans
              history={history}
              loading={historyLoading}
              onSearch={loadHistory}
              onFavorite={toggleFavorite}
              onDelete={deletePlan}
            />
          </div>
        </details>

        <aside className="sticky top-28 hidden self-start xl:flex xl:flex-col xl:gap-4">
          <TripSummary plan={currentPlan} />

          <RecentPlans
            history={history}
            loading={historyLoading}
            onSearch={loadHistory}
            onFavorite={toggleFavorite}
            onDelete={deletePlan}
          />

          <TravelTips />
        </aside>
      </div>
    </div>
  );
}

export default AIPlanner;
