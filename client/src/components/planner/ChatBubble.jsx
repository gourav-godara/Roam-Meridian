import ItineraryCard from "./ItineraryCard";

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ChatBubble({
  message,
  onRegenerateDay,
  onSave,
  onFavorite,
  onDuplicate,
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="bg-forest text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-md text-sm">
          {message.text}
        </div>
        <span className="text-xs text-gray-400 pr-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  if (message.error) {
    return (
      <div className="flex flex-col items-start gap-1">
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-md text-sm">
          Something went wrong generating this plan. Please try again.
        </div>
        <span className="text-xs text-gray-400 pl-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      {message.plan ? (
        <ItineraryCard
          plan={message.plan}
          onRegenerateDay={onRegenerateDay}
          onSave={onSave}
          onFavorite={onFavorite}
          onDuplicate={onDuplicate}
        />
      ) : (
        <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-md text-sm text-ink">
          {message.text}
        </div>
      )}

      <span className="text-xs text-gray-400 pl-1">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

export default ChatBubble;
