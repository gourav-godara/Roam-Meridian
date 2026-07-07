import { FiStar } from "react-icons/fi";

function DestinationHeader({ location, name, description, rating, reviewCount, category }) {
  return (
    <div>
      <p className="text-base font-semibold text-forest tracking-wide">{location}</p>

      <div className="flex items-center justify-between gap-4 mt-2">
        <h1 className="font-display text-6xl lg:text-7xl text-ink leading-none">{name}</h1>
        <span className="flex items-center gap-2 text-lg shrink-0">
          <FiStar size={22} className="fill-gold text-gold" />
          <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
          <span className="text-gray-500 text-base">({reviewCount} reviews)</span>
        </span>
      </div>

      {category && (
        <span className="inline-block mt-4 w-fit px-3.5 py-1.5 rounded-full bg-forest/10 text-forest text-sm font-semibold">
          {category}
        </span>
      )}

      <p className="text-lg text-muted mt-5 max-w-xl leading-relaxed">{description}</p>
    </div>
  );
}

export default DestinationHeader;
