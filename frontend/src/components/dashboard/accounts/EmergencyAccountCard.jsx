import {Shield, MoreHorizontal } from "lucide-react"
const EmergencyAccountCard = ({account}) => {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-slate-600 ">

        <div className="flex justify-between ">
            <div className="flex items-center">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-purple-500/15 " >

                    <Shield className="text-purple-300" />

                </div>
                <div className=" ml-3">
                    <h2 className="text-lg font-semibold">Emergency Funds</h2>
                    <p>{account.number}</p>

                </div>

            </div>

            <button 
                type="button" 
                aria-label="More option for Emergency accounts"
            >
                <MoreHorizontal className="text-slate-500"/>

            </button>
        </div>

        <p className="mt-5 text-2xl font-semibold "> {account.balance} </p>
    
    </article>
  )
}

export default EmergencyAccountCard
