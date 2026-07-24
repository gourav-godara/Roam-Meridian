import { useEffect, useMemo, useState } from "react";
import ExploreHeader from "../../components/explore/ExploreHeader";
import FilterSidebar from "../../components/explore/FilterSidebar";
import MobileFilterDrawer from "../../components/explore/MobileFilterDrawer";
import DestinationGrid from "../../components/explore/DestinationGrid";
import { useDebounce } from "../../hooks/useDebounce";
import { getAllDestinations } from "../../services/destinationApi";
import { addToWishlist } from "../../services/tripApi";
import useTrips from "../../hooks/useTrips";

const DEFAULT_FILTERS = {
  categories: ["All"],
  budget: [0, 50000],
  rating: 0,
};

function Explore() {
  const [destinations, setDestinations] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [savingId, setSavingId] = useState(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const debouncedQuery = useDebounce(query, 300);

  const { trips, refreshTrips } = useTrips();

  const wishlistedIds = useMemo(() => {
    return new Set(
      trips
        .filter((trip) => trip.status === "wishlist")
        .map((trip) => trip.destinationId?._id || trip.destinationId)
    );
  }, [trips]);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);

      try {
        const response = await getAllDestinations({
          page,
          limit: 12,
          search: debouncedQuery,

          category:
            appliedFilters.categories.includes("All")
              ? ""
              : appliedFilters.categories[0],

          minBudget: appliedFilters.budget[0],
          maxBudget: appliedFilters.budget[1],

          rating: appliedFilters.rating,

          sort:
            sort === "Highest Rated"
              ? "rating"
              : sort === "Lowest Price"
              ? "budget"
              : sort === "Newest"
              ? "newest"
              : sort === "A-Z"
              ? "name"
              : "",
        });

        const mapped = response.data.map((destination) => ({
          id: destination._id,

          name: destination.name,

          location: [
            destination.city,
            destination.state,
            destination.country,
          ]
            .filter(Boolean)
            .join(", "),

          category: destination.category,

          description: destination.description,

          duration: destination.duration,

          bestTime: destination.bestTime,

          rating: destination.rating?.average ?? 0,

          reviews: destination.rating?.count ?? 0,

          price: destination.budget?.min ?? 0,

          maxPrice: destination.budget?.max ?? 0,

          image: destination.images?.[0] || "",

          images: destination.images || [],
        }));

        setDestinations(mapped);

        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);

        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [page, debouncedQuery, appliedFilters, sort]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, appliedFilters, sort]);

  const toggleFavorite = async (id) => {
    if (wishlistedIds.has(id) || savingId === id) return;

    try {
      setSavingId(id);

      await addToWishlist(id);

      await refreshTrips();
    } catch (error) {
      if (error.response?.status === 409) {
        await refreshTrips();
      } else {
        alert(
          error.response?.data?.message ||
            "Unable to add this destination to your wishlist."
        );
      }
    } finally {
      setSavingId(null);
    }
  };

  const destinationsWithFavorite = useMemo(() => {
    return destinations.map((destination) => ({
      ...destination,
      isFavorite: wishlistedIds.has(destination.id),
    }));
  }, [destinations, wishlistedIds]);

  const filtered = useMemo(() => {
    return destinationsWithFavorite;
  }, [destinationsWithFavorite]);

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

            {!loading && filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500">
                No destinations match your filters.
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <DestinationGrid
                destinations={filtered}
                onToggleFavorite={toggleFavorite}
              />
            )}

            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-lg bg-green-700 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
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