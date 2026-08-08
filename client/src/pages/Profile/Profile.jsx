import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit2, FiMail, FiShield, FiKey, FiCalendar, FiClock,
  FiSave, FiX,
} from "react-icons/fi";
import api from "../../services/api";
import { useToast } from "../../context/ToastContext";
import mapBackground from "../../assets/map-background.jpg";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3.5 py-3.5 border-b border-border last:border-0">
      <div className="w-9 h-9 rounded-full bg-mist flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} className="text-forest" />
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-[15px] font-medium text-ink mt-0.5">{value}</p>
      </div>
    </div>
  );
}

const Profile = () => {
  const { showToast } = useToast();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put("/auth/profile", formData);
      setUser(response.data.user);
      setIsEditing(false);
      showToast("Profile updated", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast(
        error?.response?.data?.message || "Couldn't update profile",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
    });
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        const userData = response.data.user;

        setUser(userData);
        setFormData({
          name: userData.name || "",
          dateOfBirth: userData.dateOfBirth
            ? userData.dateOfBirth.split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        showToast("Couldn't load profile", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-forest/20 border-t-forest rounded-full animate-spin" />
          <p className="text-sm text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bg pb-16 overflow-hidden">

      <div className="relative max-w-4xl mx-auto px-6 pt-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display text-ink">My Profile</h1>
          <p className="text-muted mt-2">Manage your account information</p>
        </motion.div>

        {/* Hero / summary card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative overflow-hidden bg-forest rounded-3xl shadow-sm"
        >
          {/* Map texture, tinted with the forest color so it reads as part
              of the card rather than a separate image sitting on top */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-luminosity"
            style={{
              backgroundImage: `url(${mapBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/70 to-forest" />

          <div className="relative z-10 flex flex-col items-center py-12 px-6">
            <div className="w-24 h-24 rounded-full bg-gold text-forest flex items-center justify-center text-4xl font-display font-semibold ring-4 ring-white/15">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-display text-white mt-4">
              {user?.name}
            </h2>

            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase text-forest bg-gold px-3 py-1 rounded-full">
              {user?.role}
            </span>

            <p className="text-sm text-white/70 mt-3">
              Member since {formatDate(user?.createdAt)}
            </p>
          </div>
        </motion.div>

        {/* Personal information card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-sm mt-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-display text-ink">
              Personal Information
            </h2>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-hover transition-colors"
              >
                <FiEdit2 size={14} />
                Edit
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mt-3">
                  <InfoRow icon={FiMail} label="Email" value={user?.email} />
                  <InfoRow
                    icon={FiShield}
                    label="Role"
                    value={
                      <span className="capitalize">{user?.role}</span>
                    }
                  />
                  <InfoRow
                    icon={FiKey}
                    label="Authentication"
                    value={
                      <span className="capitalize">
                        {user?.authProvider}
                      </span>
                    }
                  />
                  <InfoRow
                    icon={FiCalendar}
                    label="Date of Birth"
                    value={formatDate(user?.dateOfBirth) || "Not added"}
                  />
                  <InfoRow
                    icon={FiClock}
                    label="Last Updated"
                    value={formatDate(user?.updatedAt)}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <div className="mb-5">
                  <label className="block text-sm text-muted mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-border rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-muted mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border border-border rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition-colors"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 bg-forest text-white px-6 py-3 rounded-xl hover:bg-forest-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave size={15} />
                        Save Changes
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 border border-border text-ink px-6 py-3 rounded-xl hover:bg-mist transition-colors disabled:opacity-60"
                  >
                    <FiX size={15} />
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;