import { FiCompass } from "react-icons/fi";
import kmmerer from "../../assets/Gemini_Generated_Image_cyjzm0cyjzm0cyjz.png";

const TRAVEL_MOODS = [
  {
    title: "Chase the horizon",
    description: "Slow escapes, hidden valleys, and open roads.",
    prompt: "Plan a peaceful scenic trip with beautiful views",
  },
  {
    title: "Taste a new city",
    description: "Local food, culture, cafés, and stories.",
    prompt: "Plan a food and culture trip to an exciting city",
  },
  {
    title: "Find your adventure",
    description: "Trails, thrills, and unforgettable firsts.",
    prompt: "Plan an adventurous mountain trip",
  },
];

function EmptyState({ onPromptSelect = () => {} }) {
  return (
    <div className="relative flex min-h-[560px] flex-1 overflow-hidden">
      <img
        src={kmmerer}
        alt="Hot air balloons floating over a landscape"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />

      <div className="relative z-10 flex w-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/75 px-3 py-1.5 text-xs font-semibold text-forest backdrop-blur-sm">
            <FiCompass size={14} />
            YOUR AI TRAVEL COMPANION
          </div>

          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Make the journey
            <span className="block italic text-forest">yours.</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Tell Roam Meridian where your curiosity is taking you. We’ll shape
            your ideas into a thoughtful trip, built around your time, budget,
            and travel style.
          </p>

          <button
            type="button"
            onClick={() => onPromptSelect("Help me plan an unforgettable trip")}
            className="mt-6 rounded-2xl bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-forest-hover hover:shadow-lg"
          >
            Start planning with AI
          </button>
        </div>

        <div className="mt-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
            Choose your travel mood
          </p>

          <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
            {TRAVEL_MOODS.map((mood) => (
              <button
                key={mood.title}
                type="button"
                onClick={() => onPromptSelect(mood.prompt)}
                className="group rounded-2xl border border-white/60 bg-white/80 p-4 text-left shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <FiCompass size={17} />
                </div>

                <h3 className="mt-5 text-sm font-semibold text-ink">
                  {mood.title}
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {mood.description}
                </p>

                <span className="mt-4 inline-block text-xs font-semibold text-forest">
                  Explore this mood →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
