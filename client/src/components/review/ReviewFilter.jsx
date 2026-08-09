import { motion } from "framer-motion";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const ReviewFilter = ({
  search,
  setSearch,
  rating,
  setRating,
  sortBy,
  setSortBy,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-4 mb-8 shadow-sm"
    >
      <div className="grid md:grid-cols-3 gap-3">
        <div className="relative group">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-forest"
          />
          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all"
          />
        </div>

        <div className="relative">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all bg-white cursor-pointer"
          >
            <option value="">All Ratings</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★ & Up</option>
            <option value="3">★★★ & Up</option>
            <option value="2">★★ & Up</option>
            <option value="1">★ & Up</option>
          </select>
          <FiChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all bg-white cursor-pointer"
          >
            <option value="latest">Latest Reviews</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
          <FiChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewFilter;
