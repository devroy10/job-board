"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, User, Bookmark } from "lucide-react"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Applications", href: "/applications?saved=true", icon: Bookmark },
    { name: "Profile", href: "/profile", icon: User },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 w-full z-10 bg-white border-t flex justify-around items-center py-3 md:hidden">
            {navItems.map(({ name, href, icon: Icon }) => (
                <Link key={name} href={href} className="flex flex-col items-center text-gray-500 hover:text-emerald-600">
                    <Icon className={`w-6 h-6 ${pathname === href ? "text-emerald-600" : ""}`} />
                    <span className="text-xs">{name}</span>
                </Link>
            ))}
        </nav>
    )
}
