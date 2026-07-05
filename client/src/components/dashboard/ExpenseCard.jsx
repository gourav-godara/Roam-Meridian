const ExpenseCard = ({ expense }) => {
  return (
    <div className="flex justify-between items-center border-b last:border-none py-3">
      <div>
        <h3 className="font-medium">
          {expense.title}
        </h3>

        <p className="text-sm text-gray-500">
          Paid by {expense.paidBy}
        </p>
      </div>

      <span className="font-semibold text-teal-600">
        ₹{expense.amount}
      </span>
    </div>
  );
};

export default ExpenseCard;