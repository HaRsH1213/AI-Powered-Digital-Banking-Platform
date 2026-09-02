import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import BalanceCard from '../components/BalanceCard'
import PrimaryAccountCard from '../components/accounts/PrimaryAccountCard'
import SalaryAccountCard from '../components/accounts/SalaryAccountCard'
import EmergencyAccountCard from '../components/accounts/EmergencyAccountCard'
import QuickActions from '../components/QuickActions'
import LoanCard from '../components/LoanCard'

const DashboardPage = () => {

  const accounts = [
  { name: 'Primary Savings', type: 'Savings', number: '•••• 4821', balance: '₹48,250.00', color: 'bg-blue-500/15 text-blue-300', icon: '⌂' },
  { name: 'Salary Account', type: 'Current', number: '•••• 7734', balance: '₹52,000.00', color: 'bg-emerald-500/15 text-emerald-300', icon: '▣' },
  { name: 'Emergency Fund', type: 'Savings', number: '•••• 1190', balance: '₹24,250.00', color: 'bg-purple-500/15 text-purple-300', icon: '♢' },
  ]

  const [navIndex, setNavIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <DashboardLayout>


      <Sidebar menuOpen = {menuOpen} navIndex = {navIndex} setNavIndex = {setNavIndex}/>
      
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)}
        className='fixed inset-0 z-10 bg-black/50 lg:hidden'>

        </div>
      )}
      <section  className='min-w-0 p-4 sm:p-6 lg:p-10'>
        {/* dashboard content will go here */}
        <DashboardHeader menuOpen = {menuOpen} setMenuOpen ={setMenuOpen} />

        <BalanceCard/>

        <div className='grid md:grid-cols-3 mt-5 gap-4'>
          {accounts.map((account, index)=>{
            switch(account.name){
              case "Primary Savings":
                return <PrimaryAccountCard account={account} key={account.name} />
              case "Salary Account" :
                return <SalaryAccountCard account={account} key={account.name} />
              case "Emergency Fund" :
                return <EmergencyAccountCard account={account} key={account.name} />
            }
          })}
        </div>
        <QuickActions/>
        <LoanCard/>
      </section>
    </DashboardLayout>
  )
}

export default DashboardPage
