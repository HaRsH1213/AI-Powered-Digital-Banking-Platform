import { Check, CircleX, Landmark } from "lucide-react"

const TransferStatusOverlay = ({status, transactionResult, onClose}) => {
  const isProcessing = status === "processing"
  const isSuccess = status === "success"
  const isError = status === "error"

  if(status === "idle") return null
  return (
    <div className=" absolute inset-0 z-130 grid place-items-center rounded-2xl bg-slate-950/80 p-4 backdrop-blur-md sm:rounded-3xl sm:p-6">
      <section className="w-full max-w-md border border-slate-700 rounded-2xl bg-slate-900 text-center p-6 shadow-2xl shadow-black/50 sm:p-8">
      <div className="relative mx-auto h-20 w-20  grid place-items-center">
        {isProcessing && <span className="absolute inset-0 rounded-full animate-ping bg-blue-500/15"/>}
        {isProcessing && <span className="absolute inset-1 animate-[spin_2.5s_linear_infinite] rounded-full border-2 border-blue-400/50 border-t-blue-400"/>}
        {isSuccess && (
          <>
            {/* Ripple 1 — strongest */}
            <span
              className="
                absolute inset-2.5
                rounded-full
                border-[3px] border-emerald-400/45
                animate-[ping_2.6s_ease-out_infinite]
              "
            />

            {/* Ripple 2 — medium */}
            <span
              className="
                absolute inset-2.5
                rounded-full
                border-2 border-emerald-400/25
                animate-[ping_2.6s_ease-out_infinite_0.6s]
              "
            />

            {/* Ripple 3 — soft */}
            <span
              className="
                absolute inset-2.5
                rounded-full
                border border-emerald-400/15
                animate-[ping_2.6s_ease-out_infinite_1.2s]
              "
            />
          </>
        )}

      <span className={`rounded-full h-14 w-14 grid place-items-center transition-colors ${
        isSuccess
        ? "bg-emerald-400 text-slate-950 shadow-emerald-500/30"
        : isError
          ? "bg-red-500 text-white shadow-red-500/30"
          : "bg-blue-500 text-slate-950 shadow-blue-500/30"
      }`}>
        {isProcessing && <Landmark size={27} strokeWidth={2.3} />}
        {isSuccess && <Check size={32} strokeWidth={2.8} />}
        {isError && <CircleX size={31} strokeWidth={2.5} />}

      </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-100">
        {isProcessing && "Processing your transfer"}
        {isSuccess && "Transfer successful"}
        {isError && "Transfer could not be completed"}

      </h2>

      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {isProcessing && "Please do not close this window while we securely process your payment."}
        {isSuccess && "Your money has been sent securely and the recipient account has been credited."}
        {isError && (message || "Please review your details and try again.")}


      </p>

      {isSuccess && (
        <>
          <div className="mt-4 grid place-items-center">
            <h2 className="text-2xl font-semibold">
                {transactionResult.amount}
            </h2>

            <p className="text-sm leading-relaxed text-slate-400">
              Sent to priya sharma ....123 
            </p>

          </div>

          <div className="mt-6 divide-y divide-slate-800 border-y border-slate-800 text-left text-sm">
            <div className="flex justify-between gap-4 items-center py-3">
              <span className="text-slate-400">
                  From
              </span>

              <span className="font-semibold text-slate-100">
                  Harsh ....123
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-slate-400">Status</span>
              <span className="font-semibold text-emerald-300">Completed</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-slate-400">Transaction ID</span>
              <span className="max-w-44 truncate font-medium text-slate-200">{transactionResult._id}</span>
            </div>
          </div>
        </>
      )}

      {isProcessing && (
        <div className="mt-6 flex justify-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"/>
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce"/>
        </div>
      )}


      {!isProcessing && (
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400"
          >
          {isSuccess 
            ? "Back to dashboard" 
            : "Back to transfer"
          }
        </button>
      )}

      </section>




    </div>
  )
}

export default TransferStatusOverlay
