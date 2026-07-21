const SettlementCard = ({
  settlements = [],
  onSettle,
}) => {
  const totalReceive = settlements.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 h-fit sticky top-6">
      
      <h2 className="text-2xl font-bold mb-6">
        Settlement Summary
      </h2>

      {/* Total */}
      <div className="bg-green-50 rounded-xl p-4 mb-6">

        <p className="text-gray-500">
          Total to Receive
        </p>

        <h3 className="text-3xl font-bold text-green-600 mt-2">
          ₹{totalReceive}
        </h3>

      </div>

      {/* Settlement List */}

      <div className="space-y-4">

        {settlements.length === 0 ? (
  <p className="text-center text-gray-500">
    No settlements yet.
  </p>
) : (
  settlements.map((item, index) => (

          <div
            key={index}
            className="border rounded-xl p-4"
          >
            <p className="text-sm text-gray-500">
    {item.title}
</p>
            <p className="font-medium">
              <span className="text-red-500">
                
                {item.from.name}
              </span>

              {" owes "}

              <span className="text-green-600">
                {item.to.name}
              </span>
            </p>

            <p className="text-xl font-bold mt-2">
  ₹{item.amount.toFixed(2)}
</p>

<button
  onClick={() => onSettle(item.expenseId)}
  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
>
  Mark Settled
</button>

          </div>

        ))
      )}
        

      </div>

      {/* Button */}

      
    </div>
  );
};

export default SettlementCard;