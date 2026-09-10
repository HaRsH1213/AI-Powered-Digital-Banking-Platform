import { NavLink  } from 'react-router-dom'
import {Landmark, Banknote, LayoutDashboard, Settings, WalletCards} from 'lucide-react'

const Sidebar = ({menuOpen, setMenuOpen }) => {
  const navItems = [
    {label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    {label: "Accounts", icon: WalletCards, path: "/accounts"},
    {label: "Transactions", icon: Banknote, path: "/transactions"},
    {label: "Suuport", icon: Settings, path: "/support"}
  ]
  return (
    <aside className={`fixed inset-y-0 left-0 z-50  w-[250px] p-8 border-r border-slate-800 bg-slate-900 transition-transform lg:sticky lg:h-screen lg:block lg:w-auto lg:translate-x-0 
    ${menuOpen 
      ? "translate-x-0"
      : "-translate-x-full"
    } `}>

      <div className=" flex items-center gap-3 text-xl font-semibold ">

        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500 text-slate-950">
        <Landmark size={18}/>
        </span>
        NovaBank 
      </div>


      <nav className="mt-12">

        {
        navItems.map((item)=>(
          <NavLink
            key={item.path}
            to={item.path}
          
            onClick={()=>{
              setMenuOpen(false)
            }} 
            className={({isActive}) => `flex w-full items-center gap-3 rounded-xl px-4 py-2 mt-1 text-left text-sm hover:cursor-pointer transition ${
              isActive
                ? "bg-blue-500/15 text-blue-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}  >

            <span className="w-5 text-center">
              <item.icon size={18} />
            </span>


            {item.label}
          </NavLink>
        ))
        
        }
      </nav>
      <div className= "absolute bottom-6 right-6 left-6 p-4 rounded-xl bg-slate-800 text-sm text-slate-300">
        <span className="mr-2 text-emerald-400">♢</span>
        Secure account access
      </div>

    </aside>
  )
}

export default Sidebar
