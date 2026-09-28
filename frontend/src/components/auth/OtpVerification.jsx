import { useEffect, useRef, useState } from "react"
import { ArrowLeft, LoaderCircle, Mail, ShieldCheck } from "lucide-react"
import { resendOtp, verifyEmail } from "../../services/auth.service"

const EMPTY_OTP = ["", "", "", "", "", ""]

const OtpVerification = ({ email, onClose, onVerified, isOtpVerificationOn }) => {
  const inputRefs = useRef([])
  const [otp, setOtp] = useState(EMPTY_OTP)
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(150)
  const [isResending, setIsResending] = useState(false)
 
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if(resendTimer == 0 ) return

    const timer = window.setInterval(()=>{
      setResendTimer((seconds) => seconds - 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [resendTimer])
  
  
  const handleChange = (value, index) => {
    if(!/^\d*$/.test(value)) return 

    const nextOtp = [...otp]
    nextOtp[index] = value.slice(-1)
    setOtp(nextOtp)
    setError("")

    if(value && index < nextOtp.length - 1 ){
      inputRefs.current[index + 1]?.focus()

    }


  }

  const handleKeyDown = (event, index) => {
    if(event.key === "Backspace" && !otp[index] && index > 0){
      inputRefs.current[index - 1].focus()
    }
  
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

    if(!digits) return 
    
    const nextOtp = [...EMPTY_OTP]
    digits.split("").forEach((digit, index ) =>{
      nextOtp[index] = digit
    })
    setOtp(nextOtp)
    inputRefs.current[Math.min(digits.length, 5)].focus()
  }

  const handleVerify = async () => {
    const enteredOtp = otp.join("")

    if (enteredOtp.length != 6){
      setError("Please enter the complete 6-digit OTP.")
      return
    }
    setIsVerifying(true)

    try {
      await verifyEmail(enteredOtp)
      onVerified()

      
    } catch (error) {
      setError(error.response?.data?.message || "Unable to verify OTP. Please try again.")

    } finally{
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return

    setError("")
    setIsResending(true)
    try {
      await resendOtp()
      setOtp([...EMPTY_OTP])
      setResendTimer(150)
      inputRefs.current[0]?.focus()
      
    } catch (error) {
      setError(error.response?.data?.message || "Unable to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }

  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <aside className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl sm:p-7" aria-label="Email verification">
        <div className="mb-7 flex justify-between items-center">
          <button
            type="button" 
            onClick={onClose}
            className="text-slate-400 text-sm flex items-center gap-2 transition hover:text-slate-100 ">
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-800 border border-slate-700">
            <ShieldCheck className="text-emerald-400" size={21} />
          </div>
        </div>

        <div className="mb-5 flex justify-center">
          <div className="relative flex justify-center items-center h-20 w-20 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="absolute inset-0 animate-ping rounded-full border border-emerald-400/20"/>
            <Mail className="text-emerald-400" size={32}  />
          </div>

        </div>

        <div className=" text-center">
          <h2 className="text-2xl font-semibold text-slate-100">
            Verify your email
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400 ">
            We've sent a 6-digit verification code to 
          </p>
          <p className="mt-1 text-sm font-medium text-slate-200">
            hc063213@gmail.com
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index)=>(
            <input
              type="text"
              ref={(element) => {inputRefs.current[index] = element}}
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(event.target.value, index)}
              onKeyDown={(event) => handleKeyDown(event, index) }
              onPaste={(event) => handlePaste(event)}
              className={`h-12 w-11 rounded-xl border bg-slate-950 text-center text-lg font-semibold text-slate-100 outline-none sm:h-14 sm:w-14 transition ${
                error 
                  ? "border-red-500/70 focus:border-red-500"
                  : "border-slate-700 focus:border-emerald-500"
              } `}
            
            
            />

          ))}
        </div>

        {error && <p className="mt-3 text-center text-sm text-red-400"> {error}</p>}

        <button
          onClick={handleVerify} 
          disabled = {isVerifying}
          className="mt-7 w-full px-4 py-3 flex justify-center items-center gap-2 rounded-xl bg-emerald-500 font-semibold text-slate-950
          transition hover:cursor-pointer hover:bg-emerald-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
          {isVerifying && <LoaderCircle size={18} />}
          {isVerifying ? "Verifying" : "Click to verify"}
        </button>

        <div className="mt-5 text-center text-sm">
          <span className="text-slate-500">Didn't receive the code?</span>
          {resendTimer > 0  
            ? (<span className="font-medium text-slate-400">
                  Resend in {Math.floor(resendTimer / 60)}:
                  {String(resendTimer % 60).padStart(2, "0")}
                </span>
              )
            : (
            <button 
              type="button" 
              onClick={handleResend} 
              disabled={isResending} 
              className="font-medium text-emerald-400 transition hover:text-emerald-300 disabled:opacity-60">
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
              )
  
          }
        </div>

        <div className="mt-7 rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-center">
          <p className="text-xs leading-5 text-slate-500">For your security, never share your verification code with anyone.</p>
        </div>
      </aside>
    </div>
  )
}

export default OtpVerification
