import { motion } from "framer-motion";
import {
  FaSearch,
  FaRobot,
  FaArrowRight,
  FaMapMarkedAlt,
} from "react-icons/fa";

import hero from "../../assets/dashboard/hero.png";

const HeroBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-[36px] h-[500px] shadow-2xl"
    >
      {/* Background */}
      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041B36]/90 via-[#0A2D55]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-between px-12">

        {/* Left */}
        <div className="max-w-2xl">

          <p className="text-teal-300 font-medium mb-2">
            Welcome Back 👋
          </p>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Discover your
            <br />
            next unforgettable
            <br />
            journey.
          </h1>

          <p className="text-slate-200 mt-5 text-lg">
            Explore destinations, organize itineraries,
            split expenses and create unforgettable memories.
          </p>

          {/* Search */}

          <div className="mt-8 flex items-center bg-white rounded-2xl overflow-hidden shadow-xl w-[520px]">

            <div className="px-5 text-slate-400">
              <FaSearch />
            </div>

            <input
              placeholder="Search destinations..."
              className="flex-1 py-4 outline-none text-slate-700"
            />

            <button className="bg-teal-500 hover:bg-teal-600 px-8 py-4 text-white transition">
              Search
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <button className="flex items-center gap-3 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 px-8 py-4 text-white hover:bg-white/25 transition">

            <FaRobot />

            Plan with AI

          </button>

          <button className="flex items-center gap-3 rounded-2xl bg-teal-500 px-8 py-4 text-white hover:bg-teal-600 transition">

            <FaMapMarkedAlt />

            Explore Destinations

            <FaArrowRight />

          </button>

        </div>

      </div>
    </motion.section>
  );
};

export default HeroBanner;