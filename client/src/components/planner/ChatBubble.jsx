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
      <div className="flex min-w-0 flex-col items-end gap-1">
        <div className="max-w-[85%] break-words whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-forest px-3 py-2.5 text-sm text-white sm:max-w-md">
          {message.text}
        </div>

        <span className="pr-1 text-xs text-gray-400">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  if (message.error) {
    return (
      <div className="flex min-w-0 flex-col items-start gap-1">
        <div className="max-w-[85%] break-words rounded-2xl rounded-tl-sm border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600 sm:max-w-md">
          Something went wrong generating this plan. Please try again.
        </div>

        <span className="pl-1 text-xs text-gray-400">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 w-full flex-col items-start gap-1">
      {message.plan ? (
        <ItineraryCard
          plan={message.plan}
          onRegenerateDay={onRegenerateDay}
          onSave={onSave}
          onFavorite={onFavorite}
          onDuplicate={onDuplicate}
        />
      ) : (
        <div className="max-w-[85%] break-words whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-border bg-white px-3 py-2.5 text-sm text-ink sm:max-w-md">
          {message.text}
        </div>
      )}

      <span className="pl-1 text-xs text-gray-400">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

export default ChatBubble;
