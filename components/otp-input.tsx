"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
}

export default function OtpInput({ value, onChange, length = 6, disabled = false }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(value.split("").concat(Array(length - value.length).fill("")))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  useEffect(() => {
    // Update internal state when external value changes
    const newOtp = value.split("").concat(Array(length - value.length).fill(""))
    setOtp(newOtp)
  }, [value, length])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value

    // Only accept digits
    if (!/^\d*$/.test(newValue)) return

    // Take only the last character if multiple are pasted
    const digit = newValue.slice(-1)

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    // Notify parent component
    onChange(newOtp.join(""))

    // Move to next input if a digit was entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only accept digits
    if (!/^\d+$/.test(pastedData)) return

    // Take only up to the required length
    const digits = pastedData.slice(0, length).split("")
    const newOtp = [...digits, ...Array(length - digits.length).fill("")]

    setOtp(newOtp)
    onChange(newOtp.join(""))

    // Focus the next empty input or the last one
    const nextEmptyIndex = digits.length < length ? digits.length : length - 1
    inputRefs.current[nextEmptyIndex]?.focus()
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-bold font-exxaro"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}

