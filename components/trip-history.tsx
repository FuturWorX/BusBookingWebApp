"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import TripCard from "@/components/trip-card"

// Mock data for trips
const upcomingTrips = [
  {
    id: 1,
    route: "Lephalale to Pretoria",
    date: new Date("2025-03-20T08:00:00"),
    pickupPoint: "Exxaro Grootegeluk Mine",
    dropoffPoint: "Hatfield Station",
    passengers: 2,
    status: "Confirmed",
    ticketNumber: "EXR-12345",
  },
  {
    id: 2,
    route: "Pretoria to Lephalale",
    date: new Date("2025-03-25T16:30:00"),
    pickupPoint: "Menlyn Mall",
    dropoffPoint: "Lephalale Bus Terminal",
    passengers: 1,
    status: "Confirmed",
    ticketNumber: "EXR-12346",
  },
]

const pastTrips = [
  {
    id: 3,
    route: "Lephalale to Johannesburg",
    date: new Date("2025-02-15T09:15:00"),
    pickupPoint: "Lephalale Mall",
    dropoffPoint: "Sandton City",
    passengers: 2,
    status: "Completed",
    ticketNumber: "EXR-12240",
  },
  {
    id: 4,
    route: "Johannesburg to Lephalale",
    date: new Date("2025-02-18T17:45:00"),
    pickupPoint: "Park Station",
    dropoffPoint: "Exxaro Grootegeluk Mine",
    passengers: 1,
    status: "Completed",
    ticketNumber: "EXR-12241",
  },
  {
    id: 5,
    route: "Lephalale to Pretoria",
    date: new Date("2025-01-10T08:30:00"),
    pickupPoint: "Lephalale Bus Terminal",
    dropoffPoint: "Pretoria Central",
    passengers: 3,
    status: "Completed",
    ticketNumber: "EXR-12100",
  },
]

export default function TripHistory() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [trips, setTrips] = useState({
    upcoming: [...upcomingTrips],
    past: [...pastTrips],
  })

  const cancelTrip = (tripId: number) => {
    // Move the trip from upcoming to past and change status
    const tripIndex = trips.upcoming.findIndex((trip) => trip.id === tripId)
    if (tripIndex !== -1) {
      const cancelledTrip = {
        ...trips.upcoming[tripIndex],
        status: "Cancelled",
      }

      const newUpcoming = trips.upcoming.filter((trip) => trip.id !== tripId)
      const newPast = [cancelledTrip, ...trips.past]

      setTrips({
        upcoming: newUpcoming,
        past: newPast,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="upcoming" className="font-exxaro">
            Upcoming Trips
          </TabsTrigger>
          <TabsTrigger value="past" className="font-exxaro">
            Past Trips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {trips.upcoming.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <p className="text-slate-600 font-exxaro">You don't have any upcoming trips.</p>
              <Button className="mt-4 font-exxaro">Book a Trip</Button>
            </div>
          ) : (
            trips.upcoming.map((trip) => (
              <TripCard key={trip.id} trip={trip} showActions={true} onCancel={() => cancelTrip(trip.id)} />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {trips.past.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <p className="text-slate-600 font-exxaro">You don't have any past trips.</p>
            </div>
          ) : (
            trips.past.map((trip) => <TripCard key={trip.id} trip={trip} showActions={false} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

