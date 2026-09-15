import {X} from "lucide-react"
const TransferSummary = () => {
  return (
    <div className="fixed inset-0 z-120 p-4 flex justify-center items-center bg-slate-950/70 backdrop-blur-sm">
      <aside className="w-full max-w-lg h-full max-h-[62vh] rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
        <div className="flex items-center justify-between ">
          <div>
            <p className="text-sm text-slate-400">
              Transfer summary
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              Ready to review
            </h2>

          </div>
          <X size={22} className="text-slate-600 hover:text-slate-400"/>

        </div>
      </aside>
    </div>
  )
}

export default TransferSummary
