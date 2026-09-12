import { useEffect, useState } from "react"
import getTotalBalance from "../../services/totalAccountsBalance.service"

const BalanceCard = () => {
  const [totalBalance, setTotalBalance] = useState(0)
  useEffect(() => {
    const fetchTotalBalance = async () =>{
      try {
        const response = await getTotalBalance()
        console.log(response);
        
        setTotalBalance(response)
      } catch (error) {
        console.log("Somthing went wrong while fetching the Total balance", error);
        
      }
    }
    fetchTotalBalance()

  },[])
  
  return (
    <section className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-900  p-6 sm:p-8">
      <p className=" text-sm text-blue-100/80">Total balance accross all accounts</p>


      <div className=" mt-3 flex flex-wrap items-center justify-between  ">
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{`₹ ${totalBalance} `}</p>

        <span className="rounded-full bg-emerald-950/50 text-sm px-4 py-2 font-medium text-emerald-300"> ↗ +₹6,250 this month </span>
      </div>

    </section>
  )
}

export default BalanceCard
