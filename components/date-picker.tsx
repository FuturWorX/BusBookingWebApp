"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { format, addDays, isSameDay } from "date-fns"

interface DatePickerProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
  availableDates: { [key: number]: number }
  disabled?: boolean
}

export default function DatePicker({ selectedDate, onDateChange, availableDates, disabled = false }: DatePickerProps) {
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
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {dates.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate)
          const isAvailable = isDateAvailable(date)

          return (
            <Button
              key={index}
              variant={isSelected ? "default" : "outline"}
              className={`
                flex-shrink-0 h-auto py-3 px-2 flex flex-col items-center min-w-[80px]
                ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                ${isSelected ? "border-primary" : ""}
              `}
              onClick={() => isAvailable && onDateChange(date)}
              disabled={disabled || !isAvailable}
            >
              <span className="text-xs font-medium">{format(date, "EEE")}</span>
              <span className="text-lg font-bold">{format(date, "d")}</span>
              <span className="text-xs">{format(date, "MMM")}</span>
              {isAvailable && (
                <span className="text-xs mt-1 text-green-600">{availableDates[date.getDay()]} seats</span>
              )}
              {!isAvailable && <span className="text-xs mt-1 text-red-500">Full</span>}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

