import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { getTripById, updateTrip } from "../../services/tripApi";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const STATUS_OPTIONS = ["planning", "ongoing", "completed"];

function toDateInputValue(date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchTrip = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getTripById(id);
        const trip = response.data;

        if (isMounted) {
          setForm({
            title: trip.title || "",
            coverImage: trip.coverImage || "",
            startDate: toDateInputValue(trip.startDate),
            endDate: toDateInputValue(trip.endDate),
            travelers: trip.travelers ?? 1,
            budget: trip.budget ?? 0,
            status: trip.status || "planning",
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message || "Failed to load this trip."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTrip();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (field) => (e) => {
  const value = e.target.value;

  setForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      await updateTrip(id, {
        title: form.title,
        coverImage: form.coverImage,
        startDate: form.startDate,
        endDate: form.endDate,
        travelers: Number(form.travelers),
        budget: Number(form.budget),
        status: form.status,
        isPublic: false,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate(`/trips/${id}`);
      }, 900);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update trip. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[700px] mx-auto px-6 lg:px-12 pt-10 pb-20 text-center text-muted">
        Loading trip...
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="max-w-[700px] mx-auto px-6 lg:px-12 pt-10 pb-20 text-center">
        <p className="text-error mb-4">{error}</p>
        <Link to="/itineraries">
          <Button variant="secondary">Back to My Trips</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-6 lg:px-12 pt-10 pb-20">
      <button
        type="button"
        onClick={() => navigate(`/trips/${id}`)}
        className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-6"
      >
        <FiArrowLeft size={16} />
        Back to Trip
      </button>

      <h1 className="font-display text-h3 text-ink mb-8">Edit Trip</h1>

      {success && (
        <div className="flex items-center gap-2 bg-forest/10 text-forest rounded-2xl px-4 py-3 mb-6">
          <FiCheckCircle size={18} />
          Trip updated successfully.
        </div>
      )}

      {error && (
        <div className="text-error text-sm mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Trip Title"
          value={form.title}
          onChange={handleChange("title")}
          fullWidth
          required
        />

        <Input
          label="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange("coverImage")}
          placeholder="https://..."
          fullWidth
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={handleChange("startDate")}
            fullWidth
            required
          />
          <Input
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={handleChange("endDate")}
            fullWidth
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Travelers"
            type="number"
            min={1}
            value={form.travelers}
            onChange={handleChange("travelers")}
            fullWidth
            required
          />
          <Input
            label="Budget"
            type="number"
            min={0}
            value={form.budget}
            onChange={handleChange("budget")}
            fullWidth
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Status
          </label>
          <select
            value={form.status}
            onChange={handleChange("status")}
            className="w-full h-12 rounded-2xl border border-border bg-white px-4 text-ink outline-none focus:ring-2 focus:ring-forest capitalize"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary" loading={saving}>
            Save Changes
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/trips/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditTrip;