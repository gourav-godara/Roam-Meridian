import { useState } from "react";
import { motion } from "framer-motion";
import { PiSidebarSimpleBold } from "react-icons/pi";
import { FiAlertTriangle } from "react-icons/fi";
import useDashboard from "../../hooks/useDashboard";
import Sidebar from "../../components/dashboard/Sidebar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import UpcomingTripCard from "../../components/dashboard/UpcomingTripCard";
import ContinuePlanning from "../../components/dashboard/ContinuePlanning";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import ExpenseCard from "../../components/dashboard/ExpenseCard";
import NotificationBell from "../../components/dashboard/NotificationBell";
import TravelHistory from "../../components/dashboard/TravelHistory";
import RecentReviews from "../../components/dashboard/RecentReviews";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    user,
    stats,
    upcomingTrip,
    continuePlanning,
    travelHistory,
    recentReviews,
    recommendations,
    activityTimeline,
    travelTip,
    loading,
    error,
    refreshDashboard,
    expenseSummary,
  } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-forest">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  // Previously a failed request silently left the page blank with no
  // feedback or way to recover — now it shows a clear message + retry.
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <FiAlertTriangle className="mx-auto text-red-500 mb-3" size={32} />
          <p className="text-ink font-medium mb-1">
            We couldn't load your dashboard
          </p>
          <p className="text-sm text-muted mb-5">{error}</p>
          <button
            onClick={refreshDashboard}
            className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "Traveler";
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

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
                {greeting}, {firstName} 👋
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
            <NotificationBell />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          <StatsGrid stats={stats} />
          <ExpenseCard summary={expenseSummary} />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          <div className="flex flex-col gap-6 min-w-0">
            <UpcomingTripCard trip={upcomingTrip} />
            <ContinuePlanning items={continuePlanning} />
            <TravelHistory trips={travelHistory} />
            <RecentReviews reviews={recentReviews} />
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

            <ActivityTimeline items={activityTimeline} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
