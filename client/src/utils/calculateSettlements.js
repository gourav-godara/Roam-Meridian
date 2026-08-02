export function calculateSettlements(expenses) {
  const settlements = [];

  expenses.forEach((expense) => {
    if (expense.status === "Settled") return;

    const participants = expense.participants || [];

    if (!expense.paidBy || participants.length === 0) {
      return;
    }

    // Split the bill among everyone who shares it, INCLUDING the payer if
    // they aren't already listed as a participant. Previously this divided
    // only by participants.length and only charged non-payer participants
    // — if the payer wasn't in the participants list, they'd be fully
    // reimbursed for the whole expense instead of just the others' shares.
    const payerIsParticipant = participants.some(
      (participant) => participant._id === expense.paidBy._id
    );
    const shareCount = payerIsParticipant
      ? participants.length
      : participants.length + 1;
    const share = expense.amount / shareCount;

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
