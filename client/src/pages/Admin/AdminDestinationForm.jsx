import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiX, FiPlus } from "react-icons/fi";
import { useToast } from "../../context/ToastContext";
import {
  getDestinationById,
  createDestination,
  updateDestination,
} from "../../services/adminApi";

const CATEGORIES = [
  "Beach", "Mountains", "Heritage", "Adventure", "Nature",
  "Wildlife", "City", "Spiritual", "Snow", "Food",
];

const EMPTY_FORM = {
  name: "",
  city: "",
  state: "",
  country: "",
  description: "",
  bestTime: "",
  duration: "",
  entryRequirements: "",
  category: "Beach",
  images: [],
  budgetMin: "",
  budgetMax: "",
  currency: "INR",
};

function AdminDestinationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    let ignore = false;

    const load = async () => {
      try {
        const res = await getDestinationById(id);
        const d = res.destination;

        if (!ignore) {
          setForm({
            name: d.name || "",
            city: d.city || "",
            state: d.state || "",
            country: d.country || "",
            description: d.description || "",
            bestTime: d.bestTime || "",
            duration: d.duration || "",
            entryRequirements: d.entryRequirements || "",
            category: d.category || "Beach",
            images: d.images?.length ? d.images : [],
            budgetMin: d.budget?.min ?? "",
            budgetMax: d.budget?.max ?? "",
            currency: d.budget?.currency || "INR",
          });
        }
      } catch (err) {
        if (!ignore) {
          setFormError(
            err.response?.data?.message || "Unable to load this destination."
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

  const handleImageChange = (index, value) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[index] = value;
      return { ...prev, images };
    });
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Destination name is required.";
    if (!form.city.trim()) return "City is required.";
    if (!form.state.trim()) return "State is required.";
    if (!form.country.trim()) return "Country is required.";
    if (!form.description.trim()) return "Description is required.";
    if (!form.budgetMin || !form.budgetMax) {
      return "Both minimum and maximum budget are required.";
    }
    if (Number(form.budgetMin) > Number(form.budgetMax)) {
      return "Minimum budget can't be greater than maximum budget.";
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
      name: form.name,
      city: form.city,
      state: form.state,
      country: form.country,
      description: form.description,
      bestTime: form.bestTime,
      duration: form.duration,
      entryRequirements: form.entryRequirements,
      category: form.category,
      images: form.images.map((url) => url.trim()).filter(Boolean),
      budget: {
        min: Number(form.budgetMin),
        max: Number(form.budgetMax),
        currency: form.currency,
      },
    };

    try {
      if (isEdit) {
        await updateDestination(id, payload);
        showToast("Destination updated.", "success");
      } else {
        await createDestination(payload);
        showToast("Destination created.", "success");
      }
      navigate("/admin/destinations");
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Unable to save this destination."
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
      <Link
        to="/admin/destinations"
        className="flex items-center gap-2 text-sm text-muted hover:text-ink w-fit"
      >
        <FiArrowLeft size={15} /> Back to Destinations
      </Link>

      <div>
        <h1 className="font-display text-2xl text-ink">
          {isEdit ? "Edit Destination" : "Add Destination"}
        </h1>
        {!isEdit && (
          <p className="text-sm text-muted mt-1">
            City/state/country are geocoded automatically on save, and cover
            photos are pulled automatically from Pexels based on the
            destination name — no need to add images yourself.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 flex flex-col gap-5">
        {formError && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            {formError}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Destination Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Goa"
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">State</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Country</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Best Time to Visit
            </label>
            <input
              type="text"
              value={form.bestTime}
              onChange={(e) => handleChange("bestTime", e.target.value)}
              placeholder="November to February"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Suggested Duration
            </label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="3-4 days"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Currency
            </label>
            <select
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Entry Requirements
          </label>
          <textarea
            rows={2}
            value={form.entryRequirements}
            onChange={(e) => handleChange("entryRequirements", e.target.value)}
            placeholder="Visa on arrival for most nationalities. Valid passport required."
            className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Budget Min ({form.currency})
            </label>
            <input
              type="number"
              min="0"
              value={form.budgetMin}
              onChange={(e) => handleChange("budgetMin", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Budget Max ({form.currency})
            </label>
            <input
              type="number"
              min="0"
              value={form.budgetMax}
              onChange={(e) => handleChange("budgetMax", e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-ink">
              Image URLs (optional)
            </label>
          </div>
          <p className="text-xs text-muted mb-2">
            Leave blank to auto-fetch photos from Pexels{isEdit ? " — clearing all image fields and saving will re-fetch new ones" : ""}. Add a URL below only if you want to override that.
          </p>
          <div className="flex flex-col gap-2">
            {form.images.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://..."
                  className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-forest/40"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-red-600 hover:bg-red-50 shrink-0"
                  aria-label="Remove image"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-1.5 text-sm text-forest font-medium mt-2 hover:text-forest-hover"
          >
            <FiPlus size={14} /> {form.images.length ? "Add another image" : "Add a manual image override"}
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/admin/destinations"
            className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-hover transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {saving && <FiLoader className="animate-spin" size={16} />}
            {isEdit ? "Save Changes" : "Create Destination"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminDestinationForm;