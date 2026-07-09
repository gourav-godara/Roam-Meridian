import StatsCard from "./StatsCard";

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