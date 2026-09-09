import { Route, Routes } from 'react-router-dom'
import AccountsPage from './pages/AccountsPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/loginPage'
import TransactionsPage from './pages/TransactionsPage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element= {<LoginPage/>} />
      <Route path='/dashboard' element={<DashboardPage/>} />
      <Route path='/accounts' element= {<AccountsPage/>} />
      <Route path='/transactions' element= {<TransactionsPage/>} />
    </Routes>
  )
}

export default App
