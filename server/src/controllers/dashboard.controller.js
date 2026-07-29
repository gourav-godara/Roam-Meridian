const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;

    const dashboard = await dashboardService.getDashboardData(userId);

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };