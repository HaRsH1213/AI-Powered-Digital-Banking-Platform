import { X } from "lucide-react"

const TransactionDetailsModal = ({ transaction, onClose }) => {
  return (
    <div
      className={`
        fixed inset-0 z-40 flex items-end justify-center
        bg-black/60 p-4 sm:items-center
        transition-opacity duration-300 ease-out
        ${transaction ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <article
        className={`
          w-full max-w-md rounded-2xl border border-slate-700
          bg-slate-900 p-6
          transform transition-all duration-300 ease-out
          ${
            transaction
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }
        `}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Transaction details
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              {transaction?.to.holderName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Amount</dt>

            <dd
              className={
                transaction?.direction === "INCOMING"
                  ? "text-emerald-400"
                  : "text-slate-100"
              }
            >
              {transaction?.amount}
            </dd>
          </div>

          <div>
            <dt className="text-slate-400">From</dt>

            <dd className="mt-1 font-medium">
              {transaction?.from.accountName}
            </dd>

            <dd className="text-xs text-slate-400">
              {`••••${transaction?.from.accountNumber.slice(-4)}`}
            </dd>
          </div>

          <div>
            <dt className="text-slate-400">To</dt>

            <dd className="mt-1 font-medium">
              {transaction?.to.holderName}
            </dd>

            <dd className="text-xs text-slate-400">
              {`••••${transaction?.to.accountNumber.slice(-4)}`}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Transaction ID</dt>

            <dd className="text-xs">
              {transaction?.id}
            </dd>
          </div>

          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Status</dt>

            {transaction?.status !== "PENDING" && (
              <dd className={`${
                transaction?.status === "COMPLETED"
                  ? "text-emerald-400"
                  : "text-red-600"
                }`}>
                {transaction?.status}
              </dd>
            )}

            {transaction?.status === "PENDING" && (
              <dd className="text-amber-400">
                  Pending
              </dd>
            )}
          </div>
        </dl>
      </article>
    </div>
  )
}

export default TransactionDetailsModal