import api from "./api";

// ============================================================
// DASHBOARD / ANALYTICS
// ============================================================

export const getAdminStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

// ============================================================
// USERS
// ============================================================

export const getUsers = async (params = {}) => {
  const { data } = await api.get("/admin/users", { params });
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/admin/users/${id}`);
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await api.patch(`/admin/users/${id}/role`, { role });
  return data;
};

export const updateUserStatus = async (id, isActive) => {
  const { data } = await api.patch(`/admin/users/${id}/status`, { isActive });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/admin/users/${id}`);
  return data;
};

// ============================================================
// TRIPS
// ============================================================

export const getAllTripsAdmin = async (params = {}) => {
  const { data } = await api.get("/admin/trips", { params });
  return data;
};

export const deleteTripAdmin = async (id) => {
  const { data } = await api.delete(`/admin/trips/${id}`);
  return data;
};

// ============================================================
// REVIEWS
// ============================================================

export const getAllReviewsAdmin = async (params = {}) => {
  const { data } = await api.get("/admin/reviews", { params });
  return data;
};

export const deleteReviewAdmin = async (id) => {
  const { data } = await api.delete(`/admin/reviews/${id}`);
  return data;
};

// ============================================================
// EXPENSES (read-only)
// ============================================================

export const getAllExpensesAdmin = async (params = {}) => {
  const { data } = await api.get("/admin/expenses", { params });
  return data;
};

// ============================================================
// DESTINATIONS
// Reuses the existing public destination endpoints — POST/PUT/DELETE
// there are already gated to admin-only server-side.
// ============================================================

export {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "./destinationApi";
