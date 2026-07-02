import useDashboard from "../../hooks/useDashboard";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import UpcomingTrips from "../../components/dashboard/UpcomingTrips";
import RecentReviews from "../../components/dashboard/RecentReviews";
import ExpenseSummary from "../../components/dashboard/ExpenseSummary";
import TravelHistory from "../../components/dashboard/TravelHistory";
import QuickActions from "../../components/dashboard/QuickActions";

const Dashboard = () => {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-8 space-y-8">

          <StatsGrid stats={dashboard?.stats} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            <UpcomingTrips trips={dashboard?.upcomingTrips} />

            <RecentReviews reviews={dashboard?.recentReviews} />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            <ExpenseSummary
              summary={dashboard?.expenseSummary}
            />

            <TravelHistory
              history={dashboard?.travelHistory}
            />

          </div>

          <QuickActions />

        </main>

      </div>

    </div>
  );
};

export default Dashboard;