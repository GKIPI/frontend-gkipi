"use client"
import Link from "next/link" 
import { useState } from "react"

export default function Login(){
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const handleEmailChange = (ev) => {
    setUserEmail(ev.target.value)
  }
  const handlePasswordChange = (ev) => {
    setUserPassword(ev.target.value)
  }
  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log({userEmail: userEmail, userPassword: userPassword})
  }
  return (
    <main className="min-h-screen flex flex-col justify-center items-center font-montserrat gap-12">
      <div className="text-center">
        <h1 className="font-bold text-[3rem] leading-10">Welcome back!</h1>
        <p className="text-[1rem] opacity-50">Please enter your details.</p>
      </div>
      <div className="w-1/4 space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <p className="text-[1.25rem]">Email</p>
            <input onChange={ev => handleEmailChange(ev)} value={userEmail} placeholder="Enter your email" className="border border-black rounded-md px-[29px] py-4 w-full" />
          </div>
          <div>
            <p className="text-[1.25rem]">Password</p>
            <input onChange={ev => handlePasswordChange(ev)} value={userPassword} type="password" placeholder="Enter password" className="border border-black rounded-md px-[29px] py-4 w-full"/>
            <Link href="#"><p className="text-right font-semibold text-[1rem]">Forgot password</p></Link>
          </div>
          <button type="submit" className="bg-black text-white text-center py-4 rounded-md">Sign In</button>
        </form>
        <p className="text-center">Don't have an account? <a href="/signup" className="font-bold">Sign Up</a> </p>
      </div>
    </main>
  )
}