import { useRef } from "react";

function OtpInput({ length = 6, value = "", onChange }) {
  const inputRefs = useRef([]);

  const handleChange = (index, digit) => {
    if (!/^\d*$/.test(digit)) return;

    const next = (value || "").split("");

    while (next.length < length) {
      next.push("");
    }

    next[index] = digit.slice(-1);

    onChange(next.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !(value || "")[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pasted) {
      onChange(pasted.padEnd(length, ""));
      inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
    }

    e.preventDefault();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={(value || "")[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-semibold rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-forest text-ink"
        />
      ))}
    </div>
  );
}

export default OtpInput;