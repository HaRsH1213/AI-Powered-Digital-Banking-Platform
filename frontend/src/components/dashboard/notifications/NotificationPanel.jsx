import {ArrowDownLeft, ArrowUpRight, BadgeCheck, BellOff, CircleAlert, Landmark, MailCheck, Repeat2, ShieldCheck,} from "lucide-react"
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

const NotificationPanel = ({ notifications, isLoading }) => {
  return (
    <section
      className="absolute right-0 top-full z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40"
      aria-label="Notifications"
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
        <div>
          <h2 className="font-semibold text-slate-100">Notifications</h2>
          <p className="mt-0.5 text-xs text-slate-400">Your latest account activity</p>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto scrollbar-none p-2">
        {isLoading ? (
          <p className="px-3 py-8 text-center text-sm text-slate-400 ">Loading notifications...</p>
        ): notifications.length ===0 ? (
          <div>
            <BellOff className="mx-auto mb-3 " size={24}/>
            <p className="text-sm">YOur are all caught up</p>
          </div>
        ):(
          notifications.map((notification) =>{
            const style = notificationStyles[notification.type] || notificationStyles.TRANSFER_COMPLETED
            const Icon = style.icon
            const iconStyle = style.iconClass
            return (
              <NotificationRow notification={notification} Icon={Icon} iconStyle={iconStyle} />
            )
          })
        ) }
      </div>
    </section>
  )
}

export default NotificationPanel
