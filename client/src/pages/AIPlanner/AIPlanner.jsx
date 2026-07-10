import PlannerHeader from "../../components/planner/PlannerHeader";
import SuggestionChips from "../../components/planner/SuggestionChips";
import PromptCards from "../../components/planner/PromptCards";
import ChatWindow from "../../components/planner/ChatWindow";
import MessageInput from "../../components/planner/MessageInput";
import TripSummary from "../../components/planner/TripSummary";
import RecentPlans from "../../components/planner/RecentPlans";
import TravelTips from "../../components/planner/TravelTips";
import usePlanner from "../../hooks/usePlanner";

const DEFAULT_TRIP_PARAMS = { destination: "India", days: 4, budget: 20000, travelers: 2, travelStyle: "Balanced" };

function AIPlanner() {
  const {
    messages, generating, history, historyLoading, currentPlan, messagesEndRef,
    sendMessage, regenerateDay, savePlan, toggleFavorite, duplicatePlan, deletePlan, loadHistory,
  } = usePlanner();

  const handleSend = (text) => sendMessage(text, DEFAULT_TRIP_PARAMS);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-24 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="bg-white border border-border rounded-3xl flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
          <PlannerHeader />
          <SuggestionChips onSelect={handleSend} />
          <ChatWindow
            messages={messages}
            generating={generating}
            messagesEndRef={messagesEndRef}
            onRegenerateDay={regenerateDay}
            onSave={savePlan}
            onFavorite={toggleFavorite}
            onDuplicate={duplicatePlan}
          />
          <PromptCards onSelect={handleSend} />
          <MessageInput onSend={handleSend} disabled={generating} />
        </div>

        <aside className="flex flex-col gap-5">
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
