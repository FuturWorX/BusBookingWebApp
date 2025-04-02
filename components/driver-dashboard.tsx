"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BusIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  ScanIcon,
  MapIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  NavigationIcon,
  UserCheckIcon,
  UserXIcon,
} from "lucide-react"
import { format } from "date-fns"
import QrScanner from "@/components/qr-scanner"

// Mock data for trips
const todayTrips = [
  {
    id: 1,
    route: "Lephalale to Pretoria",
    date: new Date("2025-03-12T08:00:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Hatfield Station",
    bookedSeats: 32,
    totalSeats: 45,
    status: "In Progress",
    currentLocation: "Bela-Bela",
    estimatedArrival: new Date("2025-03-12T11:30:00"),
    passengers: [
      { id: 1, name: "John Doe", ticketNumber: "EXR-12345", status: "Checked In" },
      { id: 2, name: "Jane Smith", ticketNumber: "EXR-12346", status: "Checked In" },
      { id: 3, name: "Michael Johnson", ticketNumber: "EXR-12347", status: "Not Checked In" },
      // More passengers would be here
    ],
  },
  {
    id: 2,
    route: "Pretoria to Lephalale",
    date: new Date("2025-03-12T16:30:00"),
    pickupPoint: "Hatfield Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    bookedSeats: 28,
    totalSeats: 45,
    status: "Scheduled",
    currentLocation: "Pretoria",
    estimatedArrival: new Date("2025-03-12T20:00:00"),
    passengers: [
      { id: 4, name: "Robert Brown", ticketNumber: "EXR-12348", status: "Not Checked In" },
      { id: 5, name: "Sarah Wilson", ticketNumber: "EXR-12349", status: "Not Checked In" },
      // More passengers would be here
    ],
  },
]

const upcomingTrips = [
  {
    id: 3,
    route: "Lephalale to Johannesburg",
    date: new Date("2025-03-13T09:15:00"),
    pickupPoint: "Lephalale Mall",
    dropoffPoint: "Sandton City",
    bookedSeats: 22,
    totalSeats: 45,
    status: "Scheduled",
  },
  {
    id: 4,
    route: "Johannesburg to Lephalale",
    date: new Date("2025-03-13T17:45:00"),
    pickupPoint: "Park Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    bookedSeats: 18,
    totalSeats: 45,
    status: "Scheduled",
  },
]

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState("today")
  const [selectedTrip, setSelectedTrip] = useState<(typeof todayTrips)[0] | null>(todayTrips[0])
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; ticketNumber?: string } | null>(
    null,
  )
  const [updatingLocation, setUpdatingLocation] = useState(false)

  const handleScanResult = (result: string) => {
    try {
      const ticketData = JSON.parse(result)

      // Check if ticket exists in the selected trip
      if (selectedTrip) {
        const passenger = selectedTrip.passengers.find((p) => p.ticketNumber === ticketData.ticketNumber)

        if (passenger) {
          if (passenger.status === "Checked In") {
            setScanResult({
              success: false,
              message: "Passenger already checked in",
              ticketNumber: ticketData.ticketNumber,
            })
          } else {
            // Update passenger status (in a real app, this would call an API)
            passenger.status = "Checked In"
            setScanResult({
              success: true,
              message: "Passenger checked in successfully",
              ticketNumber: ticketData.ticketNumber,
            })
          }
        } else {
          setScanResult({
            success: false,
            message: "Ticket not found for this trip",
            ticketNumber: ticketData.ticketNumber,
          })
        }
      }
    } catch (error) {
      setScanResult({
        success: false,
        message: "Invalid QR code",
      })
    }

    setIsScanning(false)
  }

  const updateLocation = (tripId: number, location: string) => {
    setUpdatingLocation(true)

    // Simulate API call
    setTimeout(() => {
      if (selectedTrip && selectedTrip.id === tripId) {
        selectedTrip.currentLocation = location
      }
      setUpdatingLocation(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Scheduled":
        return "bg-amber-100 text-amber-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getPassengerStatusColor = (status: string) => {
    switch (status) {
      case "Checked In":
        return "bg-green-100 text-green-800"
      case "Not Checked In":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="today" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="today" className="font-exxaro">
            Today's Trips
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="font-exxaro">
            Upcoming Trips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold text-secondary font-exxaro">Trip List</h2>

              {todayTrips.map((trip) => (
                <Card
                  key={trip.id}
                  className={`cursor-pointer hover:shadow-md transition-all ${selectedTrip?.id === trip.id ? "border-primary" : ""}`}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-semibold text-secondary font-exxaro">{trip.route}</CardTitle>
                      <div
                        className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${getStatusColor(trip.status)}
                      `}
                      >
                        {trip.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-primary" />
                        <span className="font-exxaro">{format(trip.date, "h:mm a")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-primary" />
                        <span className="font-exxaro">
                          {trip.bookedSeats}/{trip.totalSeats} seats booked
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedTrip ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-semibold text-secondary font-exxaro">
                            {selectedTrip.route}
                          </CardTitle>
                          <CardDescription className="font-exxaro">
                            {format(selectedTrip.date, "EEEE, MMMM d, yyyy")} at {format(selectedTrip.date, "h:mm a")}
                          </CardDescription>
                        </div>
                        <div
                          className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(selectedTrip.status)}
                        `}
                        >
                          {selectedTrip.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <MapPinIcon className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500 font-exxaro">Pickup</p>
                              <p className="text-sm font-exxaro">{selectedTrip.pickupPoint}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPinIcon className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500 font-exxaro">Drop-off</p>
                              <p className="text-sm font-exxaro">{selectedTrip.dropoffPoint}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <BusIcon className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500 font-exxaro">Capacity</p>
                              <p className="text-sm font-exxaro">
                                {selectedTrip.bookedSeats} passengers (
                                {Math.round((selectedTrip.bookedSeats / selectedTrip.totalSeats) * 100)}% full)
                              </p>
                              <Progress
                                value={(selectedTrip.bookedSeats / selectedTrip.totalSeats) * 100}
                                className="h-2 mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <NavigationIcon className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500 font-exxaro">Current Location</p>
                              <p className="text-sm font-exxaro">{selectedTrip.currentLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <ClockIcon className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <p className="text-xs text-slate-500 font-exxaro">Estimated Arrival</p>
                              <p className="text-sm font-exxaro">{format(selectedTrip.estimatedArrival, "h:mm a")}</p>
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="mt-2 font-exxaro">
                                <MapIcon className="h-4 w-4 mr-2" />
                                Update Location
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle className="font-exxaro">Update Current Location</DialogTitle>
                                <DialogDescription className="font-exxaro">
                                  Enter your current location to update passengers
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="location" className="font-exxaro">
                                    Current Location
                                  </Label>
                                  <Select defaultValue={selectedTrip.currentLocation}>
                                    <SelectTrigger className="font-exxaro">
                                      <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Lephalale" className="font-exxaro">
                                        Lephalale
                                      </SelectItem>
                                      <SelectItem value="Vaalwater" className="font-exxaro">
                                        Vaalwater
                                      </SelectItem>
                                      <SelectItem value="Modimolle" className="font-exxaro">
                                        Modimolle
                                      </SelectItem>
                                      <SelectItem value="Bela-Bela" className="font-exxaro">
                                        Bela-Bela
                                      </SelectItem>
                                      <SelectItem value="Hammanskraal" className="font-exxaro">
                                        Hammanskraal
                                      </SelectItem>
                                      <SelectItem value="Pretoria" className="font-exxaro">
                                        Pretoria
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="eta" className="font-exxaro">
                                    Estimated Arrival Time
                                  </Label>
                                  <Input
                                    id="eta"
                                    type="time"
                                    defaultValue={format(selectedTrip.estimatedArrival, "HH:mm")}
                                    className="font-exxaro"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={() => updateLocation(selectedTrip.id, "Bela-Bela")}
                                  disabled={updatingLocation}
                                  className="font-exxaro"
                                >
                                  {updatingLocation ? "Updating..." : "Update Location"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-secondary font-exxaro">Passenger List</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-exxaro">
                              <UserCheckIcon className="h-3 w-3 mr-1 text-green-600" />
                              {selectedTrip.passengers.filter((p) => p.status === "Checked In").length} Checked In
                            </Badge>
                            <Badge variant="outline" className="font-exxaro">
                              <UserXIcon className="h-3 w-3 mr-1 text-slate-500" />
                              {selectedTrip.passengers.filter((p) => p.status === "Not Checked In").length} Pending
                            </Badge>
                          </div>
                        </div>

                        <div className="border rounded-md divide-y">
                          {selectedTrip.passengers.map((passenger) => (
                            <div key={passenger.id} className="flex justify-between items-center p-3">
                              <div>
                                <p className="font-medium font-exxaro">{passenger.name}</p>
                                <p className="text-xs text-slate-500 font-exxaro">{passenger.ticketNumber}</p>
                              </div>
                              <div
                                className={`
                                px-2 py-1 rounded-full text-xs font-medium
                                ${getPassengerStatusColor(passenger.status)}
                              `}
                              >
                                {passenger.status}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex gap-2 flex-wrap">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="font-exxaro">
                            <ScanIcon className="h-4 w-4 mr-2" />
                            Scan Ticket
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="font-exxaro">Scan Passenger Ticket</DialogTitle>
                            <DialogDescription className="font-exxaro">
                              Scan the QR code on the passenger's ticket to check them in
                            </DialogDescription>
                          </DialogHeader>

                          {isScanning ? (
                            <div className="py-4">
                              <QrScanner onScan={handleScanResult} />
                            </div>
                          ) : scanResult ? (
                            <div className="py-4">
                              <Alert
                                className={
                                  scanResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                                }
                              >
                                {scanResult.success ? (
                                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertCircleIcon className="h-4 w-4 text-red-600" />
                                )}
                                <AlertDescription className={scanResult.success ? "text-green-700" : "text-red-700"}>
                                  {scanResult.message}
                                  {scanResult.ticketNumber && (
                                    <div className="mt-1 font-medium">{scanResult.ticketNumber}</div>
                                  )}
                                </AlertDescription>
                              </Alert>
                            </div>
                          ) : null}

                          <DialogFooter>
                            {isScanning ? (
                              <Button variant="outline" onClick={() => setIsScanning(false)} className="font-exxaro">
                                Cancel
                              </Button>
                            ) : scanResult ? (
                              <Button
                                onClick={() => {
                                  setScanResult(null)
                                  setIsScanning(true)
                                }}
                                className="font-exxaro"
                              >
                                Scan Another
                              </Button>
                            ) : (
                              <Button onClick={() => setIsScanning(true)} className="font-exxaro">
                                Start Scanning
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="font-exxaro">
                        <MapIcon className="h-4 w-4 mr-2" />
                        View Route Map
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-slate-500 font-exxaro">Select a trip to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6 mt-6">
          <h2 className="text-xl font-bold text-secondary font-exxaro">Upcoming Trips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingTrips.map((trip) => (
              <Card key={trip.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-secondary font-exxaro">{trip.route}</CardTitle>
                    <div
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${getStatusColor(trip.status)}
                    `}
                    >
                      {trip.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-exxaro">{format(trip.date, "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-exxaro">{format(trip.date, "h:mm a")}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 font-exxaro">Pickup</p>
                        <p className="text-sm font-exxaro">{trip.pickupPoint}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 font-exxaro">Drop-off</p>
                        <p className="text-sm font-exxaro">{trip.dropoffPoint}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-exxaro">
                        {trip.bookedSeats}/{trip.totalSeats} seats booked
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full font-exxaro">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

