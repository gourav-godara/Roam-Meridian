import { FiDollarSign, FiCreditCard, FiUpload, FiUsers } from "react-icons/fi";

const ExpenseSummary = ({
  summary = { totalExpenses: 0, youPaid: 0, youOwe: 0, settlements: 0 },
}) => {
  const cards = [
    {
      title: "Total Expenses",
      value: `₹${summary.totalExpenses}`,
      icon: FiDollarSign,
    },
    { title: "You Paid", value: `₹${summary.youPaid}`, icon: FiCreditCard },
    { title: "You Owe", value: `₹${summary.youOwe}`, icon: FiUpload },
    { title: "Settlements", value: summary.settlements, icon: FiUsers },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ title, value, icon: Icon }) => (
        <div
          key={title}
          className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow"
        >
          <div className="w-11 h-11 rounded-xl bg-forest/10 flex items-center justify-center mb-4">
            <Icon size={19} className="text-forest" />
          </div>
          <p className="text-xs text-gray-500">{title}</p>
          <h2 className="text-2xl font-semibold text-ink mt-1 font-display">
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;
