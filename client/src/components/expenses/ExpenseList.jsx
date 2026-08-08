import { AnimatePresence } from "framer-motion";
import { FiInbox } from "react-icons/fi";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({
  expenses = [],
  refreshExpenses,
  setEditingExpense,
  setOpenModal,
  currentUserId,
}) => {
  if (!expenses.length) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-10 text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-mist flex items-center justify-center mx-auto mb-4">
          <FiInbox size={22} className="text-forest" />
        </div>
        <h2 className="text-lg font-semibold text-ink font-display mb-1.5">
          No expenses yet
        </h2>
        <p className="text-muted text-sm">
          Add your first expense to start splitting costs with your crew.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink font-display mb-4">
        Recent Expenses
      </h2>
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              refreshExpenses={refreshExpenses}
              setEditingExpense={setEditingExpense}
              setOpenModal={setOpenModal}
              currentUserId={currentUserId}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpenseList;