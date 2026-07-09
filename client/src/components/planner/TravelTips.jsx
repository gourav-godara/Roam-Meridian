const TIPS = [
  "Book accommodations at least 2 weeks in advance during peak season.",
  "Always carry a printed copy of your ID and bookings.",
  "Check local weather 3 days before departure to adjust packing.",
  "Keep emergency contacts saved offline, not just on your phone.",
];

function TravelTips() {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];

  return (
    <div className="bg-forest/5 border border-forest/15 rounded-3xl p-5">
      <h3 className="text-sm font-semibold text-forest mb-2">💡 Travel Tip</h3>
      <p className="text-xs text-ink leading-relaxed">{tip}</p>
    </div>
  );
}

export default TravelTips;
