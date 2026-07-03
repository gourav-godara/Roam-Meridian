import ExpenseCard from "./ExpenseCard";

const ExpenseSummary = ({ expenseSummary }) => {
  if (!expenseSummary) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Expense Summary
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Total Spent</p>
          <h3 className="text-xl font-bold">
            ₹{expenseSummary.totalSpent}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">You Owe</p>
          <h3 className="text-xl font-bold text-red-500">
            ₹{expenseSummary.youOwe}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">You Are Owed</p>
          <h3 className="text-xl font-bold text-green-600">
            ₹{expenseSummary.youAreOwed}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {expenseSummary.recentExpenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseSummary;