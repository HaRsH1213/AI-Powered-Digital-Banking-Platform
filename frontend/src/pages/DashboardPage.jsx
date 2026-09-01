import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'

const DashboardPage = () => {
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
      </section>
    </DashboardLayout>
  )
}

export default DashboardPage
