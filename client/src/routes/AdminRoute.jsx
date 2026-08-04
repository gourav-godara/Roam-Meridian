import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Stricter than ProtectedRoute — requires the logged-in user to actually
// have the "admin" role, not just be authenticated. A logged-in regular
// user hitting /admin/* is redirected home rather than shown a 403 page,
// since the admin panel shouldn't be discoverable/visible at all to them.
function AdminRoute() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
console.log("isAuthenticated:", isAuthenticated);
console.log("User:", user);
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
