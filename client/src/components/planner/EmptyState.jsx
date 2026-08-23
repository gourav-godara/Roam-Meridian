import { FiCompass } from "react-icons/fi";
import image from "../../assets/AiPlanner-image.png";

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
    <div className="relative flex min-h-full flex-1 overflow-hidden">
      <img
        src={image}
        alt="Hot air balloons floating over a landscape"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />

      <div className="relative z-10 flex w-full flex-col justify-between px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
        <div className="max-w-xl">
          <div
            className="
              inline-flex items-center gap-2 rounded-full
              border border-forest/15 bg-white/75
              px-2.5 py-1 text-[10px]
              font-semibold text-forest
              backdrop-blur-sm
              sm:px-3 sm:py-1.5 sm:text-xs
            "
          >
            <FiCompass size={13} />
            YOUR AI TRAVEL COMPANION
          </div>

          <h2
            className="
              mt-3 font-display
              text-3xl leading-tight
              text-ink
              sm:mt-4 sm:text-5xl
              lg:text-5xl
            "
          >
            Make the journey
            <span className="block italic text-forest">
              yours.
            </span>
          </h2>

          <p
            className="
              mt-2 max-w-md
              text-s leading-relaxed
              text-muted
              sm:mt-3 sm:text-sm
            "
          >
            Tell Roam Meridian where your curiosity is taking you.
            We’ll shape your ideas into a thoughtful trip, built around
            your time, budget, and travel style.
          </p>

          <button
            type="button"
            onClick={() =>
              onPromptSelect("Help me plan an unforgettable trip")
            }
            className="
              mt-3 rounded-xl
              bg-forest
              px-4 py-2.5
              text-s font-semibold
              text-white
              shadow-md
              transition-all
              hover:bg-forest-hover
              hover:shadow-lg

              sm:mt-4
              sm:rounded-2xl
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            Start planning with AI
          </button>
        </div>


        {/* Reduced mobile gap here */}
        <div className="mt-2">

          <p
            className="
              mb-2
              text-[13px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-forest

              sm:mb-2
              sm:text-xs
            "
          >
            Choose your travel mood
          </p>


          <div
            className="
              grid
              grid-cols-3
              gap-2

              sm:max-w-3xl
              sm:gap-3
            "
          >
            {TRAVEL_MOODS.map((mood) => (
              <button
                key={mood.title}
                type="button"
                onClick={() => onPromptSelect(mood.prompt)}
                className="
                  group
                  rounded-xl
                  border
                  border-white/60
                  bg-white/80

                  p-2

                  text-left
                  shadow-sm
                  backdrop-blur-md

                  transition-all

                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-lg


                  sm:rounded-2xl
                  sm:p-4
                "
              >
                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-forest/10
                    text-forest

                    sm:h-9
                    sm:w-9
                    sm:rounded-xl
                  "
                >
                  <FiCompass size={14} />
                </div>


                <h3
                  className="
                    mt-2
                    text-[11px]
                    font-semibold
                    leading-tight
                    text-ink

                    sm:mt-5
                    sm:text-sm
                  "
                >
                  {mood.title}
                </h3>


                <p
                  className="
                    mt-1
                    hidden
                    text-xs
                    leading-relaxed
                    text-muted

                    sm:block
                  "
                >
                  {mood.description}
                </p>


                <span
                  className="
                    mt-2
                    inline-block
                    text-[10px]
                    font-semibold
                    text-forest

                    sm:mt-4
                    sm:text-xs
                  "
                >
                  Explore →
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
