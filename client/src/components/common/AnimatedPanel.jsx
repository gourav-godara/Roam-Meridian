import { useEffect, useState } from "react";

function AnimatedPanel({ show, children, className = "", origin = "top" }) {
  const [rendered, setRendered] = useState(show);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let raf;
    let timeout;
    if (show) {
      setRendered(true);
      raf = requestAnimationFrame(() => setEntered(true));
    } else {
      setEntered(false);
      timeout = setTimeout(() => setRendered(false), 180);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [show]);

  if (!rendered) return null;

  const translate =
    origin === "top"
      ? entered ? "translate-y-0" : "-translate-y-2"
      : entered ? "translate-y-0" : "translate-y-4";

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        entered ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } ${translate} ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedPanel;
