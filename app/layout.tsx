import { NavBar } from "@/components/nav-bar"
import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        </body>
    </html>
  )
}
