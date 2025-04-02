"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon, PlusIcon, MinusIcon, BusIcon } from "lucide-react";
import BookingSteps from "@/components/booking-steps";
import EnhancedDatePicker from "@/components/enhanced-date-picker";
import PassengerDetails from "@/components/passenger-details";
import ReviewBooking from "@/components/review-booking";
import PaymentScreen from "@/components/payment-screen";

// Mock data for routes
const routes = [
  {
    id: 1,
    name: "Lephalale to Pretoria",
    availableSeats: { 0: 45, 1: 32, 2: 15, 3: 0, 4: 28, 5: 42, 6: 37 },
  },
  {
    id: 2,
    name: "Pretoria to Lephalale",
    availableSeats: { 0: 38, 1: 0, 2: 22, 3: 41, 4: 16, 5: 0, 6: 29 },
  },
  {
    id: 3,
    name: "Lephalale to Johannesburg",
    availableSeats: { 0: 0, 1: 18, 2: 33, 3: 27, 4: 42, 5: 15, 6: 0 },
  },
  {
    id: 4,
    name: "Johannesburg to Lephalale",
    availableSeats: { 0: 22, 1: 35, 2: 0, 3: 19, 4: 0, 5: 28, 6: 31 },
  },
];

// Mock data for pickup/dropoff points
const busStops = {
  Lephalale: [
    "Exxaro Grootegeluk Mine",
    "Lephalale Mall",
    "Lephalale Bus Terminal",
  ],
  Pretoria: [
    "Hatfield Station",
    "Pretoria Central",
    "Menlyn Mall",
    "Centurion",
  ],
  Johannesburg: ["Park Station", "Sandton City", "Rosebank", "Eastgate Mall"],
};

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    route: "",
    pickupPoint: "",
    dropoffPoint: "",
    travelDate: new Date(),
    ticketQuantity: 1,
    passengers: [
      { name: "", email: "", phone: "", isForwarded: false, forwardEmail: "" },
    ],
  });
  const [availableDates, setAvailableDates] = useState<{
    [key: number]: number;
  }>({});
  const [pickupOptions, setPickupOptions] = useState<string[]>([]);
  const [dropoffOptions, setDropoffOptions] = useState<string[]>([]);

  // Update pickup/dropoff options based on selected route
  useEffect(() => {
    if (formData.route) {
      const [origin, destination] = formData.route.split(" to ");
      setPickupOptions(busStops[origin as keyof typeof busStops] || []);
      setDropoffOptions(busStops[destination as keyof typeof busStops] || []);

      // Find the selected route and set available seats
      const selectedRoute = routes.find((r) => r.name === formData.route);
      if (selectedRoute) {
        setAvailableDates(selectedRoute.availableSeats);
      }
    }
  }, [formData.route]);

  // Update passenger array when ticket quantity changes
  useEffect(() => {
    const currentPassengers = [...formData.passengers];
    if (currentPassengers.length < formData.ticketQuantity) {
      // Add more passenger entries
      const newPassengers = Array(
        formData.ticketQuantity - currentPassengers.length
      )
        .fill(null)
        .map(() => ({
          name: "",
          email: "",
          phone: "",
          isForwarded: false,
          forwardEmail: "",
        }));

      setFormData((prev) => ({
        ...prev,
        passengers: [...currentPassengers, ...newPassengers],
      }));
    } else if (currentPassengers.length > formData.ticketQuantity) {
      // Remove excess passenger entries
      setFormData((prev) => ({
        ...prev,
        passengers: currentPassengers.slice(0, formData.ticketQuantity),
      }));
    }
  }, [formData.ticketQuantity]);

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassengerChange = (index: number, field: string, value: any) => {
    const updatedPassengers = [...formData.passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };

    setFormData((prev) => ({
      ...prev,
      passengers: updatedPassengers,
    }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const incrementTickets = () => {
    const dayIndex = formData.travelDate.getDay();
    const maxTickets = availableDates[dayIndex] || 0;

    if (formData.ticketQuantity < maxTickets) {
      setFormData((prev) => ({
        ...prev,
        ticketQuantity: prev.ticketQuantity + 1,
      }));
    }
  };

  const decrementTickets = () => {
    if (formData.ticketQuantity > 1) {
      setFormData((prev) => ({
        ...prev,
        ticketQuantity: prev.ticketQuantity - 1,
      }));
    }
  };

  const isRouteStepComplete = () => {
    return formData.route && formData.pickupPoint && formData.dropoffPoint;
  };

  const isPassengerStepComplete = () => {
    return formData.passengers.every(
      (p) => p.name && (p.email || (p.isForwarded && p.forwardEmail))
    );
  };

  return (
    <div className="space-y-6">
      <BookingSteps currentStep={currentStep} />

      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <h2 className="text-2xl text-primary font-bold font-exxaro ">
              Book your bus ticket
            </h2>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 font-exxaro">
                    Select Route
                  </label>
                  <div className="relative">
                    <Select
                      value={formData.route}
                      onValueChange={(value) =>
                        handleInputChange("route", value)
                      }
                    >
                      <SelectTrigger className="w-full pl-12 h-12 font-exxaro">
                        <SelectValue placeholder="Choose your route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem
                            key={route.id}
                            value={route.name}
                            className="font-exxaro"
                          >
                            {route.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute left-3 top-3 text-primary">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                        <BusIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 font-exxaro">
                    Pickup Point
                  </label>
                  <div className="relative">
                    <Select
                      value={formData.pickupPoint}
                      onValueChange={(value) =>
                        handleInputChange("pickupPoint", value)
                      }
                      disabled={!formData.route}
                    >
                      <SelectTrigger className="w-full pl-12 h-12 font-exxaro">
                        <SelectValue placeholder="Select pickup location" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupOptions.map((point) => (
                          <SelectItem
                            key={point}
                            value={point}
                            className="font-exxaro"
                          >
                            {point}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute left-3 top-3 text-primary">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                        <MapPinIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 font-exxaro">
                    Drop-off Point
                  </label>
                  <div className="relative">
                    <Select
                      value={formData.dropoffPoint}
                      onValueChange={(value) =>
                        handleInputChange("dropoffPoint", value)
                      }
                      disabled={!formData.route}
                    >
                      <SelectTrigger className="w-full pl-12 h-12 font-exxaro">
                        <SelectValue placeholder="Select drop-off location" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropoffOptions.map((point) => (
                          <SelectItem
                            key={point}
                            value={point}
                            className="font-exxaro"
                          >
                            {point}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute left-3 top-3 text-primary">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                        <MapPinIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 font-exxaro">
                    Travel Date
                  </label>
                  <EnhancedDatePicker
                    selectedDate={formData.travelDate}
                    onDateChange={(date) =>
                      handleInputChange("travelDate", date)
                    }
                    availableDates={availableDates}
                    disabled={!formData.route}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 font-exxaro">
                    Number of Tickets
                  </label>
                  <div className="flex items-center border rounded-md p-3 bg-white">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementTickets}
                      disabled={formData.ticketQuantity <= 1}
                      className="h-10 w-10 rounded-full"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium text-lg font-exxaro">
                      {formData.ticketQuantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementTickets}
                      disabled={
                        !formData.route ||
                        formData.ticketQuantity >=
                          (availableDates[formData.travelDate.getDay()] || 0)
                      }
                      className="h-10 w-10 rounded-full"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.route && (
                    <p className="text-xs text-slate-500 font-exxaro">
                      {availableDates[formData.travelDate.getDay()] || 0} seats
                      available for this date
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 items-center">
              <Button
                onClick={handleContinue}
                className="w-full py-6 text-base font-exxaro"
                disabled={!isRouteStepComplete()}
              >
                Continue to Passenger Details
              </Button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <PassengerDetails
            passengers={formData.passengers}
            onPassengerChange={handlePassengerChange}
            onContinue={handleContinue}
            onBack={handleBack}
            isComplete={isPassengerStepComplete()}
          />
        )}

        {currentStep === 3 && (
          <ReviewBooking
            formData={formData}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <PaymentScreen formData={formData} onBack={handleBack} />
        )}

        {currentStep === 1 && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex gap-3">
            <div className="text-primary mt-0.5">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-800 font-exxaro">
              As you continue, you'll be able to review your booking details
              before confirming your bus ticket.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
