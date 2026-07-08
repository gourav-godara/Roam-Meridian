function TravelTipCard({ tip }) {
  return (
    <div className="bg-forest-light/10 rounded-2xl p-4 mt-auto">
      <p className="text-xs font-semibold text-forest-light mb-1">🌿 Travel Tip</p>
      <p className="text-xs text-ink leading-relaxed">{tip.text}</p>
    </div>
  );
}

export default TravelTipCard;
