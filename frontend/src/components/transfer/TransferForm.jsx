import { ArrowDown, ShieldCheck } from "lucide-react"
const TransferForm = () => {
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
      <form>
        <div >
          <label className="mb-2 block text-sm font-medium text-slate-300 ">
            From Account
          </label>
          <div className=" flex flex-col gap-2 ">
            <select className=" w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30">

            </select>
            <span className="text-xs text-emerald-300 whitespace-nowrap">
              ₹
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
          <input className=" w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 "
            placeholder="Enter Reciver's Account No. "
            />
        </div>

      </form>

    </section>
  )
}

export default TransferForm
