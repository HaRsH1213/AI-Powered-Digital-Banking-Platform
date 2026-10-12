import { ArrowDownLeft, ArrowUpRight, CircleAlert, Clock3 } from "lucide-react"

const statusStyles = {
  COMPLETED: "border-emerald-400/15 bg-emerald-500/10 text-emerald-300",
  PENDING: "border-amber-400/15 bg-amber-500/10 text-amber-300",
  FAILED: "border-red-400/15 bg-red-500/10 text-red-300",
  REJECTED: "border-red-400/15 bg-red-500/10 text-red-300",
  REVERSED: "border-slate-600 bg-slate-800 text-slate-300"
}

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
const dateTime = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

const AdminActivityTable = ({ transactions }) => (
  <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-5 sm:px-6">
      <div>
        <h2 className="font-semibold text-slate-100">Recent transactions</h2>
        <p className="mt-1 text-xs text-slate-500">Latest activity across customer accounts</p>
      </div>
      <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-400">Latest 8</span>
    </div>

    {!transactions.length ? (
      <div className="px-6 py-14 text-center">
        <Clock3 className="mx-auto text-slate-600" size={24} />
        <p className="mt-3 text-sm font-medium text-slate-300">No transaction activity yet</p>
        <p className="mt-1 text-xs text-slate-500">Transactions will appear here when customers start using their accounts.</p>
      </div>
    ) : (
      <div className="divide-y divide-slate-800/80">
        {transactions.map((transaction) => {
          const incoming = transaction.status === "COMPLETED"
          const Icon = transaction.status === "FAILED" || transaction.status === "REJECTED" ? CircleAlert : incoming ? ArrowDownLeft : ArrowUpRight
          const statusClass = statusStyles[transaction.status] || statusStyles.PENDING

          return (
            <article key={transaction.id} className="grid gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-6">
              <div className="flex min-w-0 items-start gap-3">
                <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${transaction.status === "FAILED" || transaction.status === "REJECTED" ? "bg-red-500/10 text-red-300" : incoming ? "bg-emerald-500/10 text-emerald-300" : "bg-blue-500/10 text-blue-300"}`}>
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-100">{transaction.from.name} <span className="font-normal text-slate-500">to</span> {transaction.to.name}</p>
                  <p className="mt-1 truncate text-xs text-slate-400">{transaction.from.accountName} {transaction.from.accountNumber} <span className="text-slate-600">→</span> {transaction.to.accountName} {transaction.to.accountNumber}</p>
                  <p className="mt-1.5 text-xs text-slate-500">{dateTime.format(new Date(transaction.createdAt))}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 pl-[52px] sm:flex-col sm:items-end sm:pl-0">
                <p className="text-sm font-semibold tabular-nums text-slate-100">{money.format(transaction.amount || 0)}</p>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${statusClass}`}>{transaction.status}</span>
              </div>
            </article>
          )
        })}
      </div>
    )}
  </section>
)

export default AdminActivityTable
