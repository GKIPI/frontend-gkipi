"use client"
import Link from "next/link"
import { useState } from "react"
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const { email, password } = userInfo
  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    console.log(res)
    if (res.error) return Error("error")
    router.push("/lowongan")
  }
  return (
    <div>
      <div className="pt-8 md:pt-10 lg:pt-4 pl-2 md:pl-6 lg:pl-12">
        <Link href={"/"}>
          <FiArrowLeft className="h-8 md:h-10 w-max" />
        </Link>
      </div>
      <main className="min-h-screen flex flex-col justify-center items-center font-montserrat gap-12 pt-16 pb-36">
        <div className="text-center">
          <h1 className="font-bold text-[3rem] leading-10 px-4">Welcome back!</h1>
          <p className="text-[1rem] opacity-50">Please enter your details.</p>
        </div>
        <div className="text-sm md:text-base w-4/5 sm:w-1/2 lg:w-1/4 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            <div className="space-y-2">
              <p className="text-[1.25rem]">Email</p>
              <input
                onChange={handleChange}
                name="email"
                value={email}
                type="email"
                label="Email"
                placeholder="Enter your email"
                className="border border-black rounded-md px-[29px] py-4 w-full"
                required />
            </div>

            <div className="mb-5 space-y-2">
              <p className="text-[1.25rem]">Password</p>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={password}
                  name="password"
                  label="Password"
                  type={isPasswordHidden ? "password" : "show"}
                  placeholder="Enter password"
                  className="border border-black rounded-md px-[29px] py-4 w-full"
                  required />
                <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                  {isPasswordHidden ? <FiEyeOff size={20} onClick={() => setIsPasswordHidden(!isPasswordHidden)} /> : <FiEye size={20} onClick={() => setIsPasswordHidden(!isPasswordHidden)} />}
                </div>
              </div>
              <Link href="#" className=""><p className=" text-right font-semibold text-[1rem]">Forgot password</p></Link>
            </div>
            <button type="submit" className="bg-black text-white text-center py-4 rounded-md" onSubmit={handleSubmit}>Sign In</button>
          </form>
          <div className="text-center">
            <p>Don't have an account? <a href="/signup" className="font-bold">Sign Up</a> </p>
            <p>or</p>
            <p><a href="/login" className="font-bold">Sign in with Google</a></p>
          </div>
        </div>
      </main>
    </div>
  )
}