import Sidebar from "../components/dashboard/Sidebar"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useState } from "react"
import TransactionHeader from "../components/transactions/TransactionHeader"
import TransactionFilters from "../components/transactions/TransactionFilters"


const TransactionsPage = () => {
  const [navIndex, setNavIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  return (
    <DashboardLayout>
      <Sidebar menuOpen={menuOpen} navIndex = {navIndex} setNavIndex = {setNavIndex} />
      {menuOpen &&(
        <div onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-10 bg-black/50 lg:hidden">

        </div>
      )}

      <section className="min-w-0 p-4 sm:p-6 lg:p-10">
        <TransactionHeader setMenuOpen={setMenuOpen}  />
        <TransactionFilters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter}  />

      </section>

    </DashboardLayout>
  )
}

export default TransactionsPage
