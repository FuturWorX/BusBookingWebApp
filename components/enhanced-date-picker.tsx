"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"

interface DatePickerProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  availableDates: { [key: number]: number }
  disabled?: boolean
}

export default function EnhancedDatePicker({
  selectedDate,
  onDateChange,
  availableDates,
  disabled = false,
}: DatePickerProps) {
  const [dates, setDates] = useState<Date[]>([])

  useEffect(() => {
    // Generate 7 days from today
    const nextSevenDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))
    setDates(nextSevenDays)
  }, [])

  const isDateAvailable = (date: Date) => {
    const dayIndex = date.getDay()
    return availableDates[dayIndex] > 0
  }

  return (
    <div className="relative">
      <Card className="p-4 border-none shadow-md">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 mr-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-secondary font-exxaro">Select travel date</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, index) => {
            const isSelected = isSameDay(date, selectedDate)
            const isAvailable = isDateAvailable(date)
            const dayOfWeek = format(date, "EEE")
            const dayOfMonth = format(date, "d")

            return (
              <div
                key={index}
                className={`
                  relative rounded-lg overflow-hidden cursor-pointer transition-all
                  ${isSelected ? "ring-2 ring-primary" : ""}
                  ${!isAvailable || disabled ? "opacity-50 pointer-events-none" : ""}
                `}
                onClick={() => isAvailable && !disabled && onDateChange(date)}
              >
                <div
                  className={`
                  p-2 text-center
                  ${isSelected ? "bg-primary text-white" : "bg-slate-50 hover:bg-slate-100"}
                `}
                >
                  <div className="text-xs font-medium mb-1 font-exxaro">{dayOfWeek}</div>
                  <div className="text-xl font-bold font-exxaro">{dayOfMonth}</div>
                  {isAvailable ? (
                    <div className="text-xs mt-1 font-exxaro">{availableDates[date.getDay()]} seats</div>
                  ) : (
                    <div className="text-xs mt-1 text-red-500 font-exxaro">Full</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

