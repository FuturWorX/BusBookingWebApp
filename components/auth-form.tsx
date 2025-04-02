"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle, PhoneIcon } from "lucide-react"
import OtpInput from "@/components/otp-input"

// Mock SAP user database
const SAP_USERS = [
  {
    phone: "+27712345678",
    employeeId: "EX-12345",
    firstName: "John",
    lastName: "Doe",
    department: "Mining Operations",
    email: "john.doe@exxaro.com",
  },
  {
    phone: "+27723456789",
    employeeId: "EX-23456",
    firstName: "Jane",
    lastName: "Smith",
    department: "Finance",
    email: "jane.smith@exxaro.com",
  },
  {
    phone: "+27734567890",
    employeeId: "EX-34567",
    firstName: "Michael",
    lastName: "Johnson",
    department: "HR",
    email: "michael.johnson@exxaro.com",
  },
]

export default function AuthForm() {
  const router = useRouter()
  const [step, setStep] = useState<"phone" | "otp" | "verifying" | "error" | "success">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userExists, setUserExists] = useState(false)

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format with country code if not present
    if (digits.length > 0 && !value.startsWith("+")) {
      return `+27${digits}`
    }

    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value)
    setPhone(formattedPhone)
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if user exists in SAP
      await checkUserInSAP(phone)

      // Send OTP (simulated)
      await sendOTP(phone)

      setStep("otp")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStep("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setStep("verifying")

    try {
      // Verify OTP (simulated)
      await verifyOTP(phone, otp)

      // Fetch user profile if exists
      if (userExists) {
        await fetchUserProfile(phone)
      }

      setStep("success")

      // Redirect after successful authentication
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStep("error")
    } finally {
      setIsLoading(false)
    }
  }

  // Simulated API calls
  const checkUserInSAP = (phone: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = SAP_USERS.find((u) => u.phone === phone)
        if (user) {
          setUserExists(true)
          resolve()
        } else if (phone.startsWith("+27") && phone.length >= 11) {
          // Allow new users with valid South African numbers
          setUserExists(false)
          resolve()
        } else {
          reject(new Error("Please enter a valid South African phone number"))
        }
      }, 1500)
    })
  }

  const sendOTP = (phone: string): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate OTP sending
      setTimeout(() => {
        console.log(`OTP sent to ${phone}`)
        resolve()
      }, 1000)
    })
  }

  const verifyOTP = (phone: string, otp: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate OTP verification - accept any 6-digit code for demo
      setTimeout(() => {
        if (otp.length === 6) {
          console.log(`OTP verified for ${phone}`)
          resolve()
        } else {
          reject(new Error("Invalid OTP. Please try again."))
        }
      }, 1500)
    })
  }

  const fetchUserProfile = (phone: string): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate fetching user profile
      setTimeout(() => {
        const user = SAP_USERS.find((u) => u.phone === phone)
        console.log("User profile fetched:", user)
        resolve()
      }, 1000)
    })
  }

  const renderStep = () => {
    switch (step) {
      case "phone":
        return (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-exxaro">
                Phone Number
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-slate-400">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+27 71 234 5678"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="pl-10 font-exxaro"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 font-exxaro">We'll send a one-time password to this number</p>
            </div>
            <Button type="submit" className="w-full font-exxaro" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        )

      case "otp":
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="font-exxaro text-center block">
                Enter the 6-digit code sent to
              </Label>
              <p className="text-center font-medium font-exxaro">{phone}</p>

              <OtpInput value={otp} onChange={setOtp} length={6} />

              <div className="flex justify-between items-center pt-2">
                <Button
                  type="button"
                  variant="link"
                  className="text-xs p-0 h-auto font-exxaro"
                  onClick={() => setStep("phone")}
                >
                  Change phone number
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="text-xs p-0 h-auto font-exxaro"
                  onClick={() => {
                    setIsLoading(true)
                    // Simulate resending OTP
                    setTimeout(() => {
                      setIsLoading(false)
                    }, 1000)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Resend code"}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full font-exxaro" disabled={otp.length !== 6 || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>
          </form>
        )

      case "verifying":
        return (
          <div className="py-8 text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="font-exxaro text-lg">Verifying your identity...</p>
            <p className="text-sm text-slate-500 font-exxaro">
              {userExists ? "Retrieving your profile from SAP..." : "Setting up your new account..."}
            </p>
          </div>
        )

      case "error":
        return (
          <div className="space-y-4">
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 font-exxaro">
                {error || "An error occurred. Please try again."}
              </AlertDescription>
            </Alert>
            <Button className="w-full font-exxaro" onClick={() => setStep("phone")}>
              Try Again
            </Button>
          </div>
        )

      case "success":
        return (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="font-exxaro text-lg text-green-800">Authentication Successful!</p>
            <p className="text-sm text-slate-600 font-exxaro">
              {userExists ? "Welcome back to Exxaro Bus Booking." : "Your account has been created successfully."}
            </p>
            <p className="text-sm text-slate-500 font-exxaro">Redirecting you to the dashboard...</p>
          </div>
        )
    }
  }

  return <div className="space-y-4">{renderStep()}</div>
}

