import { Route, Routes } from 'react-router-dom'
import AccountsPage from './pages/AccountsPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import TransactionsPage from './pages/TransactionsPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminDashboardPage from './pages/AdminDashboardPage'
const App = () => {
  // useEffect(() => {
  //   const fetchAccountData = async ()=>{
  //     try {
  //       const response = await getAccounts()
  //       console.log(response.data.accounts);
        
        
  //     } catch (error) {
  //       console.log(error);
        
        
  //     }
  //   }
  //   fetchAccountData()

  // },[])
  
  return (
    <Routes>
      <Route path='/' element= {<LoginPage />} />

      <Route element= {<ProtectedRoute customerOnly/>} >
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='/accounts' element= {<AccountsPage/>} />
        <Route path='/transactions' element= {<TransactionsPage/>} />
      </Route>
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path='/admin' element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  )
}

export default App
