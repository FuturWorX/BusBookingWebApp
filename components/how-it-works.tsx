import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Choose your route",
      description: "Select from available routes between Exxaro locations",
      icon: (
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 16C4 16.9319 4.32249 17.8236 4.9612 18.5C5.59992 19.1764 6.48681 19.5 7.41875 19.5H16.5812C17.5132 19.5 18.4001 19.1764 19.0388 18.5C19.6775 17.8236 20 16.9319 20 16V12H4V16Z"
              stroke="#a5cf4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12V8C4 7.06812 4.32249 6.17637 4.9612 5.5C5.59992 4.82363 6.48681 4.5 7.41875 4.5H14"
              stroke="#a5cf4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 19.5V19.5C8 18.5681 7.67751 17.6764 7.0388 17C6.40008 16.3236 5.51319 16 4.58125 16H4"
              stroke="#a5cf4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 19.5V19.5C16 18.5681 16.3225 17.6764 16.9612 17C17.5999 16.3236 18.4868 16 19.4188 16H20"
              stroke="#a5cf4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M20 12V8L17 4.5" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 4.5L7 8" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 4.5L16 8" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12V16" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 12V16" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      title: "Select date & tickets",
      description: "Pick your travel date and number of tickets needed",
      icon: (
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="3"
              y="6"
              width="18"
              height="15"
              rx="2"
              stroke="#a5cf4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M3 10H21" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14H16" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 17H13" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 3V6" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 3V6" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: "Receive your e-ticket",
      description: "Get your ticket via email and show it when boarding",
      icon: (
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
              stroke="#a5cf4c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 13L15 13" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 17L13 17" stroke="#a5cf4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold text-secondary font-exxaro">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Card key={step.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">{step.icon}</div>
              <h3 className="font-bold text-secondary mb-2 text-lg font-exxaro">{step.title}</h3>
              <p className="text-sm text-slate-600 font-exxaro">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

