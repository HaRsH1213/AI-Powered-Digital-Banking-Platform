import { LogOut, UserRound } from "lucide-react"

const UserMenu = ({ user, onProfile, onSignOut }) => {
  const initial = user?.name?.charAt(0).toUpperCase()
  return (
    <div
      className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/40"
      role="menu"
      aria-label="User menu"
    >
      <div className="flex items-center gap-3 border-b border-slate-800 px-3 py-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20 font-semibold text-blue-200 ring-1 ring-blue-400/20">
          {initial}
        </span>

        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-100">
            {user?.name}
          </p>

          <p className="mt-0.5 truncate text-sm text-slate-400">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onProfile}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-slate-100"
          role="menuitem"
        >
          <UserRound size={18} className="text-slate-400" />
          Profile
        </button>

        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200 hover:cursor-pointer"
          role="menuitem"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default UserMenu