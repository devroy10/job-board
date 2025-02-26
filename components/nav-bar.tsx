"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">U</div>
            <div>
              <div className="font-semibold text-emerald-600">Job Match</div>
              <div className="text-xs text-muted-foreground">Land a job</div>
            </div>
          </Link>
          <nav className="flex gap-6 ml-8">
            <Link
              href="/profile"
              className={cn("text-sm font-medium", pathname === "/profile" && "text-emerald-600")}
            >
              PROFILE
            </Link>
            <Link href="/jobs" className={cn("text-sm font-medium", pathname === "/jobs" && "text-emerald-600")}>
              FIND JOBS
            </Link>
            <Link
              href="/applications"
              className={cn("text-sm font-medium", pathname === "/applications" && "text-emerald-600")}
            >
              APPLICATIONS
            </Link>
            <Link
              href="/companies"
              className={cn("text-sm font-medium", pathname === "/companies" && "text-emerald-600")}
            >
              COMPANIES
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            Company
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

