import { useState } from "react"
import api from "../services/api"

const LoginForm = ({accountType}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e)=>{
    e.preventDefault()
    try{
      const response = await api.post("/auth/login", {email, password})
      console.log(response.data)
      alert('Login successful')
    }catch(error){
      console.log(error);
      alert(error.response?.data?.message || "Login Failed")

    }
    setEmail("")
    setPassword("")
    
  }
  return (
    <div className="mt-8">
      <div>
        <h2 className=" text-3xl font-semibold mb-2">
          {accountType === "admin" ? "Admin Sign in" : "Welcome Back"}
        </h2>

        <p className=" text-sm text-slate-300 ">
          {accountType === "admin" ? "Use your authorised staff credentials" : "Sign in to manage your accounts"}
        </p>
      </div>

      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className="mt-8">
        <div className="mb-5">
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

        <div className="mb-5">
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

        <div className="flex items-center justify-between text-sm mb-8">
          <label className="flex items-center text-slate-300 gap-2 " htmlFor="remember">
          <input type="checkbox" id="remember"/>
          Remember me
          </label>

          <a className="text-blue-300 hover:text-blue-200"
          href="#forgot">
            Forgot password?
          </a>
        </div>

        <button type="submit" 
        className=" w-full bg-blue-500 px-4 py-3 rounded-xl font-semibold text-slate-950 transition hover:bg-blue-400 hover:cursor-pointer">
        {accountType === "admin"
        ? "Access admin portal" 
        : "Sign in securely"}
      </button>

      </form>

      {accountType === "user" && (
        <p className="mt-7 text-center text-sm text-slate-300">
          New to Bank?{" "}
          <a
            className="font-semibold text-blue-300 hover:text-blue-200"
            href="#register"
          >
            Create new account
          </a>
        </p>   
        )
      }
      


      <p className="mt-7 border-t border-slate-700 pt-5 text-xs text-slate-400">
        <span className="font-semibold text-slate-200">
          Registration:
        </span>{" "}
        Only new users can register. Admin accounts are created by the bank and
        cannot be created through public registration.
      </p>

      
    </div>
  )
}

export default LoginForm
