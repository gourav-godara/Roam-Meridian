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
    return <EmptyState onPromptSelect={onPromptSelect} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
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
  );
}

export default ChatWindow;
