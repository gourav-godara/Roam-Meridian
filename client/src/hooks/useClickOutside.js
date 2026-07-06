import { useEffect } from "react";

export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return;
    function onPointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) handler(e);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [ref, handler, active]);
}
