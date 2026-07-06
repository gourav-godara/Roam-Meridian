import { useEffect } from "react";

export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active) return;
    function onKey(e) {
      if (e.key === "Escape") handler(e);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handler, active]);
}
