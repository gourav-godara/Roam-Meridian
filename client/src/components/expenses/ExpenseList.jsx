import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({
  expenses = [],
  refreshExpenses,
  setEditingExpense,
  setOpenModal,
}) => {
  if (!expenses.length) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Expense List</h2>

        <p className="text-gray-500">No expenses found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Recent Expenses</h2>

      <div className="space-y-5">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            refreshExpenses={refreshExpenses}
            setEditingExpense={setEditingExpense}
            setOpenModal={setOpenModal}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;