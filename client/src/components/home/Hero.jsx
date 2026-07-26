import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../common/SearchBar";
import useIsMobile from "../../hooks/useIsMobile";

import heroCappadociaDesktop from "../../assets/hero-cappadocia-desktop.jpg";
import heroCappadociaMobile from "../../assets/hero-cappadocia-mobile.jpg";
import moodMountains from "../../assets/mood-mountains.jpg";
import moodBeach from "../../assets/mood-beach.jpg";
import moodCulture from "../../assets/mood-culture.jpg";
import unsplash from "../../assets/drif-riadh-YpkuRn54y4w-unsplash.jpg";

const SLIDE_DURATION = 5000; // ms per image

function Hero() {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const heroImages = [
    isMobile ? heroCappadociaMobile : heroCappadociaDesktop,
    moodMountains,
    moodBeach,
    moodCulture,
    unsplash,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative -mt-24 min-h-screen flex items-center">
      <div className="absolute inset-0 rounded-b-[32px] sm:rounded-b-[40px] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={heroImages[activeIndex]}
            src={heroImages[activeIndex]}
            alt=""
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/50 md:bg-gradient-to-r md:from-white md:via-white/60 md:to-white/15" />
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-24 sm:py-32">
        <h1 className="font-display text-display text-ink max-w-2xl">
          Discover your next journey
        </h1>
        <p className="text-body-large text-muted mt-4 sm:mt-6 max-w-xl">
          AI-powered trip planning crafted to make every journey unforgettable —
          from hidden mountain trails to sun-drenched coastlines. Roam Meridian
          brings together smart itinerary suggestions, real-time weather, and
          curated stays so you spend less time planning and more time exploring.
        </p>

        <div className="mt-8 sm:mt-10">
          <SearchBar />
        </div>

        <div className="flex gap-2 mt-10 sm:mt-14">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show background ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-forest" : "w-1.5 bg-forest/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
