import {ArrowUpRight, BriefcaseBusiness, PiggyBank, ShieldCheck} from "lucide-react"

const icons = {
  "savings" : PiggyBank,
  "salary" : BriefcaseBusiness,
  "emergency" : ShieldCheck
}
const iconsColor = {
  "savings" : "grid place-items-center w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400",
  "salary" : "grid place-items-center w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-300",
  "emergency" : "grid place-items-center w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300"
}

const SelectedAccountCard = ({account}) => {
  const Icon = icons[account.kind] || PiggyBank
  const IconColor = iconsColor[account.kind] || iconsColor[0]
  return (
    <article className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={`${IconColor}`}>
            <Icon size={22}/>
          </span>
          <div>
            <p className="font-semibold">
              {account.name}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {account.number}
            </p>
          </div>
        </div>
        <span className="rounded-lg px-3 py-1 bg-emerald-500/15 text-sm font-medium text-emerald-400 ">
          {account.status}
        </span>
      </div>

      <div className="mt-8">
        <p className="text-sm text-slate-400">
          Available Balance
        </p>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-3xl font-semibold tracking-tight">
            {account.balance}
          </p>

          <ArrowUpRight className="text-emerald-400" size={22} />
        </div>
      </div>
    </article>

  )
}

export default SelectedAccountCard
