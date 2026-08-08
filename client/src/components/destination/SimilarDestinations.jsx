import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { getAllDestinations } from "../../services/destinationApi";

function SimilarDestinations({ currentDestinationId }) {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const response = await getAllDestinations({
          limit: 8,
        });

        const allDestinations = response.data || [];

        const filtered = allDestinations.filter(
          (item) => item._id !== currentDestinationId
        );

        setDestinations(filtered.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };

    fetchSimilar();
  }, [currentDestinationId]);

  if (!destinations.length) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-ink">
          You may also like
        </h2>

        <Link
          to="/explore"
          className="text-green-700 font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((item) => (
          <Link
            key={item._id}
            to={`/destination/${item._id}`}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={
                  item.images?.[0] ||
                  "/images/default-destination.jpg"
                }
                alt={item.name}
                className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-ink line-clamp-1">
                {item.name}
              </h3>

              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                {item.category || "Destination"}
              </span>

              <p className="text-sm text-gray-500 mt-3">
                {item.city}, {item.country}
              </p>


              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">Best Time:</span>{" "}
                {item.bestTime || "All Year"}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1">
                  <FiStar className="fill-yellow-400 text-yellow-400" />

                  <span className="font-semibold">
                    {(item.rating?.average ?? 0).toFixed(1)}
                  </span>
                </div>

                <span className="text-xs text-gray-500">
                  {item.totalReviews || 0} Reviews
                </span>
              </div>

              <button
                className="mt-5 w-full py-2.5 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition"
              >
                Explore Destination
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimilarDestinations;