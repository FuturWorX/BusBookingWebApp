import { CheckIcon } from "lucide-react";

interface BookingStepsProps {
  currentStep: number;
}

export default function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = [
    { id: 1, name: "Route & Date" },
    { id: 2, name: "Passenger Info" },
    { id: 3, name: "Review" },
    { id: 4, name: "Payment" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full 
              ${
                currentStep > step.id
                  ? "bg-primary text-white"
                  : currentStep === step.id
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-400"
              }
              transition-colors duration-200 shadow-md
            `}
            >
              {currentStep > step.id ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium font-exxaro">
                  {step.id}
                </span>
              )}
            </div>

            {index <= steps.length - 1 && (
              <div
                className={`
                h-0.5 w-full mt-5 
                ${currentStep > step.id ? "bg-primary" : "bg-slate-200"}
                transition-colors duration-200 hidden md:block
              `}
              />
            )}

            <span
              className={`
              text-xs mt-2 
              ${
                currentStep >= step.id
                  ? "text-slate-700 font-medium"
                  : "text-slate-400"
              }
              transition-colors duration-200 hidden md:block font-exxaro
            `}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
