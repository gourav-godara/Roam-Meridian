import { FiCompass, FiFeather, FiCpu, FiGlobe } from "react-icons/fi";

const PHILOSOPHY = [
  {
    icon: FiCompass,
    title: "Explore Curiously",
    description:
      "The best trips rarely follow the obvious path. We surface the places worth wondering about, not just the ones everyone already knows.",
  },
  {
    icon: FiFeather,
    title: "Travel Authentically",
    description:
      "A destination is more than a checklist of landmarks. We show you what a place actually feels like, so your trip feels like yours.",
  },
  {
    icon: FiCpu,
    title: "Plan Intelligently",
    description:
      "Great planning should adapt to you — your time, your budget, your pace — not force you into someone else's template.",
  },
  {
    icon: FiGlobe,
    title: "Travel Responsibly",
    description:
      "Where you go and how you go matters. We aim to make thoughtful travel the easy choice, not the extra effort.",
  },
];

function OurPhilosophy() {
  return (
   <section className="bg-mist/40 pt-10 pb-10 sm:pt-12 sm:pb-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="max-w-xl mb-14">
          <p className="text-forest font-semibold text-sm tracking-wide uppercase mb-4">
            Our Philosophy
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
            What guides everything we build.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHILOSOPHY.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-3xl p-7 border border-forest/10 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center mb-5">
                <Icon size={22} className="text-forest" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2 font-display">
                {title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurPhilosophy;
