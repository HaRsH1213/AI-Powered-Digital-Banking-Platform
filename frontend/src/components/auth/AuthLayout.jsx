const AuthLayout = ({children}) => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8 ">
      <div className=" mx-auto min-h-[680px] max-w-5xl rounded-3xl border border-slate-700 bg-slate-900 overflow-hidden grid lg:grid-cols-[42%_58%] ">
        {children}

      </div>

    </main>
  )
}

export default AuthLayout
