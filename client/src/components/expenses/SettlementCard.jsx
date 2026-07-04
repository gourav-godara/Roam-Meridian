const SettlementCard = ({
  settlements = [
    {
      from: "Rahul",
      to: "Jinal",
      amount: 1500,
    },
    {
      from: "Gourav",
      to: "Jinal",
      amount: 700,
    },
  ],
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

        {settlements.map((item, index) => (

          <div
            key={index}
            className="border rounded-xl p-4"
          >

            <p className="font-medium">
              <span className="text-red-500">
                {item.from}
              </span>

              {" owes "}

              <span className="text-green-600">
                {item.to}
              </span>
            </p>

            <p className="text-xl font-bold mt-2">
              ₹{item.amount}
            </p>

          </div>

        ))}

      </div>

      {/* Button */}

      <button
        className="
          mt-6
          w-full
          bg-teal-600
          hover:bg-teal-700
          text-white
          py-3
          rounded-xl
          font-semibold
          transition
        "
      >
        Settle Up
      </button>

    </div>
  );
};

export default SettlementCard;