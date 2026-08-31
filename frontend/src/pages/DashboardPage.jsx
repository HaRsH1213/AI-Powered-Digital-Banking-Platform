import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Sidebar from '../components/Sidebar'

const DashboardPage = () => {
  const [navIndex, setNavIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <DashboardLayout>

      <Sidebar navIndex = {navIndex} setNavIndex = {setNavIndex}/>
      <section>
        {/* dashboard content will go here */}
      </section>
    </DashboardLayout>
  )
}

export default DashboardPage
