
/**
 * PageLoader
 * A themed, full-screen loading animation shown briefly on every
 * route change. Built around a spinning compass motif (fits the
 * "Roam Meridian" travel brand) plus a slim progress bar at the
 * very top of the viewport.
 *
 * Usage: mount <RouteLoader /> once, near the top of your router
 * (see routes/RouteLoader.jsx). This file is the presentational
 * piece — it just renders based on the `visible` prop.
 */
function PageLoader({ visible }) {
  return (
    <div
      aria-hidden={!visible}
      aria-live="polite"
      className={[
        "fixed inset-0 flex flex-col items-center justify-center",
        "bg-bg/90 backdrop-blur-sm transition-opacity duration-300 ease-out",
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      ].join(" ")}
      style={{ zIndex: "var(--z-loading)" }}
    >
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent overflow-hidden">
        <div
          className={[
            "h-full bg-gradient-to-r from-forest via-gold to-forest bg-[length:200%_100%]",
            visible ? "route-loader-bar" : "",
          ].join(" ")}
        />
      </div>

      {/* Compass mark */}
      <div className="relative w-20 h-20">
        {/* outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-forest/15" />
        {/* spinning ring segment */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold border-r-gold route-loader-spin" />
        {/* inner compass needle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            className="route-loader-needle"
          >
            <circle cx="17" cy="17" r="2.5" fill="#2C463A" />
            <path d="M17 3 L21 17 L17 15 L13 17 Z" fill="#C89B3C" />
            <path d="M17 31 L13 17 L17 19 L21 17 Z" fill="#2C463A" />
          </svg>
        </div>
      </div>

      <p className="mt-5 font-display text-forest text-sm tracking-[0.2em] uppercase route-loader-pulse">
        Roam Meridian
      </p>

      <style>{`
        @keyframes route-loader-spin-kf {
          to { transform: rotate(360deg); }
        }
        .route-loader-spin {
          animation: route-loader-spin-kf 0.9s linear infinite;
        }

        @keyframes route-loader-needle-kf {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        .route-loader-needle {
          transform-origin: 50% 50%;
          animation: route-loader-needle-kf 1.6s ease-in-out infinite;
        }

        @keyframes route-loader-bar-kf {
          0% { transform: translateX(-100%); background-position: 0% 0; }
          100% { transform: translateX(100%); background-position: 200% 0; }
        }
        .route-loader-bar {
          animation: route-loader-bar-kf 0.9s ease-in-out infinite;
        }

        @keyframes route-loader-pulse-kf {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .route-loader-pulse {
          animation: route-loader-pulse-kf 1.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .route-loader-spin,
          .route-loader-needle,
          .route-loader-bar,
          .route-loader-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PageLoader;