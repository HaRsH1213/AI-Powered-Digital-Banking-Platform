import { Plus } from 'lucide-react'

const AddAccountButton = ({ onAddAccount }) => {
  return (
    <button
      type="button"
      onClick={onAddAccount}
      className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 hover:cursor-pointer"
    >
      <Plus size={18} />
      Add new account
    </button>
  )
}

export default AddAccountButton
