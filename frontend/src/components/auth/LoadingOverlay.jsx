import { createPortal } from "react-dom"
import {Check, CircleX, Landmark, MailCheck} from "lucide-react"

const overlayContent = {
  login: {
    loading: {
      title: "Securing your session",
      message: "Verifying your credentials...",
      icon: Landmark,
      iconClass: "bg-blue-500 text-slate-950 shadow-blue-500/30",
      pingClass: "bg-blue-500/15",
      spinnerClass: "border-blue-400/40 border-t-blue-400",
      dotClass: "bg-blue-400",
    },

    success: {
      title: "Login successful",
      message: "Redirecting to your dashboard...",
      icon: Check,
      iconClass: "bg-emerald-400 text-slate-950 shadow-emerald-500/30",
    },

    error: {
      title: "Login failed",
      message: "Please check your email and password.",
      icon: CircleX,
      iconClass: "bg-red-500 text-white shadow-red-500/30",
    },
  },

  otp: {
    loading: {
      title: "Verifying your email",
      message: "Checking your one-time verification code...",
      icon: MailCheck,
      iconClass: "bg-emerald-400 text-slate-950 shadow-emerald-500/30",
      pingClass: "bg-emerald-500/15",
      spinnerClass: "border-emerald-400/40 border-t-emerald-400",
      dotClass: "bg-emerald-400",
    },

    success: {
      title: "Email verified",
      message: "Your account is ready. Please sign in.",
      icon: Check,
      iconClass: "bg-emerald-400 text-slate-950 shadow-emerald-500/30",
    },

    error: {
      title: "Verification failed",
      message: "The OTP is invalid or has expired.",
      icon: CircleX,
      iconClass: "bg-red-500 text-white shadow-red-500/30",
    },
  },
}

const LoadingOverlay = ({ status, variant = "login" }) => {
  const selectedVariant = overlayContent[variant] || overlayContent.login
  const currentContent = selectedVariant[status]
  const StatusIcon = currentContent.icon
  const isLoading = status === "loading"

  return createPortal(
    <div
      className="fixed inset-0 z-130 grid place-items-center bg-slate-950/85 px-6 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-xs flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/90 px-8 py-9 text-center shadow-2xl shadow-blue-950/30">
        <div className="relative grid h-20 w-20 place-items-center">
          {isLoading && (
            <span
              className={`absolute inset-0 animate-ping rounded-2xl ${currentContent.pingClass}`}
            />
          )}

          {isLoading && (
            <span
              className={`absolute inset-1 animate-[spin_3s_linear_infinite] rounded-2xl border ${currentContent.spinnerClass}`}
            />
          )}

          <span
            className={`relative grid h-14 w-14 place-items-center rounded-2xl shadow-lg ${currentContent.iconClass}`}
          >
            <StatusIcon size={isLoading ? 28 : 32} strokeWidth={2.5} />
          </span>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-slate-100">
          {currentContent.title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          {currentContent.message}
        </p>

        {isLoading && (
          <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
            <span
              className={`h-1.5 w-1.5 animate-bounce rounded-full ${currentContent.dotClass} [animation-delay:-0.3s]`}
            />
            <span
              className={`h-1.5 w-1.5 animate-bounce rounded-full ${currentContent.dotClass} [animation-delay:-0.15s]`}
            />
            <span
              className={`h-1.5 w-1.5 animate-bounce rounded-full ${currentContent.dotClass}`}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default LoadingOverlay