const ExpenseCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-surface rounded-3xl border border-border p-5">
      <h3 className="text-lg font-semibold mb-4">
        Expense Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Spent</span>
          <span className="font-semibold text-teal-600">
            ₹{summary.totalSpent}
          </span>
        </div>

        <div className="flex justify-between">
          <span>You Owe</span>
          <span className="font-semibold text-red-500">
            ₹{summary.youOwe}
          </span>
        </div>

        <div className="flex justify-between">
          <span>You Are Owed</span>
          <span className="font-semibold text-green-600">
            ₹{summary.youAreOwed}
          </span>
        </div>
      </div>

      {summary.recentExpenses?.length > 0 && (
        <>
          <hr className="my-5" />

          <h4 className="font-medium mb-3">
            Recent Expenses
          </h4>

          <div className="space-y-3">
            {summary.recentExpenses.map((expense) => (
              <div
                key={expense._id}
                className="flex justify-between"
              >
                <div>
                  <p className="font-medium">
                    {expense.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    ₹{expense.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseCard;