import SearchBar from "../common/SearchBar";
import heroImage from "../../assets/map-background.jpg";

function Hero() {
  return (
    <section className="relative -mt-24 min-h-screen flex items-center">
      {/* Background layer — image + gradients + rounded corners live here ONLY.
          This div owns the overflow-hidden clip, so it never affects the content below. */}
      <div className="absolute inset-0 rounded-b-[32px] sm:rounded-b-[40px] overflow-hidden">
        <img src={heroImage} alt="World map" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/50 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-white/20" />
      </div>

      {/* Content layer — no overflow-hidden anywhere in this tree, so the date/guest
          popovers can render freely below the search bar without being cut off. */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-24 sm:py-32">
        <h1 className="font-display text-display text-ink max-w-2xl">
          Discover your next journey
        </h1>
        <p className="text-body-large text-muted mt-4 sm:mt-6 max-w-xl">
          AI-powered trip planning crafted to make every journey unforgettable — from
          hidden mountain trails to sun-drenched coastlines. Roam Meridian brings together
          smart itinerary suggestions, real-time weather, and curated stays so you spend
          less time planning and more time exploring.
        </p>

        <div className="mt-8 sm:mt-10">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
