import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
