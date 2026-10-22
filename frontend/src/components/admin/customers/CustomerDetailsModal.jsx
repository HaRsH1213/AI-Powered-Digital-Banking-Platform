import { useEffect, useState } from "react"
import { BadgeCheck, CalendarDays, CircleAlert, Landmark, LoaderCircle, Mail, X } from "lucide-react"
import { getAdminCustomerDetails } from "../../../services/admin.service"

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
const joinedDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" })

const statusStyles = {
  ACTIVE: "border-emerald-400/15 bg-emerald-500/10 text-emerald-300",
  FROZEN: "border-amber-400/15 bg-amber-500/10 text-amber-300",
  CLOSED: "border-slate-600 bg-slate-800 text-slate-300"
}

const CustomerDetailsModal = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isCurrent = true
    getAdminCustomerDetails(customerId)
      .then((data) => { if (isCurrent) setCustomer(data) })
      .catch((requestError) => {
        if (isCurrent) setError(requestError.response?.data?.message || "Unable to load this customer.")
      })
      .finally(() => { if (isCurrent) setLoading(false) })

    return () => { isCurrent = false }
  }, [customerId])

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="customer-details-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50 sm:rounded-3xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-xs text-slate-500">Customer profile</p>
            <h2 id="customer-details-title" className="mt-1 text-lg font-semibold text-slate-100">Customer details</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close customer details" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"><X size={20} /></button>
        </header>

        {loading ? (
          <div className="grid min-h-56 place-items-center text-sm text-slate-400"><span className="flex items-center gap-2"><LoaderCircle className="animate-spin" size={18} />Loading customer…</span></div>
        ) : error ? (
          <div className="m-5 flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200 sm:m-7"><CircleAlert size={18} />{error}</div>
        ) : customer && (
          <div className="space-y-6 p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-500/15 text-lg font-semibold text-blue-200">{customer.name?.charAt(0)?.toUpperCase()}</span>
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-semibold text-slate-100">{customer.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-400"><Mail size={14} />{customer.email}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${customer.isVerified ? "border-emerald-400/15 bg-emerald-500/10 text-emerald-300" : "border-amber-400/15 bg-amber-500/10 text-amber-300"}`}>
                {customer.isVerified ? <BadgeCheck size={14} /> : <CircleAlert size={14} />}
                {customer.isVerified ? "Verified" : "Unverified"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Total customer balance</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">{currency.format(customer.totalBalance || 0)}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Customer since</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-200"><CalendarDays size={16} className="text-blue-300" />{joinedDate.format(new Date(customer.createdAt))}</p>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-100">Accounts</h3>
                  <p className="mt-1 text-xs text-slate-500">Account numbers are masked for privacy.</p>
                </div>
                <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">{customer.accounts.length}</span>
              </div>

              {customer.accounts.length ? (
                <div className="space-y-3">
                  {customer.accounts.map((account) => (
                    <article key={account.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-300"><Landmark size={18} /></span>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-slate-100">{account.name}</p>
                            <p className="mt-1 text-xs text-slate-500">{account.type} · {account.accountNumber}</p>
                          </div>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[account.status] || statusStyles.CLOSED}`}>{account.status}</span>
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-800 pt-3">
                        <div>
                          <p className="text-[11px] text-slate-500">IFSC · {account.ifscCode || "Not available"}</p>
                          <p className="mt-1 text-xs text-slate-500">{account.kind} account</p>
                        </div>
                        <p className="text-sm font-semibold tabular-nums text-slate-100">{currency.format(account.balance || 0)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-700 px-4 py-8 text-center text-sm text-slate-500">This customer has not opened an account yet.</div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default CustomerDetailsModal
