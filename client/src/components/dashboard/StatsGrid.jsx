import { motion } from "framer-motion";
import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
  const cards = [
  {
    title: "Trips",
    value: stats?.totalTrips ?? 0,
    icon: "✈️",
    trend: "+12%",
    subtitle: "Last Trip",
  },
  {
    title: "Countries",
    value: stats?.countries ?? 0,
    icon: "🌍",
    trend: "+4%",
    subtitle: "Across Asia",
  },
  {
    title: "Expenses",
    value: stats?.totalExpenses ?? 0,
    icon: "💰",
    trend: "+9%",
    subtitle: "This Year",
  },
  {
    title: "Reviews",
    value: stats?.reviews ?? 0,
    icon: "⭐",
    trend: "+18%",
    subtitle: "Community Shared",
  },
];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          <StatCard {...card} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsGrid;