import ChatBubble from "./ChatBubble";
import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";

function ChatWindow({
  messages,
  generating,
  messagesEndRef,
  onRegenerateDay,
  onSave,
  onFavorite,
  onDuplicate,
  onPromptSelect,
}) {
  if (messages.length === 0 && !generating) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <EmptyState onPromptSelect={onPromptSelect} />
      </div>
    );
  }

  return (
    <div className="custom-scrollbar min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
      <div className="flex min-h-full min-w-0 flex-col gap-5 px-4 py-4 sm:px-6">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            onRegenerateDay={onRegenerateDay}
            onSave={onSave}
            onFavorite={onFavorite}
            onDuplicate={onDuplicate}
          />
        ))}

        {generating && <LoadingMessage />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
