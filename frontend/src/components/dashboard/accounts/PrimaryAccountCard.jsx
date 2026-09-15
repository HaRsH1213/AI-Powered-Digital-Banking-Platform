import {PiggyBank, MoreHorizontal} from "lucide-react"
import { useEffect } from "react"
import getBalance from "../../../services/accountBalance.service"
import { useState } from "react"
const PrimaryAccountCard = ({account}) => {
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
          <div className="grid place-items-center w-12 h-12 rounded-xl bg-blue-500/15 " >
            <PiggyBank className="text-blue-500" />

          </div>
          <div className=" ml-3">
            <h2 className="text-lg font-semibold">{account.accountName}</h2>
            <p>{account.accountNumber}</p>

          </div>

        </div>

        <button 
          type="button" 
          aria-label="more option for primary accounts"
        >
          <MoreHorizontal className="text-slate-500"/>

        </button>
      </div>

      <p className="mt-5 text-2xl font-semibold "> {`₹ ${balance}`} </p>

    </article>
  )
}

export default PrimaryAccountCard
