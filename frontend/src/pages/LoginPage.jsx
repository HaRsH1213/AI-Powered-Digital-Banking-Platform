import { useState } from "react"
import AccountTypeTabs from "../components/auth/AccountTypeTabs"
import AuthBrandPanel from "../components/auth/AuthBrandPanel"
import AuthLayout from "../components/auth/AuthLayout"
import AuthPanel from "../components/auth/AuthPanel"
import LoginForm from "../components/auth/LoginForm"
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
