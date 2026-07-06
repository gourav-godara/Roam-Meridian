import DestinationCard from "./DestinationCard";

function DestinationGrid({ destinations, onToggleFavorite }) {
  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24">
        <p className="text-lg font-semibold text-ink">No destinations found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}

export default DestinationGrid;
