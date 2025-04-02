"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BusIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  RefreshCwIcon,
  XCircleIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  QrCodeIcon,
} from "lucide-react"
import { format, addDays } from "date-fns"
import QRCode from "@/components/qr-code"

interface TripCardProps {
  trip: {
    id: number
    route: string
    date: Date
    pickupPoint: string
    dropoffPoint: string
    passengers: number
    status: string
    ticketNumber: string
  }
  showActions: boolean
  onCancel?: () => void
}

export default function TripCard({ trip, showActions, onCancel }: TripCardProps) {
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)

  const handleReschedule = () => {
    // Simulate rescheduling process
    setIsRescheduling(true)
    setTimeout(() => {
      setIsRescheduling(false)
      setRescheduleSuccess(true)
    }, 1500)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // Generate ticket data for QR code
  const ticketData = JSON.stringify({
    ticketNumber: trip.ticketNumber,
    route: trip.route,
    date: format(trip.date, "yyyy-MM-dd'T'HH:mm:ss"),
    passengers: trip.passengers,
    status: trip.status,
  })

  return (
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-secondary font-exxaro">{trip.route}</CardTitle>
          <div
            className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${getStatusColor(trip.status)}
          `}
          >
            {trip.status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-exxaro">{format(trip.date, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-exxaro">{format(trip.date, "h:mm a")}</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-exxaro">
                {trip.passengers} {trip.passengers === 1 ? "passenger" : "passengers"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
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
            <div className="flex items-start gap-2">
              <BusIcon className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 font-exxaro">Ticket Number</p>
                <p className="text-sm font-medium font-exxaro">{trip.ticketNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {showActions && trip.status === "Confirmed" && (
        <CardFooter className="border-t pt-4 flex gap-2 flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 font-exxaro">
                <QrCodeIcon className="h-4 w-4" />
                <span>Show Ticket</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-exxaro">Your Ticket</DialogTitle>
                <DialogDescription className="font-exxaro">
                  Show this QR code to the driver when boarding
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 flex flex-col items-center">
                <QRCode value={ticketData} size={200} logoImage="/logo.svg" />
                <div className="mt-4 text-center">
                  <p className="font-bold font-exxaro text-lg">{trip.ticketNumber}</p>
                  <p className="text-sm text-slate-600 font-exxaro">{trip.route}</p>
                  <p className="text-sm text-slate-600 font-exxaro">
                    {format(trip.date, "EEEE, MMMM d, yyyy")} at {format(trip.date, "h:mm a")}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button className="font-exxaro">Download Ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 font-exxaro">
                <RefreshCwIcon className="h-4 w-4" />
                <span>Reschedule</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-exxaro">Reschedule Trip</DialogTitle>
                <DialogDescription className="font-exxaro">
                  Change the date and time of your trip. Your ticket number will remain the same.
                </DialogDescription>
              </DialogHeader>

              {rescheduleSuccess ? (
                <div className="py-4">
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800 font-exxaro">Success</AlertTitle>
                    <AlertDescription className="text-green-700 font-exxaro">
                      Your trip has been rescheduled successfully. You will receive an updated e-ticket via email.
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4 text-center">
                    <Button onClick={() => setRescheduleSuccess(false)} className="font-exxaro">
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-date" className="font-exxaro">
                        New Date
                      </Label>
                      <Input
                        id="new-date"
                        type="date"
                        defaultValue={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                        className="font-exxaro"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-time" className="font-exxaro">
                        New Time
                      </Label>
                      <Select defaultValue="08:00">
                        <SelectTrigger className="font-exxaro">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00" className="font-exxaro">
                            06:00 AM
                          </SelectItem>
                          <SelectItem value="08:00" className="font-exxaro">
                            08:00 AM
                          </SelectItem>
                          <SelectItem value="10:00" className="font-exxaro">
                            10:00 AM
                          </SelectItem>
                          <SelectItem value="12:00" className="font-exxaro">
                            12:00 PM
                          </SelectItem>
                          <SelectItem value="14:00" className="font-exxaro">
                            02:00 PM
                          </SelectItem>
                          <SelectItem value="16:00" className="font-exxaro">
                            04:00 PM
                          </SelectItem>
                          <SelectItem value="18:00" className="font-exxaro">
                            06:00 PM
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason" className="font-exxaro">
                        Reason for Rescheduling (Optional)
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Please provide a reason for rescheduling"
                        className="font-exxaro"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleReschedule} disabled={isRescheduling} className="font-exxaro">
                      {isRescheduling ? "Processing..." : "Confirm Reschedule"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 font-exxaro"
              >
                <XCircleIcon className="h-4 w-4" />
                <span>Cancel Trip</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-exxaro">Cancel Trip</DialogTitle>
                <DialogDescription className="font-exxaro">
                  Are you sure you want to cancel your trip? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircleIcon className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800 font-exxaro">Important</AlertTitle>
                  <AlertDescription className="text-amber-700 font-exxaro">
                    Cancellations made less than 24 hours before departure may be subject to a cancellation fee.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="cancel-reason" className="font-exxaro">
                    Reason for Cancellation (Optional)
                  </Label>
                  <Textarea
                    id="cancel-reason"
                    placeholder="Please provide a reason for cancellation"
                    className="font-exxaro"
                  />
                </div>
              </div>
              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setIsCancelling(false)} className="font-exxaro">
                  Keep My Booking
                </Button>
                <Button variant="destructive" onClick={handleCancel} className="font-exxaro">
                  Confirm Cancellation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  )
}

