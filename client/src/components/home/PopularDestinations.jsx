import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../explore/DestinationCard";
import { getAllDestinations } from "../../services/destinationApi";
import useWishlist from "../../hooks/useWishlist";

function PopularDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const {
    wishlist,
    addItem,
    removeItem,
  } = useWishlist();

  const wishlistedIds = useMemo(() => {
    return new Set(
      wishlist.map((destination) => destination._id)
    );
  }, [wishlist]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getAllDestinations();

        const mapped = (response.data || [])
          .map((destination) => ({
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
          }))
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);

        setDestinations(mapped);
      } catch (error) {
        console.error("Failed to fetch popular destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleToggleFavorite = async (id) => {
    if (savingId === id) return;

    try {
      setSavingId(id);

      if (wishlistedIds.has(id)) {
        await removeItem(id);
      } else {
        await addItem(id);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update wishlist."
      );
    } finally {
      setSavingId(null);
    }
  };

  if (!loading && destinations.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-24">
      <div className="rounded-[2rem] border border-border bg-white shadow-sm p-6 sm:p-10">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="font-display text-h3 sm:text-h2 text-ink">
            Popular Destinations
          </h2>

          <Link
            to="/explore"
            className="text-sm sm:text-base font-medium text-forest hover:text-forest-hover shrink-0"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-8">
            Loading destinations...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={{
                  ...destination,
                  isFavorite: wishlistedIds.has(destination.id),
                }}
                onToggleFavorite={handleToggleFavorite}
                disabled={savingId === destination.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularDestinations;