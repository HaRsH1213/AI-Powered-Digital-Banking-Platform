import { Landmark, LayoutDashboard, UsersRound, WalletCards, ArrowLeftRight, ShieldCheck } from "lucide-react"
import { NavLink  } from 'react-router-dom'

const navitems = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin" },
  { label: "Customers", icon: UsersRound, path: "/" },
  { label: "Accounts", icon: WalletCards, path: "/" },
  { label: "Transactions", icon: ArrowLeftRight, path: "/" }
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
        {navitems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive})=> `flex w-full items-center gap-3 rounded-xl px-4 py-2 mt-1 text-sm transition ${
              isActive
                ? "bg-blue-500/15 text-blue-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 "
          } `}>


            <span className="w-5 text-center">
              <item.icon size={18}/>
            </span>
            {item.label}
          </NavLink>
          
        ))}

      </nav>

    </aside>
  </>
)

export default AdminSidebar
