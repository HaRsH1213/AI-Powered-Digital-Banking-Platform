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
  const [searchInput, setsearchInput]= useState("")
  const [selectFilter, setSelectFilter] = useState("")
  const [customerData, setCustomerData] = useState(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState(null)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(()=>{
      setPage(1)
      setsearchInput(searchInput.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])
  
  useEffect(() => {
    
    const fetchCustomerData = async () =>{
      try {
        setLoading(true)
        setError("")
        const adminCustomers = await getAdminCustomers({page, searchInput, selectFilter})
        setCustomerData(adminCustomers)
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load customers. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchCustomerData()
  }, [page, searchInput, selectFilter, refreshKey])
  console.log(customerData);
  
  
  
  const handleSignOut = async() =>{
    await signOut()
    navigate("/", {replace:true})
  }

  const pagination = customerData?.pagination
  return (
    <DashboardLayout>
      <AdminSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}  />
      <section className="p-4 sm:p-6 lg:p-8">
        <AdminHeader user={user} onSignOut={handleSignOut} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <main className="mx-auto mt-8 max-w-350">
          <CustomersPageHeader/>
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/10 ">
            <CustomerFilters searchInput={searchInput} setsearchInput = {setsearchInput} selectFilter={selectFilter} setSelectFilter = {setSelectFilter} />
            {error ? (
              <CustomerErrorState message={error} onRetry={()=> setRefreshKey((current) => current + 1)} />
            ): loading ? (
              <CustomerLoadingState/>
            ): customerData?.customers?.length ? (
              <>
                <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(130px,1fr)_110px_100px_100px] gap-4 border-b border-slate-800 bg-slate-950/35 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:grid">
                  <span>Customer</span><span>Joined</span><span>Accounts</span><span>Verification</span><span className="text-right">Details</span>
                </div>
                <div className="divide-y divide-slate-800/80">
                  {customerData.customers.map((customer)=>(
                    <CustomerRow key={customer.id} customer={customer} onViewCustomer={setSelectedCustomerId} />
                  ))}

                </div>
                <CustomerPagination page={page} pagination={pagination} setPage={setPage} />
              </>
            ):(
              <CustomerEmptyState/>
            )}
          </section>
          
        </main>
      </section>

      {selectedCustomerId && <CustomerDetailsModal customerId={selectedCustomerId} onClose={() => setSelectedCustomerId(null)} />}
    </DashboardLayout>
  )
}

export default AdminCustomersPage
