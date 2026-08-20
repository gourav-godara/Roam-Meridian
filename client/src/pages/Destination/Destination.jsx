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

import { getNearbyPlaces } from "../../services/mapsApi";
import { translatePlaces } from "../../utils/translator";

function Destination() {
  const { id } = useParams();

  const [destination, setDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const [loadingNearby, setLoadingNearby] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [nearbyType, setNearbyType] = useState("restaurant");

  const [restaurantPlaces, setRestaurantPlaces] = useState([]);
  const [hotelPlaces, setHotelPlaces] = useState([]);
  const [attractionPlaces, setAttractionPlaces] = useState([]);
  const [thingsToDoPlaces, setThingsToDoPlaces] = useState([]);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const [reviews, setReviews] = useState([]);
  const [liveRating, setLiveRating] = useState(null);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const { trips } = useTrips();

  // Fetch destination and weather
  useEffect(() => {
    let intervalId;

    const fetchDestination = async () => {
      try {
        const response = await getDestinationById(id);

        console.log("Destination response:", response);

        setDestination(response.destination);
        setWeather(response.weather || null);
      } catch (error) {
        console.error("Failed to fetch destination:", error);

        // Only clear destination during the initial load.
        // If a refresh fails later, keep the existing page visible.
        if (!destination) {
          setDestination(null);
          setWeather(null);
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately when the page opens
    fetchDestination();

    // Refresh destination + weather every 10 minutes
    intervalId = setInterval(() => {
      fetchDestination();
    }, 10 * 60 * 1000);

    // Cleanup when leaving the page
    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  // Fetch reviews
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

  // Fetch average rating
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

  // Fetch nearby places based on selected category
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

        const places = await translatePlaces(response.data || []);
        setNearbyPlaces(places);
      } catch (error) {
        console.error("Failed to fetch nearby places:", error);

        setNearbyPlaces([]);
      } finally {
        setLoadingNearby(false);
      }
    };

    fetchNearby();
  }, [destination, nearbyType]);

  // Fetch attractions, things to do, restaurants and hotels
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

        const [
          translatedRestaurants,
          translatedHotels,
          translatedAttractions,
          translatedThingsToDo,
        ] = await Promise.all([
          translatePlaces(restaurantsResponse.data || []),
          translatePlaces(hotelsResponse.data || []),
          translatePlaces(attractionsResponse.data || []),
          translatePlaces(thingsToDoResponse.data || []),
        ]);

        setRestaurantPlaces(translatedRestaurants);
        setHotelPlaces(translatedHotels);
        setAttractionPlaces(translatedAttractions);
        setThingsToDoPlaces(translatedThingsToDo);
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

  // Submit review
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
        err.response?.data?.message ||
          "Unable to submit your review."
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
      (trip.destinationId?._id || trip.destinationId) ===
        destination._id
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
        className="min-h-screen"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-20">

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            <Gallery images={destination.images || []} />

            <div className="flex-1 min-w-0">

              <DestinationHeader
                location={locationText}
                name={destination.name}
                description={destination.description}
                rating={
                  liveRating?.average ??
                  destination.rating?.average ??
                  0
                }
                reviewCount={
                  liveRating?.count ??
                  destination.rating?.count ??
                  0
                }
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
              />

              <ResultGrid
                title="Things to Do"
                items={thingsToDoPlaces}
              />

              <NearbyRestaurants
                items={restaurantPlaces}
              />

              <RecommendedHotels
                items={hotelPlaces}
              />

              <UserReviews
                items={reviews}
                onWriteReview={() =>
                  setReviewModalOpen(true)
                }
              />

              {/* Mobile weather and map */}
              <div className="lg:hidden mt-8">

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
                  loadingNearby={loadingNearby}
                />

              </div>

              <SimilarDestinations
                currentDestinationId={destination._id}
              />

            </div>

            {/* Desktop weather and map */}
            <aside className="hidden lg:block">

              {weather && (
                <WeatherCard weather={weather} />
              )}

              <div className="mt-6 lg:sticky lg:top-28">

                <MapCard
                  latitude={destination.location.latitude}
                  longitude={destination.location.longitude}
                  name={destination.name}
                  nearbyPlaces={nearbyPlaces}
                  nearbyType={nearbyType}
                  setNearbyType={setNearbyType}
                  loadingNearby={loadingNearby}
                />

              </div>

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