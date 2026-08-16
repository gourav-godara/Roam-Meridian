import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { useToast } from "../../context/ToastContext";
import {
  getItineraryById,
  createItinerary,
  updateItinerary,
  getAllDestinations,
} from "../../services/adminApi";

const THEMES = [
  "Family", "Heritage", "Adventure", "Honeymoon", "Spiritual",
  "Nature", "City", "Budget", "Luxury",
];

const EMPTY_DAY = () => ({
  day: 1,
  title: "",
  activities: [""],
  restaurants: [""],
  stay: "",
  estimatedCost: "",
  image: "",
});

const EMPTY_FORM = {
  destination: "",
  destinationName: "",
  title: "",
  summary: "",
  coverImage: "",
  durationDays: "",
  durationNights: "",
  bestTime: "",
  estimatedBudget: "",
  theme: "Family",
  highlights: [""],
  tips: [""],
  published: true,
  days: [EMPTY_DAY()],
};

// Small repeatable-string-list control shared by highlights / tips /
// per-day activities / per-day restaurants — same add/remove pattern
// AdminDestinationForm.jsx already uses for its `images` field.
function ListField({ label, values, onChange, placeholder }) {
  const update = (index, value) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  const add = () => onChange([...values, ""]);
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>
      <div className="flex flex-col gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => update(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40"
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 shrink-0"
              >
                <FiX size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs font-medium text-forest hover:text-forest-hover mt-2"
      >
        <FiPlus size={12} />
        Add
      </button>
    </div>
  );
}

function DayCard({ day, index, onChange, onRemove, canRemove }) {
  const update = (field, value) => onChange(index, { ...day, [field]: value });

  return (
    <div className="border border-border rounded-2xl p-5 bg-mist/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-forest text-white flex items-center justify-center text-sm font-semibold">
            {day.day}
          </div>
          <h3 className="font-medium text-ink">Day {day.day}</h3>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700"
          >
            <FiTrash2 size={12} />
            Remove Day
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Day Title
          </label>
          <input
            type="text"
            value={day.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Arrival & Old Town Walk"
            className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40 bg-white"
          />
        </div>

        <ListField
          label="Activities / Places to Visit"
          values={day.activities}
          onChange={(v) => update("activities", v)}
          placeholder="e.g. Eiffel Tower viewpoint"
        />

        <ListField
          label="Recommended Restaurants"
          values={day.restaurants}
          onChange={(v) => update("restaurants", v)}
          placeholder="e.g. Le Comptoir du Relais"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Suggested Stay
            </label>
            <input
              type="text"
              value={day.stay}
              onChange={(e) => update("stay", e.target.value)}
              placeholder="e.g. Le Marais area hotel"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Estimated Cost (₹)
            </label>
            <input
              type="number"
              min="0"
              value={day.estimatedCost}
              onChange={(e) => update("estimatedCost", e.target.value)}
              placeholder="e.g. 3000"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40 bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Day Image URL
          </label>
          <input
            type="text"
            value={day.image}
            onChange={(e) => update("image", e.target.value)}
            placeholder="https://..."
            className="w-full border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-forest/40 bg-white"
          />
        </div>
      </div>
    </div>
  );
}

function AdminItineraryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Destinations list for the picker — reuses the same admin destination
  // endpoint AdminDestinations.jsx already calls, just with a high limit
  // since this is a <select>, not a paginated table.
  useEffect(() => {
    getAllDestinations({ limit: 200 })
      .then((res) => setDestinations(res.data || []))
      .catch(() => setDestinations([]));
  }, []);

  useEffect(() => {
    if (!isEdit) return;

    let ignore = false;

    const load = async () => {
      try {
        const res = await getItineraryById(id);
        const it = res.data;

        if (!ignore) {
          setForm({
            destination: it.destination?._id || it.destination || "",
            destinationName: it.destinationName || "",
            title: it.title || "",
            summary: it.summary || "",
            coverImage: it.coverImage || "",
            durationDays: it.durationDays ?? "",
            durationNights: it.durationNights ?? "",
            bestTime: it.bestTime || "",
            estimatedBudget: it.estimatedBudget ?? "",
            theme: it.theme || "Family",
            highlights: it.highlights?.length ? it.highlights : [""],
            tips: it.tips?.length ? it.tips : [""],
            published: it.published ?? true,
            days: it.days?.length
              ? it.days.map((d) => ({
                  day: d.day,
                  title: d.title || "",
                  activities: d.activities?.length ? d.activities : [""],
                  restaurants: d.restaurants?.length ? d.restaurants : [""],
                  stay: d.stay || "",
                  estimatedCost: d.estimatedCost ?? "",
                  image: d.image || "",
                }))
              : [EMPTY_DAY()],
          });
        }
      } catch (err) {
        if (!ignore) {
          setFormError(
            err.response?.data?.message || "Unable to load this itinerary."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDestinationChange = (destinationId) => {
    const selected = destinations.find((d) => d._id === destinationId);
    setForm((prev) => ({
      ...prev,
      destination: destinationId,
      destinationName: selected?.name || prev.destinationName,
    }));
  };

  const updateDay = (index, updatedDay) => {
    setForm((prev) => {
      const days = [...prev.days];
      days[index] = updatedDay;
      return { ...prev, days };
    });
  };

  const addDay = () => {
    setForm((prev) => ({
      ...prev,
      days: [...prev.days, { ...EMPTY_DAY(), day: prev.days.length + 1 }],
    }));
  };

  const removeDay = (index) => {
    setForm((prev) => {
      const days = prev.days
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, day: i + 1 })); // renumber sequentially
      return { ...prev, days };
    });
  };

  const validate = () => {
    if (!form.destination) return "Please select a destination.";
    if (!form.title.trim()) return "Itinerary title is required.";
    if (!form.summary.trim()) return "A short summary is required.";
    if (!form.durationDays || Number(form.durationDays) < 1) {
      return "Duration (days) must be at least 1.";
    }
    if (form.durationNights === "" || Number(form.durationNights) < 0) {
      return "Duration (nights) is required.";
    }
    if (form.days.length === 0) return "Add at least one day.";
    for (const day of form.days) {
      if (!day.title.trim()) {
        return `Day ${day.day} needs a title.`;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setSaving(true);

    const payload = {
      destination: form.destination,
      title: form.title.trim(),
      summary: form.summary.trim(),
      coverImage: form.coverImage.trim(),
      durationDays: Number(form.durationDays),
      durationNights: Number(form.durationNights),
      bestTime: form.bestTime.trim(),
      estimatedBudget: form.estimatedBudget ? Number(form.estimatedBudget) : 0,
      theme: form.theme,
      highlights: form.highlights.map((h) => h.trim()).filter(Boolean),
      tips: form.tips.map((t) => t.trim()).filter(Boolean),
      published: form.published,
      days: form.days.map((d) => ({
        day: d.day,
        title: d.title.trim(),
        activities: d.activities.map((a) => a.trim()).filter(Boolean),
        restaurants: d.restaurants.map((r) => r.trim()).filter(Boolean),
        stay: d.stay.trim(),
        estimatedCost: d.estimatedCost ? Number(d.estimatedCost) : 0,
        image: d.image.trim(),
      })),
    };

    try {
      if (isEdit) {
        await updateItinerary(id, payload);
        showToast("Itinerary updated.", "success");
      } else {
        await createItinerary(payload);
        showToast("Itinerary created.", "success");
      }
      navigate("/admin/itineraries");
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Unable to save this itinerary."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link
          to="/admin/itineraries"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-forest transition-colors mb-3"
        >
          <FiArrowLeft size={14} />
          Back to itineraries
        </Link>
        <h1 className="font-display text-2xl text-ink">
          {isEdit ? "Edit Itinerary" : "New Itinerary"}
        </h1>
      </div>

      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-4">
          <h2 className="font-medium text-ink">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Destination
            </label>
            <select
              value={form.destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40 bg-white"
            >
              <option value="">Select a destination...</option>
              {destinations.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}, {d.city}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted mt-1.5">
              Don't see the destination you need?{" "}
              <Link to="/admin/destinations/new" className="text-forest hover:underline">
                Add it first
              </Link>
              , then come back here.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Itinerary Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. 5 Days in Paris — Romance & Landmarks"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Summary
            </label>
            <textarea
              value={form.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              rows={3}
              placeholder="A short 1-2 sentence overview shown on the itinerary card."
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Cover Image URL
            </label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) => handleChange("coverImage", e.target.value)}
              placeholder="https://..."
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Days</label>
              <input
                type="number"
                min="1"
                value={form.durationDays}
                onChange={(e) => handleChange("durationDays", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Nights</label>
              <input
                type="number"
                min="0"
                value={form.durationNights}
                onChange={(e) => handleChange("durationNights", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-ink mb-1.5">Theme</label>
              <select
                value={form.theme}
                onChange={(e) => handleChange("theme", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40 bg-white"
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-ink mb-1.5">
                Budget (₹)
              </label>
              <input
                type="number"
                min="0"
                value={form.estimatedBudget}
                onChange={(e) => handleChange("estimatedBudget", e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Best Time to Visit
            </label>
            <input
              type="text"
              value={form.bestTime}
              onChange={(e) => handleChange("bestTime", e.target.value)}
              placeholder="e.g. October to March"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => handleChange("published", e.target.checked)}
              className="w-4 h-4 rounded border-border text-forest focus:ring-forest/30"
            />
            Published (visible on the public Itinerary Guide)
          </label>
        </div>

        {/* Highlights & tips */}
        <div className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-4">
          <h2 className="font-medium text-ink">Highlights & Tips</h2>
          <ListField
            label="Trip Highlights"
            values={form.highlights}
            onChange={(v) => handleChange("highlights", v)}
            placeholder="e.g. Sunset at Eiffel Tower"
          />
          <ListField
            label="Travel Tips"
            values={form.tips}
            onChange={(v) => handleChange("tips", v)}
            placeholder="e.g. Book museum tickets online to skip queues"
          />
        </div>

        {/* Day-by-day */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-ink">Day-by-Day Plan</h2>
            <button
              type="button"
              onClick={addDay}
              className="flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-hover"
            >
              <FiPlus size={14} />
              Add Day
            </button>
          </div>

          {form.days.map((day, index) => (
            <DayCard
              key={index}
              day={day}
              index={index}
              onChange={updateDay}
              onRemove={removeDay}
              canRemove={form.days.length > 1}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 sticky bottom-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-forest hover:bg-forest-hover text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {saving && <FiLoader className="animate-spin" size={15} />}
            {isEdit ? "Save Changes" : "Create Itinerary"}
          </button>
          <Link
            to="/admin/itineraries"
            className="px-6 py-3 rounded-xl border border-border text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminItineraryForm;