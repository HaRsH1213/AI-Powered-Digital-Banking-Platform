import { useEffect, useRef, useState } from "react"
import { ArrowLeft, LoaderCircle, Mail, ShieldCheck } from "lucide-react"
import { resendOtp, verifyEmail } from "../../services/auth.service"

const EMPTY_OTP = ["", "", "", "", "", ""]

const OtpVerification = ({ email, onClose, onVerified, isOtpVerificationOn }) => {
  const [otp, setOtp] = useState(EMPTY_OTP)
  const [error, setError] = useState("")
 


  const handleChange = (value, index) => {

  }

  const handleKeyDown = (event, index) => {
  
  }

  const handlePaste = (event) => {
  }

  const handleVerify = async () => {
  }

  const handleResend = async () => {
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
            className={`h-12 w-11 rounded-xl border bg-slate-950 text-center text-lg font-semibold text-slate-100 outline-none sm:h-14 sm:w-14 transition ${
              error 
                ? "border-red-500/70 focus:border-red-500"
                : "border-slate-700 focus:border-emerald-500"
            } `}
            
            
            />

          ))}
        </div>

        {error && <p className="mt-3 text-center text-sm text-red-400"> {error}</p>}
      </aside>
    </div>
  )
}

export default OtpVerification
