const LoginForm = ({accountType}) => {
  return (
    <div className="mt-8">
      <div>
        <h2>
          {accountType === "admin" ? "Admin Sign in" : "Welcome Back"}
        </h2>

        <p>
          {accountType === "admin" ? "Use your authorised staff credentials" : "Sign in to manage your accounts"}
        </p>
      </div>

      <form className="mt-8">
        <div className="mb-5">
          <label className="text-sm font-medium mb-2">
            Email address
          </label>
          <input className="px-4 py-3 w-full rounded-xl border border-slate-600 bg-slate-800  text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30  "
          id="email"
          type="email"
          placeholder="you@example.com"
          required />
        </div>

        <div className="mb-5">
          <lable className="text-sm font-medium mb-2">
            Password
          </lable>
          <input className="px-4 py-3 rounded-xl w-full border border-slate-600 bg-slate-800 text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-slate-400/30"
          id="password"
          type="password"
          placeholder="Enter your password"
          required/>
        </div>

        <div className="flex items-center justify-between text-sm mb-8">
          <label className="flex items-center text-slate-300 gap-2 ">
          <input type="checkbox"/>
          Remember me
          </label>

          <a className="text-blue-300 hover:text-blue-200"
          href="#forgot">
            Forgot password?
          </a>
        </div>

        <button className=" w-full bg-blue-500 px-4 py-3 rounded-xl font-semibold text-slate-950 transition hover:bg-blue-400 hover:cursor-pointer">
        {accountType === "admin"
        ? "Access admin portal" 
        : "Sign in securely"}
      </button>

      </form>


      <p className="text-center mt-7 text-sm text-slate-300">
        New to Bank?{" "}
        <a className="font-semibold text-blue-300 hover:text-blue-200"
        href="#register">
          Create new account

        </a>
      </p>

      
    </div>
  )
}

export default LoginForm
