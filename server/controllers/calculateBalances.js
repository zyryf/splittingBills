function calculateBalances(expenses, members) {
    let balances = new Map()

    members.forEach(member => {
        balances.set(member, 0)
    });

    expenses.forEach(expense => {
        const payer = expense.payer
        const amount = parseInt(expense.amount)
        const membersNumber = expense.selectedMembers.length
        const costPerMember = parseInt(amount / membersNumber)
       
        const payerBalance = parseInt(balances.get(payer))
        const newPayerBalance = payerBalance + amount
        balances.set(payer, newPayerBalance)

        expense.selectedMembers.forEach(member => {
            const memberBalance  = balances.get(member)
            const newMemberBalance = memberBalance - costPerMember
            balances.set(member, newMemberBalance)
        })
    });
    return [...balances]
  }
  
  module.exports = calculateBalances;

/*   const MONGO_JSON = '{"_id":{"$oid":"5eea29777bcccb1034f1963a"},"members":["testuser","szymek","banan","user","HUJCIWPYSK","koko","imprezowicz"],"expenses":[{"id":"2b510386-5922-4e0a-b850-d2bcc539b7b2","title":"123","payer":"banan","amount":"5467","selectedMembers":["testuser","user","szymek"],"date":"Jun 23rd 2020, 5:20:15 pm"},{"title":"weg","amount":"21354","payer":"user","date":"Jun 24th 2020, 11:50:10 am","selectedMembers":["testuser","szymek","banan","user","HUJCIWPYSK","koko"],"id":"77bb0327-a025-4b19-bb9c-25fe501454ba"},{"title":"impreza","amount":"156","payer":"imprezowicz","date":"Jun 24th 2020, 11:52:04 am","selectedMembers":["testuser","szymek","banan","user","HUJCIWPYSK","koko","imprezowicz"],"id":"ef43b166-5da1-4866-82d3-32e5c9345e15"}],"name":"holiday","password":"$2b$10$5SpH/yhx3YG6EomKNW94VOrU9/xyO5qkos4JMCqunFInY76zG7J8K","__v":{"$numberInt":"0"},"balances":[{"name":"imprezowicz","balance":{"$numberDouble":"133.71"}},{"name":"user","balance":{"$numberDouble":"15950.38"}}]}'
  const data = JSON.parse(MONGO_JSON)
  
  const MEMBERS = data.members
  const EXPENSES = data.expenses    

  const BALANCE = calculateBalances(EXPENSES,MEMBERS)
  
  console.log(BALANCE) */
