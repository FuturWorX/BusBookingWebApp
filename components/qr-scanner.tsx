"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CameraIcon, RefreshCwIcon } from "lucide-react"

interface QrScannerProps {
  onScan: (result: string) => void
}

export default function QrScanner({ onScan }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasCamera, setHasCamera] = useState(true)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // For demo purposes, we'll simulate a successful scan after a few seconds
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        // Simulate scanning a valid QR code
        const mockTicketData = JSON.stringify({
          ticketNumber: "EXR-12347",
          route: "Lephalale to Pretoria",
          date: "2025-03-12T08:00:00",
          passengers: 1,
          status: "Confirmed",
        })

        onScan(mockTicketData)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isScanning, onScan])

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        setError(null)

        // Request camera access
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasCamera(true)
          setIsScanning(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setHasCamera(false)
        setError("Camera access denied or not available")
      }
    }

    startCamera()

    // Clean up function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const restartCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }

    setIsScanning(false)
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" },
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            setIsScanning(true)
            setError(null)
          }
        })
        .catch((err) => {
          console.error("Error restarting camera:", err)
          setError("Failed to restart camera")
        })
    }, 500)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[300px] h-[300px] bg-black rounded-lg overflow-hidden">
        {hasCamera ? (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[200px] h-[200px] border-2 border-white rounded-lg relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1"></div>
              </div>
            </div>

            {isScanning && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Scanning...
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-slate-100">
            <CameraIcon className="h-12 w-12 text-slate-400 mb-2" />
            <p className="text-sm text-slate-500 text-center px-4 font-exxaro">{error || "Camera not available"}</p>
          </div>
        )}
      </div>

      {hasCamera && (
        <Button variant="outline" size="sm" className="mt-4 font-exxaro" onClick={restartCamera}>
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Restart Camera
        </Button>
      )}

      <p className="text-xs text-slate-500 mt-4 text-center font-exxaro">
        Position the QR code within the frame to scan
      </p>
    </div>
  )
}

