import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Gallery from "../../components/destination/Gallery";
import DestinationHeader from "../../components/destination/DestinationHeader";
import InfoCards from "../../components/destination/InfoCards";
import ActionButtons from "../../components/destination/ActionButtons";
import Tabs from "../../components/destination/Tabs";
import Overview from "../../components/destination/Overview";
import Highlights from "../../components/destination/Highlights";
import ResultGrid from "../../components/destination/ResultGrid";
import WeatherCard from "../../components/destination/WeatherCard";
import WeatherButton from "../../components/destination/WeatherButton";
import MapCard from "../../components/destination/MapCard";
import MapButton from "../../components/destination/MapButton";
import NearbyRestaurants from "../../components/destination/NearbyRestaurants";
import RecommendedHotels from "../../components/destination/RecommendedHotels";
import UserReviews from "../../components/destination/UserReviews";
import AIItineraryCard from "../../components/destination/AIItineraryCard";

import { getDestinationById } from "../../data/destinationDetails";

function Destination() {
  const { id } = useParams();
  const destination = getDestinationById(id);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-bg"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Gallery images={destination.images} />
          <div className="flex-1 min-w-0">
            <DestinationHeader
              location={destination.location}
              name={destination.name}
              description={destination.description}
              rating={destination.rating}
              reviewCount={destination.reviewCount}
              category={destination.category}
            />
            <InfoCards info={destination.info} />
            <ActionButtons destinationId={destination.id} />

            <div className="lg:hidden grid grid-cols-2 gap-4 mt-4">
              <WeatherButton weather={destination.weather} />
              <MapButton
                mapImage={destination.mapImage}
                name={destination.name}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 mt-12">
          <div className="min-w-0">
            <Tabs
              active={activeTab}
              onChange={setActiveTab}
              reviewCount={destination.reviewCount}
            />

            <div className="mt-6">
              {activeTab === "overview" && (
                <Overview text={destination.overview} />
              )}
              {activeTab === "thingsToDo" && (
                <ResultGrid
                  title="Things to Do"
                  items={destination.thingsToDo}
                  subLabelKey="duration"
                  priceKey="price"
                />
              )}
              {activeTab === "stay" && (
                <RecommendedHotels items={destination.hotels} />
              )}
              {activeTab === "reviews" && (
                <UserReviews items={destination.reviews} />
              )}
            </div>

            {activeTab === "overview" && (
              <>
                <Highlights
                  items={destination.highlights}
                  places={destination.highlightPlaces}
                />
                <ResultGrid
                  title="Top Attractions"
                  items={destination.attractions}
                  subLabelKey="distance"
                />
                <ResultGrid
                  title="Things to Do"
                  items={destination.thingsToDo}
                  subLabelKey="duration"
                  priceKey="price"
                />
                <NearbyRestaurants items={destination.restaurants} />
                <RecommendedHotels items={destination.hotels} />
                <UserReviews items={destination.reviews} />
                <AIItineraryCard itinerary={destination.aiItinerary} />
              </>
            )}
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">
            <WeatherCard weather={destination.weather} />
            <MapCard mapImage={destination.mapImage} name={destination.name} />
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

export default Destination;
