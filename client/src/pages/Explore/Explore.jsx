import { useEffect, useMemo, useState } from "react";
import ExploreHeader from "../../components/explore/ExploreHeader";
import FilterSidebar from "../../components/explore/FilterSidebar";
import MobileFilterDrawer from "../../components/explore/MobileFilterDrawer";
import DestinationGrid from "../../components/explore/DestinationGrid";
import { useDebounce } from "../../hooks/useDebounce";
import { getAllDestinations } from "../../services/destinationApi";

const DEFAULT_FILTERS = {
  categories: ["All"],
  budget: [0, 50000],
  rating: 0,
};

function sortDestinations(list, sort) {
  const sorted = [...list];

  switch (sort) {
    case "Highest Rated":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "Lowest Price":
      return sorted.sort((a, b) => a.price - b.price);

    case "Highest Price":
      return sorted.sort((a, b) => b.price - a.price);

    case "Most Popular":
      return sorted.sort((a, b) => b.reviews - a.reviews);

    default:
      return sorted;
  }
}

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getAllDestinations();

        const mappedDestinations = (response.data || []).map((destination) => ({
          id: destination._id,
          name: destination.name,
          location: [destination.city, destination.state, destination.country]
            .filter(Boolean)
            .join(", "),
          category: destination.category,
          rating: destination.rating?.average ?? 0,
          reviews: destination.rating?.count ?? 0,
          price: destination.budget?.min ?? 0,
          image: destination.images?.[0] || "",
          isFavorite: false,
        }));

        setDestinations(mappedDestinations);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const toggleFavorite = (id) => {
    setDestinations((prev) =>
      prev.map((destination) =>
        destination.id === id
          ? {
              ...destination,
              isFavorite: !destination.isFavorite,
            }
          : destination
      )
    );
  };

  const filtered = useMemo(() => {
    let result = destinations;

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase();

      result = result.filter(
        (destination) =>
          destination.name.toLowerCase().includes(q) ||
          destination.location.toLowerCase().includes(q)
      );
    }

    if (!appliedFilters.categories.includes("All")) {
      result = result.filter((destination) =>
        appliedFilters.categories.some(
          (category) =>
            category.toLowerCase() === destination.category.toLowerCase()
        )
      );
    }

    result = result.filter(
      (destination) =>
        destination.price >= appliedFilters.budget[0] &&
        destination.price <= appliedFilters.budget[1]
    );

    if (appliedFilters.rating > 0) {
      result = result.filter(
        (destination) => destination.rating >= appliedFilters.rating
      );
    }

    return sortDestinations(result, sort);
  }, [destinations, debouncedQuery, appliedFilters, sort]);

  const handleApply = () => {
    setAppliedFilters(filters);
  };

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-16">
        <ExploreHeader
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          onOpenFilters={() => setDrawerOpen(true)}
        />

        <div className="flex gap-8 mt-6 items-start">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onApply={handleApply}
            onClear={handleClear}
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-4">
              {loading
                ? "Loading destinations..."
                : `${filtered.length} result${
                    filtered.length !== 1 ? "s" : ""
                  } found`}
            </p>

            {!loading && (
              <DestinationGrid
                destinations={filtered}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        filters={filters}
        onChange={setFilters}
        onApply={handleApply}
        onClear={handleClear}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}

export default Explore;