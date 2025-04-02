"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  BusIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
} from "lucide-react";

interface ReviewBookingProps {
  formData: {
    route: string;
    pickupPoint: string;
    dropoffPoint: string;
    travelDate: Date;
    ticketQuantity: number;
    passengers: Array<{
      name: string;
      email: string;
      phone: string;
      isForwarded: boolean;
      forwardEmail: string;
    }>;
  };
  onContinue: () => void;
  onBack: () => void;
}

export default function ReviewBooking({
  formData,
  onContinue,
  onBack,
}: ReviewBookingProps) {
  // Calculate ticket price (mock data)
  const ticketPrice = 150; // R150 per ticket
  const totalPrice = ticketPrice * formData.ticketQuantity;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-primary font-bold font-exxaro">
        Review Your Booking
      </h2>

      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-xl font-exxaro">Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
              <BusIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-exxaro">Route</p>
              <p className="font-medium font-exxaro">{formData.route}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
              <MapPinIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-exxaro">Pickup Point</p>
              <p className="font-medium font-exxaro">{formData.pickupPoint}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
              <MapPinIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-exxaro">
                Drop-off Point
              </p>
              <p className="font-medium font-exxaro">{formData.dropoffPoint}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
              <CalendarIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-exxaro">Travel Date</p>
              <p className="font-medium font-exxaro">
                {format(formData.travelDate, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
              <ClockIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-exxaro">
                Departure Time
              </p>
              <p className="font-medium font-exxaro">08:00 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
              <UsersIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-exxaro">
                Number of Tickets
              </p>
              <p className="font-medium font-exxaro">
                {formData.ticketQuantity}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-xl font-exxaro">
            Passenger Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {formData.passengers.map((passenger, index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium mb-2 font-exxaro">
                Passenger {index + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 font-exxaro">Name</p>
                  <p className="font-exxaro">{passenger.name}</p>
                </div>

                {passenger.isForwarded ? (
                  <div>
                    <p className="text-sm text-slate-500 font-exxaro">
                      Forwarded To
                    </p>
                    <p className="font-exxaro">{passenger.forwardEmail}</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-slate-500 font-exxaro">
                        Email
                      </p>
                      <p className="font-exxaro">{passenger.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-exxaro">
                        Phone
                      </p>
                      <p className="font-exxaro">
                        {passenger.phone || "Not provided"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-xl font-exxaro">Price Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between">
            <p className="font-exxaro">Ticket Price</p>
            <p className="font-exxaro">
              R{ticketPrice.toFixed(2)} x {formData.ticketQuantity}
            </p>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold">
            <p className="font-exxaro">Total</p>
            <p className="font-exxaro">R{totalPrice.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 font-exxaro"
        >
          Back
        </Button>
        <Button onClick={onContinue} className="flex-1 py-6 font-exxaro">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
}
