import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiHeart, FiDollarSign, FiStar } from "react-icons/fi";

const ICONS = { briefcase: FiBriefcase, mapPin: FiMapPin, heart: FiHeart, wallet: FiDollarSign, star: FiStar };

function StatsCard({ stat }) {
  const Icon = ICONS[stat.icon];
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="bg-surface rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
    >
      <span className="w-9 h-9 rounded-full bg-forest-light/10 flex items-center justify-center mb-3">
        <Icon size={16} className="text-forest-light" />
      </span>
      <p className="text-xl font-semibold text-ink">{stat.value}</p>
      <p className="text-xs text-muted mt-0.5">{stat.label}</p>
      <p className="text-[11px] text-gray-400 mt-1">{stat.sub}</p>
    </motion.div>
  );
}

export default StatsCard;
