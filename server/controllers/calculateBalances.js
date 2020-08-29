function calculateBalances(expenses, members) {
  let balances = new Map();

  members.forEach((member) => {
    balances.set(member, 0);
  });

  expenses.forEach((expense) => {
    const payer = expense.payer;
    const amount = parseInt(expense.amount);
    const membersNumber = expense.selectedMembers.length;
    const costPerMember = parseInt(amount / membersNumber);

    const payerBalance = parseInt(balances.get(payer));
    const newPayerBalance = payerBalance + amount;
    balances.set(payer, newPayerBalance);

    expense.selectedMembers.forEach((member) => {
      const memberBalance = balances.get(member);
      const newMemberBalance = memberBalance - costPerMember;
      balances.set(member, newMemberBalance);
    });
  });

  console.log(expense);
  return [...balances];
}

module.exports = calculateBalances;
