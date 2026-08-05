import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiMapPin,
  FiBriefcase,
  FiStar,
  FiDollarSign,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getAdminStats } from "../../services/adminApi";
import StatCard from "../../components/admin/StatCard";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const res = await getAdminStats();
        if (!ignore) setStats(res.data);
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.data?.message || "Unable to load admin stats."
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <FiAlertTriangle className="text-red-500 mb-3" size={28} />
        <p className="text-ink font-medium">{error}</p>
      </div>
    );
  }

  const { totals, tripsByStatus, topDestinations, signupTrend, recent } =
    stats;

  const chartData = signupTrend.map((d) => ({
    date: new Date(d.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    signups: d.count,
  }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Admin Overview</h1>
        <p className="text-sm text-muted mt-1">
          Live platform stats, pulled directly from the database.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={FiUsers} label="Users" value={totals.users} accent="forest" />
        <StatCard icon={FiMapPin} label="Destinations" value={totals.destinations} accent="gold" />
        <StatCard icon={FiBriefcase} label="Trips" value={totals.trips} accent="blue" />
        <StatCard icon={FiStar} label="Reviews" value={totals.reviews} accent="gold" />
        <StatCard
          icon={FiDollarSign}
          label="Total Expenses"
          value={`₹${totals.totalExpenseAmount.toLocaleString()}`}
          sub={`${totals.expenses} logged`}
          accent="forest"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">
            New Signups — Last 14 Days
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2C463A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2C463A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="signups"
                  stroke="#2C463A"
                  strokeWidth={2}
                  fill="url(#signupGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">
            Trips by Status
          </h2>
          <div className="flex flex-col gap-3">
            {Object.entries(tripsByStatus).length === 0 && (
              <p className="text-sm text-muted">No trips yet.</p>
            )}
            {Object.entries(tripsByStatus).map(([status, count]) => {
              const percent = totals.trips
                ? Math.round((count / totals.trips) * 100)
                : 0;
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize text-ink font-medium">
                      {status}
                    </span>
                    <span className="text-muted">{count}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-forest rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">
            Most Booked Destinations
          </h2>
          {topDestinations.length === 0 ? (
            <p className="text-sm text-muted">No trips booked yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topDestinations.map((d, i) => (
                <Link
                  to={`/destination/${d._id}`}
                  key={d._id}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors"
                >
                  <span className="w-6 text-xs font-semibold text-muted shrink-0">
                    #{i + 1}
                  </span>
                  <img
                    src={d.image || "https://placehold.co/60x60"}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink truncate">
                      {d.name}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {d.city}, {d.country}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-forest shrink-0">
                    {d.tripCount} trips
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="text-sm font-semibold text-ink mb-4">
            Recent Signups
          </h2>
          {recent.users.length === 0 ? (
            <p className="text-sm text-muted">No users yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recent.users.map((u) => (
                <div key={u._id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-forest/10 text-forest flex items-center justify-center text-sm font-semibold shrink-0">
                    {u.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink truncate">
                      {u.name}
                    </p>
                    <p className="text-xs text-muted truncate">{u.email}</p>
                  </div>
                  <span className="text-xs text-muted shrink-0">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
