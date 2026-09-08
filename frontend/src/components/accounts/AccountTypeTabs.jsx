const AccountTypeTabs = ({selectedAccountId, setSelectedAccountId, accounts}) => {
  return (
    <div className="flex w-fit max-w-full overflow-x-auto gap-2 border border-slate-800 bg-slate-900 p-2 rounded-xl ">
      {accounts.map((account)=>(
        <button
          type="button" 
          onClick={() => setSelectedAccountId(account.id)}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
          account.id === selectedAccountId 
          ? "bg-slate-950 text-slate-100 shadow-sm"
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:cursor-pointer"
          }`} >

          {account.name}
          
        </button>
      ))}

    </div>

  )
}

export default AccountTypeTabs
