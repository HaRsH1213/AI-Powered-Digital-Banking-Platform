import { CircleAlert, UsersRound } from "lucide-react"

export const CustomerErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center px-5 py-14 text-center">
    <CircleAlert size={25} className="text-red-300" />
    <p className="mt-3 text-sm text-red-200">{message}</p>
    <button type="button" onClick={onRetry} className="mt-4 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">Retry</button>
  </div>
)

export const CustomerLoadingState = () => (
  <div className="divide-y divide-slate-800/80" aria-label="Loading customers">
    {Array.from({length :5}, (_, index) => ( <div key={index} className="h-20.5 animate-pulse bg-slate-900/70"/>))}
  </div>
)

export const CustomerEmptyState = () => (
  <div className="flex flex-col items-center px-5 py-14 text-center">
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-800 text-slate-400"><UsersRound size={22} /></span>
    <p className="mt-4 text-sm font-medium text-slate-200">No customers found</p>
    <p className="mt-1 text-xs text-slate-500">Try another name, email, or verification filter.</p>
  </div>
)
