import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="bg-surface rounded-2xl border border-border shadow-sm h-fit sticky top-28 overflow-hidden"
    >
      <div className="bg-forest px-6 py-5">
        <h2 className="text-xl font-semibold text-white font-display">
          Settlement Summary
        </h2>
        <p className="text-white/60 text-xs mt-1">
          Who owes who, at a glance
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-forest/5 rounded-xl p-4">
            <p className="text-muted text-xs">To Receive</p>
            <h3 className="text-xl font-semibold text-forest mt-1 font-display">
              ₹{totalReceive.toFixed(2)}
            </h3>
          </div>
          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-muted text-xs">You Owe</p>
            <h3 className="text-xl font-semibold text-red-600 mt-1 font-display">
              ₹{totalOwed.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {settlements.length === 0 ? (
            <div className="text-center py-6">
              <FiCheckCircle size={26} className="text-forest/40 mx-auto mb-2" />
              <p className="text-muted text-sm">
                All settled up — nothing pending.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {settlements.map((item, index) => {
                // The backend only allows the payer ("to") to mark a
                // settlement resolved — showing this button on debts YOU owe
                // (where someone else is the payer) previously led to a
                // confusing 403 when clicked.
                const canSettle = item.to._id === currentUserId;

                return (
                  <motion.div
                    key={`${item.expenseId}-${index}`}
                    layout
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border border-border rounded-xl p-4 hover:border-forest/30 transition-colors"
                  >
                    <p className="text-xs text-muted">{item.title}</p>
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
                        className="mt-3 w-full bg-forest hover:bg-forest-hover text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Mark Settled
                      </button>
                    ) : (
                      <p className="mt-3 text-xs text-gray-400 text-center">
                        Waiting for {item.to.name} to mark this settled.
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SettlementCard;