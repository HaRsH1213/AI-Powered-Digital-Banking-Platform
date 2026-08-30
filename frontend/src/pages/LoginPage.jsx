import { useState } from "react"
import AccountTypeTabs from "../components/AccountTypeTabs"
import AuthBrandPanel from "../components/AuthBrandPanel"
import AuthLayout from "../components/AuthLayout"
import AuthPanel from "../components/AuthPanel"
import LoginForm from "../components/LoginForm"
const LoginPage = () => {
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

export default LoginPage
