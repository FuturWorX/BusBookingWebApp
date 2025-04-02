"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3Icon, UsersIcon, BusIcon, CreditCardIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-exxaro">Dashboard</h1>
          <p className="text-slate-500 font-exxaro">Overview of your bus booking system</p>
        </div>
        <Tabs defaultValue="week" value={timeRange} onValueChange={setTimeRange} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="week" className="font-exxaro">
              Week
            </TabsTrigger>
            <TabsTrigger value="month" className="font-exxaro">
              Month
            </TabsTrigger>
            <TabsTrigger value="year" className="font-exxaro">
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Bookings"
          value={timeRange === "week" ? "248" : timeRange === "month" ? "1,024" : "12,568"}
          change={timeRange === "week" ? "+12%" : timeRange === "month" ? "+8%" : "+15%"}
          trend="up"
          icon={<BarChart3Icon className="h-5 w-5" />}
        />
        <MetricCard
          title="Revenue"
          value={timeRange === "week" ? "R37,200" : timeRange === "month" ? "R153,600" : "R1,885,200"}
          change={timeRange === "week" ? "+8%" : timeRange === "month" ? "+5%" : "+12%"}
          trend="up"
          icon={<CreditCardIcon className="h-5 w-5" />}
        />
        <MetricCard
          title="Active Users"
          value={timeRange === "week" ? "156" : timeRange === "month" ? "412" : "1,245"}
          change={timeRange === "week" ? "+5%" : timeRange === "month" ? "+10%" : "+22%"}
          trend="up"
          icon={<UsersIcon className="h-5 w-5" />}
        />
        <MetricCard
          title="Avg. Capacity"
          value={timeRange === "week" ? "78%" : timeRange === "month" ? "72%" : "75%"}
          change={timeRange === "week" ? "+3%" : timeRange === "month" ? "-2%" : "+1%"}
          trend={timeRange === "month" ? "down" : "up"}
          icon={<BusIcon className="h-5 w-5" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-exxaro">Booking Trends</CardTitle>
            <CardDescription className="font-exxaro">Number of bookings over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <BookingTrendsChart timeRange={timeRange} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-exxaro">Popular Routes</CardTitle>
            <CardDescription className="font-exxaro">Most booked routes</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <PopularRoutesChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      {/* Additional metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-exxaro">Upcoming Trips</CardTitle>
            <CardDescription className="font-exxaro">Scheduled trips for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <UpcomingTripsTable />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-exxaro">User Activity</CardTitle>
            <CardDescription className="font-exxaro">New registrations and active users</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <UserActivityChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500 font-exxaro">{title}</p>
            <p className="text-2xl font-bold font-exxaro">{value}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {trend === "up" ? (
            <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"} font-exxaro`}>
            {change}
          </span>
          <span className="text-sm text-slate-500 ml-1 font-exxaro">vs previous period</span>
        </div>
      </CardContent>
    </Card>
  )
}

function BookingTrendsChart({ timeRange }: { timeRange: string }) {
  // This would be replaced with real data in a production app
  const data = {
    week: [42, 38, 45, 50, 32, 48, 40],
    month: [
      120, 145, 132, 150, 125, 138, 142, 130, 145, 155, 148, 160, 152, 145, 138, 142, 150, 155, 160, 165, 158, 152, 145,
      150, 155, 160, 165, 170, 165, 160,
    ],
    year: [800, 950, 1100, 1050, 980, 1200, 1300, 1250, 1100, 1050, 1150, 1200],
  }

  const labels = {
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  }

  const currentData = data[timeRange as keyof typeof data]
  const currentLabels = labels[timeRange as keyof typeof labels]

  // Calculate the max value for scaling
  const maxValue = Math.max(...currentData)

  return (
    <div className="h-64 w-full">
      <div className="flex h-full items-end gap-2">
        {currentData.map((value, index) => (
          <div key={index} className="relative flex-1 group">
            <div
              className="bg-primary/80 hover:bg-primary rounded-t-md transition-all"
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {value} bookings
              </div>
            </div>
            <div className="text-xs text-center mt-1 text-slate-500 font-exxaro">{currentLabels[index]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PopularRoutesChart({ timeRange }: { timeRange: string }) {
  // This would be replaced with real data in a production app
  const routes = [
    { name: "Lephalale to Pretoria", value: timeRange === "week" ? 85 : timeRange === "month" ? 320 : 3800 },
    { name: "Pretoria to Lephalale", value: timeRange === "week" ? 72 : timeRange === "month" ? 280 : 3400 },
    { name: "Lephalale to Johannesburg", value: timeRange === "week" ? 45 : timeRange === "month" ? 180 : 2200 },
    { name: "Johannesburg to Lephalale", value: timeRange === "week" ? 38 : timeRange === "month" ? 160 : 1900 },
    { name: "Pretoria to Johannesburg", value: timeRange === "week" ? 8 : timeRange === "month" ? 84 : 1268 },
  ]

  // Calculate the max value for scaling
  const maxValue = Math.max(...routes.map((route) => route.value))

  return (
    <div className="space-y-4">
      {routes.map((route, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium font-exxaro">{route.name}</span>
            <span className="text-sm text-slate-500 font-exxaro">{route.value} bookings</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(route.value / maxValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function UpcomingTripsTable() {
  // This would be replaced with real data in a production app
  const trips = [
    { id: 1, route: "Lephalale to Pretoria", date: "Mar 13, 2025", time: "08:00 AM", capacity: "32/45" },
    { id: 2, route: "Pretoria to Lephalale", date: "Mar 13, 2025", time: "04:30 PM", capacity: "28/45" },
    { id: 3, route: "Lephalale to Johannesburg", date: "Mar 14, 2025", time: "09:15 AM", capacity: "22/45" },
    { id: 4, route: "Johannesburg to Lephalale", date: "Mar 14, 2025", time: "05:45 PM", capacity: "18/45" },
    { id: 5, route: "Lephalale to Pretoria", date: "Mar 15, 2025", time: "08:00 AM", capacity: "30/45" },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium text-slate-500 font-exxaro">Route</th>
            <th className="text-left py-2 font-medium text-slate-500 font-exxaro">Date</th>
            <th className="text-left py-2 font-medium text-slate-500 font-exxaro">Time</th>
            <th className="text-left py-2 font-medium text-slate-500 font-exxaro">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id} className="border-b last:border-0 hover:bg-slate-50">
              <td className="py-3 font-exxaro">{trip.route}</td>
              <td className="py-3 font-exxaro">{trip.date}</td>
              <td className="py-3 font-exxaro">{trip.time}</td>
              <td className="py-3 font-exxaro">{trip.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function UserActivityChart({ timeRange }: { timeRange: string }) {
  // This would be replaced with real data in a production app
  const data = {
    week: {
      newUsers: [8, 12, 5, 9, 7, 4, 10],
      activeUsers: [42, 38, 45, 50, 32, 48, 40],
    },
    month: {
      newUsers: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 2),
      activeUsers: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 100),
    },
    year: {
      newUsers: [45, 52, 38, 41, 35, 48, 55, 42, 38, 44, 50, 58],
      activeUsers: [320, 350, 380, 360, 340, 390, 420, 400, 380, 410, 430, 450],
    },
  }

  const labels = {
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  }

  const currentData = data[timeRange as keyof typeof data]
  const currentLabels = labels[timeRange as keyof typeof labels]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm font-exxaro">New Users</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary"></div>
          <span className="text-sm font-exxaro">Active Users</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <div className="flex h-full items-end gap-2">
          {currentLabels.map((label, index) => (
            <div key={index} className="relative flex-1 flex flex-col items-center group">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-full bg-secondary/80 hover:bg-secondary rounded-t-md transition-all"
                  style={{ height: `${(currentData.activeUsers[index] / Math.max(...currentData.activeUsers)) * 70}%` }}
                >
                  <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {currentData.activeUsers[index]} active users
                  </div>
                </div>
                <div
                  className="w-full bg-primary/80 hover:bg-primary rounded-t-md transition-all mt-1"
                  style={{ height: `${(currentData.newUsers[index] / Math.max(...currentData.newUsers)) * 30}%` }}
                >
                  <div className="absolute top-0 mt-1 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {currentData.newUsers[index]} new users
                  </div>
                </div>
              </div>
              {timeRange !== "month" && (
                <div className="text-xs text-center mt-1 text-slate-500 font-exxaro">{label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

