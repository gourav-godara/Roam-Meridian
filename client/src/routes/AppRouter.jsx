import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Destination from "../pages/Destination/Destination";
import AIPlanner from "../pages/AIPlanner/AIPlanner";
import Dashboard from "../pages/Dashboard/Dashboard";
import Itineraries from "../pages/Itineraries/Itineraries";
import TripDetail from "../pages/TripDetail/TripDetail";
import EditTrip from "../pages/EditTrip/EditTrip";
import CreateTrip from "../pages/CreateTrip/CreateTrip";
import Expenses from "../pages/Expenses/Expenses";
import ReviewPage from "../pages/Reviews/ReviewPage";
import Blogs from "../pages/Blogs/Blogs";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ScrollToTop from "../components/common/ScrollToTop";
import RouteLoader from "./RouteLoader";
import Wishlist from "../pages/Wishlist/Wishlist";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminUserDetail from "../pages/Admin/AdminUserDetail";
import AdminDestinations from "../pages/Admin/AdminDestinations";
import AdminDestinationForm from "../pages/Admin/AdminDestinationForm";
import AdminTrips from "../pages/Admin/AdminTrips";
import AdminReviews from "../pages/Admin/AdminReviews";
import AdminExpenses from "../pages/Admin/AdminExpenses";
import TravelBooking from "../pages/TravelBooking/TravelBooking";
import DashboardBookings from "../pages/Dashboard/DashboardBookings";
import ItineraryGuideList from "../pages/ItineraryGuide/ItineraryGuideList";
import ItineraryGuideDetail from "../pages/ItineraryGuide/ItineraryGuideDetail";
import AdminItineraries from "../pages/Admin/AdminItineraries";
import AdminItineraryForm from "../pages/Admin/AdminItineraryForm";
import LogBooking from "../pages/TravelBooking/LogBooking";
function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteLoader />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<Destination />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/travel-booking" element={<TravelBooking />} />
          <Route path="/travel-booking/log" element={<LogBooking />} />
          <Route path="/itinerary-guide" element={<ItineraryGuideList />} />
<Route path="/itinerary-guide/:id" element={<ItineraryGuideDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/bookings" element={<DashboardBookings />} />
            <Route path="/planner" element={<AIPlanner />} />

            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/trips/:id" element={<TripDetail />} />
            <Route path="/trips/:id/edit" element={<EditTrip />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
            <Route path="/admin/destinations" element={<AdminDestinations />} />
            <Route path="/admin/destinations/new" element={<AdminDestinationForm />} />
            <Route path="/admin/destinations/:id/edit" element={<AdminDestinationForm />} />
            <Route path="/admin/trips" element={<AdminTrips />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/expenses" element={<AdminExpenses />} />
            <Route path="/admin/itineraries" element={<AdminItineraries />} />
<Route path="/admin/itineraries/new" element={<AdminItineraryForm />} />
<Route path="/admin/itineraries/:id/edit" element={<AdminItineraryForm />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;