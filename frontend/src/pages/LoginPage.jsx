import { useState } from "react"
import AccountTypeTabs from "../components/auth/AccountTypeTabs"
import AuthBrandPanel from "../components/auth/AuthBrandPanel"
import AuthLayout from "../components/auth/AuthLayout"
import AuthPanel from "../components/auth/AuthPanel"
import LoginForm from "../components/auth/LoginForm"
import RegistrationForm from "../components/auth/RegistrationForm"
import OtpVerification from "../components/auth/OtpVerification"
const LoginPage = () => {
  const [accountType, setAccountType] = useState("user")
  const [isRegistering, setRegistering] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState("")
  const [isOtpVerificationOn, setIsOtpVerificationOn] = useState(false)

  return (
    <AuthLayout>
      <AuthBrandPanel/>
      <AuthPanel isRegistering={isRegistering}>
        {!isRegistering
          ? (
              <AccountTypeTabs accountType={accountType} onChange={setAccountType}/>
            )
          : null
        }
        {/* <AccountTypeTabs accountType={accountType} onChange={setAccountType}/> */}
        {/* {formMode === "register" ? (
          <RegistrationForm onSwitchToLogin={() => setFormMode("login")} />
        ) : (
          <LoginForm
            accountType={accountType}
            onSwitchToRegister={() => setFormMode("register")}
          />
        )} */}
        <div className={`relative ${
          isRegistering ? "mt-0 min-h-[560px]" : "mt-8 min-h-[500px]"
        }`}>
          <LoginForm accountType={accountType} isRegistering={isRegistering} setRegistering={setRegistering} />
          <RegistrationForm
            isRegistering={isRegistering}
            setRegistering={setRegistering}
            setVerificationEmail={setVerificationEmail}
            setIsOtpVerificationOn = {setIsOtpVerificationOn}
          />
        </div>
      </AuthPanel>
      {/* {verificationEmail && (
        <OtpVerification
          email={verificationEmail}
          onClose={() => setVerificationEmail("")}
          onVerified={() => {
            setVerificationEmail("")
            setRegistering(false)
          }}
        />
      )} */}
      <OtpVerification
        verificationEmail={verificationEmail}
        isOtpVerificationOn = {isOtpVerificationOn}
        onClose={() => {
          setVerificationEmail("")
          setIsOtpVerificationOn(false)
        }}
        onVerified={() => {
          setVerificationEmail("")
          setIsOtpVerificationOn(false)
          setRegistering(false)

        }}
      />
    </AuthLayout>
  )
}

export default LoginPage
