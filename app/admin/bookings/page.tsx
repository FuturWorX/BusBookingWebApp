"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BusIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  FilterIcon,
  MapPinIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "lucide-react"
import { format, subDays, addDays } from "date-fns"

// Mock data for user bookings
const initialBookings = [
  {
    id: 1,
    userId: 101,
    userName: "John Smith",
    userEmail: "john.smith@example.com",
    userPhone: "+27 71 234 5678",
    route: "Lephalale to Pretoria",
    driver: "Michael Johnson",
    date: new Date("2025-03-15T08:00:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Hatfield Station",
    seats: 1,
    price: 150,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-10T14:30:00"),
  },
  {
    id: 2,
    userId: 102,
    userName: "Sarah Williams",
    userEmail: "sarah.williams@example.com",
    userPhone: "+27 82 345 6789",
    route: "Pretoria to Lephalale",
    driver: "Jane Smith",
    date: new Date("2025-03-15T16:30:00"),
    pickupPoint: "Hatfield Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    seats: 2,
    price: 300,
    paymentMethod: "EFT",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-09T10:15:00"),
  },
  {
    id: 3,
    userId: 103,
    userName: "David Johnson",
    userEmail: "david.johnson@example.com",
    userPhone: "+27 73 456 7890",
    route: "Lephalale to Johannesburg",
    driver: "Robert Brown",
    date: new Date("2025-03-16T09:15:00"),
    pickupPoint: "Lephalale Mall",
    dropoffPoint: "Sandton City",
    seats: 1,
    price: 180,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-11T09:45:00"),
  },
  {
    id: 4,
    userId: 104,
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    userPhone: "+27 84 567 8901",
    route: "Johannesburg to Lephalale",
    driver: "Michael Johnson",
    date: new Date("2025-03-16T17:45:00"),
    pickupPoint: "Park Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    seats: 3,
    price: 540,
    paymentMethod: "EFT",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
    bookingDate: new Date("2025-03-12T16:20:00"),
  },
  {
    id: 5,
    userId: 105,
    userName: "Michael Brown",
    userEmail: "michael.brown@example.com",
    userPhone: "+27 71 678 9012",
    route: "Lephalale to Pretoria",
    driver: "Jane Smith",
    date: new Date("2025-03-17T08:00:00"),
    pickupPoint: "Lephalale Bus Terminal",
    dropoffPoint: "Pretoria Central",
    seats: 1,
    price: 150,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-10T11:30:00"),
  },
  {
    id: 6,
    userId: 106,
    userName: "Jessica Wilson",
    userEmail: "jessica.wilson@example.com",
    userPhone: "+27 82 789 0123",
    route: "Pretoria to Lephalale",
    driver: "Robert Brown",
    date: new Date("2025-03-17T16:30:00"),
    pickupPoint: "Menlyn Mall",
    dropoffPoint: "Lephalale Mall",
    seats: 2,
    price: 300,
    paymentMethod: "EFT",
    paymentStatus: "Paid",
    bookingStatus: "Cancelled",
    bookingDate: new Date("2025-03-08T14:10:00"),
  },
  {
    id: 7,
    userId: 107,
    userName: "Daniel Taylor",
    userEmail: "daniel.taylor@example.com",
    userPhone: "+27 73 890 1234",
    route: "Lephalale to Johannesburg",
    driver: "Michael Johnson",
    date: new Date("2025-03-18T09:15:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Rosebank",
    seats: 1,
    price: 180,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-11T13:45:00"),
  },
  {
    id: 8,
    userId: 108,
    userName: "Olivia Martinez",
    userEmail: "olivia.martinez@example.com",
    userPhone: "+27 84 901 2345",
    route: "Johannesburg to Lephalale",
    driver: "Jane Smith",
    date: new Date("2025-03-18T17:45:00"),
    pickupPoint: "Sandton City",
    dropoffPoint: "Lephalale Bus Terminal",
    seats: 4,
    price: 720,
    paymentMethod: "EFT",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-09T15:30:00"),
  },
  {
    id: 9,
    userId: 109,
    userName: "James Anderson",
    userEmail: "james.anderson@example.com",
    userPhone: "+27 71 012 3456",
    route: "Lephalale to Pretoria",
    driver: "Robert Brown",
    date: new Date("2025-03-19T08:00:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Hatfield Station",
    seats: 1,
    price: 150,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    bookingDate: new Date("2025-03-12T10:20:00"),
  },
  {
    id: 10,
    userId: 110,
    userName: "Sophia Thomas",
    userEmail: "sophia.thomas@example.com",
    userPhone: "+27 82 123 4567",
    route: "Pretoria to Lephalale",
    driver: "Michael Johnson",
    date: new Date("2025-03-19T16:30:00"),
    pickupPoint: "Pretoria Central",
    dropoffPoint: "Lephalale Mall",
    seats: 2,
    price: 300,
    paymentMethod: "EFT",
    paymentStatus: "Pending",
    bookingStatus: "Pending",
    bookingDate: new Date("2025-03-13T09:15:00"),
  },
]

// Mock data for routes and drivers
const routes = [
  { id: 1, name: "Lephalale to Pretoria" },
  { id: 2, name: "Pretoria to Lephalale" },
  { id: 3, name: "Lephalale to Johannesburg" },
  { id: 4, name: "Johannesburg to Lephalale" },
]

const drivers = [
  { id: 1, name: "Michael Johnson" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Brown" },
]

export default function UserBookingsManagement() {
  const [bookings, setBookings] = useState(initialBookings)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: subDays(new Date(), 7),
    to: addDays(new Date(), 30),
  })

  // Filter states
  const [selectedRoute, setSelectedRoute] = useState<string>("")
  const [selectedDriver, setSelectedDriver] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("")
  const [selectedDateRange, setSelectedDateRange] = useState<"upcoming" | "past" | "all">("all")

  // Filter bookings based on search query and active tab
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const matchesSearch =
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.driver.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    if (activeTab === "all") {
      // No additional filtering
    } else if (activeTab === "confirmed" && booking.bookingStatus !== "Confirmed") {
      return false
    } else if (activeTab === "pending" && booking.bookingStatus !== "Pending") {
      return false
    } else if (activeTab === "cancelled" && booking.bookingStatus !== "Cancelled") {
      return false
    }

    // Advanced filters
    if (selectedRoute && booking.route !== selectedRoute) {
      return false
    }
    if (selectedDriver && booking.driver !== selectedDriver) {
      return false
    }
    if (selectedStatus && booking.bookingStatus !== selectedStatus) {
      return false
    }
    if (selectedPaymentStatus && booking.paymentStatus !== selectedPaymentStatus) {
      return false
    }

    // Date range filter
    if (selectedDateRange === "upcoming" && booking.date < new Date()) {
      return false
    }
    if (selectedDateRange === "past" && booking.date > new Date()) {
      return false
    }

    // Custom date range filter
    if (dateRange.from && booking.date < dateRange.from) {
      return false
    }
    if (dateRange.to && booking.date > dateRange.to) {
      return false
    }

    return matchesSearch
  })

  const clearFilters = () => {
    setSelectedRoute("")
    setSelectedDriver("")
    setSelectedStatus("")
    setSelectedPaymentStatus("")
    setSelectedDateRange("all")
    setDateRange({ from: subDays(new Date(), 7), to: addDays(new Date(), 30) })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const exportToCSV = () => {
    // In a real application, this would generate a CSV file with the filtered bookings
    alert("Exporting bookings to CSV...")
  }

  const getTotalRevenue = () => {
    return filteredBookings.reduce((total, booking) => {
      if (booking.bookingStatus !== "Cancelled") {
        return total + booking.price
      }
      return total
    }, 0)
  }

  const getTotalBookings = () => {
    return filteredBookings.length
  }

  const getTotalPassengers = () => {
    return filteredBookings.reduce((total, booking) => {
      if (booking.bookingStatus !== "Cancelled") {
        return total + booking.seats
      }
      return total
    }, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-exxaro">User Bookings</h1>
          <p className="text-slate-500 font-exxaro">View and manage all user bookings</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="font-exxaro">
            <FilterIcon className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button onClick={exportToCSV} variant="outline" className="font-exxaro">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 font-exxaro">Total Bookings</p>
                <p className="text-2xl font-bold font-exxaro">{getTotalBookings()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <BusIcon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 font-exxaro">Total Passengers</p>
                <p className="text-2xl font-bold font-exxaro">{getTotalPassengers()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UserIcon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500 font-exxaro">Total Revenue</p>
                <p className="text-2xl font-bold font-exxaro">R{getTotalRevenue().toFixed(2)}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-exxaro">Bookings</CardTitle>
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-exxaro"
              />
            </div>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all" className="font-exxaro">
                All
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="font-exxaro">
                Confirmed
              </TabsTrigger>
              <TabsTrigger value="pending" className="font-exxaro">
                Pending
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="font-exxaro">
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        {showFilters && (
          <div className="px-6 pb-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="route-filter" className="font-exxaro">
                    Route
                  </Label>
                  <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                    <SelectTrigger id="route-filter" className="font-exxaro">
                      <SelectValue placeholder="All routes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="" className="font-exxaro">
                        All routes
                      </SelectItem>
                      {routes.map((route) => (
                        <SelectItem key={route.id} value={route.name} className="font-exxaro">
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driver-filter" className="font-exxaro">
                    Driver
                  </Label>
                  <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                    <SelectTrigger id="driver-filter" className="font-exxaro">
                      <SelectValue placeholder="All drivers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="" className="font-exxaro">
                        All drivers
                      </SelectItem>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.name} className="font-exxaro">
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-filter" className="font-exxaro">
                    Booking Status
                  </Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger id="status-filter" className="font-exxaro">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="" className="font-exxaro">
                        All statuses
                      </SelectItem>
                      <SelectItem value="Confirmed" className="font-exxaro">
                        Confirmed
                      </SelectItem>
                      <SelectItem value="Pending" className="font-exxaro">
                        Pending
                      </SelectItem>
                      <SelectItem value="Cancelled" className="font-exxaro">
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-status-filter" className="font-exxaro">
                    Payment Status
                  </Label>
                  <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                    <SelectTrigger id="payment-status-filter" className="font-exxaro">
                      <SelectValue placeholder="All payment statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="" className="font-exxaro">
                        All payment statuses
                      </SelectItem>
                      <SelectItem value="Paid" className="font-exxaro">
                        Paid
                      </SelectItem>
                      <SelectItem value="Pending" className="font-exxaro">
                        Pending
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range-filter" className="font-exxaro">
                    Date Range
                  </Label>
                  <Select
                    value={selectedDateRange}
                    onValueChange={(value: "upcoming" | "past" | "all") => setSelectedDateRange(value)}
                  >
                    <SelectTrigger id="date-range-filter" className="font-exxaro">
                      <SelectValue placeholder="All dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="font-exxaro">
                        All dates
                      </SelectItem>
                      <SelectItem value="upcoming" className="font-exxaro">
                        Upcoming trips
                      </SelectItem>
                      <SelectItem value="past" className="font-exxaro">
                        Past trips
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-4 items-end justify-between">
                <div className="space-y-2 w-full md:w-auto">
                  <Label htmlFor="custom-date-range" className="font-exxaro">
                    Custom Date Range
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full md:w-auto justify-start text-left font-normal font-exxaro"
                        id="custom-date-range"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button variant="outline" onClick={clearFilters} className="font-exxaro">
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">User</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Trip Details</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Date & Time</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Seats</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Price</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Payment</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="py-3">
                        <div className="flex flex-col">
                          <p className="font-medium font-exxaro">{booking.userName}</p>
                          <p className="text-xs text-slate-500 font-exxaro">{booking.userEmail}</p>
                          <p className="text-xs text-slate-500 font-exxaro">{booking.userPhone}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <p className="font-medium font-exxaro">{booking.route}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500 font-exxaro">
                            <MapPinIcon className="h-3 w-3" />
                            <span>
                              {booking.pickupPoint} → {booking.dropoffPoint}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500 font-exxaro">
                            <UserIcon className="h-3 w-3" />
                            <span>Driver: {booking.driver}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3 text-primary" />
                            <span className="font-exxaro">{format(booking.date, "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3 text-primary" />
                            <span className="font-exxaro">{format(booking.date, "h:mm a")}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="font-exxaro">Booked: {format(booking.bookingDate, "MMM d, yyyy")}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-exxaro">{booking.seats}</td>
                      <td className="py-3 font-exxaro">R{booking.price.toFixed(2)}</td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-exxaro">{booking.paymentMethod}</span>
                          <Badge className={`${getPaymentStatusColor(booking.paymentStatus)} font-exxaro mt-1 w-fit`}>
                            {booking.paymentStatus}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge
                          className={`${getStatusColor(booking.bookingStatus)} font-exxaro flex items-center gap-1 w-fit`}
                        >
                          {booking.bookingStatus === "Confirmed" ? (
                            <CheckIcon className="h-3 w-3" />
                          ) : booking.bookingStatus === "Cancelled" ? (
                            <XIcon className="h-3 w-3" />
                          ) : (
                            <ClockIcon className="h-3 w-3" />
                          )}
                          {booking.bookingStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500 font-exxaro">
                      No bookings found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-slate-500 font-exxaro">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

