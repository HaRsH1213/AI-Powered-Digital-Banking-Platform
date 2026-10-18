import { Landmark, LogOut, Menu } from "lucide-react"

const AdminHeader = ({ user, onSignOut, menuOpen, setMenuOpen }) => (
  <header className="min-h-12 flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <button 
        type="button"
        aria-label="Toggel Navigation"
        onClick={()=> setMenuOpen((open) => !open)}
        className="rounded-xl border border-slate-700 p-2.5 text-slate-300 transition hover:text-slate-800 lg:hidden">
        <Menu size={19} />
      </button>

      <div className="flex items-center gap-2.5 font-semibold text-slate-100 lg:hidden">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500 text-slate-950"><Landmark size={17} /></span>
          NovaBank
      </div>

      <div className="hidden lg:block">
        <p className="text-sm text-slate-400"> Operations WorkSpace</p>
        <p className="text-xs text-slate-600">Admin Portal</p>
      </div>

    </div>

    <div className="flex items-center gap-3 ">
      <div className="hidden lg:block">
        <p className="text-sm font-medium text-slate-200">{user?.name || "Administrator"}</p>
        <p className="text-xs text-slate-500">System administrator</p>
      </div>

      <span className="grid place-items-center h-10 w-10 rounded-full border border-blue-300/15 bg-blue-500/20 font-semibold text-blue-200">
        {user?.name?.charAt(0)?.toUpperCase() || "A"}
      </span>

      <button
        type="button"
        onClick={onSignOut} 
        className="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2.5 text-sm text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-200 ">
        <LogOut size={16} />
        <span className="hidden sm:inline">Sign out</span>
      </button>


    </div>

  </header>
)

export default AdminHeader
