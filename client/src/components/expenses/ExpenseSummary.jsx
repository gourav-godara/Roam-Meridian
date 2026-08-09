import { motion } from "framer-motion";
import { FiDollarSign, FiCreditCard, FiUpload, FiUsers } from "react-icons/fi";

const ExpenseSummary = ({
  summary = { totalExpenses: 0, youPaid: 0, youOwe: 0, settlements: 0 },
}) => {
  const cards = [
    {
      title: "Total Expenses",
      value: `₹${summary.totalExpenses.toLocaleString("en-IN")}`,
      icon: FiDollarSign,
      accent: "from-forest to-forest-hover",
      iconBg: "bg-forest/10",
      iconColor: "text-forest",
    },
    {
      title: "You Paid",
      value: `₹${summary.youPaid.toLocaleString("en-IN")}`,
      icon: FiCreditCard,
      accent: "from-gold to-[#a97f28]",
      iconBg: "bg-gold/15",
      iconColor: "text-gold",
    },
    {
      title: "You Owe",
      value: `₹${summary.youOwe.toLocaleString("en-IN")}`,
      icon: FiUpload,
      accent: "from-red-500 to-red-700",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Settlements",
      value: summary.settlements,
      icon: FiUsers,
      accent: "from-forest-light to-forest",
      iconBg: "bg-forest/10",
      iconColor: "text-forest",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ title, value, icon: Icon, accent, iconBg, iconColor }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="relative overflow-hidden bg-surface rounded-2xl border border-border p-5 shadow-sm hover:shadow-hover transition-shadow duration-[var(--duration-normal)]"
        >
          {/* Thin gradient accent bar along the top — small touch that
              differentiates each card without relying on colored text */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent}`}
          />

          <div
            className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4`}
          >
            <Icon size={19} className={iconColor} />
          </div>
          <p className="text-xs text-muted">{title}</p>
          <h2 className="text-2xl font-semibold text-ink mt-1 font-display">
            {value}
          </h2>
        </motion.div>
      ))}
    </div>
  );
};

export default ExpenseSummary;