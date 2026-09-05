const Sidebar = ({menuOpen,navIndex, setNavIndex}) => {
  return (
    <aside className={`absolute inset-y-0 left-0 z-20  w-[250px] p-8 border-r border-slate-800 bg-slate-900 transition-transform lg:static lg:block lg:w-auto lg:translate-x-0 
    ${menuOpen 
      ? "translate-x-0"
      : "-translate-x-full"
    } `}>

      <div className=" flex items-center gap-3 text-xl font-semibold ">

        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500 text-slate-950">
        ▥
        </span>
        NovaBank 
      </div>


      <nav className="mt-12">

        {
        [
        "Overview",
        "Accounts",
        "Transfers",
        "Transactions",
        "Loans",
        "Settings"
        ].map((item, index)=>(
          <button
          onClick={()=>{
            setNavIndex(index)
          }}
          key={item}
          type="button" 
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-2 mt-1 text-left text-sm hover:cursor-pointer transition ${
            index === navIndex
              ? "bg-blue-500/15 text-blue-300"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}  >

          <span className="w-5 text-center">
            {["⌂", "▣", "↗", "◷", "▱", "⚙"][index]}
          </span>


            {item}
          </button>
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
