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

// Lighter validator for PUT /:id — only checks fields that were actually
// sent in the partial update.
const validateExpenseUpdate = (req, res, next) => {
  const { title, amount } = req.body;

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Expense title cannot be empty.",
    });
  }

  if (amount !== undefined && amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero.",
    });
  }

  next();
};

module.exports = validateExpense;
module.exports.validateExpenseUpdate = validateExpenseUpdate;