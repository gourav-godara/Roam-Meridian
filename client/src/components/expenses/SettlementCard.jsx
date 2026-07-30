const SettlementCard = ({ settlements = [], onSettle, currentUserId }) => {
  // Previously this summed EVERY settlement shown (both what's owed to you
  // and what you owe others) under a single "Total to Receive" figure,
  // which inflated the number. Split them out properly.
  const owedToYou = settlements.filter(
    (item) => item.to._id === currentUserId
  );
  const youOwe = settlements.filter((item) => item.from._id === currentUserId);

  const totalReceive = owedToYou.reduce((sum, item) => sum + item.amount, 0);
  const totalOwed = youOwe.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 h-fit sticky top-28">
      <h2 className="text-xl font-semibold text-ink font-display mb-5">
        Settlement Summary
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-forest/5 rounded-xl p-4">
          <p className="text-gray-500 text-xs">To Receive</p>
          <h3 className="text-xl font-semibold text-forest mt-1 font-display">
            ₹{totalReceive.toFixed(2)}
          </h3>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-gray-500 text-xs">You Owe</p>
          <h3 className="text-xl font-semibold text-red-600 mt-1 font-display">
            ₹{totalOwed.toFixed(2)}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {settlements.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No settlements yet.
          </p>
        ) : (
          settlements.map((item, index) => {
            // The backend only allows the payer ("to") to mark a
            // settlement resolved — showing this button on debts YOU owe
            // (where someone else is the payer) previously led to a
            // confusing 403 when clicked.
            const canSettle = item.to._id === currentUserId;

            return (
              <div
                key={`${item.expenseId}-${index}`}
                className="border border-border rounded-xl p-4"
              >
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className="text-sm font-medium mt-1">
                  <span className="text-red-500">{item.from.name}</span>
                  {" owes "}
                  <span className="text-forest">{item.to.name}</span>
                </p>
                <p className="text-lg font-semibold text-ink mt-2 font-display">
                  ₹{item.amount.toFixed(2)}
                </p>

                {canSettle ? (
                  <button
                    onClick={() => onSettle(item.expenseId)}
                    className="mt-3 w-full bg-forest hover:bg-forest-dark text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Mark Settled
                  </button>
                ) : (
                  <p className="mt-3 text-xs text-gray-400 text-center">
                    Waiting for {item.to.name} to mark this settled.
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SettlementCard;
