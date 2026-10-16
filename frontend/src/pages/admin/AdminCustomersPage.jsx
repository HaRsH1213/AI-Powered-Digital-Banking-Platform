import { useEffect, useState } from "react"
import { replace, useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import AdminSidebar from "../../components/admin/layout/AdminSidebar"
import AdminHeader from "../../components/admin/layout/AdminHeader"
import CustomerDetailsModal from "../../components/admin/customers/CustomerDetailsModal"
import CustomersPageHeader from "../../components/admin/customers/CustomersPageHeader"
import CustomerFilters from "../../components/admin/customers/CustomerFilters"
import CustomerRow from "../../components/admin/customers/CustomerRow"
import CustomerPagination from "../../components/admin/customers/CustomerPagination"
import { CustomerEmptyState, CustomerErrorState, CustomerLoadingState } from "../../components/admin/customers/CustomerStates"
import { useAuth } from "../../context/AuthProvider"
import { getAdminCustomers } from "../../services/admin.service"

const AdminCustomersPage = () => {
  const {user, signOut} = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleSignOut = async() =>{
    await signOut()
    navigate("/", {replace:true})
  }
  return (
    <DashboardLayout>
      <AdminSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  />
      <section className="p-4 sm:p-6 lg:p-8">
        <AdminHeader user={user} onSignOut={handleSignOut} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <main className="mx-auto mt-8 max-w-350">
          <CustomersPageHeader/>
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/10 ">
          

          </section>
          
        </main>
      </section>
    </DashboardLayout>
  )
}

export default AdminCustomersPage
