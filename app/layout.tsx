import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { NavBar } from './components/navigation/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Podcast Learning Platform',
  description: 'A decentralized platform for podcast learning and earning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}