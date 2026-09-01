import { Bell } from "lucide-react";
const DashboardHeader = ({menuOpen, setMenuOpen}) => {
  return (
    <header className=" flex items-center mb-8 justify-between"> 
      <button
        type="button" 
        onClick={()=> setMenuOpen(prev => !prev)}
        className="px-3 py-2 border border-slate-700 rounded-lg lg:hidden "
        aria-label="toogle-navigation">
        

        ☰
        
      </button>


      <div>
        <p className="text-sm text-slate-400 ">

          Welcome Back, Harsh

        </p>

        <h1 className=" text-3xl mt-1 font-semibold sm:text-4xl leading-tight">

          Your money, clearly managed. 
          
        </h1>
      </div>


      <div className=" flex items-center ">

        <button className=" relative hidden h-12 w-12 rounded-full bg-slate-800  sm:flex items-center justify-center">

          <Bell size={18}/>

          <span className="absolute -top-1 -right-1 h-5 w-5 flex justify-center items-center  rounded-full bg-red-400 text-xs text-slate-950">
            3
          </span>

        </button>

        <span className="flex justify-center items-center w-12 h-12 rounded-full bg-blue-500/25 font-semibold text-blue-200 sm:ml-4">
          H
        </span>

      </div>

    </header>
    
  )
}

export default DashboardHeader
