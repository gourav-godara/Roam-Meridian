import {
  FaPlane,
  FaCalendarAlt,
  FaHeart,
  FaStar,
  FaWallet,
} from "react-icons/fa";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
  const statCards = [
    {
      title: "Total Trips",
      value: stats?.totalTrips ?? 0,
      icon: FaPlane,
      color: "bg-blue-500",
    },
    {
      title: "Upcoming Trips",
      value: stats?.upcomingTrips ?? 0,
      icon: FaCalendarAlt,
      color: "bg-orange-500",
    },
    {
      title: "Saved Trips",
      value: stats?.savedTrips ?? 0,
      icon: FaHeart,
      color: "bg-pink-500",
    },
    {
      title: "Reviews",
      value: stats?.reviews ?? 0,
      icon: FaStar,
      color: "bg-yellow-500",
    },
    {
      title: "Expenses",
      value: `₹${stats?.totalExpenses ?? 0}`,
      icon: FaWallet,
      color: "bg-green-500",
    },
  ];

  return (
    <section>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's a quick overview of your travel activity.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}

      </div>

    </section>
  );
};

export default StatsGrid;