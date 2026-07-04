import "../../styles/dashboard.css";
import { motion } from "framer-motion";
import useDashboard from "../../hooks/useDashboard";
import HeroBanner from "../../components/dashboard/HeroBanner";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import StatsGrid from "../../components/dashboard/StatsGrid";
import UpcomingTrips from "../../components/dashboard/UpcomingTrips";
import RecentReviews from "../../components/dashboard/RecentReviews";
import ExpenseSummary from "../../components/dashboard/ExpenseSummary";
import TravelHistory from "../../components/dashboard/TravelHistory";
import QuickActions from "../../components/dashboard/QuickActions";
import TravelBackground from "../../components/dashboard/TravelBackground";
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
    

<div className="dashboard-bg">

<div className="flex">
<TravelBackground />
<div className="z-20 p-6">
  <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-[140px]" />

<div className="absolute bottom-20 right-20 h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-[170px]" />

<div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] rounded-full bg-teal-300/10 blur-[140px]" />

<Sidebar/>

</div>

<div className="flex-1 relative z-10 p-6">

<Navbar />
<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

transition={{

duration:.7

}}

>

...everything...

<main className="space-y-8 mt-6">

{/* Hero Banner goes here */}

{/* Stats */}

<div className="relative">

    <HeroBanner />
<div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[160px]" />

<div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[180px]" />

<div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[140px]" />
<div className="mt-8">
    <StatsGrid stats={dashboard?.stats} />
</div>
</div>

<div className="grid xl:grid-cols-2 gap-8">

<UpcomingTrips
trips={dashboard?.upcomingTrips}
/>

<RecentReviews
reviews={dashboard?.recentReviews}
/>

</div>

<div className="grid xl:grid-cols-2 gap-8">

<ExpenseSummary
expenseSummary={dashboard?.expenseSummary}
/>

<TravelHistory
history={dashboard?.travelHistory}
/>

</div>

<QuickActions/>

</main>
</motion.div>
</div>

</div>

</div>

)
};

export default Dashboard;