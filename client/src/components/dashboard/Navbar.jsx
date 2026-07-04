import { motion } from "framer-motion";
import {
  FaBell,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else if (hour >= 20) greeting = "Good Night";

  const quotes = [
    "Collect moments, not things.",
    "Adventure is worthwhile.",
    "Travel far. Travel often.",
    "The world is waiting for you.",
  ];

  const quote =
    quotes[new Date().getDate() % quotes.length];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
      sticky
      top-0
      z-50
      px-8
      pt-6
      "
    >
      <div
        className="
        rounded-3xl
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/10
        shadow-2xl
        px-8
        py-5
        "
      >
        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-white">
              {greeting}, Jinal 👋
            </h2>

            <p className="text-slate-300 mt-2">
              {quote}
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button className="relative h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center">

              <FaBell className="text-white text-lg" />

              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cyan-400 text-xs flex items-center justify-center text-black font-bold">
                3
              </span>

            </button>

            <button className="h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center">

              <FaCog className="text-white text-lg" />

            </button>

            <button className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-2 hover:bg-white/20 transition">

              <FaUserCircle className="text-4xl text-cyan-300" />

              <div className="text-left">

                <p className="text-white font-semibold">
                  Jinal
                </p>

                <p className="text-slate-300 text-sm">
                  Explorer
                </p>

              </div>

            </button>

          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;