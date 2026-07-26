import { Link } from "react-router-dom";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import Button from "../common/Button";

function AboutCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
      <div className="relative overflow-hidden rounded-[40px] border border-[#183A2D]/10 bg-[#FAFAF8]">

        {/* ---------- Background Glow ---------- */}

        <div className="absolute inset-0">

          {/* soft green corners */}

          <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-[#2E5E49]/40 blur-3xl" />

          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-[#2E5E49]/40 blur-3xl" />

          {/* center light */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),transparent_75%)]" />

        </div>

        {/* ---------- Decorative Lines ---------- */}

        {/* top-left topo */}

        <svg
          className="absolute top-0 left-0 w-80 opacity-[0.06]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path
            d="M30 20C120 70 60 160 180 180C290 200 220 300 370 350"
            stroke="#183A2D"
            strokeWidth="1.5"
          />
          <path
            d="M10 60C100 100 70 190 190 210C300 230 250 320 380 390"
            stroke="#183A2D"
            strokeWidth="1.5"
          />
          <path
            d="M70 10C180 60 120 170 230 180C340 190 290 310 390 330"
            stroke="#183A2D"
            strokeWidth="1.5"
          />
        </svg>

        {/* bottom-right topo */}

        <svg
          className="absolute bottom-0 right-0 w-80 opacity-[0.06]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <path
            d="M20 350C120 300 80 220 180 200C290 180 270 90 390 40"
            stroke="#183A2D"
            strokeWidth="1.5"
          />
          <path
            d="M10 390C130 330 90 240 190 220C300 200 280 110 390 70"
            stroke="#183A2D"
            strokeWidth="1.5"
          />
          <path
            d="M80 360C180 310 130 240 230 220C330 200 310 120 390 100"
            stroke="#183A2D"
            strokeWidth="1.5"
          />
        </svg>

        {/* ---------- Compass ---------- */}

        <svg
          viewBox="0 0 500 500"
          className="absolute right-10 top-12 w-56 opacity-[0.08]"
        >
          <circle
            cx="250"
            cy="250"
            r="170"
            stroke="#183A2D"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="250"
            cy="250"
            r="120"
            stroke="#183A2D"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M250 60 L270 230 L440 250 L270 270 L250 440 L230 270 L60 250 L230 230 Z"
            fill="#183A2D"
          />
        </svg>

        {/* ---------- Flight Path ---------- */}

        <svg
          className="absolute left-0 bottom-0 w-80 opacity-25"
          viewBox="0 0 400 160"
          fill="none"
        >
          <path
            d="M0 120 C60 80 110 150 180 110 C250 70 300 150 390 120"
            stroke="#183A2D"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>

        <FiMapPin
          className="absolute left-12 bottom-16 text-[#183A2D]/60"
          size={28}
        />

        {/* ---------- Content ---------- */}

        <div className="relative z-10 flex flex-col items-center text-center px-10 py-24">

          <span className="rounded-full border border-[#D9B56D]/40 bg-[#D9B56D]/10 px-7 py-2 text-xs tracking-[0.32em] uppercase font-medium text-[#B98D33]">
            Start Your Journey
          </span>

          <h2 className="mt-8 max-w-4xl font-display text-5xl md:text-6xl leading-tight text-[#183A2D]">
            Your next story starts here.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-9 text-[#5F6B67]">
            Every destination has memories waiting to be created.
            Discover inspiring places, build personalized itineraries,
            and travel with confidence using Roam Meridian.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6">

            <Link to="/explore">
              <Button className="!rounded-full !bg-[#183A2D] hover:!bg-[#214A39] !text-white !px-10 !py-4 transition-all duration-300 hover:scale-[1.03]">
                Explore Destinations
              </Button>
            </Link>

            <Link
              to="/planner"
              className="group inline-flex items-center gap-2 text-[#183A2D] font-medium hover:text-[#2E5E49] transition-colors"
            >
              Continue with AI Planner

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutCTA;
