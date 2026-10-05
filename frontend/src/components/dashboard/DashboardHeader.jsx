import { useCallback, useEffect, useState } from "react"
import { Landmark } from "lucide-react";
import UserMenu from "./userProfile/UserMenu";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./notifications/NotificationBell";
import NotificationPanel from "./notifications/NotificationPanel";
import { getNotifications, markAllNotificationsAsRead } from "../../services/notification.service";
const DashboardHeader = ({ menuOpen, setMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true)

  const { user, signOut } = useAuth()
  const initialUserNameLetter = user?.name?.charAt(0).toUpperCase()
  const navigate = useNavigate()

  const loadNotifications = useCallback(
    async () => {
      try {
        setIsNotificationsLoading(true)
        const data = await getNotifications()
        setNotifications(data.notifications)

        setUnreadCount(data.unreadCount)
      } catch (error) {
        console.error("Unable to fetch notifications", error)
      } finally{
        setIsNotificationsLoading(false)
      }
    },
    [],
  )
  

  useEffect(() => {
    loadNotifications()

    window.addEventListener("notifications:refresh", loadNotifications)

    return () => window.removeEventListener("notifications:refresh", loadNotifications)
  }, [loadNotifications])

  const onSignOut = async() =>{
    await signOut()
    navigate("/", {replace:true})

  }

  const handleNotificationClick = async () => {
    if(isNotificationOpen){
      setIsNotificationOpen(false)
      return
    }
    setIsProfileOpen(false)
    setIsNotificationOpen(true)
    // setIsNotificationsLoading(true)

    setNotifications((currentNotification) =>{
      return currentNotification.map((notification) => ({...notification, isRead:true}))
    })
    setUnreadCount(0)

    try {
      await markAllNotificationsAsRead()
    } catch (error) {
      console.error("Unable to mark notifications as read", error)
      loadNotifications()
      
    }
  }
  return (
    <header className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button" 
            onClick={()=> setMenuOpen(prev => !prev)}
            aria-expanded={menuOpen}
            className="px-3 py-2 border border-slate-700 rounded-lg lg:hidden "
            aria-label="toggle-navigation">
        

            ☰
        
          </button>

          <div className=" flex items-center gap-3 text-xl font-semibold lg:hidden">

            <span className="grid place-items-center h-8 w-8 rounded-lg bg-blue-500 text-slate-950">
              <Landmark size={18}/>
            </span>
            NovaBank 
          </div>


        </div>
        <div className=" flex items-center ">
          <div className="relative">
            <NotificationBell
              unreadCount={unreadCount}
              isNotificationOpen={isNotificationOpen}
              onClick={handleNotificationClick}
            />
            <NotificationPanel
              notifications={notifications}
              isLoading={isNotificationsLoading}
              isNotificationOpen={isNotificationOpen}
            />
          </div>

          <div className="relative ml-4">

            <button
            type="button"
            aria-label="Open profile"
            aria-pressed={isProfileOpen}
            onClick={() => {
              setIsNotificationOpen(false)
              setIsProfileOpen((open) => !open)
            }}
            className="group relative ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/25 font-semibold text-blue-200 transition hover:cursor-pointer"
          >
            <span className="relative">{initialUserNameLetter}</span>

            <span
              className={`pointer-events-none absolute -inset-1 rounded-full bg-slate-200/10 transition duration-200 ${
                isProfileOpen
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-60"
              }`}
            />
          </button>
          {isProfileOpen && <UserMenu user={user} onSignOut={onSignOut} onProfile={()=>{}} />}


          </div>

        </div>
        

      </div> 





    </header>
    
  )
}

export default DashboardHeader
