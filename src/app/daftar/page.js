import Link from "next/link" 

export default function Daftar(){
  return (
    <main className="min-h-screen flex flex-col justify-center items-center font-montserrat gap-12">
      <div className="text-center">
        <h1 className="font-bold text-[3rem] leading-10">Welcome back!</h1>
        <p className="text-[1rem] opacity-50">Please enter your details.</p>
      </div>
      <div className="w-1/4 space-y-4">
        <form className="flex flex-col gap-8">
          <div>
            <p className="text-[1.25rem]">Email</p>
            <input placeholder="Enter your email" className="border border-black rounded-md px-[29px] py-4 w-full" />
          </div>
          <div>
            <p className="text-[1.25rem]">Password</p>
            <input type="password" placeholder="Enter password" className="border border-black rounded-md px-[29px] py-4 w-full"/>
            <Link href="#"><p className="text-right font-semibold text-[1rem]">Forgot password</p></Link>
          </div>
          <Link href={"#"} className="bg-black text-white flex flex-row justify-center items-center py-4 rounded-md"><button type="submit">Sign In</button></Link>
        </form>
        <p className="text-center">Don't have an account? <a href="/masuk" className="font-bold">Sign Up</a> </p>
      </div>
    </main>
  )
}