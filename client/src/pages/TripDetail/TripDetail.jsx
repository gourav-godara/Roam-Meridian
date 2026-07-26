import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import Button from "../../components/common/Button";
import { updateTrip, deleteTrip } from "../../services/tripApi";

import useTrip from "../../hooks/useTrip";
import Card from "../../components/common/Card";
import Avatar from "../../components/common/Avatar";

const STATUS_STYLES = {
  draft: "bg-gray-100 text-gray-600",
  planning: "bg-amber-100 text-amber-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
};

function TripDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this trip?"
  );

  if (!confirmDelete) return;

  try {
    await deleteTrip(id);

    alert("Trip deleted successfully.");

    navigate("/itineraries");
  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Failed to delete trip."
    );
  }
};

const handleStatusChange = async (e) => {
  try {
    await updateTrip(id, {
      status: e.target.value,
    });

    window.location.reload();
  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Failed to update trip status."
    );
  }
};

  const { trip, loading, error } = useTrip(id);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Trip...
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="text-center py-20">
        <p>{error || "Trip not found."}</p>

        <Link
          to="/itineraries"
          className="text-forest mt-4 inline-block"
        >
          Back to Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">

      <Link
        to="/itineraries"
        className="inline-flex items-center gap-2 mb-6"
      >
        <FiArrowLeft />
        Back to Trips
      </Link>

      {trip.coverImage && (
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-72 rounded-3xl object-cover mb-8"
        />
      )}

      <div className="flex justify-between items-start mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            {trip.title}
          </h1>

          <p className="text-gray-500 flex items-center gap-2 mt-2">
            <FiMapPin />
            {trip.destinationId?.name}
          </p>

        </div>

        <div className="flex flex-col gap-3 items-end">

  <select
    value={trip.status}
    onChange={handleStatusChange}
    className="border rounded-lg px-3 py-2 capitalize"
  >
    <option value="planning">Planning</option>
    <option value="ongoing">Ongoing</option>
    <option value="completed">Completed</option>
  </select>

  <div className="flex gap-2">

    <Button
      size="sm"
      variant="secondary"
      leftIcon={FiEdit2}
      onClick={() => navigate(`/trips/${id}/edit`)}
    >
      Edit
    </Button>

    <Button
      size="sm"
      variant="danger"
      leftIcon={FiTrash2}
      onClick={handleDelete}
    >
      Delete
    </Button>

  </div>

</div>

      </div>

      <Card className="p-6 mb-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div>
            <p className="text-gray-400 text-sm">
              Dates
            </p>

            <p className="font-medium flex items-center gap-2 mt-1">
              <FiCalendar />
              {new Date(
                trip.startDate
              ).toLocaleDateString()}{" "}
              -
              {" "}
              {new Date(
                trip.endDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Budget
            </p>

            <p className="font-medium">
              ₹{trip.budget}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Travelers
            </p>

            <p className="font-medium flex items-center gap-2">
              <FiUsers />
              {trip.travelers}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Created By
            </p>

            <p className="font-medium">
              {trip.createdBy?.name}
            </p>
          </div>

        </div>

      </Card>

      {trip.collaborators?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Collaborators
          </h2>

          <div className="flex gap-4 flex-wrap mb-8">

            {trip.collaborators.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 bg-white border rounded-full px-3 py-2"
              >
                <Avatar user={user} size={32} />

                <span>{user.name}</span>
              </div>
            ))}

          </div>
        </>
      )}

      <h2 className="text-2xl font-semibold mb-5">
        Trip Itinerary
      </h2>

      {trip.itinerary?.length === 0 ? (
        <Card className="p-8 text-center">
          No itinerary added.
        </Card>
      ) : (
        <div className="space-y-5">

          {trip.itinerary.map((day) => (
            <Card
              key={day.day}
              className="p-5"
            >
              <h3 className="font-bold text-lg mb-4">
                Day {day.day}
              </h3>

              {day.activities?.length === 0 ? (
                <p>No activities.</p>
              ) : (
                <div className="space-y-4">

                  {day.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-forest pl-4"
                    >

                      <p className="font-medium">
                        {activity.time}
                      </p>

                      <p className="font-semibold">
                        {activity.title}
                      </p>

                      {activity.location && (
                        <p className="text-gray-500">
                          📍 {activity.location}
                        </p>
                      )}

                      {activity.notes && (
                        <p className="text-gray-500">
                          {activity.notes}
                        </p>
                      )}

                    </div>
                  ))}

                </div>
              )}

            </Card>
          ))}

        </div>
      )}

    </div>
  );
}

export default TripDetail;