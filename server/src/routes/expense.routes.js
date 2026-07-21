const express = require("express");
const validateExpense = require("../middleware/expenseValidation");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const expenseController = require("../controllers/expense.controller");
router.use(authMiddleware);
router.post(
  "/",
  authMiddleware,
  validateExpense,
  expenseController.createExpense
);

router.get("/", expenseController.getAllExpenses);

router.get("/:id", expenseController.getExpenseById);

router.put("/:id", expenseController.updateExpense);

router.delete("/:id", expenseController.deleteExpense);

router.patch(
  "/:id/settle",
  authMiddleware,
  expenseController.settleExpense
);
module.exports = router;
