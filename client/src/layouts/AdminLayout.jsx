import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiMapPin,
  FiBriefcase,
  FiStar,
  FiDollarSign,
  FiMenu,
  FiX,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: FiGrid, end: true },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/destinations", label: "Destinations", icon: FiMapPin },
  { to: "/admin/trips", label: "Trips", icon: FiBriefcase },
  { to: "/admin/reviews", label: "Reviews", icon: FiStar },
  { to: "/admin/expenses", label: "Expenses", icon: FiDollarSign },
  { to: "/admin/itineraries", label: "Itineraries", icon: FiMapPin },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive ? "bg-forest text-white" : "text-ink hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-bg flex">
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full z-50
          w-72 lg:w-64 shrink-0 bg-surface border-r border-border
          flex flex-col px-4 py-6
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8 px-1">
          <div>
            <p className="font-display text-lg text-ink font-semibold">
              Roam Meridian
            </p>
            <p className="text-xs text-muted">Admin Panel</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navLinkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border pt-4 mt-4 flex flex-col gap-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-gray-100 transition-colors"
          >
            <FiExternalLink size={18} />
            View Site
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <FiLogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-ink"
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-ink leading-tight">
                {user?.name}
              </p>
              <p className="text-xs text-muted leading-tight">Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
