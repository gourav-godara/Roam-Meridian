import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";

import Button from "../common/Button";

function MessageInput({ value, onChange, onSend, disabled }) {
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
    <div className="shrink-0 border-t border-border bg-white px-3 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-end gap-2 rounded-xl border border-border bg-bg px-3 py-1.5 transition-all focus-within:border-forest/40 focus-within:ring-4 focus-within:ring-forest/5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me to plan a trip, refine an idea, or find inspiration..."
          rows={1}
          disabled={disabled}
          className="min-w-0 max-h-36 flex-1 resize-none overflow-y-auto bg-transparent py-1 text-sm outline-none placeholder:text-gray-400"
        />

        <Button
          variant="primary"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-full !p-0"
        >
          <FiSend size={15} />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
