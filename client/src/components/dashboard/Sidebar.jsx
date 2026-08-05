import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";
import {
  FiHome, FiBriefcase, FiHeart, FiCalendar, FiStar,
  FiZap, FiDollarSign, FiUser, FiCompass, FiShield,
} from "react-icons/fi";
import ProfileCard from "./ProfileCard";
import TravelTipCard from "./TravelTipCard";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome, end: true },
  { to: "/itineraries", label: "My Trips", icon: FiBriefcase },
  { to: "/wishlist", label: "Wishlist", icon: FiHeart },
  { to: "/dashboard/bookings", label: "Bookings", icon: FiCalendar },
  { to: "/reviews", label: "Reviews", icon: FiStar },
  { to: "/planner", label: "AI Itinerary", icon: FiZap },
  { to: "/expenses", label: "Expenses", icon: FiDollarSign },
  { to: "/profile", label: "Profile Settings", icon: FiUser },
];

const QUICK_ACTIONS = [
  { to: "/explore", label: "Explore Destinations", sub: "Find your next adventure", icon: FiCompass },
];

function Sidebar({ user, tip, open, onClose }) {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-[var(--duration-fast)] ${
      isActive ? "bg-forest text-white" : "text-ink hover:bg-gray-100"
    }`;

  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed top-24 left-0 right-0 bottom-0 bg-black/40 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static top-24 lg:top-0 left-0 h-[calc(100%-6rem)] lg:h-full z-40
          w-72 lg:w-64 shrink-0 bg-surface border-r border-border
          flex flex-col px-4 py-6 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <button onClick={onClose} className="lg:hidden self-end text-muted mb-2" aria-label="Close menu">
          <FiX size={20} />
        </button>

        <div className="border-b border-border">
          <ProfileCard user={user} />
        </div>

        <p className="text-[11px] font-semibold text-muted tracking-wide mt-5 mb-2 px-1">MAIN MENU</p>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass} onClick={onClose}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <p className="text-[11px] font-semibold text-muted tracking-wide mt-6 mb-2 px-1">QUICK ACTIONS</p>
        <div className="flex flex-col gap-1">
          {QUICK_ACTIONS.map(({ to, label, sub, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Icon size={17} className="text-muted mt-0.5" />
              <span>
                <span className="block text-sm font-medium text-ink">{label}</span>
                <span className="block text-xs text-muted">{sub}</span>
              </span>
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={onClose}
              className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FiShield size={17} className="text-muted mt-0.5" />
              <span>
                <span className="block text-sm font-medium text-ink">Admin Panel</span>
                <span className="block text-xs text-muted">Manage the platform</span>
              </span>
            </NavLink>
          )}
        </div>

        <TravelTipCard tip={tip} />
      </aside>
    </>
  );
}

export default Sidebar;
