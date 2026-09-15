import {Shield, MoreHorizontal } from "lucide-react"
import getBalance from "../../../services/accountBalance.service"
import { useState, useEffect } from "react"
const EmergencyAccountCard = ({account}) => {
    const [balance, setBalance] = useState(0)
    const accountNumber = account.accountNumber
      useEffect(() => {
        const fetchBalance = async ()=> {
          try {
            const response = await getBalance(accountNumber)
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
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-purple-500/15 " >

                    <Shield className="text-purple-300" />

                </div>
                <div className=" ml-3">
                    <h2 className="text-lg font-semibold">{account.accountName}</h2>
                    <p>{account.accountNumber}</p>

                </div>

            </div>

            <button 
                type="button" 
                aria-label="More option for Emergency accounts"
            >
                <MoreHorizontal className="text-slate-500"/>

            </button>
        </div>

        <p className="mt-5 text-2xl font-semibold "> {`₹ ${balance}`} </p>
    
    </article>
  )
}

export default EmergencyAccountCard
