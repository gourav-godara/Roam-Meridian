import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSave,
  FiX,
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

  const { trip, loading, error } = useTrip(id);

  // -----------------------------
  // Itinerary state
  // -----------------------------
  const [itinerary, setItinerary] = useState([]);
  const [savingItinerary, setSavingItinerary] = useState(false);
  const [itineraryMessage, setItineraryMessage] = useState("");

  // -----------------------------
  // Load itinerary from trip
  // -----------------------------
  useEffect(() => {
    if (trip) {
      setItinerary(trip.itinerary || []);
    }
  }, [trip]);

  // -----------------------------
  // Delete trip
  // -----------------------------
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

  // -----------------------------
  // Change trip status
  // -----------------------------
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

  // -----------------------------
  // Add a new day
  // -----------------------------
  const addDay = () => {
    const nextDayNumber =
      itinerary.length > 0
        ? Math.max(...itinerary.map((day) => day.day)) + 1
        : 1;

    setItinerary((prev) => [
      ...prev,
      {
        day: nextDayNumber,
        activities: [],
      },
    ]);

    setItineraryMessage("");
  };

  // -----------------------------
  // Delete a day
  // -----------------------------
  const deleteDay = (dayNumber) => {
    const confirmDelete = window.confirm(
      `Delete Day ${dayNumber} and all its activities?`
    );

    if (!confirmDelete) return;

    setItinerary((prev) =>
      prev
        .filter((day) => day.day !== dayNumber)
        .map((day, index) => ({
          ...day,
          day: index + 1,
        }))
    );

    setItineraryMessage("");
  };

  // -----------------------------
  // Add activity to a day
  // -----------------------------
  const addActivity = (dayNumber) => {
    setItinerary((prev) =>
      prev.map((day) =>
        day.day === dayNumber
          ? {
              ...day,
              activities: [
                ...(day.activities || []),
                {
                  time: "",
                  title: "",
                  location: "",
                  notes: "",
                },
              ],
            }
          : day
      )
    );

    setItineraryMessage("");
  };

  // -----------------------------
  // Update activity
  // -----------------------------
  const updateActivity = (
    dayNumber,
    activityIndex,
    field,
    value
  ) => {
    setItinerary((prev) =>
      prev.map((day) =>
        day.day === dayNumber
          ? {
              ...day,
              activities: day.activities.map(
                (activity, index) =>
                  index === activityIndex
                    ? {
                        ...activity,
                        [field]: value,
                      }
                    : activity
              ),
            }
          : day
      )
    );

    setItineraryMessage("");
  };

  // -----------------------------
  // Delete activity
  // -----------------------------
  const deleteActivity = (
    dayNumber,
    activityIndex
  ) => {
    setItinerary((prev) =>
      prev.map((day) =>
        day.day === dayNumber
          ? {
              ...day,
              activities: day.activities.filter(
                (_, index) => index !== activityIndex
              ),
            }
          : day
      )
    );

    setItineraryMessage("");
  };

  // -----------------------------
  // Save itinerary
  // -----------------------------
  const saveItinerary = async () => {
    try {
      setSavingItinerary(true);
      setItineraryMessage("");

      await updateTrip(id, {
        itinerary,
      });

      setItineraryMessage(
        "Itinerary saved successfully."
      );
    } catch (err) {
      console.error("Failed to save itinerary:", err);

      setItineraryMessage(
        err.response?.data?.message ||
          "Failed to save itinerary."
      );
    } finally {
      setSavingItinerary(false);
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Trip...
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------
  if (error || !trip) {
    return (
      <div className="p-10 text-center">
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
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Back */}
      <Link
        to="/itineraries"
        className="inline-flex items-center gap-2 mb-6"
      >
        <FiArrowLeft />
        Back to Trips
      </Link>

      {/* Cover image */}
      {trip.coverImage && (
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-72 rounded-3xl object-cover mb-8"
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-8 gap-6">

        <div>
          <h1 className="text-4xl font-bold">
            {trip.title}
          </h1>

          <p className="text-gray-500 flex items-center gap-2 mt-2">
            <FiMapPin />
            {trip.destinationId?.name ||
              "Unknown Destination"}
          </p>
        </div>

        <div className="flex flex-col gap-3 items-end">

          <select
            value={trip.status}
            onChange={handleStatusChange}
            className="border rounded-lg px-3 py-2 capitalize"
          >
            <option value="planning">
              Planning
            </option>

            <option value="ongoing">
              Ongoing
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

          <div className="flex gap-2">

            <Button
              size="sm"
              variant="secondary"
              leftIcon={FiEdit2}
              onClick={() =>
                navigate(`/trips/${id}/edit`)
              }
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

      {/* Trip information */}
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
              -{" "}
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
              ₹{trip.budget?.toLocaleString("en-IN")}
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

      {/* Collaborators */}
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
                <Avatar
                  user={user}
                  size={32}
                />

                <span>{user.name}</span>
              </div>
            ))}

          </div>
        </>
      )}

      {/* ===================================== */}
      {/* MANUAL ITINERARY */}
      {/* ===================================== */}

      <div className="flex justify-between items-center mb-5">

        <div>
          <h2 className="text-2xl font-semibold">
            Trip Itinerary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add your activities, places and plans
            for each day.
          </p>
        </div>

        <div className="flex gap-2">

          <Button
            variant="secondary"
            leftIcon={FiPlus}
            onClick={addDay}
          >
            Add Day
          </Button>

          <Button
            variant="primary"
            leftIcon={FiSave}
            loading={savingItinerary}
            onClick={saveItinerary}
          >
            Save Itinerary
          </Button>

        </div>

      </div>

      {/* Success/error message */}
      {itineraryMessage && (
        <div className="mb-5 rounded-xl bg-forest/10 text-forest px-4 py-3 text-sm">
          {itineraryMessage}
        </div>
      )}

      {/* No days */}
      {itinerary.length === 0 ? (
        <Card className="p-10 text-center">

          <h3 className="text-lg font-semibold">
            No itinerary yet
          </h3>

          <p className="text-gray-500 mt-2 mb-5">
            Start planning your journey by adding
            your first day.
          </p>

          <Button
            variant="primary"
            leftIcon={FiPlus}
            onClick={addDay}
          >
            Add Day 1
          </Button>

        </Card>
      ) : (
        <div className="space-y-5">

          {itinerary.map((day) => (

            <Card
              key={day.day}
              className="p-5"
            >

              {/* Day header */}
              <div className="flex justify-between items-center mb-5">

                <h3 className="font-bold text-lg">
                  Day {day.day}
                </h3>

                <div className="flex gap-2">

                  <Button
                    size="sm"
                    variant="secondary"
                    leftIcon={FiPlus}
                    onClick={() =>
                      addActivity(day.day)
                    }
                  >
                    Add Activity
                  </Button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteDay(day.day)
                    }
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Delete day"
                  >
                    <FiTrash2 size={17} />
                  </button>

                </div>

              </div>

              {/* Activities */}
              {day.activities?.length === 0 ? (
                <div className="border border-dashed rounded-xl p-6 text-center">

                  <p className="text-gray-500 text-sm mb-3">
                    No activities added for this day.
                  </p>

                  <Button
                    size="sm"
                    variant="secondary"
                    leftIcon={FiPlus}
                    onClick={() =>
                      addActivity(day.day)
                    }
                  >
                    Add Activity
                  </Button>

                </div>
              ) : (
                <div className="space-y-4">

                  {day.activities.map(
                    (activity, index) => (

                      <div
                        key={index}
                        className="border rounded-xl p-4"
                      >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {/* Time */}
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Time
                            </label>

                            <input
                              type="time"
                              value={
                                activity.time || ""
                              }
                              onChange={(e) =>
                                updateActivity(
                                  day.day,
                                  index,
                                  "time",
                                  e.target.value
                                )
                              }
                              className="w-full border rounded-lg px-3 py-2"
                            />
                          </div>

                          {/* Title */}
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Activity
                            </label>

                            <input
                              type="text"
                              value={
                                activity.title || ""
                              }
                              onChange={(e) =>
                                updateActivity(
                                  day.day,
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="w-full border rounded-lg px-3 py-2"
                            />
                          </div>

                          {/* Location */}
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Location
                            </label>

                            <input
                              type="text"
                              value={
                                activity.location || ""
                              }
                              onChange={(e) =>
                                updateActivity(
                                  day.day,
                                  index,
                                  "location",
                                  e.target.value
                                )
                              }
                              className="w-full border rounded-lg px-3 py-2"
                            />
                          </div>

                          {/* Notes */}
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Notes
                            </label>

                            <input
                              type="text"
                              value={
                                activity.notes || ""
                              }
                              onChange={(e) =>
                                updateActivity(
                                  day.day,
                                  index,
                                  "notes",
                                  e.target.value
                                )
                              }
                              placeholder="Any additional notes"
                              className="w-full border rounded-lg px-3 py-2"
                            />
                          </div>

                        </div>

                        {/* Delete activity */}
                        <div className="flex justify-end mt-3">

                          <button
                            type="button"
                            onClick={() =>
                              deleteActivity(
                                day.day,
                                index
                              )
                            }
                            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={14} />
                            Remove activity
                          </button>

                        </div>

                      </div>

                    )
                  )}

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