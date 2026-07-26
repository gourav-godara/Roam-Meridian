import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Button from "../common/Button";
import { createTrip } from "../../services/tripApi";

function CreateTripForm({ plannerData = null }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: plannerData?.title || "",
    destination: plannerData?.destination || "",

    startDate: "",
    endDate: "",

    budget: plannerData?.budget || "",
    travelers: plannerData?.travelers || 1,

    collaborators: "",
    isPublic: false,
  });

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

      const collaboratorIds = formData.collaborators
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,

        // Temporary destination until AI Planner integration
        destinationId:
          plannerData?.destinationId ||
          "6a60c3e6ef1ab708d09eca39",

        plannerId: plannerData?._id || null,

        startDate: formData.startDate,
        endDate: formData.endDate,

        travelers: Number(formData.travelers),

        budget: Number(formData.budget),

        collaborators: collaboratorIds,

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

        isPublic: formData.isPublic,
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

          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Goa"
            className="w-full border rounded-lg px-4 py-2"
            disabled={!!plannerData}
          />

          <p className="text-xs text-gray-500 mt-1">
            {plannerData
              ? "Imported automatically from AI Planner."
              : "This field will automatically come from the AI Planner later."}
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

        {/* Collaborators */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Collaborators
          </label>

          <input
            type="text"
            name="collaborators"
            value={formData.collaborators}
            onChange={handleChange}
            placeholder="Enter collaborator IDs separated by commas"
            className="w-full border rounded-lg px-4 py-2"
          />

          <p className="text-xs text-gray-500 mt-1">
            AI Planner will later provide collaborator selection automatically.
          </p>
        </div>

        {/* Public */}
        <div className="flex items-center gap-3">
          <input
            id="isPublic"
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />

          <label htmlFor="isPublic">
            Make this trip public
          </label>
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