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
          limit: 4,
        });

        const filtered = (response.data || []).filter(
          (item) => item._id !== currentDestinationId
        );

        setDestinations(filtered.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchSimilar();
  }, [currentDestinationId]);

  if (!destinations.length) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        You may also like
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {destinations.map((item) => (
          <Link
            key={item._id}
            to={`/destination/${item._id}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.city}, {item.country}
              </p>

              <div className="flex items-center gap-1 mt-2">
                <FiStar className="fill-yellow-400 text-yellow-400" />
                <span>
                  {item.rating?.average ?? 0}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimilarDestinations;