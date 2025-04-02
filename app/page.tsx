import Image from "next/image";
import BookingForm from "@/components/booking-form";
import HowItWorks from "@/components/how-it-works";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
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

      <Navbar />

      <main className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight font-exxaro">
                Convenient <span className="text-primary">Bus Travel</span> with
                Made Easy
              </h1>

              <p className="text-lg text-slate-700 max-w-md font-exxaro">
                Book your bus tickets effortlessly for routes between major
                destinations. Enjoy safe, reliable, and comfortable travel for
                all passengers.
              </p>
            </div>

            <HowItWorks />
          </div>

          {/* <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
            <BookingForm />
          </div> */}
          <BookingForm />
        </div>
      </main>

      <footer className="container mx-auto py-8 px-4 border-t border-slate-200 mt-16 bg-white relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="text-sm text-slate-500 font-exxaro">
              Powered by
            </span>
            <Image
              src="/logo.svg"
              alt="Exxaro Logo"
              width={100}
              height={30}
              className="h-6 w-auto ml-2"
            />
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-primary font-exxaro"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-primary font-exxaro"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-slate-500 hover:text-primary font-exxaro"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
