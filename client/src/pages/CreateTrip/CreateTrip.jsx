import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import CreateTripForm from "../../components/trips/CreateTripForm";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

function CreateTrip() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/itineraries"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-6"
      >
        <FiArrowLeft size={16} />
        Back to Itineraries
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-h3 text-ink">
          Create Trip
        </h1>

        <p className="text-sm text-muted mt-1">
          Complete the details below to convert your saved itinerary into a trip.
        </p>
      </div>

      <CreateTripForm />
    </div>
  );
}

export default CreateTrip;