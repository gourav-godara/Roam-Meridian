import { useState } from "react";
import { FiPaperclip, FiMic, FiSend } from "react-icons/fi";
import Button from "../common/Button";

function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border px-6 py-4">
      <div className="flex items-end gap-2 bg-mist/50 rounded-2xl px-4 py-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your dream trip..."
          rows={1}
          className="flex-1 bg-transparent outline-none text-sm resize-none placeholder:text-gray-400 max-h-32"
        />
        <button type="button" aria-label="Attach preferences" className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-forest transition-colors shrink-0">
          <FiPaperclip size={16} />
        </button>
        <button type="button" disabled aria-label="Voice input (coming soon)" className="w-8 h-8 flex items-center justify-center text-gray-300 cursor-not-allowed shrink-0">
          <FiMic size={16} />
        </button>
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="!rounded-full !w-9 !h-9 !p-0 flex items-center justify-center shrink-0"
        >
          <FiSend size={14} />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
