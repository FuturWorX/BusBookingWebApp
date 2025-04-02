"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

interface QRCodeProps {
  value: string
  size?: number
  logoImage?: string
  bgColor?: string
  fgColor?: string
  logoSize?: number
  logoBackgroundColor?: string
}

export default function QRCode({
  value,
  size = 200,
  logoImage,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  logoSize = 50,
  logoBackgroundColor = "#FFFFFF",
}: QRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCode = useRef<QRCodeStyling>()

  useEffect(() => {
    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: value,
        dotsOptions: {
          color: fgColor,
          type: "rounded",
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#a5cf4c",
        },
        cornersDotOptions: {
          type: "dot",
          color: "#383b41",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: logoSize / size,
          hideBackgroundDots: true,
          backgroundOptions: {
            color: logoBackgroundColor,
            roundedCorners: true,
          },
        },
      })
    }

    if (qrRef.current) {
      qrRef.current.innerHTML = ""
      qrCode.current.append(qrRef.current)
    }
  }, [size, bgColor, fgColor, logoSize, logoBackgroundColor])

  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: value,
      })
    }
  }, [value])

  useEffect(() => {
    if (qrCode.current && logoImage) {
      qrCode.current.update({
        image: logoImage,
      })
    }
  }, [logoImage])

  return <div ref={qrRef} className="flex justify-center" />
}

