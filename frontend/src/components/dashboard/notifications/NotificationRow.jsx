const formateDate = (date) =>{
    return new Intl.DateTimeFormat("en-IN",{
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date))
}
const NotificationRow = ({notification, Icon, iconStyle}) => {

  return (
    <div className={`flex gap-3 px-3 py-3 rounded-xl transition ${
        notification.isRead ? "" : "bg-slate-800/80"
    }`}>
        <span className={` mt-0.5 grid place-items-center h-12 w-12 rounded-xl shrink-0 ${iconStyle}`}>
            <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
            <div>
                <h2 className="text-sm font-medium text-slate-100" >{notification.title}</h2>
                {!notification.isRead && <span className="h2 w-2 rounded-full shrink-0 bg-blue-400"/> }
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-400">{notification.message}</p>
            <p className="mt-1.5 text-xs text-slate-500">{formateDate(notification.createdAt)}</p>

        </div>
      
    </div>
  )
}

export default NotificationRow
