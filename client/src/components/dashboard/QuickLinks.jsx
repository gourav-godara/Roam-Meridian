import { Link } from "react-router-dom";
import { FiCalendar, FiHeart, FiZap, FiDollarSign, FiFileText, FiArrowRight } from "react-icons/fi";

const ICONS = { calendar: FiCalendar, heart: FiHeart, sparkles: FiZap, wallet: FiDollarSign, fileText: FiFileText };

function QuickLinks({ links }) {
  return (
    <div className="bg-surface rounded-3xl border border-border p-5">
      <h3 className="text-base font-semibold text-ink mb-3">Quick Links</h3>
      <div className="flex flex-col">
        {links.map(({ to, label, icon }) => {
          const Icon = ICONS[icon];
          return (
            <Link
              key={to}
              to={to}
              className="group flex items-center justify-between py-3 border-b last:border-b-0 border-border/70"
            >
              <span className="flex items-center gap-3 text-sm text-ink">
                <Icon size={16} className="text-forest-light" />
                {label}
              </span>
              <FiArrowRight size={15} className="text-gray-300 group-hover:text-forest-light group-hover:translate-x-0.5 transition-all" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickLinks;
