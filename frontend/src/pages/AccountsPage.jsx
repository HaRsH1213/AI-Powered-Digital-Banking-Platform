import { useState } from "react"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import Sidebar from "../components/dashboard/Sidebar"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import AccountTypeTabs from "../components/accounts/AccountTypeTabs"
import { accounts } from "../data/accounts"
import SelectedAccountCard from "../components/accounts/SelectedAccountCard"
import AddAccountButton from "../components/accounts/AddAccountButton"
import AccountDetails from "../components/accounts/AccountDetails"

const AccountsPage = () => {

  // Sidebar State
  const [menuOpen, setMenuOpen] = useState(false)

  // Selected Account Id by clicking AccountTypeTabs
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0].id)

  
  // Find Currently Selected Account
  const selectedAccount = accounts.find((account)=> selectedAccountId === account.id) || accounts[0]
  return (
    <DashboardLayout>
      <Sidebar menuOpen={menuOpen} setMenuOpen ={setMenuOpen } />

      {menuOpen && (
        <div onClick={()=>setMenuOpen(false)}
          className="fixed inset-0 z-10 bg-black/50 lg:hidden">

        </div>
      )}
      <section className="p-4 sm:p-6 lg:p-10 min-w-0">

        <DashboardHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="mt-5 lg:mt-0">

          <h1 className=" text-3xl mt-1 font-semibold sm:text-4xl leading-tight">

          Your Accounts
          
        </h1>
        
          <p className="mt-1 text-sm text-slate-400 ">

            Manage and review all your NovaBank accounts in one place

          </p>

      </div>

        <main className="mt-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <AccountTypeTabs selectedAccountId={selectedAccountId} setSelectedAccountId={setSelectedAccountId} accounts={accounts} />
            <AddAccountButton onAddAccount={() => {}} />
          </div>

          <SelectedAccountCard account={selectedAccount} />

          <AccountDetails account={selectedAccount} />

        </main>

      </section>


    </DashboardLayout>

  )
}

export default AccountsPage
