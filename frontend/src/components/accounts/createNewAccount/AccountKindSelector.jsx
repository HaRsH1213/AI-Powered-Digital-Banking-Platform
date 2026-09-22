import { BriefcaseBusiness, PiggyBank, ShieldCheck } from "lucide-react"

const accountKinds = [
  { value: "Savings", label: "Savings", icon: PiggyBank },
  { value: "Salary", label: "Salary", icon: BriefcaseBusiness },
  { value: "Emergency", label: "Emergency", icon: ShieldCheck },
]

const AccountKindSelector = ({ accountKind, setAccountKind }) => {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-slate-300">Account category</p>

      <div className="grid grid-cols-3 gap-2">
        {accountKinds.map(({ value: kind, label, icon: Icon }) => (
          <button
            key={kind}
            type="button"
            onClick={() => setAccountKind(kind)}
            className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-xs font-medium hover:cursor-pointer transition ${
              accountKind === kind
                ? "border-blue-400 bg-blue-500/15 text-blue-200"
                : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-slate-200"
            }`}
          >
            <Icon size={19} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AccountKindSelector
