import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from "@/app/SessionProvider";
import Navbar from "@/app/components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RideShare',
  description: 'Fuck SNTF',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <SessionProvider>
                <div className={"flex flex-col-reverse md:flex-col"}>
                    <Navbar />
                    {children}
                </div>
            </SessionProvider>
      </body>
    </html>
  )
}
