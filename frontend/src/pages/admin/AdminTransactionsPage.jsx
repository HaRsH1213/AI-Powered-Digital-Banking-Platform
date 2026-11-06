import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import AdminSidebar from "../../components/admin/layout/AdminSidebar"
import AdminHeader from "../../components/admin/layout/AdminHeader"
import TransactionsPageHeader from "../../components/admin/transactions/TransactionsPageHeader"
import TransactionFilters from "../../components/admin/transactions/TransactionFilters"
import TransactionRow from "../../components/admin/transactions/TransactionRow"
import TransactionPagination from "../../components/admin/transactions/TransactionPagination"
import { TransactionEmptyState, TransactionErrorState, TransactionLoadingState } from "../../components/admin/transactions/TransactionStates"
import { useAuth } from "../../context/AuthProvider"
import { getAdminTransactions } from "../../services/admin.service"

const AdminTransactionsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("ALL")
  const [page, setPage] = useState(1)
  const [transactionData, setTransactionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [expandedTransactionId, setExpandedTransactionId] = useState(null)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      setSearch(searchInput.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true)
        setError("")
        const data = await getAdminTransactions({ page, search, status })
        setTransactionData(data)
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load transactions. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [page, search, status, refreshKey])

  const handleSignOut = async () => {
    await signOut()
    navigate("/", { replace: true })
  }

  const pagination = transactionData?.pagination

  return (
    <DashboardLayout>
      <AdminSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className="min-w-0 p-4 sm:p-6 lg:p-8">
        <AdminHeader user={user} onSignOut={handleSignOut} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <main className="mx-auto mt-8 max-w-[1400px]">
          <TransactionsPageHeader />
          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/10">
            <TransactionFilters
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              status={status}
              onStatusChange={(value) => { setPage(1); setStatus(value) }}
            />

            {loading ? (
              <TransactionLoadingState />
            ) : error ? (
              <TransactionErrorState message={error} onRetry={() => setRefreshKey((current) => current + 1)} />
            ) : transactionData?.transactions?.length ? (
              <>
                <div className="hidden gap-5 border-b border-slate-800 bg-slate-950/35 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:grid" style={{ gridTemplateColumns: "minmax(150px,1.1fr) minmax(150px,1.15fr) minmax(150px,1.15fr) minmax(96px,0.65fr) minmax(105px,0.7fr)" }}>
                  <span>Transaction</span><span>From</span><span>To</span><span>Amount</span><span>Status</span>
                </div>
                <div className="divide-y divide-slate-800/80">
                  {transactionData.transactions.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                      isExpanded={expandedTransactionId === transaction.id}
                      onToggle={() => setExpandedTransactionId((current) => current === transaction.id ? null : transaction.id)}
                    />
                  ))}
                </div>
                <TransactionPagination page={page} pagination={pagination} onPageChange={setPage} />
              </>
            ) : (
              <TransactionEmptyState />
            )}
          </section>
        </main>
      </section>
    </DashboardLayout>
  )
}

export default AdminTransactionsPage
