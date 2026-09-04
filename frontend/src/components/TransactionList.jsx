import TransactionRow from "./TransactionRow"

const TransactionList = ({transactions}) => {
  const grouped = transactions.reduce((groups, transaction)=>{
    groups[transaction.month] =[...(groups[transaction.month] || [] ), transaction,]
    return groups  
  },{}) 
  console.log(grouped);
  

  return ( 
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden ">
      {console.log(Object.entries(grouped))}
      

      {Object.entries(grouped).map(([month, items])=>(
        <section key={month}>
          <h2 className=" border border-b border-slate-800 px-4 py-4 text-sm font-semibold uppercase tracking-wide sm:px-6"> 
            {month} 
          </h2>

          {items.map((transaction)=>(
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}

        </section>
      ))}




    </div>

  )
}

export default TransactionList
