import Image from "next/image";
import AuthForm from "@/components/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center p-4">
      {/* Contour background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#a5cf4c"
              d="M39.9,-65.7C51.5,-58.4,60.8,-47.8,67.2,-35.6C73.6,-23.4,77.1,-9.6,75.8,3.8C74.5,17.1,68.4,30,59.8,41.1C51.2,52.2,40.1,61.5,27.4,67.2C14.7,72.9,0.4,75,-14.2,73.3C-28.8,71.6,-43.7,66.1,-54.4,56.2C-65.1,46.3,-71.6,32,-75.1,16.9C-78.6,1.8,-79.1,-14.1,-73.7,-27.2C-68.3,-40.3,-57,-50.6,-44.4,-57.5C-31.8,-64.4,-17.9,-67.9,-2.7,-63.9C12.5,-59.9,28.3,-73,39.9,-65.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#383b41"
              d="M45.3,-75.3C58.9,-67.3,70.3,-55.1,77.7,-40.8C85.1,-26.5,88.5,-10.1,86.8,5.9C85.1,22,78.3,37.7,68.2,50.8C58.1,63.9,44.7,74.3,29.7,78.9C14.7,83.5,-1.9,82.3,-17.8,77.8C-33.7,73.3,-48.9,65.6,-60.8,53.9C-72.7,42.3,-81.3,26.8,-84.1,10C-86.9,-6.8,-83.9,-24.8,-75.4,-39.5C-66.9,-54.2,-52.9,-65.5,-38,-73.1C-23.1,-80.7,-7.3,-84.6,7.7,-82.1C22.7,-79.6,31.7,-83.3,45.3,-75.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={50}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-secondary font-exxaro">
            Welcome to Bus Booking
          </h1>
          <p className="text-slate-600 mt-2 font-exxaro">
            Sign in to book your trips or manage existing bookings
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-exxaro text-center">
              Sign In / Sign Up
            </CardTitle>
            <CardDescription className="text-center font-exxaro">
              Enter your phone number to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6 font-exxaro">
          By continuing, you agree to Exxaro's{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
