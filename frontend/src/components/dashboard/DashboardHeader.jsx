import { useState } from "react"
import { Bell, Landmark } from "lucide-react";
import UserMenu from "./userProfile/UserMenu";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const DashboardHeader = ({ menuOpen, setMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { user, signOut } = useAuth()
  const initialUserNameLetter = user?.name?.charAt(0).toUpperCase()
  const navigate = useNavigate()

  const onSignOut = async() =>{
    await signOut()
    navigate("/", {replace:true})

  }
  return (
    <header className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button" 
            onClick={()=> setMenuOpen(prev => !prev)}
            aria-expanded={menuOpen}
            className="px-3 py-2 border border-slate-700 rounded-lg lg:hidden "
            aria-label="toggle-navigation">
        

            ☰
        
          </button>

          <div className=" flex items-center gap-3 text-xl font-semibold lg:hidden">

            <span className="grid place-items-center h-8 w-8 rounded-lg bg-blue-500 text-slate-950">
              <Landmark size={18}/>
            </span>
            NovaBank 
          </div>


        </div>
        <div className=" flex items-center ">

          <button className=" relative hidden h-12 w-12 rounded-full bg-slate-800  sm:flex items-center justify-center">

            <Bell size={18}/>

            <span className="absolute -top-1 -right-1 h-5 w-5 flex justify-center items-center  rounded-full bg-red-400 text-xs text-slate-950">
              3
            </span>

          </button>

          <div className="relative ml-4">

            <button
            type="button"
            aria-label="Open profile"
            aria-pressed={isProfileOpen}
            onClick={() => setIsProfileOpen((open) => !open)}
            className="group relative ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/25 font-semibold text-blue-200 transition hover:cursor-pointer"
          >
            <span className="relative z-10">{initialUserNameLetter}</span>

            <span
              className={`pointer-events-none absolute -inset-1 rounded-full bg-slate-200/10 transition duration-200 ${
                isProfileOpen
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-60"
              }`}
            />
          </button>
          {isProfileOpen && <UserMenu user={user} onSignOut={onSignOut} onProfile={()=>{}} />}


          </div>

        </div>
        

      </div> 





    </header>
    
  )
}

export default DashboardHeader
