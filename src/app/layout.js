"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './components/footer'
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './components/authProvider'
import { ToastContainer } from 'react-toastify'
const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Komunitas Profesi Grha Persahabatan',
//   description: 'Komunitas Profesi Grha Persahabatan GKIPI',
// }

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html className="!overflow-x-hidden" lang="en">
        <head>
          <link rel="icon" href="favicon.ico" />
        </head>
        <body>
          {children}
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}
