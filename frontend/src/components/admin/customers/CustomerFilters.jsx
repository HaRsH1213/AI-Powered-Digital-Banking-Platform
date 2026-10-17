import { Search } from "lucide-react"

const CustomerFilters = ({ searchInput, setsearchInput, selectFilter, setSelectFilter }) => (
  <div className="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
    <div className="relative min-w-0 flex-1">
      <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        type="search"
        value={searchInput}
        onChange={(e) => setsearchInput(e.target.value)}
        placeholder="Search by name or email"
        aria-label="Search customers by name or email"
        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
      />
    </div>
    <select
      value={selectFilter}
      onChange={(e) => setSelectFilter(e.target.value)}
      aria-label="Filter customers by verification"
      className="rounded-xl border border-slate-700 bg-slate-950/70 px-3.5 py-3 text-sm text-slate-300 outline-none focus:border-blue-400"
    >
      <option value="all">All verification states</option>
      <option value="verified">Verified</option>
      <option value="unverified">Unverified</option>
    </select>
  </div>
)

export default CustomerFilters
