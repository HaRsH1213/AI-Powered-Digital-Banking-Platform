import { Landmark, LayoutDashboard, UsersRound, WalletCards, ArrowLeftRight } from "lucide-react"
import { NavLink  } from 'react-router-dom'

const navitems = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin", enabled: true },
  { label: "Customers", icon: UsersRound, path: "/admin/customers", enabled: true },
  { label: "Accounts", icon: WalletCards, enabled: false },
  { label: "Transactions", icon: ArrowLeftRight, enabled: false }
]

const AdminSidebar = ({ isMenuOpen, setIsMenuOpen }) => (
  <>
    {isMenuOpen && (
      <button 
        type="button"
        aria-label= "Close navigation"
        onClick={() => setIsMenuOpen(false)}
        className=" fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden "/>
    )}

    <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] border border-slate-800 bg-slate-900 p-6 lg:sticky lg:h-screen lg:top-0 transition transform duration-300 lg:translate-x-0 ${
      isMenuOpen
        ? "translate-x-0"
        : "-translate-x-full"
      }`}>

      <div className="flex items-center gap-3 text-xl font-semibold text-slate-100 ">
        <span className="grid place-items-center h-9 w-9 rounded-xl bg-blue-500 text-slate-950">
          <Landmark size={20} />
        </span>
        NovaBank
      </div>

      <div className="mt-10 rounded-2xl border border-blue-400/15 bg-blue-500/10 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-blue-300">Workspace</p>
        <p className="mt-1.5 font-medium text-slate-100">Admin Portal</p>
      </div>

      <nav className="mt-8 space-y-1 " aria-label="Admin navigation" >
        {navitems.map((item) => {
          const contents = <>
            <span className="flex items-center gap-3">
              <span className="w-5 text-center"><item.icon size={18}/></span>
              {item.label}
            </span>
            {!item.enabled && <span className="text-[10px] text-slate-600">Soon</span>}
          </>

          return item.enabled ? (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({isActive})=> `mt-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-blue-500/15 text-blue-300"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {contents}
            </NavLink>
          ) : (
            <div key={item.label} title="Coming soon" className="mt-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-500">
              {contents}
            </div>
          )
        })}

      </nav>

    </aside>
  </>
)

export default AdminSidebar
