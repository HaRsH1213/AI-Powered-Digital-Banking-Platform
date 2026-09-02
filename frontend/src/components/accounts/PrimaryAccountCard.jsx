import {PiggyBank, MoreHorizontal} from "lucide-react"
const PrimaryAccountCard = ({account}) => {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-slate-600 ">
      <div className="flex justify-between ">
        <div className="flex items-center">
          <div className="grid place-items-center w-12 h-12 rounded-xl bg-blue-500/15 " >
            <PiggyBank className="text-blue-500" />

          </div>
          <div className=" ml-3">
            <h2 className="text-lg font-semibold">Primary Saving</h2>
            <p>{account.number}</p>

          </div>

        </div>

        <button 
          type="button" 
          aria-label="more option for primary accounts"
        >
          <MoreHorizontal className="text-slate-500"/>

        </button>
      </div>

      <p className="mt-5 text-2xl font-semibold "> {account.balance} </p>

    </article>
  )
}

export default PrimaryAccountCard
