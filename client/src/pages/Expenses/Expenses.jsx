import { useState } from "react";
import AddExpenseModal from "../../components/expenses/AddExpenseModal";
import useExpenses from "../../hooks/useExpenses";
import useTrips from "../../hooks/useTrips";
import ExpenseSummary from "../../components/expenses/ExpenseSummary";
import ExpenseFilters from "../../components/expenses/ExpenseFilters";
import ExpenseList from "../../components/expenses/ExpenseList";
import SettlementCard from "../../components/expenses/SettlementCard";
import { calculateSettlements } from "../../utils/calculateSettlements";
import { settleExpense } from "../../services/expenseApi";

const Expenses = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const { expenses, loading, error, refreshExpenses } = useExpenses();
  const { trips } = useTrips();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserName = currentUser?.name;
  const currentUserId = currentUser?.id;

  const settlements = calculateSettlements(expenses);

  const mySettlements = settlements.filter(
    (item) =>
      item.from.name === currentUserName || item.to.name === currentUserName
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

      alert("Expense settled successfully!");

      refreshExpenses();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to settle expense.");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center mt-20 text-xl">Loading expenses...</h2>
    );
  }

  if (error) {
    return <h2 className="text-center mt-20 text-red-500">{error}</h2>;
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Expense Split</h1>

      <ExpenseSummary summary={summary} />

      <div className="mt-8">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
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
          />
        </div>

        <SettlementCard
          settlements={mySettlements}
          onSettle={handleSettle}
        />
      </div>
    </div>
  );
};

export default Expenses;