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
  FilterIcon,
  MapPinIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "lucide-react"
import { format } from "date-fns"

// Mock data for trips
const initialTrips = [
  {
    id: 1,
    route: "Lephalale to Pretoria",
    driver: "John Doe",
    date: new Date("2025-03-15T08:00:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Hatfield Station",
    bookedSeats: 32,
    totalSeats: 45,
    status: "Active",
    price: 150,
  },
  {
    id: 2,
    route: "Pretoria to Lephalale",
    driver: "Jane Smith",
    date: new Date("2025-03-15T16:30:00"),
    pickupPoint: "Hatfield Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    bookedSeats: 28,
    totalSeats: 45,
    status: "Active",
    price: 150,
  },
  {
    id: 3,
    route: "Lephalale to Johannesburg",
    driver: "Michael Johnson",
    date: new Date("2025-03-16T09:15:00"),
    pickupPoint: "Lephalale Mall",
    dropoffPoint: "Sandton City",
    bookedSeats: 22,
    totalSeats: 45,
    status: "Active",
    price: 180,
  },
  {
    id: 4,
    route: "Johannesburg to Lephalale",
    driver: "Sarah Williams",
    date: new Date("2025-03-16T17:45:00"),
    pickupPoint: "Park Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    bookedSeats: 18,
    totalSeats: 45,
    status: "Active",
    price: 180,
  },
  {
    id: 5,
    route: "Lephalale to Pretoria",
    driver: "Robert Brown",
    date: new Date("2025-03-17T08:00:00"),
    pickupPoint: "Lephalale Bus Terminal",
    dropoffPoint: "Pretoria Central",
    bookedSeats: 30,
    totalSeats: 45,
    status: "Cancelled",
    price: 150,
  },
  {
    id: 6,
    route: "Pretoria to Lephalale",
    driver: "John Doe",
    date: new Date("2025-03-17T16:30:00"),
    pickupPoint: "Menlyn Mall",
    dropoffPoint: "Lephalale Mall",
    bookedSeats: 0,
    totalSeats: 45,
    status: "Cancelled",
    price: 150,
  },
  {
    id: 7,
    route: "Lephalale to Johannesburg",
    driver: "Jane Smith",
    date: new Date("2025-03-18T09:15:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Rosebank",
    bookedSeats: 40,
    totalSeats: 45,
    status: "Active",
    price: 180,
  },
  {
    id: 8,
    route: "Johannesburg to Lephalale",
    driver: "Michael Johnson",
    date: new Date("2025-03-18T17:45:00"),
    pickupPoint: "Sandton City",
    dropoffPoint: "Lephalale Bus Terminal",
    bookedSeats: 35,
    totalSeats: 45,
    status: "Active",
    price: 180,
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
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
  { id: 4, name: "Sarah Williams" },
  { id: 5, name: "Robert Brown" },
]

export default function TripsManagement() {
  const [trips, setTrips] = useState(initialTrips)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [selectedRoute, setSelectedRoute] = useState<string>("")
  const [selectedDriver, setSelectedDriver] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Filter trips based on search query and active tab
  const filteredTrips = trips.filter((trip) => {
    // Search filter
    const matchesSearch =
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.pickupPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.dropoffPoint.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    if (activeTab === "all") {
      // No additional filtering
    } else if (activeTab === "active" && trip.status !== "Active") {
      return false
    } else if (activeTab === "cancelled" && trip.status !== "Cancelled") {
      return false
    }

    // Advanced filters
    if (selectedRoute && trip.route !== selectedRoute) {
      return false
    }
    if (selectedDriver && trip.driver !== selectedDriver) {
      return false
    }
    if (selectedStatus && trip.status !== selectedStatus) {
      return false
    }
    if (
      selectedDate &&
      !(
        trip.date.getDate() === selectedDate.getDate() &&
        trip.date.getMonth() === selectedDate.getMonth() &&
        trip.date.getFullYear() === selectedDate.getFullYear()
      )
    ) {
      return false
    }

    return matchesSearch
  })

  const clearFilters = () => {
    setSelectedRoute("")
    setSelectedDriver("")
    setSelectedStatus("")
    setSelectedDate(undefined)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-exxaro">Trip Management</h1>
          <p className="text-slate-500 font-exxaro">View and manage all bus trips</p>
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="font-exxaro">
          <FilterIcon className="h-4 w-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-exxaro">Trips</CardTitle>
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-exxaro"
              />
            </div>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="all" className="font-exxaro">
                All Trips
              </TabsTrigger>
              <TabsTrigger value="active" className="font-exxaro">
                Active
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
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="space-y-2 flex-1">
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

                <div className="space-y-2 flex-1">
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

                <div className="space-y-2 flex-1">
                  <Label htmlFor="status-filter" className="font-exxaro">
                    Status
                  </Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger id="status-filter" className="font-exxaro">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="" className="font-exxaro">
                        All statuses
                      </SelectItem>
                      <SelectItem value="Active" className="font-exxaro">
                        Active
                      </SelectItem>
                      <SelectItem value="Cancelled" className="font-exxaro">
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 flex-1">
                  <Label htmlFor="date-filter" className="font-exxaro">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal font-exxaro"
                        id="date-filter"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
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
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Trip</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Driver</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Date & Time</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Capacity</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Price</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <tr key={trip.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="py-3">
                        <div className="flex flex-col">
                          <p className="font-medium font-exxaro">{trip.route}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500 font-exxaro">
                            <MapPinIcon className="h-3 w-3" />
                            <span>
                              {trip.pickupPoint} → {trip.dropoffPoint}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <UserIcon className="h-3 w-3" />
                          </div>
                          <span className="font-exxaro">{trip.driver}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3 text-primary" />
                            <span className="font-exxaro">{format(trip.date, "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3 text-primary" />
                            <span className="font-exxaro">{format(trip.date, "h:mm a")}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <BusIcon className="h-3 w-3 text-primary" />
                          <span className="font-exxaro">
                            {trip.bookedSeats}/{trip.totalSeats} seats
                          </span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(trip.bookedSeats / trip.totalSeats) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-3 font-exxaro">R{trip.price.toFixed(2)}</td>
                      <td className="py-3">
                        <Badge className={`${getStatusColor(trip.status)} font-exxaro flex items-center gap-1 w-fit`}>
                          {trip.status === "Active" ? <CheckIcon className="h-3 w-3" /> : <XIcon className="h-3 w-3" />}
                          {trip.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500 font-exxaro">
                      No trips found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-slate-500 font-exxaro">
            Showing {filteredTrips.length} of {trips.length} trips
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

