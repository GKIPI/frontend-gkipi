import Hero from './components/hero'
import Menu from './components/menu'
import Navbar from './components/navbar_hero'

export default function Home() {
  return (
    <main className='h-[100vh] flex flex-col justify-end overflow-x-hidden'>
      <Navbar/>
      <Hero/>
      <Menu/>
    </main>
  )
}
