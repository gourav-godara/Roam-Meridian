const dashboardService = require("../services/dashboard.service"); // Imports the service file where data is gathered.

const getDashboard = async (req, res, next) => { // Defines an asynchronous function to handle the request (req) and response (res).
  try { // "Try running this code..."
    const userId = req.user.id || req.user._id;

const dashboard = await dashboardService.getDashboardData(userId); // Calls the service file to fetch the data and waits for it.

    res.status(200).json({ // Sends back an HTTP status of 200 (Success) and packages data as JSON.
      success: true, // Tells the frontend: "Everything went perfectly!"
      data: dashboard, // Attaches the actual data object.
    });

  } catch (error) { // "...If something breaks, catch the error here."
    next(error); // Passes the error to your global Express error handler so your website doesn't crash.
  }
};

module.exports = { getDashboard }; // Exports the function to be used by the routes file.