const express = require("express");
const validateExpense = require("../middleware/expenseValidation");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

router.post(
  "/",
  validateExpense,
  expenseController.createExpense
);

router.get("/", expenseController.getAllExpenses);

router.get("/:id", expenseController.getExpenseById);

router.put("/:id", expenseController.updateExpense);

router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
