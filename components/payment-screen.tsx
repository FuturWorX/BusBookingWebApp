"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCardIcon, BuildingIcon, CheckCircleIcon } from "lucide-react";

interface PaymentScreenProps {
  formData: {
    route: string;
    ticketQuantity: number;
  };
  onBack: () => void;
}

export default function PaymentScreen({
  formData,
  onBack,
}: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Calculate ticket price (mock data)
  const ticketPrice = 150; // R150 per ticket
  const totalPrice = ticketPrice * formData.ticketQuantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-primary font-exxaro">
          Payment Successful!
        </h2>
        <p className="text-slate-600 max-w-md mx-auto font-exxaro">
          Your booking has been confirmed. You will receive an email with your
          e-ticket shortly.
        </p>
        <div className="bg-slate-50 p-4 rounded-lg inline-block mx-auto mt-4">
          <p className="font-medium font-exxaro">
            Booking Reference: EXR-{Math.floor(100000 + Math.random() * 900000)}
          </p>
        </div>
        {/* <div className="pt-6">
          <Button className="px-8 py-6 font-exxaro">Return to Home</Button>
        </div> */}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary font-exxaro">Payment</h2>

      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-exxaro">Payment Method</CardTitle>
          <CardDescription className="font-exxaro">
            Select your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-4 mb-6"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label
                  htmlFor="credit-card"
                  className="flex items-center gap-2 cursor-pointer font-exxaro"
                >
                  <CreditCardIcon className="h-5 w-5 text-primary" />
                  Credit/Debit Card
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <RadioGroupItem value="eft" id="eft" />
                <Label
                  htmlFor="eft"
                  className="flex items-center gap-2 cursor-pointer font-exxaro"
                >
                  <BuildingIcon className="h-5 w-5 text-primary" />
                  EFT (Electronic Funds Transfer)
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "credit-card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number" className="font-exxaro">
                    Card Number
                  </Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    className="font-exxaro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="font-exxaro">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="font-exxaro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="font-exxaro">
                      CVV
                    </Label>
                    <Input id="cvv" placeholder="123" className="font-exxaro" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="font-exxaro">
                    Name on Card
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="font-exxaro"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "eft" && (
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                <p className="font-medium font-exxaro">Bank Details:</p>
                <p className="font-exxaro">Bank: First National Bank</p>
                <p className="font-exxaro">Account Name: Exxaro Transport</p>
                <p className="font-exxaro">Account Number: 62123456789</p>
                <p className="font-exxaro">Branch Code: 250655</p>
                <p className="font-exxaro">
                  Reference: EXR-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="text-sm text-slate-500 mt-4 font-exxaro">
                  Please use the reference number when making your payment. Your
                  booking will be confirmed once payment is received.
                </p>
              </div>
            )}

            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between mb-2">
                <p className="font-medium font-exxaro">Total Amount:</p>
                <p className="font-bold text-lg font-exxaro">
                  R{totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 py-6 font-exxaro"
                  disabled={isProcessing}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-6 font-exxaro"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
