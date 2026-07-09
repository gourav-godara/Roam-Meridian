import TypingIndicator from "./TypingIndicator";

function LoadingMessage() {
  return (
    <div className="flex flex-col gap-1.5 items-start">
      <TypingIndicator />
      <span className="text-xs text-gray-400 px-1">Crafting your itinerary...</span>
    </div>
  );
}

export default LoadingMessage;
