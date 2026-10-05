import {ArrowDownLeft, ArrowUpRight, BellOff, CircleAlert, Landmark, MailCheck, Repeat2, ShieldCheck,} from "lucide-react"
import NotificationRow from "./NotificationRow"

const notificationStyles = {
  ACCOUNT_CREATED: {
    icon: Landmark,
    iconClass: "bg-blue-500/10 text-blue-300",
  },

  EMAIL_VERIFIED: {
    icon: MailCheck,
    iconClass: "bg-emerald-500/10 text-emerald-400",
  },

  MONEY_CREDITED: {
    icon: ArrowDownLeft,
    iconClass: "bg-emerald-500/10 text-emerald-400",
  },

  MONEY_DEBITED: {
    icon: ArrowUpRight,
    iconClass: "bg-blue-500/10 text-blue-300",
  },

  TRANSFER_COMPLETED: {
    icon: Repeat2,
    iconClass: "bg-blue-500/10 text-blue-300",
  },

  TRANSFER_FAILED: {
    icon: CircleAlert,
    iconClass: "bg-red-500/10 text-red-400",
  },

  LOGIN_ALERT: {
    icon: ShieldCheck,
    iconClass: "bg-amber-500/10 text-amber-400",
  },
}

const NotificationPanel = ({ notifications, isLoading, isNotificationOpen }) => {
  return (
    <section
      className={`fixed inset-x-3 top-20 z-50 max-h-[calc(100dvh-6rem)] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40 transition-all duration-300 ease-out sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 sm:max-h-96 sm:w-[22rem] ${
        isNotificationOpen 
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-2 opacity-0 scale-95 pointer-events-none"
      }`}
      aria-label="Notifications"
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
        <div>
          <h2 className="font-semibold text-slate-100">Notifications</h2>
          <p className="mt-0.5 text-xs text-slate-400">Your latest account activity</p>
        </div>
      </div>

      <div className="max-h-[calc(100dvh-10rem)] overflow-y-auto scrollbar-none p-2 sm:max-h-80">
        {isLoading ? (
          <p className="px-3 py-8 text-center text-sm text-slate-400 ">Loading notifications...</p>
        ): notifications.length ===0 ? (
          <div className="px-3 py-9 text-center text-slate-400">
            <BellOff className="mx-auto mb-3 " size={24}/>
            <p className="text-sm">You are all caught up.</p>
          </div>
        ):(
          notifications.map((notification) =>{
            const style = notificationStyles[notification.type] || notificationStyles.TRANSFER_COMPLETED
            const Icon = style.icon
            const iconStyle = style.iconClass
            return (
              <NotificationRow
                key={notification._id}
                notification={notification}
                Icon={Icon}
                iconStyle={iconStyle}
              />
            )
          })
        ) }
      </div>
    </section>
  )
}

export default NotificationPanel
