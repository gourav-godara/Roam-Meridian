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

function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatsCard key={stat.key} stat={stat} />
      ))}
    </div>
  );
}

export default StatsGrid;
