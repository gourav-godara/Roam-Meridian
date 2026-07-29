import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteExpense } from "../../services/expenseApi";
import { useToast } from "../../context/ToastContext";

const ExpenseCard = ({
  expense,
  refreshExpenses,
  setEditingExpense,
  setOpenModal,
  currentUserId,
}) => {
  const { showToast } = useToast();

  // The backend only allows the original payer to edit/delete/settle an
  // expense — previously Edit/Delete were shown to every participant, so
  // anyone else would click them and get a confusing 403 with no context.
  const isPayer = expense.paidBy?._id === currentUserId;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this expense?");
    if (!confirmDelete) return;

    try {
      await deleteExpense(expense._id);
      showToast("Expense deleted.", "success");
      await refreshExpenses();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to delete expense.",
        "error"
      );
    }
  };

  const handleEdit = () => {
    setEditingExpense(expense);
    setOpenModal(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink font-display">
            {expense.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{expense.category}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
            expense.status === "Settled"
              ? "bg-forest/10 text-forest"
              : "bg-gold/15 text-gold"
          }`}
        >
          {expense.status}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-gray-500 text-xs">Amount</p>
        <h2 className="text-2xl font-semibold text-forest mt-0.5 font-display">
          ₹{expense.amount}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Paid By</p>
          <p className="font-medium text-ink mt-0.5">
            {expense.paidBy?.name}
            {isPayer && (
              <span className="text-forest font-normal"> (You)</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Date</p>
          <p className="font-medium text-ink mt-0.5">
            {new Date(expense.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-500 text-xs mb-2">Participants</p>
        <div className="flex flex-wrap gap-2">
          {expense.participants?.length ? (
            expense.participants.map((person) => (
              <span
                key={person._id}
                className="bg-mist/60 px-3 py-1 rounded-full text-xs text-ink"
              >
                {person.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No participants</span>
          )}
        </div>
      </div>

      {isPayer ? (
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-border">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/5 text-forest hover:bg-forest/10 transition-colors text-sm font-medium"
          >
            <FiEdit2 size={13} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <FiTrash2 size={13} />
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-5 pt-4 border-t border-border">
          <p className="text-xs text-gray-400">
            Only {expense.paidBy?.name || "the payer"} can edit or delete this
            expense.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseCard;
