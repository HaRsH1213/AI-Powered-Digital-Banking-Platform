const AdminStatCard = ({ label, value, detail, icon, tone = "blue" }) => {
  const tones = {
    blue: "bg-blue-500/10 text-blue-300 ring-blue-400/10",
    emerald: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/10",
    violet: "bg-violet-500/10 text-violet-300 ring-violet-400/10",
    amber: "bg-amber-500/10 text-amber-300 ring-amber-400/10"
  }

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-lg shadow-black/10 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 break-words text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">{value}</p>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${tones[tone]}`}><icon size={20} /></span>
      </div>
      <p className="mt-4 text-xs text-slate-500">{detail}</p>
    </article>
  )
}

export default AdminStatCard
