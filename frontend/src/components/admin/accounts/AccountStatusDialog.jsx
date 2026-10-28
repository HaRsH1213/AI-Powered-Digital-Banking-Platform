import { CircleAlert, X } from "lucide-react"

const AccountStatusDialog = ({ account, nextStatus, isSubmitting, error, onCancel, onConfirm }) => {
  if (!account) return null

  const isFreezing = nextStatus === "FROZEN"

  return (
    <div
      className="fixed inset-0 z-70 grid place-items-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onCancel()
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="account-status-title" className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className={`grid h-11 w-11 place-items-center rounded-xl ${isFreezing ? "bg-amber-500/10 text-amber-300" : "bg-emerald-500/10 text-emerald-300"}`}>
            <CircleAlert size={20} />
          </div>
          <button type="button" disabled={isSubmitting} onClick={onCancel} aria-label="Close status confirmation" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50">
            <X size={18} />
          </button>
        </div>

        <h2 id="account-status-title" className="mt-4 text-lg font-semibold text-slate-100">
          {isFreezing ? "Freeze this account?" : "Reactivate this account?"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {isFreezing
            ? "The account holder will not be able to send or receive transfers while the account is frozen."
            : "Reactivating restores the account’s ability to send and receive transfers."}
        </p>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <p className="text-sm font-medium text-slate-200">{account.name}</p>
          <p className="mt-1 text-xs text-slate-500">{account.customer.name} · {account.accountNumber}</p>
          <p className="mt-2 text-xs text-slate-400">{account.status} <span className="px-1 text-slate-600">→</span> <span className={isFreezing ? "text-amber-300" : "text-emerald-300"}>{nextStatus}</span></p>
        </div>

        {error && <p role="alert" className="mt-3 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button type="button" disabled={isSubmitting} onClick={onCancel} className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 disabled:opacity-50">Cancel</button>
          <button type="button" disabled={isSubmitting} onClick={onConfirm} className={`rounded-lg px-4 py-2.5 text-sm font-medium text-slate-950 transition disabled:cursor-wait disabled:opacity-60 ${isFreezing ? "bg-amber-300 hover:bg-amber-200" : "bg-emerald-300 hover:bg-emerald-200"}`}>
            {isSubmitting ? "Updating…" : isFreezing ? "Freeze account" : "Reactivate account"}
          </button>
        </div>
      </section>
    </div>
  )
}

export default AccountStatusDialog
