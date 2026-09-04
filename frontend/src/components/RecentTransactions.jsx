import { useState } from "react"
import TransactionRow from "./TransactionRow"
import TransactionDetailsModal from "./TransactionDetailsModal"

const RecentTransactions = ({transactions}) => {
  const [selected, setSelected] = useState(null)
  const recentTransactions = transactions.slice(0,3)

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Recent Transactions
        </h2>
        <button className="text-sm text-blue-300 hover:text-blue-200">
          View all -
          
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        {recentTransactions.map((transaction)=>(
          <TransactionRow transaction={transaction} setSelected={setSelected} />

        ))}
      </div>

      <TransactionDetailsModal transaction={selected} onClose={()=>setSelected(null)} />
    </section>

  )
}

export default RecentTransactions
