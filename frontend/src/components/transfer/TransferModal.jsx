import TransferForm from "./TransferForm"
import { X } from "lucide-react"
import TransferSummary from "./TransferSummary"
import { useState } from "react"
const TransferModal = ({accounts}) => {
  const [isReviewOn, setIsReviewOn] = useState(false)
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center  bg-slate-950/75 backdrop-blur-sm p-3 sm:p-6 ">
      <div className="w-full max-w-3xl max-h-[92vh] rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/50 overflow-auto sm:rounded-3xl ">
        <div className=" flex items-center justify-between px-5 py-4 border-b border-slate-800 sm:px-8 sm:py-5">
          <div>
            <p className="text-xs text-slate-400">
              Move Money Securely
            </p>
            <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
              Transfer Money
            </h2>
          </div>

          <button 
              type="button"
              aria-label="close-transfer form"
              className="rounded-lg p-2 text-slate-400 transition hover:cursor-pointer hover:bg-slate-800 hover:text-slate-100">
              <X size={21}/>
          </button>
        </div>

        <div className="p-5 sm:p-8">
          <TransferForm accounts={accounts} setIsReviewOn={setIsReviewOn}/>
          
          {isReviewOn && 
          <TransferSummary/>}
        </div>
        
      </div>
    

    </div>
    
  )
}

export default TransferModal
