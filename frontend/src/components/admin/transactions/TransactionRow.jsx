import { ArrowDownLeft, ArrowLeftRight, ChevronDown, CircleAlert, Clock3, RotateCcw, XCircle } from "lucide-react"

const moneyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

const statusStyles = {
  COMPLETED: "border-emerald-400/15 bg-emerald-500/10 text-emerald-300",
  PENDING: "border-amber-400/15 bg-amber-500/10 text-amber-300",
  REJECTED: "border-red-400/15 bg-red-500/10 text-red-300",
  FAILED: "border-red-400/15 bg-red-500/10 text-red-300",
  REVERSED: "border-violet-400/15 bg-violet-500/10 text-violet-300",
}

const statusIcons = {
  PENDING: Clock3,
  REJECTED: XCircle,
  FAILED: CircleAlert,
  REVERSED: RotateCcw,
}

const Party = ({ party, label }) => (
  <div className="min-w-0">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 md:hidden">{label}</p>
    <p className="mt-1 truncate text-sm font-medium text-slate-200">{party.name}</p>
    <p className="mt-1 truncate text-xs text-slate-500">{party.accountName} · {party.accountNumber}</p>
  </div>
)

const TransactionRow = ({ transaction, isExpanded, onToggle }) => {
  const StatusIcon = statusIcons[transaction.status]
  const isInitialFunding = transaction.type === "INITIAL_FUNDING"
  const hasFailureDetails = ["FAILED", "REJECTED"].includes(transaction.status)
  const failureReason = transaction.failureReason || "No detailed reason was saved for this older transaction."
  const detailsId = `transaction-details-${transaction.id}`

  return (
    <article className="grid gap-4 border-b border-slate-800/80 px-4 py-4 transition last:border-b-0 hover:bg-slate-800/20 sm:px-5 md:grid-cols-[minmax(150px,1.1fr)_minmax(150px,1.15fr)_minmax(150px,1.15fr)_minmax(96px,0.65fr)_minmax(105px,0.7fr)] md:items-center md:gap-5">
      <button type="button" aria-expanded={isExpanded} aria-controls={detailsId} onClick={onToggle} className="group flex min-w-0 items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${isInitialFunding ? "bg-blue-500/15 text-blue-200" : "bg-violet-500/15 text-violet-200"}`}>
          {isInitialFunding ? <ArrowDownLeft size={18} /> : <ArrowLeftRight size={17} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-slate-100">{isInitialFunding ? "Initial funding" : "Account transfer"}</span>
          <span className="mt-1 block truncate text-xs text-slate-500">TXN-{String(transaction.id).slice(-8).toUpperCase()}</span>
        </span>
        <ChevronDown size={17} className={`shrink-0 text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      <Party party={transaction.from} label="From" />
      <Party party={transaction.to} label="To" />

      <div className="flex justify-between gap-3 md:block">
        <span className="text-xs text-slate-500 md:hidden">Amount</span>
        <span className="font-medium tabular-nums text-slate-100">{moneyFormatter.format(transaction.amount)}</span>
      </div>

      <div className="flex justify-between gap-3 md:block">
        <span className="text-xs text-slate-500 md:hidden">Status</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles[transaction.status] || "border-slate-600 bg-slate-800 text-slate-400"}`}>
          {StatusIcon && <StatusIcon size={13} />}
          {transaction.status}
        </span>
      </div>

      <div id={detailsId} aria-hidden={!isExpanded} className="grid min-w-0 transition-[grid-template-rows] duration-300 ease-out md:col-span-5" style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}>
        <div className="min-h-0 overflow-hidden">
          <div className={`grid gap-3 pb-1 pt-1 transition duration-300 sm:grid-cols-2 lg:grid-cols-4 ${isExpanded ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Created</p>
              <p className="mt-1.5 text-sm text-slate-300">{dateFormatter.format(new Date(transaction.createdAt))}</p>
            </div>
            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Sender email</p>
              <p className="mt-1.5 break-all text-sm text-slate-300">{transaction.from.email}</p>
            </div>
            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Recipient email</p>
              <p className="mt-1.5 break-all text-sm text-slate-300">{transaction.to.email}</p>
            </div>
            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Transaction ID</p>
              <p className="mt-1.5 break-all text-sm text-slate-300">{transaction.id}</p>
            </div>
            {hasFailureDetails && (
              <div className="min-w-0 rounded-xl border border-red-500/20 bg-red-500/5 p-3.5 sm:col-span-2 lg:col-span-4">
                <div className="flex items-center gap-2 text-red-300">
                  <CircleAlert size={15} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider">{transaction.failureCode || "Reason unavailable"}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-red-100/90">{failureReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default TransactionRow
