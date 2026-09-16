import { ArrowDown, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import getBalance from "../../services/accountBalance.service"
import getReceiverName from "../../services/receiver.service"
const TransferForm = ({accounts, setIsReviewOn, fromAccount, setFromAccount,setFromAccountName, toAccount, setToAccount, setReceiverName, amountTransfer, setAmountTransfer, isReviewed}) => {
  const [accountAvailableBalance, setAccountAvailableBalance] = useState(0)
  useEffect(() => {
    const fetchAccountBalance = async ()=>{
      try {
        const balance = await getBalance(fromAccount)
        setAccountAvailableBalance(balance)
        
      } catch (error) {
        console.log("Somthing went wrong to fetch available account balance", error);
        
      }
    }
    fetchAccountBalance()
 
  }, [fromAccount])

  useEffect(() => {
    if (toAccount.length !== 12) {
    setReceiverName("")
    return
  }
    const fetchReceiverName = async () =>{
      try {
        const name = await getReceiverName(toAccount)
        setReceiverName(name)

        
      } catch (error) {
        console.log("Somthing went wrong to fetch receiver name", error );
        
        
      }
    }
    fetchReceiverName()
  }, [toAccount])
  
  
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-800  p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 
          id="new-transfer-heading"
          className="text-xl font-semibold">
          New Transfer
        </h2>
        <span className="text-xs text-slate-400">
          Step 1 of 1

        </span>
      </div>
      <form className="space-y-5">
        <div >
          <label className="mb-2 block text-sm font-medium text-slate-300  ">
            From Account
          </label>
          <div className=" flex flex-col gap-2 ">
            <select
              disabled = {isReviewed}
              value={fromAccount}
              onChange={(e)=>{
                const selectedAccountNumber = e.target.value
                const selectedAccount = accounts.find((account) => account.accountNumber === selectedAccountNumber)

                setFromAccount(selectedAccountNumber)
                setFromAccountName(selectedAccount.accountName)
              }} 
              className=" w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30">
            {accounts.map((account)=>(
              <option key={account.accountNumber} value={account.accountNumber}>
                {account.accountName} ••••{" "}
                {account.accountNumber.slice(-4)}
              </option>
            ))}

            </select>
            <span className="text-xs text-emerald-300 whitespace-nowrap">
              ₹ {accountAvailableBalance} {" "} Available
            </span>

          </div>
        </div>

        {/* Transfer Direction Icon */}
        <div className="grid place-items-center text-slate-500">
          <ArrowDown size={20} />

        </div>

        {/* Destination Account */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300 ">
            To Account
          </label>
          <input
            disabled = {isReviewed}
            type="number"
            value={toAccount}
            onChange={(e) => {
              setToAccount(e.target.value)
            }}
            required
            
            className=" w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 "
            placeholder="Enter Reciver's Account No. "
            />

          {/* Transfer Information */}
          <p className="mt-2 text-xs text-slate-500">
            Transfers between these accounts are processed
            instantly.
          </p>

        </div>

        {/* Amount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300 ">
            Amount
          </label>
          <input
            disabled = {isReviewed}
            value={amountTransfer}
            onChange={(e) => {
              setAmountTransfer(e.target.value)
            }}
            type="number"
            required
            className=" w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 "

            placeholder="Enter Reciver's Account No. "
          />

        </div>
        <div className="flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400"/>
            Secure transfer verification enabled
          </span>

          <button 
            type="button"
            onClick={() =>setIsReviewOn(true)}
            className="rounded-xl px-5 py-3 bg-blue-500 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 hover:cursor-pointer">
            Review transfer
          </button>
        </div>

      </form>

    </section>
  )
}

export default TransferForm
