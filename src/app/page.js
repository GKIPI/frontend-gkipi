import Link from 'next/link'
import Hero from './components/hero'
import Menu from './components/menu'
import Navbar from './components/navbar_hero'

export default function Home() {
  return (
    <main className='h-[100vh] flex flex-col gap-8 justify-center items-center overflow-x-hidden'>
      {/* <Navbar/> */}
      {/* <Hero/> */}
      {/* <Menu/> */}
      <div>
        <h1 className='font-poppins font-semibold text-5xl'>Website under Maintenance</h1>
      </div>
      <Link href={"/login"}>
        <button className="bg-zinc-800 px-5 py-2 text-slate-200 hover:outline hover:outline-2 hover:outline-zinc-800 hover:bg-transparent hover:text-zinc-800 transition-colors duration-200">
          Go To Login</button>
      </Link>
    </main>
  )
}
