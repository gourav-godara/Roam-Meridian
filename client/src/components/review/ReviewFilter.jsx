import { FaSearch } from "react-icons/fa";

const ReviewFilter = ({
  search,
  setSearch,
  rating,
  setRating,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-8">
      <div className="grid md:grid-cols-3 gap-5">

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Rating Filter */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Ratings</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★ & Up</option>
          <option value="3">★★★ & Up</option>
          <option value="2">★★ & Up</option>
          <option value="1">★ & Up</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="latest">Latest Reviews</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>

      </div>
    </div>
  );
};

export default ReviewFilter;