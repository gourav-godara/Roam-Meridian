import { useEffect, useState } from "react";
import TypingIndicator from "./TypingIndicator";

const THINKING_STEPS = [
  "Understanding your travel style…",
  "Finding a balanced route…",
  "Curating places worth your time…",
  "Putting your itinerary together…",
];

function LoadingMessage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStep((currentStep) => {
        return (currentStep + 1) % THINKING_STEPS.length;
      });
    }, 1600);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-start gap-3 max-w-xl w-full">
      <div className="flex items-center gap-2">
        <TypingIndicator />

        <span className="text-xs text-muted">{THINKING_STEPS[step]}</span>
      </div>

      <div className="w-full border border-border rounded-2xl p-4 bg-bg/60 animate-pulse">
        <div className="h-3 bg-gray-200 rounded-full w-2/5" />

        <div className="mt-4 space-y-2">
          <div className="h-2.5 bg-gray-200 rounded-full w-full" />
          <div className="h-2.5 bg-gray-200 rounded-full w-4/5" />
          <div className="h-2.5 bg-gray-200 rounded-full w-3/5" />
        </div>
      </div>
    </div>
  );
}

export default LoadingMessage;
