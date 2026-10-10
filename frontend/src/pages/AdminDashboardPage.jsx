import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Activity, CircleAlert, IndianRupee, UsersRound, WalletCards } from "lucide-react"
import { useAuth } from "../context/AuthProvider"
import { getAdminOverview } from "../services/admin.service"
import DashboardLayout from "../components/dashboard/DashboardLayout"
import AdminSidebar from "../components/admin/AdminSidebar"
import AdminHeader from "../components/admin/AdminHeader"
import AdminStatCard from "../components/admin/AdminStatCard"
import AdminActivityTable from "../components/admin/AdminActivityTable"

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
const number = new Intl.NumberFormat("en-IN")

const AdminDashboardPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  

  useEffect(() => {
  }, [])

  const handleSignOut = async () => {
  }


  return (
    <DashboardLayout>
      <AdminSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <section className="min-w-0 p-4 sm:p-6 lg:p-10">
        <AdminHeader />
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
              : ""
            }

          </div>

        </main>

      </section>

    </DashboardLayout>
    
  )
}

export default AdminDashboardPage
