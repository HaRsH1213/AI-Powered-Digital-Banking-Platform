import { CircleAlert, Landmark } from "lucide-react"
import { useState } from "react"
import createAccount from "../../../services/createAccount.service"
import AccountKindSelector from "./AccountKindSelector"

const CreateAccountForm = ({ onCreated, onCancel, accountName, setAccountName, accountType, setAccountType, accountKind, setAccountKind, state, setState, error, setError, setTransferStatus, resetForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitHandler = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setTransferStatus("creating")
    setError("")

    try {
      const account = await createAccount({
        accountName,
        accountType,
        accountKind,
        state,
      })
      
      setTimeout(() => {
        setTransferStatus("created")
      }, 2000)
      
      setTimeout(()=>{
        onCreated(account)
        resetForm()
      },5000)
      // onCreated(account)
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create the account. Please try again.")
      setTimeout(() => {
        setTransferStatus("error")
      }, 2000)
      setTransferStatus('idle')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={submitHandler} className="space-y-5 p-5 sm:p-7">
      <div>
        <label htmlFor="account-name" className="mb-2 block text-sm font-medium text-slate-300">
          Account name
        </label>
        <input
          id="account-name"
          type="text"
          value={accountName}
          onChange={(event) => setAccountName(event.target.value)}
          placeholder="For example, Primary Savings Account, Salary Account, etc."
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        />
      </div>

      <div>
        <label htmlFor="account-type" className="mb-2 block text-sm font-medium text-slate-300">
          Account type
        </label>
        <select
          id="account-type"
          value={accountType}
          onChange={(event) => setAccountType(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        >
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>
      </div>

      <AccountKindSelector accountKind={accountKind} setAccountKind={setAccountKind} />

      <div>
        <label htmlFor="account-branch" className="mb-2 block text-sm font-medium text-slate-300">
          Branch
        </label>
        <select
          id="account-branch"
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
        >
          <option value="DELHI">Delhi</option>
          <option value="MUMBAI">Mumbai</option>
          <option value="INDORE">Indore</option>
        </select>
      </div>

      <div className="flex gap-3 rounded-xl border border-blue-500/25 bg-blue-500/10 p-3 text-xs leading-relaxed text-blue-200">
        <Landmark size={18} className="shrink-0 text-blue-400" />
        Your account number and branch IFSC code are securely generated when the account is created.
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-300" role="alert">
          <CircleAlert size={17} />
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </div>
    </form>
  )
}

export default CreateAccountForm
