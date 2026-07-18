import { useEffect, useState } from "react";
import api from "../../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    try {
      const response = await api.put("/auth/profile", formData);

      setUser(response.data.user);

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Page Heading */}
        <h1 className="text-3xl font-serif font-semibold text-center">
          My Profile
        </h1>

        <p className="text-gray-600 mt-2 text-center">
          Manage your account information.
        </p>

        {/* Profile Summary Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-sm mt-4">

          <div className="absolute inset-0 bg-white/20"></div>

          <div className="relative z-10 flex flex-col items-center py-10">

            <div className="w-24 h-24 rounded-full bg-[#2F4F3F] text-white flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-semibold mt-4">
              {user?.name}
            </h2>

            <p className="text-gray-600 text-xl capitalize">
              {user?.role}
            </p>

            <p className="text-sm text-gray-500">
              Member since{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            Personal Information
          </h2>

          {!isEditing ? (
            <>
              <div className="mb-5">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium">{user?.email}</p>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-medium capitalize">
                  {user?.role}
                </p>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-500">
                  Authentication
                </p>
                <p className="text-lg font-medium capitalize">
                  {user?.authProvider}
                </p>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-500">
                  Date of Birth
                </p>
                <p className="text-lg font-medium">
                  {user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Not Added"}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-500">
                  Last Updated
                </p>
                <p className="text-lg font-medium">
                  {new Date(user?.updatedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#2F4F3F] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="mb-5">
                <label className="block text-sm text-gray-500 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2F4F3F]"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm text-gray-500 mb-2">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2F4F3F]"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-[#2F4F3F] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => {
                    setFormData({
                      name: user.name || "",
                      dateOfBirth: user.dateOfBirth
                        ? user.dateOfBirth.split("T")[0]
                        : "",
                    });

                    setIsEditing(false);
                  }}
                  className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;