const AccountTypeTabs = ({accountType, onChange}) => {
  return (
    <div className="flex gap-1 bg-slate-800 p-1 rounded-xl" aria-label="Choose your Account Type">
      <button onClick={()=>{
        onChange('user')
      }} className={`flex-1 py-3 text-sm rounded-lg transition ${
        accountType ==="user" 
        ? "bg-slate-700 text-white shadow"
        : "text-slate-300 hover:bg-slate-700/60"
      } `}> User Banking</button>
      <button onClick={()=>{
        onChange('admin')
      }} className={`flex-1 py-3 text-sm rounded-lg transition ${
        accountType ==="admin" 
        ? "bg-slate-700 text-white shadow"
        : "text-slate-300 hover:bg-slate-700/60"
      } `}> Admin Portal</button>
      
    </div>
  )
}

export default AccountTypeTabs
