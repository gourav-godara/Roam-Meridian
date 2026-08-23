import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import PlannerHeader from "../../components/planner/PlannerHeader";
import SuggestionChips from "../../components/planner/SuggestionChips";
import ChatWindow from "../../components/planner/ChatWindow";
import MessageInput from "../../components/planner/MessageInput";
import TravelTips from "../../components/planner/TravelTips";
import usePlanner from "../../hooks/usePlanner";

function AIPlanner() {
  const [searchParams] = useSearchParams();

  const destinationIdFromUrl = searchParams.get("destinationId");
  const destinationNameFromUrl = searchParams.get("destinationName");

  const [draft, setDraft] = useState("");

  const [tripParams, setTripParams] = useState(() =>
    destinationNameFromUrl
      ? {
          destination: destinationNameFromUrl,
          destinationId: destinationIdFromUrl || null,
        }
      : null
  );

  const {
    messages,
    generating,
    messagesEndRef,
    sendMessage,
    regenerateDay,
    savePlan,
    toggleFavorite,
    duplicatePlan,
  } = usePlanner();

  const handleSend = (text = draft) => {
    if (!text.trim() || generating) return;

    const message = text.trim();

    sendMessage(message, tripParams || undefined);

    setDraft("");

    if (tripParams) {
      setTripParams(null);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg/0 pb-10 ">
      <div className="mx-auto grid min-w-0 max-w-[1440px] grid-cols-1 gap-5 px-3 sm:px-6 lg:px-10 xl:grid-cols-[minmax(0,1fr)_310px]">
        <section className="flex min-w-0 h-[calc(100vh-50px)] flex-col overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm sm:h-[calc(100vh-70px)]">
          <PlannerHeader />

          {messages.length > 0 && (
            <SuggestionChips onSelect={setDraft} />
          )}

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

          <MessageInput
            value={draft}
            onChange={setDraft}
            onSend={handleSend}
            disabled={generating}
          />
        </section>

        <div className="min-w-0 xl:hidden">
          <TravelTips />
        </div>

        <aside className="sticky top-28 hidden min-w-0 self-start xl:flex xl:flex-col xl:gap-4">
          <TravelTips />
        </aside>
      </div>
    </div>
  );
}

export default AIPlanner;
