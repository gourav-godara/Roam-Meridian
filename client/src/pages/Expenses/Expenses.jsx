import { useState } from "react";
import { motion } from "framer-motion";
import AddExpenseModal from "../../components/expenses/AddExpenseModal";
import useExpenses from "../../hooks/useExpenses";
import ExpenseSummary from "../../components/expenses/ExpenseSummary";
import ExpenseFilters from "../../components/expenses/ExpenseFilters";
import ExpenseList from "../../components/expenses/ExpenseList";
import SettlementCard from "../../components/expenses/SettlementCard";
import useTrips from "../../hooks/useTrips";
import { calculateSettlements } from "../../utils/calculateSettlements";
import { settleExpense } from "../../services/expenseApi";
import { useToast } from "../../context/ToastContext";
import useAuth from "../../hooks/useAuth";
import worldMap from "../../assets/world-map.png";

const Expenses = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const { expenses, loading, error, refreshExpenses } = useExpenses();
  const { trips } = useTrips();
  const { showToast } = useToast();

  // useAuth already exposes the parsed user object from context — reading
  // straight from localStorage here was redundant and could drift out of
  // sync with the actual auth state if the user logs out in another tab.
  const { user: currentUser } = useAuth();
  const currentUserId = currentUser?.id;

  const settlements = calculateSettlements(expenses);

  // Previously this matched by name, not id — two participants who happen
  // to share a name would get their settlements mixed up. Every other
  // comparison on this page already uses currentUserId; this now matches.
  const mySettlements = settlements.filter(
    (item) => item.from._id === currentUserId || item.to._id === currentUserId,
  );

  const summary = {
    totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
    youPaid: expenses
      .filter((expense) => expense.paidBy?._id === currentUserId)
      .reduce((sum, expense) => sum + expense.amount, 0),
    youOwe: settlements
      .filter((item) => item.from._id === currentUserId)
      .reduce((sum, item) => sum + item.amount, 0),
    settlements: expenses.filter((expense) => expense.status === "Settled")
      .length,
  };

  const handleSettle = async (expenseId) => {
    try {
      await settleExpense(expenseId);
      showToast("Expense settled successfully!", "success");
      refreshExpenses();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to settle expense.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          <p className="text-sm text-muted">Loading expenses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || expense.category === category;
    const matchesStatus = status === "All" || expense.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="relative min-h-screen  pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Ambient backdrop: a low-poly world map, tinted into the forest
          palette and faded into the page background at the edges so it
          reads as texture rather than a stray illustration. */}
      <div
        className="fixed top-0 right-0 w-[70vw] max-w-[900px] pointer-events-none opacity-[0.07]"
        style={{
          filter:
            "sepia(1) saturate(2) hue-rotate(60deg) brightness(0.55)",
        }}
      >
        <img src={worldMap} alt="" className="w-full h-auto" />
      </div>
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold tracking-[0.15em] text-gold uppercase mb-2">
            Trip Finances
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink">
            Expense Split
          </h1>
          <p className="text-muted mt-2 text-sm sm:text-base">
            Track spending, split fairly, and settle up with your travel
            crew.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <ExpenseSummary summary={summary} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6"
        >
          <ExpenseFilters
            onAddExpense={() => setOpenModal(true)}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
          />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <AddExpenseModal
            isOpen={openModal}
            onClose={() => {
              setOpenModal(false);
              setEditingExpense(null);
            }}
            refreshExpenses={refreshExpenses}
            editingExpense={editingExpense}
            trips={trips}
          />
          <div className="xl:col-span-2">
            <ExpenseList
              expenses={filteredExpenses}
              refreshExpenses={refreshExpenses}
              setEditingExpense={setEditingExpense}
              setOpenModal={setOpenModal}
              currentUserId={currentUserId}
            />
          </div>

          <SettlementCard
            settlements={mySettlements}
            onSettle={handleSettle}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;