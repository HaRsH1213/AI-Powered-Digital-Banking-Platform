import { Check, CircleX, Landmark } from "lucide-react"
const NewAccountStatus = ({status}) => {
  const isProcessing = status === "creating"
  const isSuccess = status === "created"
  const isError = status === "error"
  if (status === "idle") return null 
  return (
    <div className=" absolute inset-0 z-130 grid place-items-center rounded-2xl backdrop-blur-md bg-slate-950/80 p-4 sm:rounded-3xl sm:p-6 ">
      <div className=" w-full max-w-md border border-slate-700 rounded-2xl bg-slate-900 text-center p-6 shadow-2xl shadow-black/50 sm:p-8">
        <div className="relative mx-auto h-20 w-20  grid place-items-center">
          {isProcessing && <span className="absolute inset-0 rounded-full animate-ping bg-blue-500/15"/>}
          {isProcessing && <span className="absolute inset-1 animate-[spin_2.5s_linear_infinite] rounded-full border-2 border-blue-400/50 border-t-blue-400"/>}

          <span className={`rounded-full h-14 w-14 grid place-items-center transition-colors ${
              isSuccess
              ? "bg-emerald-400 text-slate-950 shadow-emerald-500/30"
              : isError
                ? "bg-red-500 text-white shadow-red-500/30"
                : "bg-blue-500 text-slate-950 shadow-blue-500/30"
            }`}>
              {isProcessing && <Landmark size={27} strokeWidth={2.3} />}
              {isSuccess && <Check size={32} strokeWidth={2.8} />}
              {isError && <CircleX size={31} strokeWidth={2.5} />}

          </span>
        </div>



        <h2 className="mt-5 text-sm font-semibold text-slate-100">
          {isProcessing && "Please wait while your account is being created"}
          {isSuccess && "Account created successfully"}
          {isError && "Failed to create account"}
        </h2>

        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          {isProcessing && "This may take a few seconds. Please do not close this window."}
          {isSuccess && "Redirecting you to your new account..."}
          {isError && "Please try again later."}
        </p>


        {isSuccess && (
          <div className="mt-3 flex justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"/>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce"/>
          </div>
        )}
      
      </div>
      
    </div>
  )
}

export default NewAccountStatus
