import { BadgeCheck, CircleAlert } from "lucide-react"

const joinedDate = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" })

const CustomerRow = ({ customer, onViewCustomer }) => (
  <article className="grid gap-3 px-4 py-4 transition hover:bg-slate-800/25 sm:px-5 md:grid-cols-[minmax(0,1.6fr)_minmax(130px,1fr)_110px_100px_100px] md:items-center md:gap-4">
    <div className="flex min-w-0 items-center gap-2">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-200">
        {customer.name?.charAt(0)?.toUpperCase()}
      </span>
      <div>
        <p className="truncate text-sm font-medium text-slate-100">{customer.name}</p>
        <p className="mt-1 truncate text-xs text-slate-500"> customer.email</p>
      </div>
    </div>
    <div className=" flex justify-between gap-2 text-xs md:block">
        <span className="text-slate-600 md:hidden">Joined</span>
        <span className="text-slate-400">{joinedDate.format(new Date(customer.createdAt))}</span>
    </div>
    <div className="flex justify-between gap-2 text-xs md:block">
      <span className="text-slate-600 md:hidden">Accounts</span>
      <span className="text-slate-300">{customer.accountCount}</span>
    </div>
    <div className="flex justify-between gap-2 md:block">
      <span className="text-xs text-slate-600 md:hidden">Verification</span>
      <span className={`inline-flex items-center gap-1.5 text-xs ${customer.isVerified ? "text-emerald-300" : "text-amber-300"}`}>
        {customer.isVerified ? <BadgeCheck size={14} /> : <CircleAlert size={14} /> }
        {customer.isVerified ? "Verified" : "Unverified"}
      </span>
    </div>
    <div className="flex justify-end">
      <button 
        type="button"
        onClick={() => onViewCustomer(customer.id)}
        className= "w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-blue-300 transition hover:border-blue-400/40 hover:bg-blue-500/10 md:w-auto">
        View customer
      </button>
    </div>
  </article>
)

export default CustomerRow
