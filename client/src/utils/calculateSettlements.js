export function calculateSettlements(expenses) {
  const settlements = [];

  expenses.forEach((expense) => {
    if (expense.status === "Settled") return;

    const participants = expense.participants || [];

    if (
      !expense.paidBy ||
      participants.length === 0
    ) {
      return;
    }

    const share = expense.amount / participants.length;

    participants.forEach((participant) => {
      if (participant._id !== expense.paidBy._id) {
        settlements.push({
          expenseId: expense._id,
          title: expense.title,
          from: participant,
          to: expense.paidBy,
          amount: share,
        });
      }
    });
  });

  return settlements;
}