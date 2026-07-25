import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import CreateTripForm from "../../components/trips/CreateTripForm";

function CreateTrip() {
  const location = useLocation();

  // Later AI Planner will navigate here using:
  // navigate("/create-trip", { state: { plannerData } })
  const plannerData = location.state?.plannerData || null;

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
          Complete your trip details before saving it.
        </p>
      </div>

      {plannerData && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-sm text-green-700">
            ✔ Itinerary imported from AI Planner.
          </p>
        </div>
      )}

      <CreateTripForm plannerData={plannerData} />

    </div>
  );
}

export default CreateTrip;