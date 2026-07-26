import { FiMapPin, FiCpu, FiTrendingUp, FiLayers } from "react-icons/fi";

const REASONS = [
  {
    icon: FiMapPin,
    title: "Hidden destinations",
    description: "Beyond the obvious — places worth discovering, not just visiting.",
  },
  {
    icon: FiCpu,
    title: "Personalized AI planning",
    description: "An itinerary shaped around how you actually want to travel.",
  },
  {
    icon: FiTrendingUp,
    title: "Budget-friendly itineraries",
    description: "Real plans that respect what you're actually willing to spend.",
  },
  {
    icon: FiLayers,
    title: "Everything in one place",
    description: "Discovery, planning, and booking — no more jumping between tabs.",
  },
];

function WhyChooseUs() {
  return (
    <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-10 sm:pt-18 sm:pb-12">
      <div className="max-w-xl mb-14">
        <p className="text-forest font-semibold text-sm tracking-wide uppercase mb-4">
          Why Travelers Choose Us
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
          Not features. Reasons people actually come back.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REASONS.map(({ icon: Icon, title, description }, i) => (
          <div
            key={title}
            className="group relative rounded-3xl p-7 border border-border bg-white hover:border-forest/30 hover:shadow-lg transition-all duration-300"
          >
            <span className="absolute top-6 right-7 font-display text-4xl text-forest/10 group-hover:text-forest/20 transition-colors">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center mb-5">
              <Icon size={20} />
            </div>
            <h3 className="text-base font-semibold text-ink mb-2">{title}</h3>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
