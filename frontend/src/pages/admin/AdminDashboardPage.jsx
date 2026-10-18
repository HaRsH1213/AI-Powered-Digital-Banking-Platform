import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Activity, CircleAlert, IndianRupee, UsersRound, WalletCards } from "lucide-react"
import { useAuth } from "../../context/AuthProvider"
import { getAdminOverview } from "../../services/admin.service"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import AdminSidebar from "../../components/admin/layout/AdminSidebar"
import AdminHeader from "../../components/admin/layout/AdminHeader"
import AdminStatCard from "../../components/admin/overview/AdminStatCard"
import AdminActivityTable from "../../components/admin/overview/AdminActivityTable"

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
const number = new Intl.NumberFormat("en-IN")

const AdminDashboardPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const {user, signOut} = useAuth()
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchAdminstatsData = async () =>{
      try {
      const data = await getAdminOverview()
      console.log(data);
      
      setOverview(data)

      
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We couldn’t load the admin overview. Please try again.")
    } finally{
      setLoading(false)
    }
    }

    fetchAdminstatsData()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/', {replace: true})
  }

  const stats = overview ? [
    {label: "Customers", value: number.format(overview.totalCustomers), detail : `${number.format(overview.unverifiedCustomers)} email${overview.unverifiedCustomers === 1 ? "" : "s"} awaiting verification` , icon: UsersRound, tone: "blue" },
    {label: "Active Accounts", value: number.format(overview.activeAccounts), detail: "Across customer profiles", icon: WalletCards, tone: "violet"},
    {label: "Customer Balance", value: number.format(overview.totalCustomerBalance), detail: "Derived from posted ledger entries", icon: IndianRupee, tone: "emerald"},
    { label: "Completed · 24 hours", value: number.format(overview.successTransLast24H), detail: `${number.format(overview.rejectedTransLast24H)} failed or rejected in the same period`, icon: Activity, tone: "amber" }
  ] : []
  return (
    <DashboardLayout>
      <AdminSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <section className="min-w-0 p-4 sm:p-6 lg:p-10">
        <AdminHeader user={user} onSignOut={handleSignOut} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <main className="mx-auto mt-8 max-w-[1400px]">
          <div className=" mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-blue-300">Bank operations</p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight text-slate-100 sm:text-4xl">Admin Overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">A live snapshot of customers, account balances and transaction activity</p>

            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-2.5 text-xs text-slate-400">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Protected staff workspace
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {loading 
              ? Array.from({length:4}, (_, index)=> <div className="h-36 animate-pulse rounded-2xl border border-slate-800 bg-slate-900"/>)
              : stats.map((stat)=><AdminStatCard label={stat.label} value={stat.value} detail={stat.detail} Icon={stat.icon} tone={stat.tone} />)
            }

          </div>

          {!loading && !error && overview && (
            <div className="mt-6"> 
              <AdminActivityTable transactions={overview.recentTransactions} />

            </div>
          ) }

        </main>

      </section>

    </DashboardLayout>
    
  )
}

export default AdminDashboardPage
