import { Check, CircleX, Landmark } from 'lucide-react'

const LoadingOverlay = ({ status }) => {
  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 px-6 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-xs flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/90 px-8 py-9 text-center shadow-2xl shadow-blue-950/30">
        <div className="relative grid h-20 w-20 place-items-center">
          {isLoading && <span className="absolute inset-0 animate-ping rounded-2xl bg-blue-500/15" />}
          {isLoading && <span className="absolute inset-1 animate-[spin_3s_linear_infinite] rounded-2xl border border-blue-400/40 border-t-blue-400" />}
          <span className={`relative grid h-14 w-14 place-items-center rounded-2xl shadow-lg transition-colors ${isSuccess ? 'bg-emerald-400 text-slate-950 shadow-emerald-500/30' : isError ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-blue-500 text-slate-950 shadow-blue-500/30'}`}>
            {isLoading && <Landmark size={28} strokeWidth={2.2} />}
            {isSuccess && <Check size={32} strokeWidth={2.7} />}
            {isError && <CircleX size={32} strokeWidth={2.4} />}
          </span>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-slate-100">
          {isLoading && 'Securing your session'}
          {isSuccess && 'Verified successfully'}
          {isError && 'Invalid credentials'}
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          {isLoading && 'Verifying your credentials...'}
          {isSuccess && 'Redirecting to your dashboard...'}
          {isError && 'Please check your email and password.'}
        </p>

        {isLoading && <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
        </div>}
      </div>
    </div>
  )
}

export default LoadingOverlay
