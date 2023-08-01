import './globals.css'
import { Inter } from 'next/font/google'
// import Navbar from './components/navbar'
import Footer from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Komunitas Profesi Grha Persahabatan',
  description: 'Komunitas Profesi Grha Persahabatan GKIPI',
}

export default function RootLayout({ children }) {
  return (
    <html className="!overflow-x-hidden" lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
      </head>
      <body>
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
