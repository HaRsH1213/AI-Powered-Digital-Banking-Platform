import { ArrowLeft, Download, Filter, Search,Menu  } from "lucide-react"
const TransactionHeader = ({setMenuOpen}) => {
  return (
    <header>
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-3">
          <button onClick={()=>setMenuOpen(open => !open)}
            className="rounded-lg border border-slate-700 px-3 py-2 lg:hidden">

            <Menu size={18} />

          </button>
          <button className="hidden text-slate-400 hover:text-white sm:block ">

            <ArrowLeft size={18} />

          </button>

          <div>
            <p className=" text-sm text-slate-400 ">Money Movement</p>

            <h2 className="text-3xl font-semibold">Transactions</h2>

          </div>

        </div>


        <button className=" border rounded-lg border-slate-700 text-slate-300 px-3 py-2 ">

          <Filter size={18} />


        </button>
      </div>
    </header>
  )
}

export default TransactionHeader
