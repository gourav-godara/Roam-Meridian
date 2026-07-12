import { useState } from "react";
import { motion } from "framer-motion";
import { FiBell } from "react-icons/fi";
import { PiSidebarSimpleBold } from "react-icons/pi";
import useDashboard from "../../hooks/useDashboard";
import Sidebar from "../../components/dashboard/Sidebar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import UpcomingTripCard from "../../components/dashboard/UpcomingTripCard";
import ContinuePlanning from "../../components/dashboard/ContinuePlanning";
import RecentBookings from "../../components/dashboard/RecentBookings";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import TravelMap from "../../components/dashboard/TravelMap";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    user,
    stats,
    upcomingTrip,
    continuePlanning,
    recentBookings,
    recommendations,
    mapPins,
    activityTimeline,
    travelTip,
    loading
  } = useDashboard();
  if (loading) {
  return <div>Loading...</div>;
}
  const firstName = user?.name?.split(" ")[0] || "Traveler";

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      <Sidebar
        user={user}
        tip={travelTip}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 flex flex-col gap-6 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-border bg-surface flex items-center justify-center shrink-0 hover:bg-mist transition-colors"
              aria-label="Open sidebar"
            >
              <PiSidebarSimpleBold size={19} className="text-ink" />
            </button>
            <div>
              <h1 className="font-display text-lg sm:text-h3 text-ink">
                Good Morning, {firstName} 👋
              </h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Ready for your next adventure?
              </p>
            </div>
          </div>
          <button
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0"
          >
            <FiBell size={17} className="text-ink" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error text-white text-[10px] flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatsGrid stats={stats} />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          <div className="flex flex-col gap-6 min-w-0">
            <UpcomingTripCard trip={upcomingTrip} />
            <ContinuePlanning items={continuePlanning} />
            <RecentBookings bookings={recentBookings} />
          </div>

          <aside className="flex flex-col gap-6 min-w-0">
            <div className="bg-surface rounded-3xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-ink">
                  Recommended For You
                </h3>
                <button className="text-sm font-medium text-forest-light hover:text-forest">
                  View All
                </button>
              </div>
              <div className="flex flex-col gap-4">
               {recommendations.length === 0 ? (
  <p className="text-center text-muted py-8">
    No recommendations available.
  </p>
) : (
  recommendations.map((item) => (
    <RecommendationCard key={item.id} item={item} />
  ))
)}
              </div>
            </div>

            <TravelMap pins={mapPins} />
            <ActivityTimeline items={activityTimeline} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
