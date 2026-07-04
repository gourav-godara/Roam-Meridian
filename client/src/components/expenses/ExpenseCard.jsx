import { FaEdit, FaTrash } from "react-icons/fa";

const ExpenseCard = ({ expense }) => {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 hover:shadow-lg transition">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-xl font-semibold">
            {expense.title}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {expense.category}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            expense.status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {expense.status}
        </span>

      </div>

      {/* Amount */}
      <div className="mt-5">

        <p className="text-gray-500 text-sm">
          Amount
        </p>

        <h2 className="text-3xl font-bold text-teal-600">
          ₹{expense.amount}
        </h2>

      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

        <div>
          <p className="text-gray-500">
            Paid By
          </p>

          <p className="font-medium">
            {expense.paidBy}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Date
          </p>

          <p className="font-medium">
            {expense.date}
          </p>
        </div>

      </div>

      {/* Participants */}
      <div className="mt-5">

        <p className="text-gray-500 text-sm mb-2">
          Participants
        </p>

        <div className="flex flex-wrap gap-2">

          {expense.participants.map((person) => (
            <span
              key={person}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {person}
            </span>
          ))}

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
          <FaEdit />
          Edit
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
};

export default ExpenseCard;