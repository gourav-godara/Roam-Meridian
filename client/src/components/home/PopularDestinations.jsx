import { Link } from "react-router-dom";
import { DESTINATIONS } from "../../data/destinations";
import DestinationCard from "../explore/DestinationCard";

function PopularDestinations() {
  const featured = DESTINATIONS.slice(0, 4);

  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-24">
      <div className="rounded-[2rem] border border-border bg-white shadow-sm p-6 sm:p-10">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="font-display text-h3 sm:text-h2 text-ink">Popular Destinations</h2>
          <Link
            to="/explore"
            className="text-sm sm:text-base font-medium text-forest hover:text-forest-hover shrink-0"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;
