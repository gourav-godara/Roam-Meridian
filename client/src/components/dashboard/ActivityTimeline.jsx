import { FiStar, FiHeart, FiCalendar, FiZap, FiMapPin } from "react-icons/fi";

const ICONS = { star: FiStar, heart: FiHeart, calendar: FiCalendar, sparkles: FiZap, mapPin: FiMapPin };

function ActivityTimeline({ items }) {
  return (
    <div className="bg-surface rounded-3xl border border-border p-5">
      <h3 className="text-base font-semibold text-ink mb-4">Recent Activity</h3>
      <div className="flex flex-col">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon];
          const isLast = i === items.length - 1;
          return (
            <div key={item.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="w-8 h-8 rounded-full bg-forest-light/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-forest-light" />
                </span>
                {!isLast && <span className="w-px flex-1 bg-border my-1" />}
              </div>
              <div className={isLast ? "pb-0" : "pb-5"}>
                <p className="text-sm text-ink">
                  {item.text.split(" ").map((word, wi) =>
                    /^[A-Z]/.test(word) && wi > 0 ? <strong key={wi}> {word}</strong> : ` ${word}`
                  )}
                </p>
                <p className="text-xs text-muted mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityTimeline;
