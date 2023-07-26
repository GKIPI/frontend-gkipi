import Hero from './components/hero'
import Menu from './components/menu'

export default function Home() {
  return (
    <main className='h-[100vh] flex flex-col justify-end overflow-x-hidden'>
      <Hero/>
      <Menu/>
    </main>
  )
}
