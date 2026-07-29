import { useState } from "react";
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          <p className="text-sm text-muted">Loading expenses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
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
    <div className="min-h-screen bg-[#FAFAF8] pt-28 sm:pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <h1 className="font-display text-3xl sm:text-4xl text-ink mb-8">
          Expense Split
        </h1>

        <ExpenseSummary summary={summary} />

        <div className="mt-6">
          <ExpenseFilters
            onAddExpense={() => setOpenModal(true)}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
          />
        </div>

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
