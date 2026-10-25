import { ChevronLeft, ChevronRight } from "lucide-react"

const CustomerPagination = ({ page, pagination, setPage }) => (
  <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 px-4 py-4 sm:px-5">
    <p className="text-xs text-slate-500">
      {pagination.total
        ? `Showing ${(pagination.page - 1) * pagination.pageSize + 1}–${Math.min(pagination.page * pagination.pageSize, pagination.total)} of ${pagination.total}`
        : "No customers"}
    </p>
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setPage((current) => current - 1)}
        aria-label="Previous customer page"
        className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={17} />
      </button>
      <span className="px-1 text-xs text-slate-400">{page} / {Math.max(pagination.totalPages, 1)}</span>
      <button
        type="button"
        disabled={page >= pagination.totalPages}
        onClick={() => setPage((current) => current + 1)}
        aria-label="Next customer page"
        className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  </footer>
)

export default CustomerPagination
