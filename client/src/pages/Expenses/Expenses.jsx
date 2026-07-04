import { useState } from "react";
import AddExpenseModal from "../../components/expenses/AddExpenseModal";
import useExpenses from "../../hooks/useExpenses";
import ExpenseSummary from "../../components/expenses/ExpenseSummary";
import ExpenseFilters from "../../components/expenses/ExpenseFilters";
import ExpenseList from "../../components/expenses/ExpenseList";
import SettlementCard from "../../components/expenses/SettlementCard";

const sampleSettlements = [
  {
    from: "Rahul",
    to: "Jinal",
    amount: 1500,
  },
  {
    from: "Gourav",
    to: "Jinal",
    amount: 700,
  },
];

const Expenses = () => {
    const [openModal, setOpenModal] = useState(false);
     const {
    expenses,
    loading,
    error,
  } = useExpenses();
  if (loading) {
  return (
    <h2 className="text-center mt-20 text-xl">
      Loading expenses...
    </h2>
  );
}
if (error) {
  return (
    <h2 className="text-center mt-20 text-red-500">
      {error}
    </h2>
  );
}
  return (
    
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Expense Split
      </h1>

      <ExpenseSummary />

      <div className="mt-8">
        <ExpenseFilters
  onAddExpense={() => setOpenModal(true)}
/>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
        <AddExpenseModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
/>
        <div className="xl:col-span-2">
         <ExpenseList expenses={expenses} />
        </div>

        <SettlementCard settlements={sampleSettlements} />

      </div>

    </div>
  );
};

export default Expenses;