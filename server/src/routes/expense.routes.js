const express = require("express");
const validateExpense = require("../middleware/expenseValidation");
const { validateExpenseUpdate } = require("../middleware/expenseValidation");
const authMiddleware = require("../middleware/auth.middleware");
const expenseController = require("../controllers/expense.controller");

const router = express.Router();

// Every expense route requires a logged-in user
router.use(authMiddleware);

router.post("/", validateExpense, expenseController.createExpense);

router.get("/", expenseController.getAllExpenses);

router.get("/:id", expenseController.getExpenseById);

router.put("/:id", validateExpenseUpdate, expenseController.updateExpense);

router.delete("/:id", expenseController.deleteExpense);

router.patch("/:id/settle", expenseController.settleExpense);

module.exports = router;

