import { BanknoteArrowDown, CircleAlert, X } from "lucide-react"
import { useState } from "react"

const InitialFundsDialog = ({ account, isSubmitting, error, onCancel, onConfirm }) => {
  const [amount, setAmount] = useState("")
  const [validationError, setValidationError] = useState("")

  if (!account) return null

  const handleSubmit = (event) => {
    event.preventDefault()

    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setValidationError("Enter an amount greater than ₹0.")
      return
    }

    setValidationError("")
    onConfirm(numericAmount)
  }

  return (
    <div
      className="fixed inset-0 z-70 grid place-items-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onCancel()
      }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="initial-funds-title" className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl shadow-black/50 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-300">
            <BanknoteArrowDown size={20} />
          </span>
          <button type="button" disabled={isSubmitting} onClick={onCancel} aria-label="Close initial funding dialog" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50">
            <X size={18} />
          </button>
        </div>

        <h2 id="initial-funds-title" className="mt-4 text-lg font-semibold text-slate-100">Add initial funds</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Credit this customer account from the bank’s system account. This action is recorded as a completed transaction.</p>

        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
          <p className="text-sm font-medium text-slate-200">{account.name}</p>
          <p className="mt-1 text-xs text-slate-500">{account.customer.name} · {account.accountNumber}</p>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <label htmlFor="initial-funds-amount" className="text-sm font-medium text-slate-200">Amount</label>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">₹</span>
            <input
              id="initial-funds-amount"
              type="number"
              min="1"
              step="0.01"
              inputMode="decimal"
              autoFocus
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3 pl-8 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 disabled:opacity-60"
            />
          </div>

          {(validationError || error) && (
            <p role="alert" className="mt-3 flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              <CircleAlert size={14} />
              {validationError || error}
            </p>
          )}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" disabled={isSubmitting} onClick={onCancel} className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-wait disabled:opacity-60">
              {isSubmitting ? "Adding funds…" : "Add funds"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default InitialFundsDialog
