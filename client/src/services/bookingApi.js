import api from "./api";

export const getPartners = async (mode) => {
  const { data } = await api.get("/bookings/partners", {
    params: mode ? { mode } : {},
  });
  return data;
};

export const getRedirectUrl = async ({ mode, origin, destination, date }) => {
  const { data } = await api.get("/bookings/redirect-url", {
    params: { mode, origin, destination, date },
  });
  return data;
};

export const createBooking = async (bookingData) => {
  const { data } = await api.post("/bookings", bookingData);
  return data;
};

export const getUserBookings = async (params = {}) => {
  const { data } = await api.get("/bookings", { params });
  return data;
};

export const getBookingById = async (id) => {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
};

export const updateBooking = async (id, updates) => {
  const { data } = await api.put(`/bookings/${id}`, updates);
  return data;
};

export const deleteBooking = async (id) => {
  const { data } = await api.delete(`/bookings/${id}`);
  return data;
};

