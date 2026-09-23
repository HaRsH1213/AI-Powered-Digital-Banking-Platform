import Sidebar from "../components/dashboard/Sidebar"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useEffect, useState } from "react"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionFilters from "../components/transactions/TransactionFilters"
import TransactionList from "../components/transactions/TransactionList"
import { transactionData } from "../data/transactions"
import TransactionDetailsModal from "../components/transactions/TransactionDetailsModal"
import fetchTrnsactions from "../services/fetchTransactions.service"
// import {Download} from "lucide-react"


const TransactionsPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const [selected, setSelected] = useState(null)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
      const fetchTransactionsData = async ()=>{
        try {
          const response = await fetchTrnsactions()
          setTransactions(response)
          console.log(response);
          
        } catch (error) {
          console.log("Something went wrong while fetch transactions", error);
          
          
        }
        
      }
  
      fetchTransactionsData()
    },[])


  const filterTransactions = transactions.filter((transaction)=>{
    const query = search.toLowerCase().trim()

    // Search by Name, Amount, or Transaction ID

    const matchesSearch = !query || 
    transaction.to.holderName.toLowerCase().trim().includes(query) || 
    transaction.amount.toLowerCase().trim().includes(query)||
    transaction.id.toLowerCase().trim().includes(query)

     // Filter by Transaction Type
    const matchesFilter = filter === "All" ||( filter === "Credit" && transaction.direction === "INCOMING") || (filter === "Debit" && transaction.direction === "OUTGOING")



    return matchesFilter && matchesSearch

  })
  return (
    <DashboardLayout>
      <Sidebar menuOpen={menuOpen} setMenuOpen  = {setMenuOpen } />
      {menuOpen &&(
        <div onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-10 bg-black/50 lg:hidden">

        </div>
      )}

      <section className="min-w-0 p-4 sm:p-6 lg:p-10">
        <TransactionHeader setMenuOpen={setMenuOpen}  />
        <TransactionFilters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter}  />

        {/* Transactions List */}
        <div className=" mt-6">

          {filterTransactions.length === 0 ? (
            <p className="p-6 text-center text-slate-400">
              No transactions found.
            </p>
          ) : (
            <TransactionList
              transactions={filterTransactions}
              setSelected={setSelected}
            />
          )}


        </div>

        <TransactionDetailsModal transaction={selected} onClose={() => setSelected(null)} />
          
        {/* <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-400 sm:ml-auto sm:w-auto"
        >
          <Download size={18} />
          Download statement
        </button> */}

      </section>

    </DashboardLayout>
  )
}

export default TransactionsPage
