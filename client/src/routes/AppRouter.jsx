import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Destination from "../pages/Destination/Destination";
import AIPlanner from "../pages/AIPlanner/AIPlanner";
import Dashboard from "../pages/Dashboard/Dashboard";
import Itineraries from "../pages/Itineraries/Itineraries";
import Blogs from "../pages/Blogs/Blogs";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import Expenses from "../pages/Expenses/Expenses";
import ReviewPage from "../pages/Reviews/ReviewPage";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<Destination />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/planner" element={<AIPlanner />} />

            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
