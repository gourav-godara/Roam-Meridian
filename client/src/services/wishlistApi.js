import api from "./api";

export const getWishlist = async () => {
    const response = await api.get("/wishlist");
    return response.data;
};

export const addToWishlist = async (destinationId) => {
    const response = await api.post(`/wishlist/${destinationId}`);
    return response.data;
};

export const removeFromWishlist = async (destinationId) => {
    const response = await api.delete(`/wishlist/${destinationId}`);
    return response.data;
};