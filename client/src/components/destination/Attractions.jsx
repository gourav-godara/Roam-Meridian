import AttractionCard from "./AttractionCard";

function Attractions({ items }) {
  return (
    <div className="mt-8">
      <h3 className="text-base font-semibold text-ink mb-4">Top Attractions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <AttractionCard key={item.id} attraction={item} />
        ))}
      </div>
    </div>
  );
}

export default Attractions;
