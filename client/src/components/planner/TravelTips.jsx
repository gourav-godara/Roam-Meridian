import { FiShield, FiCamera } from "react-icons/fi";
import { GiBackpack } from "react-icons/gi";
import { TbLeaf } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";

const TIPS = [
  {
    icon: FiShield,
    title: "Stay Safe",
    description:
      "Keep digital and printed copies of your ID and important documents.",
  },
  {
    icon: GiBackpack,
    title: "Pack Smart",
    description: "Carry light, pack essentials, and leave room for souvenirs!",
  },
  {
    icon: FiCamera,
    title: "Capture Memories",
    description: "Take photos, but don't forget to live in the moment.",
  },
  {
    icon: TbLeaf,
    title: "Respect Local Culture",
    description: "Be kind, learn a few local phrases, and respect traditions.",
  },
  {
    icon: BsWallet2,
    title: "Budget Wisely",
    description: "Track expenses, try local food, and enjoy more worry-free.",
  },
];

function TravelTips() {
  return (
    <div className="bg-white border border-border rounded-3xl p-5">
      <div className="flex items-center gap-2">
        <span className="text-base">💡</span>
        <h3 className="text-base font-semibold text-ink">Travel Tips</h3>
      </div>

      <p className="text-xs text-muted mt-1 mb-4">
        Handy tips to make your journeys smoother
      </p>

      <div className="space-y-3">
        {TIPS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-2xl bg-bg px-4 py-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest">
              <Icon size={16} />
            </span>

            <div>
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="text-xs text-muted leading-relaxed mt-0.5">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs font-semibold text-forest mt-4">
        More tips coming your way ✨
      </p>
    </div>
  );
}

export default TravelTips;
