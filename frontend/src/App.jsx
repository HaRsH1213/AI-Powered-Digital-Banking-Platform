import { useState } from "react"
import AccountTypeTabs from "./components/AccountTypeTabs"
import AuthBrandPanel from "./components/AuthBrandPanel"
import AuthLayout from "./components/AuthLayout"
import AuthPanel from "./components/AuthPanel"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [accountType, setAccountType] = useState("user")
  return (
    <AuthLayout>
      <AuthBrandPanel/>
      <AuthPanel>
        <AccountTypeTabs accountType={accountType} onChange={setAccountType}/>
        <LoginForm accountType={accountType}/>
      </AuthPanel>
    </AuthLayout>
  )
}

export default App
