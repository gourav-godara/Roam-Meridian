const Booking = require("../models/booking.model");
const { getPartnerInfo } = require("../utils/partnerLinks");

class BookingError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const createBooking = async ({
  userId,
  mode,
  origin,
  destination,
  travelDate,
  passengers,
  referenceNumber,
  amountPaid,
  notes,
  tripId,
}) => {
  const partner = getPartnerInfo(mode);

  if (!partner) {
    throw new BookingError("Unknown travel mode.", 400);
  }

  const booking = await Booking.create({
    user: userId,
    trip: tripId || null,
    mode,
    partner: partner.key,
    origin,
    destination: destination || "",
    travelDate,
    passengers: passengers || 1,
    referenceNumber: referenceNumber || "",
    amountPaid: amountPaid ?? null,
    notes: notes || "",
  });

  return booking;
};

const getUserBookings = async (userId, { status, mode, page = 1, limit = 10 } = {}) => {
  const filter = { user: userId };

  if (status) filter.status = status;
  if (mode) filter.mode = mode;

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate("trip", "title"),
    Booking.countDocuments(filter),
  ]);

  return {
    bookings,
    total,
    currentPage: pageNumber,
    totalPages: Math.ceil(total / limitNumber),
  };
};

const getBookingById = async (id, userId) => {
  return Booking.findOne({ _id: id, user: userId }).populate("trip", "title");
};

const updateBooking = async (id, userId, updates) => {
  const booking = await Booking.findOne({ _id: id, user: userId });

  if (!booking) {
    throw new BookingError("Booking not found.", 404);
  }

  const allowedFields = ["referenceNumber", "amountPaid", "notes", "status"];

  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      booking[field] = updates[field];
    }
  });

  await booking.save();
  return booking;
};

const deleteBooking = async (id, userId) => {
  const booking = await Booking.findOneAndDelete({ _id: id, user: userId });

  if (!booking) {
    throw new BookingError("Booking not found.", 404);
  }

  return booking;
};

module.exports = {
  BookingError,
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};

