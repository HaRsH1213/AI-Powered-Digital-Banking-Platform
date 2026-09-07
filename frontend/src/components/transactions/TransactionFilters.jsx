import { Search } from "lucide-react"
const TransactionFilters = ({search, setSearch, filter, setFilter }) => {
  return (
    <div className="mt-7 flex flex-col sm:flex-row gap-3">
      <label className=" relative flex-1 ">
        <span className="sr-only" >Search transactions</span>

        <Search 
          className="absolute top-3.5 left-3 text-slate-500" 
          size={17} 
        />

        <input value={search}
          onChange={(e)=> setSearch(e.target.value)}
          placeholder="Search by name, amount, or ID" 
          className=" w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400  " 
        />


      </label>
      <select value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-400">
        <option >All</option>
        <option >Credit</option>
        <option >Debit</option>

      </select>
      
    </div>
  )
}

export default TransactionFilters
