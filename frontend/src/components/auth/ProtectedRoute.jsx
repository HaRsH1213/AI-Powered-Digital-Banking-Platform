import {useLocation, Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"

const ProtectedRoute = ({ adminOnly = false, customerOnly = false }) => {
  const {user, loading} = useAuth()
  const location = useLocation()
  if(loading){
    return (
        <div className="h-screen w-full grid place-items-center bg-slate-950 text-slate-300">
             Checking your secure session...
        </div>
    )
  }

  if(!user){
    return (
        <Navigate to={"/"} replace state={{from: location.pathname}} />
    )
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (customerOnly && user.isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet/>

}
export default ProtectedRoute
