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
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <h2 className="text-lg font-semibold text-ink font-display mb-2">
          Expense List
        </h2>
        <p className="text-gray-500 text-sm">No expenses found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink font-display mb-4">
        Recent Expenses
      </h2>
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
};

export default ExpenseList;
