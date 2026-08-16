const bookingService = require("../services/booking.service");
const { getPartnerInfo, buildPartnerUrl, PARTNERS } = require("../utils/partnerLinks");

// GET /api/bookings/partners — used by the frontend to know which
// partner a mode redirects to, and to build the "Continue on X" link.
const getPartners = async (req, res) => {
  const { mode } = req.query;

  if (mode) {
    const partner = getPartnerInfo(mode);
    if (!partner) {
      return res.status(400).json({ success: false, message: "Unknown mode." });
    }
    return res.status(200).json({ success: true, data: partner });
  }

  res.status(200).json({ success: true, data: PARTNERS });
};

// GET /api/bookings/redirect-url?mode=&origin=&destination=&date=
const getRedirectUrl = async (req, res) => {
  const { mode, origin, destination, date } = req.query;

  if (!mode || !origin) {
    return res.status(400).json({
      success: false,
      message: "mode and origin are required.",
    });
  }

  const url = buildPartnerUrl({ mode, origin, destination, date });

  if (!url) {
    return res.status(400).json({ success: false, message: "Unknown mode." });
  }

  const partner = getPartnerInfo(mode);

  res.status(200).json({
    success: true,
    data: { url, partnerName: partner.name },
  });
};

const createBooking = async (req, res, next) => {
  try {
    const {
      mode,
      origin,
      destination,
      travelDate,
      passengers,
      referenceNumber,
      amountPaid,
      notes,
      tripId,
    } = req.body;

    if (!mode || !origin || !travelDate) {
      return res.status(400).json({
        success: false,
        message: "mode, origin, and travelDate are required.",
      });
    }

    const booking = await bookingService.createBooking({
      userId: req.user.id,
      mode,
      origin,
      destination,
      travelDate,
      passengers,
      referenceNumber,
      amountPaid,
      notes,
      tripId,
    });

    res.status(201).json({
      success: true,
      message: "Booking saved to your dashboard.",
      data: booking,
    });
  } catch (error) {
    if (error instanceof bookingService.BookingError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const { status, mode, page, limit } = req.query;

    const result = await bookingService.getUserBookings(req.user.id, {
      status,
      mode,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      total: result.total,
      count: result.bookings.length,
      data: result.bookings,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id, req.user.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found." });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.updateBooking(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({ success: true, message: "Booking updated.", data: booking });
  } catch (error) {
    if (error instanceof bookingService.BookingError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    await bookingService.deleteBooking(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: "Booking removed." });
  } catch (error) {
    if (error instanceof bookingService.BookingError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getPartners,
  getRedirectUrl,
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};

