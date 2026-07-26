const SettlementCard = ({ settlements = [], onSettle }) => {
  const totalReceive = settlements.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 h-fit sticky top-28">
      <h2 className="text-xl font-semibold text-ink font-display mb-5">
        Settlement Summary
      </h2>

      <div className="bg-forest/5 rounded-xl p-4 mb-5">
        <p className="text-gray-500 text-xs">Total to Receive</p>
        <h3 className="text-2xl font-semibold text-forest mt-1 font-display">
          ₹{totalReceive}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {settlements.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No settlements yet.
          </p>
        ) : (
          settlements.map((item, index) => (
            <div key={index} className="border border-border rounded-xl p-4">
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-sm font-medium mt-1">
                <span className="text-red-500">{item.from.name}</span>
                {" owes "}
                <span className="text-forest">{item.to.name}</span>
              </p>
              <p className="text-lg font-semibold text-ink mt-2 font-display">
                ₹{item.amount.toFixed(2)}
              </p>
              <button
                onClick={() => onSettle(item.expenseId)}
                className="mt-3 w-full bg-forest hover:bg-forest-dark text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Mark Settled
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SettlementCard;
