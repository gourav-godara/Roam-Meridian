function TripSummary({ plan }) {
  if (!plan) {
    return (
      <div className="bg-white border border-border rounded-3xl p-5">
        <h3 className="text-sm font-semibold text-ink mb-2">Current Trip</h3>
        <p className="text-xs text-gray-500">Start a conversation to see your trip summary here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-3xl p-5">
      <h3 className="text-sm font-semibold text-ink mb-3">Current Trip</h3>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Destination</span>
          <span className="font-medium text-ink">{plan.destination}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium text-ink">{plan.days} days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Budget</span>
          <span className="font-medium text-ink">₹{plan.budget?.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Travelers</span>
          <span className="font-medium text-ink">{plan.travelers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Style</span>
          <span className="font-medium text-ink">{plan.travelStyle}</span>
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
