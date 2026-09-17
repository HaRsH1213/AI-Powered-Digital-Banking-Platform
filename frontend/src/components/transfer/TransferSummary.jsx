import {X, ShieldCheck} from "lucide-react"
const TransferSummary = ({
  isReviewOn, isReviewed, fromAccount, fromAccountName, toAccount, 
  receiverName, amountTransfer, setIsReviewOn, setIsReviewed}) => {
  return (
    <div className={
      `absolute inset-0 z-120 p-4 flex justify-center items-center
      bg-slate-950/70 backdrop-blur-sm 
      transition-opacity duration-300 ease-out 
      ${
        isReviewOn && !isReviewed 
        ? "opacity-100"
        : "opacity-0 pointer-events-none"
      }`}>
      <aside className={
        `w-full max-w-lg h-full max-h-[68vh] rounded-2xl border border-slate-800 
        bg-slate-900 p-4 sm:p-6 transform transition-all duration-300 ease-out
        ${
          isReviewOn && !isReviewed
          ? "translate-z-0 opacity-100 scale-100"
          : "transalte-z-10 opacity-0 scale-95"
        }`}>
        <div className="flex items-center justify-between  border-b border-slate-800 pb-5 ">
          <div>
            <p className="text-sm text-slate-400">
              Transfer summary
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              Ready to review
            </h2>

          </div>
          <X 
            onClick={()=>{setIsReviewOn(false)}}
            size={22} 
            className="text-slate-600 hover:text-slate-400"
          />

        </div>

        <div className="divide-y divide-slate-800">

          <SummaryRow label={"From"}>
            <>
              {fromAccountName} 
              <br />
              ••••{fromAccount.slice(-4)}
            </>
          </SummaryRow>

          <SummaryRow label={"To"}>
            <>
              {receiverName}
              <br/>
              ••••{toAccount.slice(-4)}
            </>
          </SummaryRow>

          <SummaryRow label={"Amount"}>
            <>
              {amountTransfer}
            </>
          </SummaryRow>

          <SummaryRow label={"Fee"}>
            <span className="text-emerald-300">
              Free
            </span>
          </SummaryRow>
          
        </div>
        <button
          onClick={()=>setIsReviewed(true)}
          type="button"
          className="w-full px-4 py-3 mt-5 rounded-xl border border-slate-700 
          text-sm font-semibold text-slate-200 
          transition hover:border-blue-400 hover:text-blue-300 hover:cursor-pointer">
          Continue to Confirmation
        </button>

        <p className="mt-7 flex items-center gap-2 text-xs leading-relaxed text-slate-400">
         <ShieldCheck className="text-emerald-400 shrink-0" size={16}  />
          Verify the destination account and amount before confirming. The transfer is protected by idempotency verification.
        </p>
      </aside>
    </div>
  )
}

const SummaryRow = ({label, children}) => (
  <div className="flex items-center justify-between text-sm py-4 gap-4">
    <span className="text-slate-400 ">
      {label}
    </span>
    <span className="text-right text-slate-200">
      {children}
    </span>
  </div>
)

export default TransferSummary
