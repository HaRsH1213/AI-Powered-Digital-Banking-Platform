import TransferForm from "./TransferForm"
import { X } from "lucide-react"
import TransferSummary from "./TransferSummary"
import { useState, useEffect } from "react"
import TransferStatusOverlay from "./TransferStatusOverlay"
const TransferModal = ({accounts, isOpen, onClose}) => {
  const [isReviewOn, setIsReviewOn] = useState(false)


  const [fromAccount, setFromAccount] = useState(accounts[0]?.accountNumber ?? "")
  const [fromAccountName, setFromAccountName] = useState(accounts[0]?.accountName ?? "")
  const [toAccount, setToAccount] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [amountTransfer, setAmountTransfer] = useState("")
  const [isReviewed, setIsReviewed] = useState(false)
  const [transferStatus, setTransferStatus] = useState("idle")
  const [transactionResult, setTransactionResult] = useState(null)
 

  useEffect(() => {
  if (!fromAccount && accounts.length > 0) {
    setFromAccount(accounts[0].accountNumber)
    setFromAccountName(accounts[0].accountName)
  }
}, [accounts, fromAccount])

  const resetForm = () => {
  setIsReviewOn(false)
  setFromAccount(accounts[0]?.accountNumber ?? "")
  setFromAccountName(accounts[0]?.accountName ?? "")
  setToAccount("")
  setReceiverName("")
  setAmountTransfer("")
  setIsReviewed(false)
}

const closeStatusOverlay = () => {
    if (transferStatus === "success") {
      resetForm()
      window.location.reload()
      
      return
    }

    setTransferStatus("idle")
    setIsReviewed(false)
    setIsReviewOn(false)
  }

  return (
    
    <div className={`
      fixed inset-0 z-100 flex items-center justify-center  bg-slate-950/75 backdrop-blur-sm 
      p-3 sm:p-6 transition-opacity ease-out duration-300 
      ${
        isOpen 
          ? "opacity-100" 
          : "opacity-0 pointer-events-none"
      } `}>
      <div className={`
          relative w-full max-w-3xl max-h-[92vh] rounded-2xl border
          border-slate-700 bg-slate-950 shadow-2xl shadow-black/50 overflow-auto 
          sm:rounded-3xl transform transition-all duration-300 ease-out
          ${
            isOpen
              ? "translate-z-0 opacity-100 scale-100"
              : "translate-z-10 opacity-0 scale-95"
          } `}>
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
              onClick={() => {
                resetForm()
                onClose()
              }}
              type="button"
              aria-label="close-transfer form"
              className="rounded-lg p-2 text-slate-400 transition hover:cursor-pointer hover:bg-slate-800 hover:text-slate-100">
              <X size={21}/>
          </button>
        </div>

        <div className="p-5 sm:p-8">

          <TransferForm 
            accounts={accounts} 
            setIsReviewOn={setIsReviewOn} 
            fromAccount={fromAccount} 
            setFromAccount={setFromAccount} 
            setFromAccountName={setFromAccountName} 
            toAccount={toAccount} 
            setToAccount={setToAccount} 
            setReceiverName={setReceiverName} 
            amountTransfer={amountTransfer} 
            setAmountTransfer={setAmountTransfer} 
            isReviewed={isReviewed}  
            setTransferStatus = {setTransferStatus}
            setTransactionResult = {setTransactionResult}

          />
          
          {/* {isReviewOn && !isReviewed &&
          <TransferSummary fromAccount={fromAccount} fromAccountName={fromAccountName} toAccount={toAccount} receiverName={receiverName} amountTransfer={amountTransfer} setIsReviewOn={setIsReviewOn} setIsReviewed={setIsReviewed}/>} */}
        
          <TransferSummary 
            isReviewOn={isReviewOn} 
            isReviewed={isReviewed} 
            fromAccount={fromAccount} 
            fromAccountName={fromAccountName} 
            toAccount={toAccount} 
            receiverName={receiverName} 
            amountTransfer={amountTransfer} 
            setIsReviewOn={setIsReviewOn} 
            setIsReviewed={setIsReviewed}
          />


          <TransferStatusOverlay 
            status={transferStatus} 
            transactionResult={transactionResult} 
            fromAccount={fromAccount} 
            fromAccountName={fromAccountName} 
            toAccount={toAccount} 
            receiverName={receiverName}
            amountTransfer={amountTransfer} 
            onClose={closeStatusOverlay} 
          />
        </div>
        
      </div>
    

    </div>
    
  )
}

export default TransferModal
