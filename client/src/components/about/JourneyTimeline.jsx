import { FiSun, FiSearch, FiEdit3, FiSend, FiHeart } from "react-icons/fi";

const STEPS = [
  { icon: FiSun, title: "Dream", description: "The spark of an idea — a place you can't stop thinking about." },
  { icon: FiSearch, title: "Discover", description: "Explore real destinations, honestly shown, worth your curiosity." },
  { icon: FiEdit3, title: "Plan", description: "Shape an itinerary that fits your time, budget, and pace." },
  { icon: FiSend, title: "Travel", description: "Go, with a plan that flexes instead of a schedule that rules you." },
  { icon: FiHeart, title: "Remember", description: "Come home with a story worth telling, not just a checklist." },
];

function JourneyTimeline() {
  return (
    <section className="bg-mist/40 pt-10 pb-10 sm:pt-12 sm:pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-16">
          <p className="text-forest font-semibold text-sm tracking-wide uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
            From a spark of an idea to a story worth telling.
          </h2>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-start relative">
          <div className="absolute top-7 left-0 right-0 h-px bg-forest/20" />
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex-1 flex flex-col items-center text-center px-4 relative">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-forest flex items-center justify-center relative z-10 mb-5">
                <Icon size={22} className="text-forest" />
              </div>
              <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed max-w-[200px]">{description}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex flex-col lg:hidden relative pl-8">
          <div className="absolute top-2 bottom-2 left-[27px] w-px bg-forest/20" />
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className={`relative flex gap-5 ${i !== STEPS.length - 1 ? "pb-10" : ""}`}>
              <div className="w-14 h-14 rounded-full bg-white border-2 border-forest flex items-center justify-center shrink-0 relative z-10 -ml-[27px]">
                <Icon size={20} className="text-forest" />
              </div>
              <div className="pt-2">
                <h3 className="font-display text-lg text-ink mb-1.5">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JourneyTimeline;
