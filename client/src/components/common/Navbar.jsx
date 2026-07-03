import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link to="/" className="text-xl font-semibold text-slate-900">
        Roam Meridian
      </Link>

      <div className="flex items-center gap-6">
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            isActive ? "text-teal-600 font-medium" : "text-slate-600"
          }
        >
          Explore
        </NavLink>

        {isAuthenticated ? (
          <>
            <NavLink to="/planner" className="text-slate-600">Planner</NavLink>
            <NavLink to="/dashboard" className="text-slate-600">Dashboard</NavLink>
            <NavLink to="/profile" className="text-slate-600">
              {user?.name || "Profile"}
            </NavLink>
            <button onClick={logout} className="text-slate-600 hover:text-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-slate-600">Login</Link>
            <Link
              to="/signup"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
