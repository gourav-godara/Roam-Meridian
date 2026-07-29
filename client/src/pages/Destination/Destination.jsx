import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SimilarDestinations from "../../components/destination/SimilarDestinations";
import Gallery from "../../components/destination/Gallery";
import DestinationHeader from "../../components/destination/DestinationHeader";
import InfoCards from "../../components/destination/InfoCards";
import ActionButtons from "../../components/destination/ActionButtons";
import Overview from "../../components/destination/Overview";
import WeatherCard from "../../components/destination/WeatherCard";
import MapCard from "../../components/destination/MapCard";
import NearbyRestaurants from "../../components/destination/NearbyRestaurants";
import RecommendedHotels from "../../components/destination/RecommendedHotels";
import ResultGrid from "../../components/destination/ResultGrid";
import UserReviews from "../../components/destination/UserReviews";
import WriteReviewModal from "../../components/destination/WriteReviewModal";
import { createReview } from "../../services/reviewApi";
import { getDestinationById } from "../../services/destinationApi";
import { getReviews, getAverageRating } from "../../services/reviewApi";
import useTrips from "../../hooks/useTrips";
import {
  getNearbyPlaces,
  getRouteDetails,
} from "../../services/mapsApi";

function Destination() {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [nearbyType, setNearbyType] = useState("restaurant");

  const [routeData, setRouteData] = useState(null);

  const [restaurantPlaces, setRestaurantPlaces] = useState([]);
  const [hotelPlaces, setHotelPlaces] = useState([]);
  const [attractionPlaces, setAttractionPlaces] = useState([]);
  const [thingsToDoPlaces, setThingsToDoPlaces] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [liveRating, setLiveRating] = useState(null);
  const { trips } = useTrips();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await getDestinationById(id);

        console.log("Destination response:", response);

        setDestination(response.destination);
        setWeather(response.weather || null);
      } catch (error) {
        console.error("Failed to fetch destination:", error);

        setDestination(null);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews(id);

        const mapped = (response.data || []).map((review) => ({
          id: review._id,
          name: review.user?.name || "Traveler",
          avatar:
            review.user?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              review.user?.name || "T"
            )}`,
          date: new Date(review.createdAt).toLocaleDateString(),
          rating: review.rating,
          text: review.reviewText,
          images: review.images || [],
        }));

        setReviews(mapped);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await getAverageRating(id);

        // Only override the seeded rating once real reviews exist
        if (response.data?.totalReviews > 0) {
          setLiveRating({
            average: response.data.averageRating,
            count: response.data.totalReviews,
          });
        }
      } catch (error) {
        console.error("Failed to fetch average rating:", error);
      }
    };

    fetchAverageRating();
  }, [id]);

  useEffect(() => {
    if (!destination?.location) return;

    const fetchNearby = async () => {
      setLoadingNearby(true);
      try {
        const response = await getNearbyPlaces(
          destination.location.latitude,
          destination.location.longitude,
          nearbyType,
          1000
        );

        console.log("Nearby places response:", response);

        setNearbyPlaces(response.data || []);
      } catch (error) {
        console.error("Failed to fetch nearby places:", error);

        setNearbyPlaces([]);
      } finally {
    setLoadingNearby(false);
}
    };

    fetchNearby();
  }, [destination, nearbyType]);

  useEffect(() => {
    if (!destination?.location) return;

    const fetchDestinationPlaces = async () => {
      try {
        const [
          restaurantsResponse,
          hotelsResponse,
          attractionsResponse,
          thingsToDoResponse,
        ] = await Promise.all([
          getNearbyPlaces(
            destination.location.latitude,
            destination.location.longitude,
            "restaurant",
            3000
          ),

          getNearbyPlaces(
            destination.location.latitude,
            destination.location.longitude,
            "hotel",
            3000
          ),

          getNearbyPlaces(
            destination.location.latitude,
            destination.location.longitude,
            "tourist_attraction",
            5000
          ),

          getNearbyPlaces(
            destination.location.latitude,
            destination.location.longitude,
            "things_to_do",
            5000
          ),
        ]);

        setRestaurantPlaces(restaurantsResponse.data || []);
        setHotelPlaces(hotelsResponse.data || []);
        setAttractionPlaces(attractionsResponse.data || []);
        setThingsToDoPlaces(thingsToDoResponse.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch destination places:",
          error
        );

        setRestaurantPlaces([]);
        setHotelPlaces([]);
        setAttractionPlaces([]);
        setThingsToDoPlaces([]);
      }
    };

    fetchDestinationPlaces();
  }, [destination]);

  const handlePlaceRoute = async (place) => {
    if (!destination?.location) return;

    try {
      const response = await getRouteDetails(
        destination.location.latitude,
        destination.location.longitude,
        place.latitude,
        place.longitude
      );

      console.log("Route response:", response);
      console.log("Route Data:", response.data);
console.log("Geometry:", response.data.geometry);
console.log("Features:", response.data.features);
      setRouteData(response.data);
    } catch (error) {
      console.error("Failed to fetch route:", error);

      setRouteData(null);
    }
  };
  const handleReviewSubmit = async (data) => {
  try {
    if (!data.reviewText?.trim()) {
      setReviewError("Please write a few words about your trip.");
      return;
    }

    setReviewSubmitting(true);
    setReviewError("");

    await createReview({
      destinationId: destination._id,
      rating: data.rating,
      reviewText: data.reviewText,
      // Previously dropped here — the modal collected photo uploads but
      // they were never actually sent to the backend.
      images: data.images,
    });

    setReviewModalOpen(false);

    // Refresh reviews
    const response = await getReviews(id);

    const mapped = (response.data || []).map((review) => ({
      id: review._id,
      name: review.user?.name || "Traveler",
      avatar:
        review.user?.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          review.user?.name || "T"
        )}`,
      date: new Date(review.createdAt).toLocaleDateString(),
      rating: review.rating,
      text: review.reviewText,
    }));

    setReviews(mapped);

    // Refresh average rating
    const avg = await getAverageRating(id);

    setLiveRating({
      average: avg.data.averageRating,
      count: avg.data.totalReviews,
    });

  } catch (err) {
    setReviewError(
      err.response?.data?.message || "Unable to submit your review."
    );
  } finally {
    setReviewSubmitting(false);
  }
};
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading destination...
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Destination not found
      </div>
    );
  }

  const locationText = [
    destination.city,
    destination.state,
    destination.country,
  ]
    .filter(Boolean)
    .join(", ");

  const isWishlisted = trips.some(
    (trip) =>
      trip.status === "wishlist" &&
      (trip.destinationId?._id || trip.destinationId) === destination._id
  );

  const info = {
    bestTime: destination.bestTime || "Not available",
    idealFor: destination.category,
    duration: destination.duration || "Not available",
    budget: `${destination.budget?.currency || "INR"} ${
      destination.budget?.min ?? 0
    } - ${destination.budget?.max ?? 0}`,
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-bg"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-20">

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          <Gallery images={destination.images || []} />

          <div className="flex-1 min-w-0">

            <DestinationHeader
              location={locationText}
              name={destination.name}
              description={destination.description}
              rating={liveRating?.average ?? destination.rating?.average ?? 0}
              reviewCount={liveRating?.count ?? destination.rating?.count ?? 0}
              category={destination.category}
            />

            <InfoCards info={info} />

            <ActionButtons
              destinationId={destination._id}
              destinationName={destination.name}
              initialWishlisted={isWishlisted}
            />

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 mt-12">

          <div className="min-w-0">

            <Overview
              text={destination.description}
            />

            <ResultGrid
              title="Top Attractions"
              items={attractionPlaces}
              onItemClick={handlePlaceRoute}
            />

            <ResultGrid
              title="Things to Do"
              items={thingsToDoPlaces}
              onItemClick={handlePlaceRoute}
            />

            <NearbyRestaurants
              items={restaurantPlaces}
              onPlaceRoute={handlePlaceRoute}
            />

            <RecommendedHotels
              items={hotelPlaces}
              onPlaceRoute={handlePlaceRoute}
            />

            <UserReviews
  items={reviews}
  onWriteReview={() => setReviewModalOpen(true)}
/>
            <SimilarDestinations
  currentDestinationId={destination._id}
/>
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">

            {weather && (
              <WeatherCard weather={weather} />
            )}

            <MapCard
  latitude={destination.location.latitude}
  longitude={destination.location.longitude}
  name={destination.name}
  nearbyPlaces={nearbyPlaces}
  nearbyType={nearbyType}
  setNearbyType={setNearbyType}
  routeData={routeData}
  onPlaceRoute={handlePlaceRoute}
  loadingNearby={loadingNearby}
/>

          </aside>

        </div>

      </div>
    </motion.div>
    <WriteReviewModal
  open={reviewModalOpen}
  onClose={() => {
    setReviewModalOpen(false);
    setReviewError("");
  }}
  onSubmit={handleReviewSubmit}
  destinationId={destination._id}
  submitting={reviewSubmitting}
  error={reviewError}
/>
</>
  );
}

export default Destination;