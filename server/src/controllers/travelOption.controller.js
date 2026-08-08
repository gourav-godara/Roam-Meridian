const travelOptionService = require("../services/travelOption.service");

const searchTravelOptions = async (req, res, next) => {
  try {
    const { mode, from, to, date, passengers, page, limit } = req.query;

    const result = await travelOptionService.searchTravelOptions({
      mode,
      originCity: from,
      destinationCity: to,
      date,
      passengers,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      total: result.total,
      count: result.options.length,
      data: result.options,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableCities = async (req, res, next) => {
  try {
    const cities = await travelOptionService.getAvailableCities(req.query.mode);

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

const getTravelOptionById = async (req, res, next) => {
  try {
    const option = await travelOptionService.getTravelOptionById(req.params.id);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Travel option not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchTravelOptions,
  getAvailableCities,
  getTravelOptionById,
};
