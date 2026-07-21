const validateExpense = (req, res, next) => {
  const { title, amount, itinerary } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Expense title is required.",
    });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero.",
    });
  }

  if (!itinerary) {
    return res.status(400).json({
      success: false,
      message: "Trip is required.",
    });
  }

  next();
};

module.exports = validateExpense;