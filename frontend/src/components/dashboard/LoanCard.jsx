import  {MoveRight} from "lucide-react"
const LoanCard = () => {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Loans centre</h2>
        <span className="text-sm text-slate-400"> AI-assisted review</span>
      </div>
      <div className="rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 p-6 sm:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className=" rounded-full px-4 py-2 bg-slate-700 text-xs text-slate-200 font-semibold tracking-wide ">
            PERSONAL LOAN
          </span>

          <span className="rounded-full bg-slate-700/70 text-xs text-slate-300 px-4 py-2">
            ✦ AI-assisted review
          </span>
        </div>
        <h3 className="mt-2 text-2xl font-bold ">
          Plan your next step
        </h3>
        <p className="mt-3 text-slate-400 max-w-2xl ">
          Apply in minutes. Your application is securely assessed for
          affordability and fraud risk.

        </p>
        <button
          type="button"
          className="group flex items-center mt-6 rounded-xl bg-blue-500 px-5 py-3 text-slate-950  font-medium transition hover:bg-blue-400 hover:cursor-pointer">
          <span>Explore</span>
          <MoveRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" size={20} />
        </button>
      </div>

    </section>
  )
}

export default LoanCard
