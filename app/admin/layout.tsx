import type React from "react"
import type { Metadata } from "next"
import AdminLayout from "./admin-layout"

export const metadata: Metadata = {
  title: "Admin Dashboard - Exxaro Bus Booking",
  description: "Admin dashboard for Exxaro Bus Booking system",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: AdminLayoutProps) {
  return <AdminLayout children={children} />
}

