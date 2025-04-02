"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboardIcon,
  UsersIcon,
  BusIcon,
  Settings2Icon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  TicketIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile navigation */}
      <MobileNav />

      {/* Desktop navigation */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center">
            <Image src="/logo.svg" alt="Exxaro Logo" width={120} height={40} className="h-8 w-auto" priority />
            <span className="ml-2 text-lg font-bold text-secondary font-exxaro">Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="px-4 space-y-1">
            <NavLink href="/admin" icon={<LayoutDashboardIcon className="h-5 w-5" />} label="Dashboard" />
            <NavLink href="/admin/users" icon={<UsersIcon className="h-5 w-5" />} label="User Management" />
            <NavLink href="/admin/routes" icon={<BusIcon className="h-5 w-5" />} label="Route Management" />
            <NavLink href="/admin/trips" icon={<TicketIcon className="h-5 w-5" />} label="Trip Management" />
            <NavLink href="/admin/bookings" icon={<TicketIcon className="h-5 w-5" />} label="User Bookings" />
            <NavLink href="/admin/settings" icon={<Settings2Icon className="h-5 w-5" />} label="Customization" />
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-exxaro"
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const isActive = typeof window !== "undefined" && window.location.pathname === href

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary/10 text-primary" : "text-slate-700 hover:bg-slate-100 hover:text-primary",
        )}
      >
        {icon}
        <span className="font-exxaro">{label}</span>
      </div>
    </Link>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden absolute top-4 left-4 z-50">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center" onClick={() => setOpen(false)}>
              <Image src="/logo.svg" alt="Exxaro Logo" width={120} height={40} className="h-8 w-auto" priority />
              <span className="ml-2 text-lg font-bold text-secondary font-exxaro">Admin</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 py-4 h-[calc(100vh-81px)]">
          <nav className="px-4 space-y-1">
            <NavLink href="/admin" icon={<LayoutDashboardIcon className="h-5 w-5" />} label="Dashboard" />
            <NavLink href="/admin/users" icon={<UsersIcon className="h-5 w-5" />} label="User Management" />
            <NavLink href="/admin/routes" icon={<BusIcon className="h-5 w-5" />} label="Route Management" />
            <NavLink href="/admin/trips" icon={<TicketIcon className="h-5 w-5" />} label="Trip Management" />
            <NavLink href="/admin/bookings" icon={<TicketIcon className="h-5 w-5" />} label="User Bookings" />
            <NavLink href="/admin/settings" icon={<Settings2Icon className="h-5 w-5" />} label="Customization" />
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-exxaro"
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

