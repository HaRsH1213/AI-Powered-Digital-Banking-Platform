import { useEffect, useState } from "react"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import Sidebar from "../components/dashboard/Sidebar"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import AccountTypeTabs from "../components/accounts/AccountTypeTabs"
import SelectedAccountCard from "../components/accounts/SelectedAccountCard"
import AddAccountButton from "../components/accounts/AddAccountButton"
import AccountDetails from "../components/accounts/AccountDetails"
import getAccounts from "../services/accounts.service"

const AccountsPage = () => {

  // Sidebar State
  const [menuOpen, setMenuOpen] = useState(false)

  const [accounts, setAccounts] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const [isloading, setIsLoading] = useState(true)



  useEffect(() => {
      const fetchAccountsData = async ()=>{
        try {
          const response = await getAccounts()
          const accountList = Array.isArray(response) ? response : []
          setAccounts(response)
          console.log(response);
          if (accountList.length > 0) {
            setSelectedAccountId(accountList[0]?._id) // Set the first account as selected by default
          }
        } catch (error) {
          console.log("Something went wrong while fetch Account's Data ", error);
        } finally{
          setIsLoading(false)
        }
      }
      fetchAccountsData()
    },[])


  // Find Currently Selected Account
  const selectedAccount = accounts.find((account) => account._id === selectedAccountId) || null
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
          {isloading 
          ? (
            <div className="grid min-h-72 place-items-center">
              <p className="text-slate-400">Loading accounts...</p>
            </div>
          ): selectedAccount 
          ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <AccountTypeTabs selectedAccountId={selectedAccountId} setSelectedAccountId={setSelectedAccountId} accounts={accounts} />
                <AddAccountButton onAddAccount={() => {}} />
              </div>

              <SelectedAccountCard account={selectedAccount} />
              <AccountDetails account={selectedAccount} /> 
            </>
          ): (
            <div className="grid min-h-72 place-items-center text-center">
              <div>
                <h2 className="text-xl font-semibold"> No accounts found</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Create your first NovaBank account to get started.
                </p>
                <div className="mt-5">
                  <AddAccountButton onAddAccount={() => {}} />
                </div>
              </div>
            </div>
          )}
        </main>

      </section>


    </DashboardLayout>

  )
}

export default AccountsPage
