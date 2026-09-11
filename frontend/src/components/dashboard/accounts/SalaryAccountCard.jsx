import {Landmark, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import getBalance from "../../../services/accountBalance.service"
const SalaryAccountCard = ({account}) => {
    const [balance, setBalance] = useState(0)
    const accountId = account._id
    useEffect(() => {
        const fetchBalance = async ()=> {
        try {
            const response = await getBalance(accountId)
            console.log(response);
            setBalance(response)
            
            
        } catch (error) {
            console.log("Something went wrong while fetching a Account's Balance", error);
            
            
        }
        }

        fetchBalance()
   
    },[])
    
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-0.5 hover:border-slate-600 ">
      <div className="flex justify-between ">
            <div className="flex items-center">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-emerald-500/15 " >
                    <Landmark className="text-emerald-300" />

                </div>
                <div className=" ml-3">
                    <h2 className="text-lg font-semibold">{account.accountName}</h2>
                    <p>{account.accountNumber}</p>

                </div>

            </div>

            <button 
                type="button" 
                aria-label="More option for Salary accounts"
            >
                <MoreHorizontal className="text-slate-500"/>

            </button>
      </div>

      <p className="mt-5 text-2xl font-semibold "> {`₹ ${balance}`} </p>

    </article>
  )
}

export default SalaryAccountCard
