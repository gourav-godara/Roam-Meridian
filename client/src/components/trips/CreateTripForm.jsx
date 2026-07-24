import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Button from "../common/Button";
import { createTrip } from "../../services/tripApi";

function CreateTripForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: 1,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,

        // Temporary until AI Planner passes the destination
        destinationId: "6a60c3e6ef1ab708d09eca39",

        startDate: formData.startDate,
        endDate: formData.endDate,

        travelers: Number(formData.travelers),
        budget: Number(formData.budget),

        // Will later contain collaborator user IDs
        collaborators: [],

        coverImage: "",

        isPublic: formData.isPublic,

        // Temporary itinerary until AI Planner integration
        itinerary: [
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
      };

      await createTrip(payload);

      alert("Trip created successfully!");

      navigate("/itineraries");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to create trip."
      );
    }
  };

  return (
    <Card className="border border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-5">

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
          />

          <p className="text-xs text-gray-500 mt-1">
            This field will automatically come from the AI Planner later.
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
            placeholder="Email(s) separated by commas"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Public */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />

          <label>Make this trip public</label>
        </div>

        <Button type="submit" variant="primary">
          Create Trip
        </Button>

      </form>
    </Card>
  );
}

export default CreateTripForm;