import api from "./api";

export const getLocationByCity = async (city, state, country = "India") => {
  const response = await api.get("/maps", {
    params: {
      city,
      state,
      country,
    },
  });

  return response.data;
};

export const getNearbyPlaces = async (
  latitude,
  longitude,
  type,
  radius = 1000
) => {
  const response = await api.get("/maps/nearby", {
    params: {
      lat: latitude,
      lng: longitude,
      type,
      radius,
    },
  });

  return response.data;
};

export const getRouteDetails = async (
  startLat,
  startLng,
  endLat,
  endLng
) => {
  const response = await api.get("/maps/route", {
    params: {
      startLat,
      startLng,
      endLat,
      endLng,
    },
  });

  return response.data;
};