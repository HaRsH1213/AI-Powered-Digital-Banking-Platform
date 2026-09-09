import { Landmark } from 'lucide-react'

const LoadingOverlay = () => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 px-6 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-xs flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/90 px-8 py-9 text-center shadow-2xl shadow-blue-950/30">
        <div className="relative grid h-20 w-20 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-2xl bg-blue-500/15" />
          <span className="absolute inset-1 animate-[spin_3s_linear_infinite] rounded-2xl border border-blue-400/40 border-t-blue-400" />
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/30">
            <Landmark size={28} strokeWidth={2.2} />
          </span>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-slate-100">Securing your session</h2>
        <p className="mt-2 text-sm text-slate-400">Verifying your credentials...</p>

        <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
