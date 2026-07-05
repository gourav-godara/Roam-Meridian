import { useState } from "react";
import mockDestinations from "../../data/mockDestinations";
import DestinationCard from "../../components/explore/DestinationCard";
import SearchBar from "../../components/common/SearchBar";
import FilterSidebar from "../../components/explore/FilterSidebar";
import SortDropdown from "../../components/explore/SortDropdown";

function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");

  const filteredDestinations = mockDestinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === "price-low") return a.budget - b.budget;
    if (sortBy === "price-high") return b.budget - a.budget;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="px-8 py-10 flex flex-col md:flex-row gap-8">
      <FilterSidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="flex-1">
        <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="max-w-md flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {sortedDestinations.length === 0 && (
          <p className="text-sm text-slate-500 mt-8">No destinations match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Explore;
