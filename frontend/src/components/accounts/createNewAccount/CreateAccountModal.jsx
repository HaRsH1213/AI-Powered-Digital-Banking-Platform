import { X } from "lucide-react"
import CreateAccountForm from "./CreateAccountForm"
import { useState } from "react"
import NewAccountStatus from "./NewAccountStatus"

const CreateAccountModal = ({ isOpen, onClose, onCreated }) => {
  const [accountName, setAccountName] = useState("")
  const [accountType, setAccountType] = useState("Savings")
  const [accountKind, setAccountKind] = useState("Savings")
  const [state, setState] = useState("DELHI")
  const [error, setError] = useState("")
  const [transferStatus, setTransferStatus] = useState("idle")

  const resetForm = () =>{
    setAccountName("")
    setAccountType("Savings")
    setAccountKind("Savings")
    setState("DELHI")
    setError("")
    setTransferStatus("idle")
  }

  return (
    <div className={`fixed inset-0 z-100 grid place-items-center bg-slate-950/75 p-4 backdrop-blur-sm sm:p-6 transition-opacity ease-out duration-300 ${
      isOpen 
        ? "opacity-100"
        : "opacity-0 pointer-events-none"
    }`}>
      <section
        className={`relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50 sm:rounded-3xl transform transition-all ease-out duration-300 ${
          isOpen 
            ? "translate-z-0 opacity-100 scale-100"
            : "translate-z-10 opacity-0 scale-90"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-account-title"
        >
        <header className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="text-xs text-slate-400">NovaBank accounts</p>
            <h2 id="create-account-title" className="mt-1 text-xl font-semibold sm:text-2xl">
              Create new account
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create account form"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
          >
            <X size={21} />
          </button>
        </header>

        <CreateAccountForm 
          onCreated={onCreated} 
          onCancel={onClose} 
          accountName={accountName} 
          setAccountName={setAccountName} 
          accountType={accountType} 
          setAccountType={setAccountType} 
          accountKind={accountKind} 
          setAccountKind={setAccountKind} 
          state={state} 
          setState={setState} 
          error={error} 
          setError={setError} 
          setTransferStatus={setTransferStatus}
          resetForm = {resetForm}
        />
        <NewAccountStatus status={transferStatus} />
      </section>
    </div>
  )
}

export default CreateAccountModal
