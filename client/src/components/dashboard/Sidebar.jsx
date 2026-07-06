import {
  FaCompass,
  FaHome,
  FaHeart,
  FaCalendarAlt,
  FaStar,
  FaWallet,
  FaHistory,
  FaUser,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
const menuItems = [
  {
    title: "Dashboard",
    icon: FaHome,
    path: "/dashboard",
  },
  {
    title: "Saved Trips",
    icon: FaHeart,
    path: "/saved-trips",
  },
  {
    title: "Upcoming Trips",
    icon: FaCalendarAlt,
    path: "/upcoming-trips",
  },
  {
    title: "Reviews",
    icon: FaStar,
    path: "/reviews",
  },
  {
    title: "Expenses",
    icon: FaWallet,
    path: "/expenses",
  },
  {
    title: "Travel History",
    icon: FaHistory,
    path: "/history",
  },
  {
    title: "Profile",
    icon: FaUser,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: FaCog,
    path: "/settings",
  },
  {
    title: "Help & Support",
    icon: FaQuestionCircle,
    path: "/help",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between">

      {/* Logo */}
      <div>

        <div className="flex items-center gap-3 px-6 py-6 border-b">

          <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">

            <FaCompass className="text-white text-xl" />

          </div>

          <div>

            <h1 className="font-bold text-xl text-gray-800">
              Roam Meridian
            </h1>

            <p className="text-sm text-gray-500">
              Travel Dashboard
            </p>

          </div>

        </div>

        {/* Navigation */}

        <nav className="mt-6 px-4">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
  key={item.title}
  to={item.path}
  className={({ isActive }) =>
    `w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
      isActive
        ? "bg-teal-500 text-white shadow-lg"
        : "text-gray-600 hover:bg-gray-100"
    }`
  }
>
                <Icon className="text-lg" />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card */}

      <div className="p-5">

        <div className="rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-white p-5">

          <h3 className="font-bold text-lg mb-2">
            Ready for your next adventure?
          </h3>

          <p className="text-sm opacity-90 mb-4">
            Discover beautiful destinations and create unforgettable memories.
          </p>

          <button className="w-full bg-white text-teal-600 font-semibold py-2 rounded-xl hover:bg-gray-100 transition">
            Explore Destinations
          </button>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;