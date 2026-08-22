import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Button from "../common/Button";

import { createTrip } from "../../services/tripApi";
import { getAllDestinations } from "../../services/destinationApi";

function CreateTripForm({ plannerData = null }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [destinations, setDestinations] = useState([]);

  const [formData, setFormData] = useState({
    title: plannerData?.title || "",

    destinationId: plannerData?.destinationId || "",

    startDate: "",
    endDate: "",

    budget: plannerData?.budget || "",

    travelers: plannerData?.travelers || 1,

    // Name-only trip companions (no account needed) — just who's coming,
    // so they can be picked as expense participants later.
    companions: [],
  });

  const [companionInput, setCompanionInput] = useState("");

  const addCompanion = () => {
    const name = companionInput.trim();
    if (!name) return;
    if (formData.companions.includes(name)) {
      setCompanionInput("");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      companions: [...prev.companions, name],
    }));
    setCompanionInput("");
  };

  const removeCompanion = (name) => {
    setFormData((prev) => ({
      ...prev,
      companions: prev.companions.filter((c) => c !== name),
    }));
  };

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const res = await getAllDestinations({
          page: 1,
          limit: 100,
        });
        setDestinations(res.data);
      } catch (err) {
        console.error("Failed to load destinations", err);
      }
    };

    if (!plannerData) {
      loadDestinations();
    }
  }, [plannerData]);

  const destinationOptions = destinations.map((destination) => ({
    value: destination._id,
    label: destination.name,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (status = "planning") => {
    try {
      setLoading(true);

      const payload = {
        title: formData.title,

        destinationId:
          plannerData?.destinationId ||
          formData.destinationId,

        plannerId: plannerData?._id || null,

        startDate: formData.startDate,
        endDate: formData.endDate,

        travelers: Number(formData.travelers),

        budget: Number(formData.budget),

        companions: formData.companions,

        coverImage: plannerData?.coverImage || "",

        itinerary:
          plannerData?.itinerary || [
            {
              day: 1,
              activities: [
                {
                  time: "09:00",
                  title: "AI Planner itinerary will appear here",
                  location: "",
                  notes: "",
                },
              ],
            },
          ],

        status,

        isPublic: false,
      };

      await createTrip(payload);

      alert(
        status === "draft"
          ? "Trip saved as Draft."
          : "Trip created successfully!"
      );

      navigate("/itineraries");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to create trip."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-border p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit("planning");
        }}
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Trip Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="My Goa Trip"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Destination
          </label>

          {plannerData ? (
            <input
              type="text"
              value={plannerData.destination}
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
              disabled
            />
          ) : (
            <Select
              options={destinationOptions}
              placeholder="Search destination..."
              value={
                destinationOptions.find(
                (option) => option.value === formData.destinationId
                ) || null
              }
              onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
              destinationId: selected?.value || "",
              }))
              }
              isSearchable
            />
          )}

          <p className="text-xs text-gray-500 mt-1">
            {plannerData
              ? "Imported automatically from AI Planner."
              : "Select a destination from the list."}
          </p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Budget (₹)
          </label>

          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Travelers */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Travelers
          </label>

          <input
            type="number"
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            min="1"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Companions */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Trip Companions
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={companionInput}
              onChange={(e) => setCompanionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCompanion();
                }
              }}
              placeholder="Enter a name and press Add"
              className="w-full border rounded-lg px-4 py-2"
            />

            <Button type="button" variant="secondary" onClick={addCompanion}>
              Add
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Just add the names of people joining this trip — they don't need
            an account. You'll be able to split expenses with them later.
          </p>

          {formData.companions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.companions.map((name) => (
                <span
                  key={name}
                  className="bg-teal-100 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removeCompanion(name)}
                    aria-label={`Remove ${name}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <Button
            type="button"
            variant="secondary"
            loading={loading}
            onClick={() => handleSubmit("draft")}
            className="sm:flex-1"
          >
            Save as Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="sm:flex-1"
          >
            Create Trip
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default CreateTripForm;