"use client"
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation";


export default function SignUp() {
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [isConfirmedHidden, setIsConfirmedHidden] = useState(true)
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { name, email, password } = userInfo;
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const router = useRouter()

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (validatePassword()) {
      try {
        console.log("start fetching");
        const res = await fetch("/api/auth/users", {
          method: "POST",
          body: JSON.stringify(userInfo),
        });

        if (res.ok) {
          router.push("/login");
        } else {
          const { error } = await res.json();
          setError(error); // Set the error message in case of failure
        }
      } catch (error) {
        setError("Something went wrong. Please try again later."); // Handle network or other errors
      }
    } else {
      setError("Passwords do not match.");
    }
  };


  const validatePassword = () => {
    return userInfo.password === confirmedPassword
  }

  return (
    <div >
      <div className="pt-8 md:pt-10 lg:pt-4 pl-2 md:pl-6 lg:pl-12">
        <Link href={"/login"}>
          <FiArrowLeft className="h-8 md:h-10 w-max" />
        </Link>
      </div>
      <main className="min-h-screen flex flex-col justify-center items-center font-montserrat gap-12 py-36">
        <div className="text-center">
          <h1 className="font-bold text-[3rem] text-zinc-800 leading-10">Get Started</h1>
          <p className="text-[1rem] opacity-50">Create your account now</p>
        </div>
        <div className="text-sm md:text-base w-4/5 sm:w-1/2 lg:w-1/4 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="space-y-2">
              <p className="text-[1.25rem]">Full name</p>
              <input
                onChange={handleChange}
                type="name"
                name="name"
                label="Name"
                value={name}
                placeholder="Enter your full name"
                className="border border-black rounded-md px-[29px] py-4 w-full"
                required />
            </div>

            <div className="space-y-2">
              <p className="text-[1.25rem]">Email</p>
              <input
                onChange={handleChange}
                type="email"
                label="Email"
                name="email"
                value={email}
                placeholder="Enter your email"
                className="border border-black rounded-md px-[29px] py-4 w-full"
                required />
            </div >

            <div className="mb-5 space-y-2">
              <p className="text-[1.25rem]">Password</p>
              <div className="relative">
                <input
                  onChange={handleChange}
                  label="Password"
                  name="password"
                  value={password}
                  type={isPasswordHidden ? "password" : "show"}
                  placeholder="Enter password"
                  className="border border-black rounded-md px-[29px] py-4 w-full"
                  required />
                <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                  {isPasswordHidden ? <FiEyeOff size={20} onClick={() => setIsPasswordHidden(!isPasswordHidden)} /> : <FiEye size={20} onClick={() => setIsPasswordHidden(!isPasswordHidden)} />}
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
                      userInfo.password !== confirmedPassword ? "outline-2 outline-red-500" : ""
                    )}
                  required />
                <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                  {isConfirmedHidden ? <FiEyeOff size={20} onClick={() => setIsConfirmedHidden(!isConfirmedHidden)} /> : <FiEye size={20} onClick={() => setIsConfirmedHidden(!isConfirmedHidden)} />}
                </div>
              </div>
              <p className={"text-sm " + (
                userInfo.password !== confirmedPassword ? "block" : "hidden"
              )}>* Re-enter the same password</p>
            </div>
            {error && (
              <p className="text-red-500 text-xs">*{error}</p>
            )}


            <button type="submit" className="bg-black text-white text-center py-4 rounded-md">Sign Up</button>
          </form>
          <div className="text-center">
            <p>Have an account? <a href="/login" className="font-bold">Sign In</a> </p>
            <p>or</p>
            <p><a href="/login" className="font-bold">Sign in with Google</a></p>
          </div>
        </div>
      </main>
    </div>
  )
}