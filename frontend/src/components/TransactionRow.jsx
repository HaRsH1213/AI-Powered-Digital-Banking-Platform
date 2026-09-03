import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
const TransactionRow = ({transaction}) => {
  return (
    <button className="text-left w-full flex items-center border-b border-slate-800 gap-4 px-4 py-4 transition hover:bg-slate-800/60 hover:cursor-pointer sm:px-6">
      {/* Trasaction Type Logo */}
      <span className= {`grid w-12 h-12 place-items-center rounded-full ${
        transaction.income
        ? "bg-emerald-500/15 text-emerald-400"
        : "bg-slate-800 text-slate-300"
      }`
      }>
        {transaction.income
        ? <ArrowUpRight size={18}/>
        : <ArrowDownLeft size={18}/>
        }
      </span>


      {/* Transaction Information  */}
      <span className=" min-w-0 flex-1">
        <span className="block font-medium text-slate-100 ">
          {transaction.name}
        </span>
        <span className="block mt-1 text-xs text-slate-400 ">
          {transaction.date}
        </span>
      </span>

      {/* Amount */}
      <span className={`font-semibold ${
        transaction.income
        ? "text-emerald-400" 
        : "text-slate-100"
      }`}>

        {transaction.amount}

      </span>
    </button>
  )
}

export default TransactionRow
