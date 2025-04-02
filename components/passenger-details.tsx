"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserIcon, MailIcon, PhoneIcon, ForwardIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Passenger {
  name: string;
  email: string;
  phone: string;
  isForwarded: boolean;
  forwardEmail: string;
}

interface PassengerDetailsProps {
  passengers: Passenger[];
  onPassengerChange: (index: number, field: string, value: any) => void;
  onContinue: () => void;
  onBack: () => void;
  isComplete: boolean;
}

export default function PassengerDetails({
  passengers,
  onPassengerChange,
  onContinue,
  onBack,
  isComplete,
}: PassengerDetailsProps) {
  const [activeTab, setActiveTab] = useState("passenger-0");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-primary font-bold font-exxaro">
        Passenger Details
      </h2>

      {passengers.length > 1 && (
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full flex overflow-x-auto">
            {passengers.map((_, index) => (
              <TabsTrigger
                key={`passenger-${index}`}
                value={`passenger-${index}`}
                className="flex-1 font-exxaro"
              >
                Passenger {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {passengers.map((passenger, index) => (
            <TabsContent
              key={`passenger-${index}`}
              value={`passenger-${index}`}
            >
              <PassengerForm
                passenger={passenger}
                onChange={(field, value) =>
                  onPassengerChange(index, field, value)
                }
                passengerNumber={index + 1}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}

      {passengers.length === 1 && (
        <PassengerForm
          passenger={passengers[0]}
          onChange={(field, value) => onPassengerChange(0, field, value)}
          passengerNumber={1}
        />
      )}

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 py-6 font-exxaro"
        >
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 py-6 font-exxaro"
          disabled={!isComplete}
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}

interface PassengerFormProps {
  passenger: Passenger;
  onChange: (field: string, value: any) => void;
  passengerNumber: number;
}

function PassengerForm({
  passenger,
  onChange,
  passengerNumber,
}: PassengerFormProps) {
  return (
    <Card className="border-none shadow-lg mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-exxaro">
          Passenger {passengerNumber} Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`name-${passengerNumber}`} className="font-exxaro">
            Full Name
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-primary">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                <UserIcon className="h-4 w-4" />
              </div>
            </div>
            <Input
              id={`name-${passengerNumber}`}
              value={passenger.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Enter passenger's full name"
              className="pl-12 h-12 font-exxaro"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 my-4">
          <Checkbox
            id={`forward-${passengerNumber}`}
            checked={passenger.isForwarded}
            onCheckedChange={(checked) => onChange("isForwarded", checked)}
          />
          <Label
            htmlFor={`forward-${passengerNumber}`}
            className="text-sm font-exxaro"
          >
            Forward this ticket to someone else
          </Label>
        </div>

        {passenger.isForwarded ? (
          <div className="space-y-2">
            <Label
              htmlFor={`forward-email-${passengerNumber}`}
              className="font-exxaro"
            >
              Recipient's Email
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-primary">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                  <ForwardIcon className="h-4 w-4" />
                </div>
              </div>
              <Input
                id={`forward-email-${passengerNumber}`}
                value={passenger.forwardEmail}
                onChange={(e) => onChange("forwardEmail", e.target.value)}
                placeholder="Enter recipient's email address"
                type="email"
                className="pl-12 h-12 font-exxaro"
              />
            </div>
            <p className="text-xs text-slate-500 font-exxaro">
              The ticket will be sent directly to this email address.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label
                htmlFor={`email-${passengerNumber}`}
                className="font-exxaro"
              >
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-primary">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                    <MailIcon className="h-4 w-4" />
                  </div>
                </div>
                <Input
                  id={`email-${passengerNumber}`}
                  value={passenger.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="Enter email address"
                  type="email"
                  className="pl-12 h-12 font-exxaro"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor={`phone-${passengerNumber}`}
                className="font-exxaro"
              >
                Phone Number
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-primary">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10">
                    <PhoneIcon className="h-4 w-4" />
                  </div>
                </div>
                <Input
                  id={`phone-${passengerNumber}`}
                  value={passenger.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="pl-12 h-12 font-exxaro"
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
