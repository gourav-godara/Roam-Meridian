import { motion } from "framer-motion";
import {
  FiEdit2, FiTrash2, FiHome, FiTruck, FiCoffee,
  FiShoppingBag, FiCompass, FiMoreHorizontal,
} from "react-icons/fi";
import { deleteExpense } from "../../services/expenseApi";
import { useToast } from "../../context/ToastContext";

// One place to map a category to an icon + accent color, so every card,
// filter, and future chart reads the same way. Colors are deliberately
// distinct hues, not fifty shades of forest green, so the list scans fast.
const CATEGORY_META = {
  Accommodation: { icon: FiHome, color: "#2C463A", bg: "bg-forest/10", text: "text-forest" },
  Transport: { icon: FiTruck, color: "#1D6FA5", bg: "bg-sky-50", text: "text-sky-700" },
  Food: { icon: FiCoffee, color: "#C89B3C", bg: "bg-gold/15", text: "text-gold" },
  Shopping: { icon: FiShoppingBag, color: "#B0459B", bg: "bg-pink-50", text: "text-pink-700" },
  Activities: { icon: FiCompass, color: "#D2691E", bg: "bg-orange-50", text: "text-orange-700" },
  Other: { icon: FiMoreHorizontal, color: "#6B7280", bg: "bg-gray-100", text: "text-gray-600" },
};

const ExpenseCard = ({
  expense,
  refreshExpenses,
  setEditingExpense,
  setOpenModal,
  currentUserId,
}) => {
  const { showToast } = useToast();

  const isPayer = expense.paidBy?._id === currentUserId;

  const meta = CATEGORY_META[expense.category] || CATEGORY_META.Other;
  const CategoryIcon = meta.icon;

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
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden bg-surface rounded-2xl border border-border p-5 shadow-sm hover:shadow-hover transition-shadow duration-[var(--duration-normal)]"
    >
      {/* Left accent bar, colored per category — quick visual anchor when
          scanning a long list without reading every label */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: meta.color }}
      />

      <div className="flex justify-between items-start gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`w-11 h-11 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}
          >
            <CategoryIcon size={18} className={meta.text} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink font-display leading-tight">
              {expense.title}
            </h3>
            <p className="text-muted text-sm mt-0.5">{expense.category}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pl-14">
        <p className="text-muted text-xs">Amount</p>
        <h2 className="text-2xl font-semibold text-forest mt-0.5 font-display">
          ₹{expense.amount.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5 pl-14 text-sm">
        <div>
          <p className="text-muted text-xs">Paid By</p>
          <p className="font-medium text-ink mt-0.5">
            {expense.paidBy?.name}
            {isPayer && (
              <span className="text-forest font-normal"> (You)</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-muted text-xs">Date</p>
          <p className="font-medium text-ink mt-0.5">
            {new Date(expense.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-4 pl-14">
        <p className="text-muted text-xs mb-2">Participants</p>
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
            <span className="text-muted text-xs">No participants</span>
          )}
        </div>
      </div>

      {/* Any member of this trip can edit/delete/settle an expense — not
          just whoever paid, since the payer might be a companion with no
          account to act on their own behalf. The backend enforces trip
          membership on every request; these buttons are always shown to
          anyone who can see the expense at all (which already implies
          they're on the trip). */}
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
    </motion.div>
  );
};

export default ExpenseCard;