import useWishlist from "../../hooks/useWishlist";
import DestinationGrid from "../../components/explore/DestinationGrid";

function Wishlist() {
  const {
    wishlist,
    loading,
    error,
    addItem,
    removeItem,
  } = useWishlist();

  const toggleFavorite = async (id) => {
    const exists = wishlist.some(
      (destination) => destination._id === id
    );

    if (exists) {
      await removeItem(id);
    } else {
      await addItem(id);
    }
  };

  const destinations = wishlist.map((destination) => ({
    id: destination._id,
    name: destination.name,
    location: [
      destination.city,
      destination.state,
      destination.country,
    ]
      .filter(Boolean)
      .join(", "),
    rating: destination.rating?.average ?? 0,
    reviews: destination.rating?.count ?? 0,
    price: destination.budget?.min ?? 0,
    image: destination.images?.[0] || "",
    isFavorite: true,
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading wishlist...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-serif font-semibold">
          My Wishlist
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Your saved destinations.
        </p>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {destinations.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Start exploring and save destinations you love.
            </p>
          </div>
        ) : (
          <DestinationGrid
            destinations={destinations}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </div>
  );
}

export default Wishlist;