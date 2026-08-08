import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiMapPin,
  FiBriefcase,
  FiStar,
  FiDollarSign,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: FiGrid, end: true },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/destinations", label: "Destinations", icon: FiMapPin },
  { to: "/admin/trips", label: "Trips", icon: FiBriefcase },
  { to: "/admin/reviews", label: "Reviews", icon: FiStar },
  { to: "/admin/expenses", label: "Expenses", icon: FiDollarSign },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive ? "bg-forest text-white" : "text-ink hover:bg-gray-100"
    }`;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg flex pt-24">
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={`
            fixed lg:static top-24 lg:top-0 left-0 min-h-[calc(100vh-6rem)] lg:min-h-screen z-40
            w-72 lg:w-64 shrink-0 bg-surface border-r border-border
            flex flex-col px-4 py-6
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          `}
        >
          <div className="flex items-center justify-between mb-8 px-1">
            <div>
              <p className="font-display text-lg text-ink font-semibold">
                Admin Panel
              </p>
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
        </aside>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="lg:hidden h-14 border-b border-border bg-surface flex items-center px-4 sticky top-24 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-ink"
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>
          </div>

          <main className="flex-1 p-4 sm:p-6 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminLayout;