import { useEffect, useRef } from "react";
import { FiMapPin, FiSend } from "react-icons/fi";
import Button from "../common/Button";

function MessageInput({
  value,
  onChange,
  onSend,
  disabled,
  tripParams,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`;
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;

    onSend(value.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-white px-4 py-5 sm:px-6 ">
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-bg px-3 py-2 transition-all focus-within:border-forest/40 focus-within:ring-4 focus-within:ring-forest/5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me to plan a trip, refine an idea, or find inspiration..."
          rows={1}
          className="max-h-36 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-400"
        />

        <Button
          variant="primary"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="!h-9 !w-9 !rounded-full !p-0 shrink-0"
        >
          <FiSend size={14} />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
