const ExpenseSummary = ({
  summary = {
    totalExpenses: 0,
    youPaid: 0,
    youOwe: 0,
    settlements: 0,
  },
}) => {
  const cards = [
    {
      title: "Total Expenses",
      value: `₹${summary.totalExpenses}`,
      color: "bg-blue-500",
      icon: "💰",
    },
    {
      title: "You Paid",
      value: `₹${summary.youPaid}`,
      color: "bg-green-500",
      icon: "💳",
    },
    {
      title: "You Owe",
      value: `₹${summary.youOwe}`,
      color: "bg-orange-500",
      icon: "📤",
    },
    {
      title: "Settlements",
      value: summary.settlements,
      color: "bg-purple-500",
      icon: "🤝",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;