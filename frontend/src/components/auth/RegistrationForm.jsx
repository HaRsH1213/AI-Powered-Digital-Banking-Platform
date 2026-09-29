import { useState } from "react"
import { useAuth } from "../../context/AuthProvider"

const RegistrationForm = ({isRegistering, setRegistering, setVerificationEmail, setIsOtpVerificationOn}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const isPasswordMatched = password !== "" && confirmPassword !== "" && password === confirmPassword
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const {signUp} = useAuth()

  const submitHandler = async (e)=>{
    e.preventDefault()

    if (!isPasswordMatched || isSubmitting) return

    setError("")
    setIsSubmitting(true)

    try {
      const registeredUser = await signUp({name, email, password})
      setVerificationEmail(registeredUser.email)
      setIsOtpVerificationOn(true)
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }

  }
  return (
    <div className={`absolute inset-x-0 top-0 transform transition-all duration-300 ${
      isRegistering
        ? "translate-y-0 opacity-100 scale-100"
        : "translate-y-10 opacity-0 scale-95 pointer-events-none "
    }`}>
      <div>
        <h2 className=" text-3xl font-semibold mb-2">
          Create your Account
        </h2>

        <p className=" text-sm text-slate-300 ">
          Start your secure banking journey
        </p>
      </div>

      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className="mt-6">

        {/* Full Name  */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" htmlFor="name">
            Full name
          </label>
          <input value={name}
          onChange={(e)=>{
            setName(e.target.value)
          }} className="px-4 py-3 w-full rounded-xl border border-slate-600 bg-slate-800  text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30  "
          id="name"
          type="text"
          placeholder="Enter your full name"
          required />
        </div>

        {/* Email  */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" htmlFor="email">
            Email address
          </label>
          <input value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }} className="px-4 py-3 w-full rounded-xl border border-slate-600 bg-slate-800  text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30  "
          id="email"
          type="email"
          placeholder="you@example.com"
          required />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" htmlFor="password">
            Password
          </label>
          <input value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }} className="px-4 py-3 rounded-xl w-full border border-slate-600 bg-slate-800 text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
          id="password"
          type="password"
          placeholder="Enter your password"
          required/>
        </div>
        
        {/* Confirm Password */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input value={confirmPassword}
          onChange={(e)=>{
            setConfirmPassword(e.target.value)
          }} className="px-4 py-3 rounded-xl w-full border border-slate-600 bg-slate-800 text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          required/>
        </div>
        
        {password !== "" && confirmPassword !== "" && !isPasswordMatched && (
          <p className="mb-4 text-xs text-red-400">
            Passwords do not match. Please recheck them.
          </p>
        )}

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        {/* Create Button  */}
        <button type="submit"
          disabled={!isPasswordMatched || isSubmitting}
          className=" w-full bg-blue-500 px-4 py-3 rounded-xl font-semibold text-slate-950 transition hover:bg-blue-400 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? "Sending verification code..." : "Create account"}
        </button>

      </form>
      

      {/* Sign In Button */}
      <p className="mt-5 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <button
              type="button"
              onClick={()=> setRegistering(false)}
              className="font-semibold text-blue-300 hover:text-blue-200"
            >
                Sign in
            </button>
        </p> 


      


      <p className="mt-5 border-t border-slate-700 pt-5 text-xs text-slate-400">
        <span className="font-semibold text-slate-200">
          Email verification:
        </span>{" "}
        We will send a six-degit OTP to your email before your account becomes active.
      </p>

      
    </div>
  )
}

export default RegistrationForm
