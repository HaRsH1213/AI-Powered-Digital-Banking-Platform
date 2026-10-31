import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import AdminSidebar from "../../components/admin/layout/AdminSidebar"
import AdminHeader from "../../components/admin/layout/AdminHeader"
import AccountsPageHeader from "../../components/admin/accounts/AccountsPageHeader"
import AccountFilters from "../../components/admin/accounts/AccountFilters"
import AccountRow from "../../components/admin/accounts/AccountRow"
import AccountPagination from "../../components/admin/accounts/AccountPagination"
import AccountStatusDialog from "../../components/admin/accounts/AccountStatusDialog"
import InitialFundsDialog from "../../components/admin/accounts/InitialFundsDialog"
import { AccountEmptyState, AccountErrorState, AccountLoadingState } from "../../components/admin/accounts/AccountStates"
import { useAuth } from "../../context/AuthProvider"
import { addInitialFunds, getAdminAccounts, updateAdminAccountStatus } from "../../services/admin.service"

const AdminAccountsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [page, setPage] = useState(1)
  const [accountData, setAccountData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)
  const [pendingChange, setPendingChange] = useState(null)
  const [expandedAccountId, setExpandedAccountId] = useState(null)
  const [updatingAccountId, setUpdatingAccountId] = useState(null)
  const [statusError, setStatusError] = useState("")
  const [notice, setNotice] = useState("")
  const [fundingAccount, setFundingAccount] = useState(null)
  const [fundingIdempotencyKey, setFundingIdempotencyKey] = useState("")
  const [fundingError, setFundingError] = useState("")
  const [isFunding, setIsFunding] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const isLoading = loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      setSearch(searchInput.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    const fetchAdminAccounts = async() => {
      try {
        setLoading(true)
        setError("")
        const accounts = await getAdminAccounts({page, search, status})
        setAccountData(accounts)
      } catch (error) {
        setError(error.response?.data?.message || "Unable to load customers. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchAdminAccounts()
  }, [page, search, status, refreshKey])

  const handleSignOut = async () => {
    await signOut()
    navigate("/", { replace: true })
  }

  const handleRequestStatusChange = (account, nextStatus) => {
    setStatusError("")
    setNotice("")
    setPendingChange({ account, nextStatus })
  }

  const handleRequestInitialFunds = (account) => {
    setFundingError("")
    setNotice("")
    setFundingAccount(account)
    setFundingIdempotencyKey(crypto.randomUUID())
  }

  const handleConfirmInitialFunds = async (amount) => {
    if (!fundingAccount || !fundingIdempotencyKey) return

    setIsFunding(true)
    setFundingError("")

    try {
      await addInitialFunds({
        toAccount: fundingAccount.accountNumber,
        amount,
        idempotencyKey: fundingIdempotencyKey,
      })

      setAccountData((prev) =>{
        if(!prev) return perv
        return {
          ...prev,
          accounts: prev.accounts.map((account) =>{
            if(account.id === fundingAccount.id){
              return {
                ...account,
                balance: Number(account.balance || 0 ) + amount
              }
            }
            return account
          })
        }
      })
      setNotice(`₹${amount.toLocaleString("en-IN")} was added to ${fundingAccount.accountNumber}.`)
      setFundingAccount(null)
      setFundingIdempotencyKey("")
    } catch (requestError) {
      setFundingError(requestError.response?.data?.message || "Unable to add initial funds. Please try again.")
    } finally {
      setIsFunding(false)
    }
  }

  const handleConfirmStatusChange = async () => {
    if (!pendingChange) return

    const { account, nextStatus } = pendingChange
    setUpdatingAccountId(account.id)
    setStatusError("")

    try {
      const updatedAccount = await updateAdminAccountStatus(account.id, nextStatus)
      setAccountData((current) => current && ({
        ...current,
        accounts: current.accounts.map((item) => item.id === account.id
          ? { ...item, status: updatedAccount.status }
          : item),
      }))
      setNotice(`${account.name} is now ${updatedAccount.status.toLowerCase()}.`)
      setPendingChange(null)
    } catch (requestError) {
      setStatusError(requestError.response?.data?.message || "Unable to update account status. Please try again.")
    } finally {
      setUpdatingAccountId(null)
    }
  }

  const pagination = accountData?.pagination

  return (
    <DashboardLayout>
      <AdminSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <section className="min-w-0 p-4 sm:p-6 lg:p-8">
        <AdminHeader user={user} onSignOut={handleSignOut} menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <main className="mx-auto mt-8 max-w-350">
          <AccountsPageHeader />

          <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg shadow-black/10">
            <AccountFilters
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              status={status}
              onStatusChange={(value) => { setPage(1); setStatus(value) }}
            />

            {notice && <p role="status" className="border-b border-emerald-400/10 bg-emerald-500/5 px-5 py-3 text-sm text-emerald-300">{notice}</p>}

            {isLoading ? (
              <AccountLoadingState />
            ) : error ? (
              <AccountErrorState message={error} onRetry={() => setRefreshKey((current) => current + 1)} />
            ) : accountData?.accounts?.length ? (
              <>
                <div>
                  <div>
                    <div
                      className="hidden gap-5 border-b border-slate-800 bg-slate-950/35 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:grid"
                      style={{ gridTemplateColumns: "minmax(0, 2.2fr) minmax(96px, 0.8fr) minmax(110px, 0.8fr) minmax(140px, 1fr)" }}
                    >
                      <span>Account</span><span>Balance</span><span>Status</span><span className="text-right">Action</span>
                    </div>
                    <div className="divide-y divide-slate-800/80">
                      {accountData.accounts.map((account) => (
                        <AccountRow
                          key={account.id}
                          account={account}
                          isExpanded={expandedAccountId === account.id}
                          isUpdating={updatingAccountId === account.id}
                          isFunding={isFunding && fundingAccount?.id === account.id}
                          onToggle= {() =>  setExpandedAccountId(expandedAccountId === account.id ? null : account.id)}
                          onRequestStatusChange={handleRequestStatusChange}
                          onRequestInitialFunds={handleRequestInitialFunds}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <AccountPagination page={page} pagination={pagination} onPageChange={setPage} />
              </>
            ) : (
              <AccountEmptyState />
            )}
          </section>
        </main>
      </section>

      <AccountStatusDialog
        account={pendingChange?.account}
        nextStatus={pendingChange?.nextStatus}
        isSubmitting={Boolean(updatingAccountId)}
        error={statusError}
        onCancel={() => { if (!updatingAccountId) setPendingChange(null) }}
        onConfirm={handleConfirmStatusChange}
      />

      <InitialFundsDialog
        key={fundingIdempotencyKey}
        account={fundingAccount}
        isSubmitting={isFunding}
        error={fundingError}
        onCancel={() => {
          if (!isFunding) {
            setFundingAccount(null)
            setFundingIdempotencyKey("")
            setFundingError("")
          }
        }}
        onConfirm={handleConfirmInitialFunds}
      />
    </DashboardLayout>
  )
}

export default AdminAccountsPage
