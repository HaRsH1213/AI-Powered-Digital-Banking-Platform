import { Send, CirclePlus, FileText } from "lucide-react";
const QuickActions = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <button
        className="flex items-center justify-center gap-2 py-2 text-sm text-slate-300 font-medium transition hover:text-blue-300 hover:cursor-pointer"
      >
        <Send size={13} />
        <span>Transfer</span>
      </button>

      <button
        className="flex items-center justify-center gap-2 py-2 text-sm text-slate-300 font-medium transition hover:text-blue-300 hover:cursor-pointer"
      >
        <CirclePlus size={13} />
        <span>Add money</span>
      </button>

      <button
        className="flex items-center justify-center gap-2 py-2 text-sm text-slate-300 font-medium transition hover:text-blue-300 hover:cursor-pointer"
      >
        <FileText size={13} />
        <span>Statements</span>
      </button>
    </div>
  )
}

export default QuickActions
