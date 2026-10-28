import { ChevronDown, CircleAlert, ShieldCheck, WalletCards } from "lucide-react"

const currencyFormatters = new Map()

const formatBalance = (amount, currency = "INR") => {
  if (!currencyFormatters.has(currency)) {
    currencyFormatters.set(
      currency,
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      })
    )
  }

  return currencyFormatters.get(currency).format(amount || 0)
}

const joinedDate = new Intl.DateTimeFormat("en-IN", {day: "2-digit", month: "short", year: "numeric",})

const statusStyles = {
  ACTIVE: "border-emerald-400/15 bg-emerald-500/10 text-emerald-300",
  FROZEN: "border-amber-400/15 bg-amber-500/10 text-amber-300",
  CLOSED: "border-slate-600 bg-slate-800 text-slate-400",
}

const AccountRow = ({
  account,
  isExpanded,
  isUpdating,
  onToggle,
  onRequestStatusChange,
}) => {
  const isActive = account.status === "ACTIVE"
  const canChangeStatus = account.status === "ACTIVE" || account.status === "FROZEN"
  const nextStatus = isActive ? "FROZEN" : "ACTIVE"
  const detailsId = `account-details-${account.id}`

  return (
    <article className="grid gap-4 border-b border-slate-800/80 px-4 py-4 transition last:border-b-0 hover:bg-slate-800/20 sm:px-5 md:grid-cols-[minmax(0,2.2fr)_minmax(96px,0.8fr)_minmax(110px,0.8fr)_minmax(140px,1fr)] md:items-center md:gap-5">

      {/* Account name and number */}
      <div className="min-w-0">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={() => onToggle(account.id)}
          className="group flex w-full min-w-0 items-center justify-between gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500/15 text-blue-200">
              <WalletCards size={17} />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-slate-100">
                {account.name}
              </span>

              <span className="mt-1 block truncate text-xs text-slate-500">
                {account.accountNumber}
              </span>
            </span>
          </span>

          <ChevronDown
            size={17}
            className={`shrink-0 text-slate-500 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Balance */}
      <div className="flex justify-between gap-3 text-xs md:block">
        <span className="text-slate-500 md:hidden">Balance</span>

        <span className="font-medium tabular-nums text-slate-200">
          {formatBalance(account.balance, account.currency)}
        </span>
      </div>

      {/* Account status */}
      <div className="flex justify-between gap-3 md:block">
        <span className="text-xs text-slate-500 md:hidden">Status</span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
            statusStyles[account.status] || statusStyles.CLOSED
          }`}
        >
          {account.status === "ACTIVE" ? (
            <ShieldCheck size={13} />
          ) : account.status === "FROZEN" ? (
            <CircleAlert size={13} />
          ) : null}

          {account.status}
        </span>
      </div>

      {/* Account action */}
      <div className="flex justify-end">
        {canChangeStatus ? (
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onRequestStatusChange(account, nextStatus)}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-medium transition disabled:cursor-wait disabled:opacity-60 md:w-auto ${
              isActive
                ? "border-amber-400/20 text-amber-200 hover:bg-amber-500/10"
                : "border-emerald-400/20 text-emerald-200 hover:bg-emerald-500/10"
            }`}
          >
            {isUpdating
              ? "Updating…"
              : isActive
                ? "Freeze account"
                : "Activate account"}
          </button>
        ) : (
          <span className="text-right text-xs text-slate-600">
            Closed
          </span>
        )}
      </div>

      {/* Expandable account details */}
      <div
        id={detailsId}
        aria-hidden={!isExpanded}
        className="grid min-w-0 transition-[grid-template-rows] duration-300 ease-out md:col-span-4"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`grid gap-3 pb-1 transition duration-300 sm:grid-cols-2 md:grid-cols-3 ${
              isExpanded
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0"
            }`}
          >
            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Customer name
              </p>

              <p className="mt-1.5 truncate text-sm font-medium text-slate-200">
                {account.customer.name}
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Email address
              </p>

              <p className="mt-1.5 break-all text-sm text-slate-300">
                {account.customer.email}
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/50 p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Account created
              </p>

              <p className="mt-1.5 text-sm text-slate-300">
                {joinedDate.format(new Date(account.createdAt))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default AccountRow
