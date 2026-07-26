import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import Button from "./Button";
import Avatar from "./Avatar";
import logo from "../../assets/logo.png";

const NAV_LINKS = [
  { to: "/explore", label: "Explore" },
  { to: "/planner", label: "AI Planner" },
  { to: "/itineraries", label: "Trips" },
  { to: "/about", label: "About Us" },
];

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-4 py-2 rounded-full transition-colors duration-[var(--duration-fast)] ${
      isActive ? "bg-forest/10 text-forest" : "text-ink hover:bg-gray-100"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block w-full text-left text-sm font-medium px-4 py-3 rounded-2xl transition-colors duration-[var(--duration-fast)] ${
      isActive ? "bg-forest/10 text-forest" : "text-ink hover:bg-gray-100"
    }`;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 right-4 lg:left-0 lg:right-0 z-[var(--z-navbar)]">
      <header className="max-w-[1440px] mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-lg border border-border/60">
        <div className="flex items-center justify-between h-[72px] px-6 py-4">
          <button
            className="sm:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 min-w-0"
          >
            <img
              src={logo}
              alt="Roam Meridian"
              className="w-9 sm:w-18 h-auto object-contain shrink-0"
            />
            <span className="font-display font-semibold text-sm sm:text-lg text-ink truncate">
              Roam Meridian
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}
          </nav>

          {isAuthenticated ? (
            <div className="relative shrink-0" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={menuOpen}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors duration-[var(--duration-fast)]"
              >
                <Avatar user={user} size={40} />
              </button>

              {menuOpen && (
                <div className="absolute top-12 right-0 bg-white border border-border rounded-2xl shadow-lg min-w-[200px] p-2 z-50">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-sm font-semibold text-ink truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm text-ink hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-xl text-sm text-error hover:bg-red-50 transition-colors mt-1 border-t border-border pt-2.5"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="shrink-0">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {mobileOpen && (
          <nav className="sm:hidden flex flex-col gap-1 px-4 pb-4 border-t border-border pt-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            {!isAuthenticated && (
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="mt-2"
              >
                <Button variant="primary" size="sm" className="w-full">
                  Sign up
                </Button>
              </Link>
            )}
          </nav>
        )}
      </header>
    </div>
  );
}

export default Navbar;
