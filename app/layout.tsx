import { NavBar } from "@/components/nav-bar"
import type { Metadata } from 'next'
import './globals.css'

import { Noto_Sans } from 'next/font/google'
import { Raleway } from 'next/font/google';
import { MobileNav } from "@/components/mobile-nav";


const noto = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
})

const raleway = Raleway({ subsets: ['latin'], fallback: ['sans-serif'] });


// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: "Job Match",
  description: "The only job matcher you need to land your dream job. With Job match scores and AI-powered job recommendations, we'll find the perfect job for you.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${noto.variable}`}>
      <body className={`${raleway.className} pb-12 md:pb-0 `}>
        <NavBar />
        <MobileNav />
        {children}
      </body>
    </html>
  )
}
