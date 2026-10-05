import { Bell } from "lucide-react"

const NotificationBell = ({ unreadCount, isNotificationOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open notifications"
      aria-expanded={isNotificationOpen}
      className=" group relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition hover:cursor-pointer"
    >
      <Bell size={18} />
      <span
        className={`pointer-events-none absolute -inset-1 rounded-full bg-slate-200/10 transition duration-200 ${
          isNotificationOpen
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-60"
        }`}
      />

      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-400 px-1 text-xs font-semibold text-slate-950">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  )
}

export default NotificationBell
