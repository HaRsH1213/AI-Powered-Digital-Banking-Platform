import { Route, Routes } from 'react-router-dom'
import AccountsPage from './pages/AccountsPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import TransactionsPage from './pages/TransactionsPage'
import { useState } from 'react'
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
      <Route path='/dashboard' element={<DashboardPage/>} />
      <Route path='/accounts' element= {<AccountsPage/>} />
      <Route path='/transactions' element= {<TransactionsPage/>} />
    </Routes>
  )
}

export default App
