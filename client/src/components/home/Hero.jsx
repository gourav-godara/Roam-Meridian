import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiNavigation } from "react-icons/fi";
import useIsMobile from "../../hooks/useIsMobile";
import cappadociaDesktop from "../../assets/destinations/cappadocia-desktop.jpg";
import cappadociaMobile from "../../assets/destinations/cappadocia-mobile.jpg";
import dolomites from "../../assets/destinations/dolomites.jpg";
import maldives from "../../assets/destinations/maldives.jpg";
import kyoto from "../../assets/destinations/kyoto.jpg";
import marrakech from "../../assets/destinations/marrakech.jpg";

const SLIDE_DURATION = 6000;

const DESTINATIONS = [
  {
    image: {
      mobile: cappadociaMobile,
      desktop: cappadociaDesktop,
    },
    place: "Cappadocia",
    country: "Türkiye",
    lat: "38.6431° N",
    lng: "34.8289° E",
    timeZone: "Europe/Istanbul",
  },

  {
    image: {
      mobile: dolomites,
      desktop: dolomites,
    },
    place: "Dolomites",
    country: "Italy",
    lat: "46.4102° N",
    lng: "11.8440° E",
    timeZone: "Europe/Rome",
  },

  {
    image: {
      mobile: maldives,
      desktop: maldives,
    },
    place: "Maldives",
    country: "Maldives",
    lat: "3.2028° N",
    lng: "73.2207° E",
    timeZone: "Indian/Maldives",
  },

  {
    image: {
      mobile: kyoto,
      desktop: kyoto,
    },
    place: "Kyoto",
    country: "Japan",
    lat: "35.0116° N",
    lng: "135.7681° E",
    timeZone: "Asia/Tokyo",
  },

  {
    image: {
      mobile: marrakech,
      desktop: marrakech,
    },
    place: "Marrakech",
    country: "Morocco",
    lat: "31.6295° N",
    lng: "7.9811° W",
    timeZone: "Africa/Casablanca",
  },
];

function useLocalTime(timeZone) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        setTime(
          new Date().toLocaleTimeString("en-GB", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
      } catch {
        setTime("");
      }
    };

    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
}

function Hero() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % DESTINATIONS.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const active = DESTINATIONS[activeIndex];
  const activeImage = isMobile ? active.image.mobile : active.image.desktop;
  const localTime = useLocalTime(active.timeZone);

  const crossfadeDuration = prefersReducedMotion ? 0.2 : 1.4;

  return (
    <section className="relative -mt-24 min-h-[105vh] flex items-center">
      <div className="absolute inset-0 rounded-b-[32px] sm:rounded-b-[40px] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`${active.place}, ${active.country}`}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
            animate={{
              opacity: 1,
              scale: prefersReducedMotion ? 1 : 1.09,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: crossfadeDuration, ease: "easeInOut" },
              scale: {
                duration: prefersReducedMotion ? 0 : SLIDE_DURATION / 1000 + 1,
                ease: "linear",
              },
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/20 to-white/4 md:bg-gradient-to-r md:from-white/90 md:via-white/55 md:to-white/10" />
      </div>

      <div className="absolute right-6 top-28 z-20 hidden flex-col items-end gap-1 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 font-mono text-[11px] tracking-[0.08em] text-ink backdrop-blur-md sm:flex">
        <div className="flex items-center gap-1.5 text-[#B8860B]">
          <FiNavigation size={12} className="shrink-0" />
          <span className="font-semibold">BEARING LOCKED</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.place}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            className="flex flex-col items-end gap-0.5"
          >
            <span className="text-sm font-semibold uppercase text-ink">
              {active.place}, {active.country}
            </span>
            <span className="text-muted">
              {active.lat} &nbsp;/&nbsp; {active.lng}
            </span>
            {localTime && <span className="text-muted">LOCAL {localTime}</span>}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-24 sm:py-32">
        <h1 className="font-display text-display text-ink max-w-2xl">
          Discover your next
          <span className="block italic text-forest">journey.</span>
        </h1>

        <div className="mt-4 max-w-xl rounded-2xl bg-white/30 p-4 backdrop-blur-sm sm:mt-6 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <p className="text-body-large text-ink/80">
            AI-powered trip planning crafted to make every journey unforgettable
            — from hidden mountain trails to sun-drenched coastlines. Roam
            Meridian charts smart itineraries, real-time weather, and curated
            stays, so you spend less time planning and more time exploring.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3 sm:mt-14"
          role="tablist"
          aria-label="Featured destinations"
        >
          {DESTINATIONS.map((destination, i) => (
            <button
              key={destination.place}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className=" group relative  px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-all duration-300 max-sm:bg-white/50 max-sm:border max-sm:border-ink/10 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              <span className={i === activeIndex ? "text-ink" : ""}>
                {destination.place}
              </span>

              {i === activeIndex && (
                <motion.span
                  key={activeIndex}
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#B8860B]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : SLIDE_DURATION / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
