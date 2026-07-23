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
    <div className="bg-white rounded-2xl border border-border p-4 mb-8">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="relative">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-forest/40 transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40 transition-colors bg-white"
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
            className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40 transition-colors bg-white"
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
    </div>
  );
};

export default ReviewFilter;
