"use client"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useState } from "react"

export default function SignUp(){
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmedHidden, setIsConfirmedHidden] = useState(true)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (validatePassword()) {
      console.log({userName: userName, userEmail: userEmail, userPassword: userPassword})
    }
  }

  const validatePassword = () => {
    return userPassword === confirmedPassword
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center font-montserrat gap-12 py-36">
      <div className="text-center">
        <h1 className="font-bold text-[3rem] leading-10">Get Started</h1>
        <p className="text-[1rem] opacity-50">Create your account now</p>
      </div>
      <div className="text-sm md:text-base w-4/5 sm:w-1/2 lg:w-1/4 space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="space-y-2">
            <p className="text-[1.25rem]">Full name</p>
            <input 
            onChange={ev => setUserName(ev.target.value)}
            type="text"
            value={userName}
            placeholder="Enter your full name"
            className="border border-black rounded-md px-[29px] py-4 w-full" 
            required />
          </div>
          
          <div className="space-y-2">
            <p className="text-[1.25rem]">Email</p>
            <input 
            onChange={ev => setUserEmail(ev.target.value)} 
            type="text"
            value={userEmail} 
            placeholder="Enter your email" 
            className="border border-black rounded-md px-[29px] py-4 w-full" 
            required />
          </div >
          
          <div className="mb-5 space-y-2">
            <p className="text-[1.25rem]">Password</p>
            <div className="relative">
              <input 
              onChange={ev => setUserPassword(ev.target.value)} 
              value={userPassword} 
              type={isPasswordHidden ? "password" : "show"}
              placeholder="Enter password" 
              className="border border-black rounded-md px-[29px] py-4 w-full"
              required />
              <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                {isPasswordHidden ? <FiEyeOff size={20} onClick={()=>setIsPasswordHidden(!isPasswordHidden)}/> : <FiEye size={20} onClick={()=>setIsPasswordHidden(!isPasswordHidden)}/> }
              </div>
            </div>
          </div>
          
          <div className="mb-5 space-y-2">
            <p className="text-[1.25rem]">Confirm Password</p>
            <div className="relative">
              <input 
              onChange={ev => setConfirmedPassword(ev.target.value)} 
              value={confirmedPassword} 
              type={isConfirmedHidden ? "password" : "show"}
              placeholder="Re-enter your password" 
              className={"border border-black rounded-md px-[29px] py-4 w-full " +
              (
                userPassword !== confirmedPassword ? "outline-2 outline-red-500" : ""
              )}
              required />
              <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                {isConfirmedHidden ? <FiEyeOff size={20} onClick={()=>setIsConfirmedHidden(!isConfirmedHidden)}/> : <FiEye size={20} onClick={()=>setIsConfirmedHidden(!isConfirmedHidden)}/> }
              </div>
            </div>
              <p className={"text-sm " + (
                userPassword !== confirmedPassword ? "block" : "hidden"
              )}>* Re-enter the same password</p>
          </div>
          
          <button type="submit" className="bg-black text-white text-center py-4 rounded-md">Sign Up</button>
        </form>
        <div className="text-center">
          <p>Have an account? <a href="/login" className="font-bold">Sign In</a> </p>
          <p>or</p>
          <p><a href="/login" className="font-bold">Sign in with Google</a></p>
        </div>
      </div>
    </main>
  )
}