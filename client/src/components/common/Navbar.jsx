import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
import Avatar from "./Avatar";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { to: "/explore", label: "Explore" },
  { to: "/planner", label: "Planner" },
  { to: "/itineraries", label: "Trips" },
  { to: "/about", label: "About Us" },
];

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
  `text-sm font-medium px-4 py-2 rounded-full transition-colors duration-[var(--duration-fast)] ${
    isActive ? "bg-forest/10 text-forest" : "text-ink hover:bg-gray-100"
  }`;

  return (
    <div className="fixed top-4 left-4 right-4 lg:left-0 lg:right-0 z-[var(--z-navbar)]">
      <header className="max-w-[1440px] mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border border-border/60">
        <div className="flex items-center justify-between h-[72px] px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="Roam Meridian" className="w-18 h-auto object-contain" />
            <span className="font-display font-semibold text-lg text-ink">
              Roam Meridian
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
            )}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 overflow-hidden hover:bg-gray-50 transition-colors duration-[var(--duration-fast)]"
              aria-label={isAuthenticated ? "Profile" : "Login"}
            >
              {isAuthenticated ? (
                <Avatar user={user} size={40} />
              ) : (
                <FiUser size={18} className="text-ink" aria-hidden="true" />
              )}
            </Link>
          </div>

          <button
            className="sm:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="sm:hidden flex flex-col gap-1 px-6 pb-4 border-t border-border">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
                style={{ padding: "12px 0" }}
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className={linkClass} onClick={() => setMobileOpen(false)} style={{ padding: "12px 0" }}>
                  Profile
                </NavLink>
                <Button variant="ghost" size="sm" onClick={logout} className="mt-2 w-full">
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
        )}
      </header>
    </div>
  );
}

export default Navbar;
