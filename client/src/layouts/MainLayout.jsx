import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PageBackdrop from "../components/common/PageBackdrop";

// Home has its own hero imagery, so it opts out of the ambient backdrop
// entirely rather than layering texture under texture.
const NO_BACKDROP = ["/"];

// Auth/account flows — least competing content on the page.
const AUTH_PREFIXES = [
  "/login",
  "/signup",
  "/verify-otp",
  "/create-account",
  "/forgot-password",
];

// Discovery/marketing pages — browsing and inspiration.
const DISCOVERY_PREFIXES = [
  "/explore",
  "/destination",
  "/blogs",
  "/about",
  "/contact",
  "/itinerary-guide",
];

// Everything else inside MainLayout (dashboard, trips, expenses, reviews,
// profile, planner, wishlist, bookings) gets the "app" variant, since
// those pages carry real functional UI.
function getVariant(pathname) {
  if (NO_BACKDROP.includes(pathname)) return null;
  if (AUTH_PREFIXES.some((p) => pathname.startsWith(p))) return "auth";
  if (DISCOVERY_PREFIXES.some((p) => pathname.startsWith(p))) return "discovery";
  return "app";
}

function MainLayout() {
  const { pathname } = useLocation();
  const variant = getVariant(pathname);

  return (
    <>
      {variant && <PageBackdrop variant={variant} />}
      <Navbar />
      <main className="bg-transparent min-h-screen pt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
