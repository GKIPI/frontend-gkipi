import './globals.css'
import { Inter } from 'next/font/google'
// import Navbar from './components/navbar'
import Footer from './components/footer'
import AuthProvider from './components/authProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Komunitas Profesi Grha Persahabatan',
  description: 'Komunitas Profesi Grha Persahabatan GKIPI',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
