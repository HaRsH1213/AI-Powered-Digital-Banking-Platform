import { Search } from "lucide-react"

const TransactionFilters = ({ searchInput, setSearchInput, status, onStatusChange }) => (
  <div className="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
    <div className="relative min-w-0 flex-1">
      <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search transaction ID, account, customer, or email"
        aria-label="Search transactions"
        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
      />
    </div>
    <select
      value={status}
      onChange={(event) => onStatusChange(event.target.value)}
      aria-label="Filter transactions by status"
      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3.5 py-3 text-sm text-slate-300 outline-none focus:border-blue-400 sm:w-auto"
    >
      <option value="ALL">All statuses</option>
      <option value="COMPLETED">Completed</option>
      <option value="PENDING">Pending</option>
      <option value="REJECTED">Rejected</option>
      <option value="FAILED">Failed</option>
      <option value="REVERSED">Reversed</option>
    </select>
  </div>
)

export default TransactionFilters
