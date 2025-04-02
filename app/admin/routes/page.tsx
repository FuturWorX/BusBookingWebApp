"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
  MapIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for locations
const locations = [
  "Lephalale",
  "Pretoria",
  "Johannesburg",
  "Centurion",
  "Sandton",
  "Midrand",
  "Polokwane",
  "Rustenburg",
]

// Mock data for pickup/dropoff points with coordinates
const busStops = {
  Lephalale: [
    { name: "Exxaro Grootegeluk Mine", lat: -23.6667, lng: 27.5333 },
    { name: "Lephalale Mall", lat: -23.6803, lng: 27.7436 },
    { name: "Lephalale Bus Terminal", lat: -23.685, lng: 27.75 },
  ],
  Pretoria: [
    { name: "Hatfield Station", lat: -25.7487, lng: 28.238 },
    { name: "Pretoria Central", lat: -25.7461, lng: 28.1881 },
    { name: "Menlyn Mall", lat: -25.7828, lng: 28.2774 },
    { name: "Centurion", lat: -25.8616, lng: 28.1892 },
  ],
  Johannesburg: [
    { name: "Park Station", lat: -26.1951, lng: 28.0417 },
    { name: "Sandton City", lat: -26.1067, lng: 28.0569 },
    { name: "Rosebank", lat: -26.1463, lng: 28.0436 },
    { name: "Eastgate Mall", lat: -26.1782, lng: 28.1161 },
  ],
  Centurion: [
    { name: "Centurion Mall", lat: -25.8616, lng: 28.1892 },
    { name: "Centurion Station", lat: -25.8526, lng: 28.1901 },
    { name: "Eco Park", lat: -25.8463, lng: 28.1986 },
  ],
  Sandton: [
    { name: "Sandton City", lat: -26.1067, lng: 28.0569 },
    { name: "Sandton Station", lat: -26.1071, lng: 28.0566 },
    { name: "Benmore Gardens", lat: -26.0989, lng: 28.0628 },
  ],
  Midrand: [
    { name: "Midrand Gautrain", lat: -25.9894, lng: 28.1335 },
    { name: "Mall of Africa", lat: -25.9961, lng: 28.1086 },
    { name: "Midrand CBD", lat: -25.9884, lng: 28.1226 },
  ],
  Polokwane: [
    { name: "Polokwane CBD", lat: -23.9045, lng: 29.4688 },
    { name: "Mall of the North", lat: -23.8673, lng: 29.4486 },
    { name: "Polokwane Station", lat: -23.9, lng: 29.45 },
  ],
  Rustenburg: [
    { name: "Rustenburg Mall", lat: -25.6667, lng: 27.25 },
    { name: "Waterfall Mall", lat: -25.67, lng: 27.24 },
    { name: "Rustenburg CBD", lat: -25.6683, lng: 27.2428 },
  ],
}

// Mock data for routes
const initialRoutes = [
  {
    id: 1,
    name: "Lephalale to Pretoria",
    startLocation: "Lephalale",
    endLocation: "Pretoria",
    pickupPoints: ["Exxaro Grootegeluk Mine", "Lephalale Mall"],
    dropoffPoints: ["Hatfield Station", "Pretoria Central", "Menlyn Mall"],
    price: 150,
    capacity: 45,
    status: "Active",
    departureTime: "08:00",
    returnTime: "16:30",
    frequency: "Daily",
    description: "Daily commuter route for Exxaro employees",
    pointToPricing: [
      { from: "Exxaro Grootegeluk Mine", to: "Hatfield Station", price: 150 },
      { from: "Exxaro Grootegeluk Mine", to: "Pretoria Central", price: 145 },
      { from: "Exxaro Grootegeluk Mine", to: "Menlyn Mall", price: 160 },
      { from: "Lephalale Mall", to: "Hatfield Station", price: 140 },
      { from: "Lephalale Mall", to: "Pretoria Central", price: 135 },
      { from: "Lephalale Mall", to: "Menlyn Mall", price: 150 },
    ],
  },
  {
    id: 2,
    name: "Pretoria to Lephalale",
    startLocation: "Pretoria",
    endLocation: "Lephalale",
    pickupPoints: ["Hatfield Station", "Pretoria Central", "Menlyn Mall"],
    dropoffPoints: ["Exxaro Grootegeluk Mine", "Lephalale Mall"],
    price: 150,
    capacity: 45,
    status: "Active",
    departureTime: "16:30",
    returnTime: "08:00",
    frequency: "Daily",
    description: "Return route for Exxaro employees",
    pointToPricing: [
      { from: "Hatfield Station", to: "Exxaro Grootegeluk Mine", price: 150 },
      { from: "Hatfield Station", to: "Lephalale Mall", price: 140 },
      { from: "Pretoria Central", to: "Exxaro Grootegeluk Mine", price: 145 },
      { from: "Pretoria Central", to: "Lephalale Mall", price: 135 },
      { from: "Menlyn Mall", to: "Exxaro Grootegeluk Mine", price: 160 },
      { from: "Menlyn Mall", to: "Lephalale Mall", price: 150 },
    ],
  },
  {
    id: 3,
    name: "Lephalale to Johannesburg",
    startLocation: "Lephalale",
    endLocation: "Johannesburg",
    pickupPoints: ["Exxaro Grootegeluk Mine", "Lephalale Bus Terminal"],
    dropoffPoints: ["Park Station", "Sandton City"],
    price: 180,
    capacity: 45,
    status: "Active",
    departureTime: "09:15",
    returnTime: "17:45",
    frequency: "Weekdays",
    description: "Weekday service to Johannesburg",
    pointToPricing: [
      { from: "Exxaro Grootegeluk Mine", to: "Park Station", price: 180 },
      { from: "Exxaro Grootegeluk Mine", to: "Sandton City", price: 190 },
      { from: "Lephalale Bus Terminal", to: "Park Station", price: 170 },
      { from: "Lephalale Bus Terminal", to: "Sandton City", price: 180 },
    ],
  },
  {
    id: 4,
    name: "Weekend Special",
    startLocation: "Lephalale",
    endLocation: "Pretoria",
    pickupPoints: ["Lephalale Mall", "Lephalale Bus Terminal"],
    dropoffPoints: ["Hatfield Station", "Menlyn Mall"],
    price: 120,
    capacity: 45,
    status: "Inactive",
    departureTime: "10:00",
    returnTime: "18:00",
    frequency: "Weekends",
    description: "Special weekend service with discounted rates",
    pointToPricing: [
      { from: "Lephalale Mall", to: "Hatfield Station", price: 120 },
      { from: "Lephalale Mall", to: "Menlyn Mall", price: 130 },
      { from: "Lephalale Bus Terminal", to: "Hatfield Station", price: 110 },
      { from: "Lephalale Bus Terminal", to: "Menlyn Mall", price: 120 },
    ],
  },
]

// Helper function to get coordinates for a stop name
const getCoordinatesForStop = (location: string, stopName: string) => {
  const stops = busStops[location as keyof typeof busStops] || []
  const stop = stops.find((s) => s.name === stopName)
  return stop ? { lat: stop.lat, lng: stop.lng } : null
}

export default function RouteManagement() {
  const [routes, setRoutes] = useState(initialRoutes)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddRouteDialogOpen, setIsAddRouteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("routes")
  const [newRoute, setNewRoute] = useState({
    name: "",
    startLocation: "",
    endLocation: "",
    pickupPoints: [] as string[],
    dropoffPoints: [] as string[],
    price: 0,
    capacity: 45,
    status: "Active",
    departureTime: "",
    returnTime: "",
    frequency: "Daily",
    description: "",
    pointToPricing: [] as { from: string; to: string; price: number }[],
  })
  const [editingRoute, setEditingRoute] = useState<null | (typeof initialRoutes)[0]>(null)
  const [availablePickupPoints, setAvailablePickupPoints] = useState<{ name: string; lat: number; lng: number }[]>([])
  const [availableDropoffPoints, setAvailableDropoffPoints] = useState<{ name: string; lat: number; lng: number }[]>([])
  const [selectedPickupPoints, setSelectedPickupPoints] = useState<string[]>([])
  const [selectedDropoffPoints, setSelectedDropoffPoints] = useState<string[]>([])
  const [showMap, setShowMap] = useState(true)
  const [pointToPricing, setPointToPricing] = useState<{ from: string; to: string; price: number }[]>([])
  const [newPointPrice, setNewPointPrice] = useState({
    from: "",
    to: "",
    price: 0,
  })
  const [mapAnimationState, setMapAnimationState] = useState({
    isAnimating: false,
    currentPoint: null as { name: string; lat: number; lng: number } | null,
    animationProgress: 0,
  })

  const mapCanvasRef = useRef<HTMLCanvasElement>(null)

  // Filter routes based on search query
  const filteredRoutes = routes.filter((route) => {
    return (
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.endLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleStartLocationChange = (location: string, isNewRoute = false) => {
    if (isNewRoute) {
      setNewRoute({
        ...newRoute,
        startLocation: location,
        name: location && newRoute.endLocation ? `${location} to ${newRoute.endLocation}` : newRoute.name,
      })
      setAvailablePickupPoints(busStops[location as keyof typeof busStops] || [])
      setSelectedPickupPoints([])
    } else if (editingRoute) {
      setEditingRoute({
        ...editingRoute,
        startLocation: location,
        name: location && editingRoute.endLocation ? `${location} to ${editingRoute.endLocation}` : editingRoute.name,
      })
      setAvailablePickupPoints(busStops[location as keyof typeof busStops] || [])
      setSelectedPickupPoints([])
    }
  }

  const handleEndLocationChange = (location: string, isNewRoute = false) => {
    if (isNewRoute) {
      setNewRoute({
        ...newRoute,
        endLocation: location,
        name: newRoute.startLocation && location ? `${newRoute.startLocation} to ${location}` : newRoute.name,
      })
      setAvailableDropoffPoints(busStops[location as keyof typeof busStops] || [])
      setSelectedDropoffPoints([])
    } else if (editingRoute) {
      setEditingRoute({
        ...editingRoute,
        endLocation: location,
        name:
          editingRoute.startLocation && location ? `${editingRoute.startLocation} to ${location}` : editingRoute.name,
      })
      setAvailableDropoffPoints(busStops[location as keyof typeof busStops] || [])
      setSelectedDropoffPoints([])
    }
  }

  const togglePickupPoint = (point: string, isNewRoute = false) => {
    if (isNewRoute) {
      if (selectedPickupPoints.includes(point)) {
        setSelectedPickupPoints(selectedPickupPoints.filter((p) => p !== point))
      } else {
        setSelectedPickupPoints([...selectedPickupPoints, point])
        // Trigger animation for the newly added point
        const location = newRoute.startLocation
        const pointData = busStops[location as keyof typeof busStops]?.find((p) => p.name === point)
        if (pointData) {
          setMapAnimationState({
            isAnimating: true,
            currentPoint: pointData,
            animationProgress: 0,
          })
        }
      }
    } else if (editingRoute) {
      const updatedPoints = editingRoute.pickupPoints.includes(point)
        ? editingRoute.pickupPoints.filter((p) => p !== point)
        : [...editingRoute.pickupPoints, point]

      setEditingRoute({ ...editingRoute, pickupPoints: updatedPoints })
    }
  }

  const toggleDropoffPoint = (point: string, isNewRoute = false) => {
    if (isNewRoute) {
      if (selectedDropoffPoints.includes(point)) {
        setSelectedDropoffPoints(selectedDropoffPoints.filter((p) => p !== point))
      } else {
        setSelectedDropoffPoints([...selectedDropoffPoints, point])
        // Trigger animation for the newly added point
        const location = newRoute.endLocation
        const pointData = busStops[location as keyof typeof busStops]?.find((p) => p.name === point)
        if (pointData) {
          setMapAnimationState({
            isAnimating: true,
            currentPoint: pointData,
            animationProgress: 0,
          })
        }
      }
    } else if (editingRoute) {
      const updatedPoints = editingRoute.dropoffPoints.includes(point)
        ? editingRoute.dropoffPoints.filter((p) => p !== point)
        : [...editingRoute.dropoffPoints, point]

      setEditingRoute({ ...editingRoute, dropoffPoints: updatedPoints })
    }
  }

  // Update point-to-point pricing when pickup or dropoff points change
  useEffect(() => {
    if (selectedPickupPoints.length > 0 && selectedDropoffPoints.length > 0) {
      const newPricing: { from: string; to: string; price: number }[] = []

      selectedPickupPoints.forEach((pickup) => {
        selectedDropoffPoints.forEach((dropoff) => {
          newPricing.push({
            from: pickup,
            to: dropoff,
            price: newRoute.price, // Default to the main route price
          })
        })
      })

      setPointToPricing(newPricing)
    }
  }, [selectedPickupPoints, selectedDropoffPoints, newRoute.price])

  // Map rendering and animation
  useEffect(() => {
    const canvas = mapCanvasRef.current
    if (!canvas || !showMap) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw map background
    ctx.fillStyle = "#f1f5f9" // Slate-100
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0" // Slate-200
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Helper function to map coordinates to canvas
    const mapCoordinates = (lat: number, lng: number) => {
      // South Africa's approximate bounds
      const latMin = -35 // Southernmost point
      const latMax = -22 // Northernmost point
      const lngMin = 16 // Westernmost point
      const lngMax = 33 // Easternmost point

      // Map to canvas coordinates
      const x = ((lng - lngMin) / (lngMax - lngMin)) * canvas.width
      const y = canvas.height - ((lat - latMin) / (latMax - latMin)) * canvas.height

      return { x, y }
    }

    // Draw pickup points
    const pickupLocation = newRoute.startLocation || (editingRoute?.startLocation ?? "")
    const pickupPoints = selectedPickupPoints.length > 0 ? selectedPickupPoints : (editingRoute?.pickupPoints ?? [])

    pickupPoints.forEach((point) => {
      const stop = busStops[pickupLocation as keyof typeof busStops]?.find((s) => s.name === point)
      if (stop) {
        const { x, y } = mapCoordinates(stop.lat, stop.lng)

        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = "#22c55e" // Green-500
        ctx.fill()

        // Draw label
        ctx.font = "12px Arial"
        ctx.fillStyle = "#000000"
        ctx.fillText(stop.name, x + 12, y)
      }
    })

    // Draw dropoff points
    const dropoffLocation = newRoute.endLocation || (editingRoute?.endLocation ?? "")
    const dropoffPoints = selectedDropoffPoints.length > 0 ? selectedDropoffPoints : (editingRoute?.dropoffPoints ?? [])

    dropoffPoints.forEach((point) => {
      const stop = busStops[dropoffLocation as keyof typeof busStops]?.find((s) => s.name === point)
      if (stop) {
        const { x, y } = mapCoordinates(stop.lat, stop.lng)

        // Draw point
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = "#ef4444" // Red-500
        ctx.fill()

        // Draw label
        ctx.font = "12px Arial"
        ctx.fillStyle = "#000000"
        ctx.fillText(stop.name, x + 12, y)
      }
    })

    // Draw routes between pickup and dropoff points
    if (pickupPoints.length > 0 && dropoffPoints.length > 0) {
      pickupPoints.forEach((pickup) => {
        const pickupStop = busStops[pickupLocation as keyof typeof busStops]?.find((s) => s.name === pickup)

        if (pickupStop) {
          const pickupCoords = mapCoordinates(pickupStop.lat, pickupStop.lng)

          dropoffPoints.forEach((dropoff) => {
            const dropoffStop = busStops[dropoffLocation as keyof typeof busStops]?.find((s) => s.name === dropoff)

            if (dropoffStop) {
              const dropoffCoords = mapCoordinates(dropoffStop.lat, dropoffStop.lng)

              // Draw route line
              ctx.beginPath()
              ctx.moveTo(pickupCoords.x, pickupCoords.y)
              ctx.lineTo(dropoffCoords.x, dropoffCoords.y)
              ctx.strokeStyle = "#3b82f6" // Blue-500
              ctx.lineWidth = 2
              ctx.stroke()
            }
          })
        }
      })
    }

    // Draw animation for newly added point
    if (mapAnimationState.isAnimating && mapAnimationState.currentPoint) {
      const { lat, lng, name } = mapAnimationState.currentPoint
      const { x, y } = mapCoordinates(lat, lng)

      // Draw animated circle
      const radius = 20 * (1 - mapAnimationState.animationProgress)
      const opacity = 1 - mapAnimationState.animationProgress

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(59, 130, 246, ${opacity})` // Blue-500 with opacity
      ctx.fill()

      // Update animation
      if (mapAnimationState.animationProgress < 1) {
        setMapAnimationState({
          ...mapAnimationState,
          animationProgress: mapAnimationState.animationProgress + 0.05,
        })
      } else {
        setMapAnimationState({
          isAnimating: false,
          currentPoint: null,
          animationProgress: 0,
        })
      }
    }

    // Draw legend
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(10, 10, 180, 80)
    ctx.strokeStyle = "#e2e8f0"
    ctx.strokeRect(10, 10, 180, 80)

    // Pickup point legend
    ctx.beginPath()
    ctx.arc(25, 30, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#22c55e"
    ctx.fill()
    ctx.font = "12px Arial"
    ctx.fillStyle = "#000000"
    ctx.fillText("Pickup Points", 40, 34)

    // Dropoff point legend
    ctx.beginPath()
    ctx.arc(25, 60, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#ef4444"
    ctx.fill()
    ctx.font = "12px Arial"
    ctx.fillStyle = "#000000"
    ctx.fillText("Dropoff Points", 40, 64)

    // Request next animation frame if animating
    if (mapAnimationState.isAnimating) {
      requestAnimationFrame(() => {
        // This will trigger a re-render
      })
    }
  }, [
    showMap,
    newRoute.startLocation,
    newRoute.endLocation,
    selectedPickupPoints,
    selectedDropoffPoints,
    editingRoute,
    mapAnimationState,
  ])

  const updatePointToPointPrice = (from: string, to: string, price: number) => {
    const updatedPricing = [...pointToPricing]
    const index = updatedPricing.findIndex((p) => p.from === from && p.to === to)

    if (index !== -1) {
      updatedPricing[index].price = price
    } else {
      updatedPricing.push({ from, to, price })
    }

    setPointToPricing(updatedPricing)
  }

  const addPointToPointPrice = () => {
    if (newPointPrice.from && newPointPrice.to && newPointPrice.price > 0) {
      updatePointToPointPrice(newPointPrice.from, newPointPrice.to, newPointPrice.price)
      setNewPointPrice({ from: "", to: "", price: 0 })
    }
  }

  const handleAddRoute = () => {
    const id = Math.max(...routes.map((route) => route.id)) + 1
    const newRouteWithDefaults = {
      ...newRoute,
      id,
      pickupPoints: selectedPickupPoints,
      dropoffPoints: selectedDropoffPoints,
      pointToPricing: pointToPricing,
    }

    setRoutes([...routes, newRouteWithDefaults])
    setNewRoute({
      name: "",
      startLocation: "",
      endLocation: "",
      pickupPoints: [],
      dropoffPoints: [],
      price: 0,
      capacity: 45,
      status: "Active",
      departureTime: "",
      returnTime: "",
      frequency: "Daily",
      description: "",
      pointToPricing: [],
    })
    setSelectedPickupPoints([])
    setSelectedDropoffPoints([])
    setPointToPricing([])
    setIsAddRouteDialogOpen(false)
  }

  const handleEditRoute = () => {
    if (!editingRoute) return

    setRoutes(routes.map((route) => (route.id === editingRoute.id ? editingRoute : route)))
    setEditingRoute(null)
  }

  const handleDeleteRoute = (id: number) => {
    setRoutes(routes.filter((route) => route.id !== id))
  }

  const handleToggleRouteStatus = (id: number) => {
    setRoutes(
      routes.map((route) =>
        route.id === id ? { ...route, status: route.status === "Active" ? "Inactive" : "Active" } : route,
      ),
    )
  }

  const prepareRouteEdit = (route: (typeof initialRoutes)[0]) => {
    setEditingRoute(route)
    setAvailablePickupPoints(busStops[route.startLocation as keyof typeof busStops] || [])
    setAvailableDropoffPoints(busStops[route.endLocation as keyof typeof busStops] || [])
    setPointToPricing(route.pointToPricing || [])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-exxaro">Route Management</h1>
          <p className="text-slate-500 font-exxaro">Create and manage bus routes</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-exxaro">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="font-exxaro">Add New Route</DialogTitle>
              <DialogDescription className="font-exxaro">
                Create a new bus route with pickup and dropoff points
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="basic" className="font-exxaro">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="stops" className="font-exxaro">
                  Route Designer
                </TabsTrigger>
                <TabsTrigger value="pricing" className="font-exxaro">
                  Point-to-Point Pricing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startLocation" className="font-exxaro">
                      Start Location
                    </Label>
                    <Select
                      value={newRoute.startLocation}
                      onValueChange={(value) => handleStartLocationChange(value, true)}
                    >
                      <SelectTrigger id="startLocation" className="font-exxaro">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location} className="font-exxaro">
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endLocation" className="font-exxaro">
                      End Location
                    </Label>
                    <Select
                      value={newRoute.endLocation}
                      onValueChange={(value) => handleEndLocationChange(value, true)}
                    >
                      <SelectTrigger id="endLocation" className="font-exxaro">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location} className="font-exxaro">
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="routeName" className="font-exxaro">
                    Route Name
                  </Label>
                  <Input
                    id="routeName"
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                    className="font-exxaro"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price" className="font-exxaro">
                      Base Price (R)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newRoute.price.toString()}
                      onChange={(e) => setNewRoute({ ...newRoute, price: Number(e.target.value) })}
                      className="font-exxaro"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity" className="font-exxaro">
                      Bus Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newRoute.capacity.toString()}
                      onChange={(e) => setNewRoute({ ...newRoute, capacity: Number(e.target.value) })}
                      className="font-exxaro"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="departureTime" className="font-exxaro">
                      Departure Time
                    </Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={newRoute.departureTime}
                      onChange={(e) => setNewRoute({ ...newRoute, departureTime: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="returnTime" className="font-exxaro">
                      Return Time
                    </Label>
                    <Input
                      id="returnTime"
                      type="time"
                      value={newRoute.returnTime}
                      onChange={(e) => setNewRoute({ ...newRoute, returnTime: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="frequency" className="font-exxaro">
                    Frequency
                  </Label>
                  <Select
                    value={newRoute.frequency}
                    onValueChange={(value) => setNewRoute({ ...newRoute, frequency: value })}
                  >
                    <SelectTrigger id="frequency" className="font-exxaro">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily" className="font-exxaro">
                        Daily
                      </SelectItem>
                      <SelectItem value="Weekdays" className="font-exxaro">
                        Weekdays
                      </SelectItem>
                      <SelectItem value="Weekends" className="font-exxaro">
                        Weekends
                      </SelectItem>
                      <SelectItem value="Custom" className="font-exxaro">
                        Custom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="font-exxaro">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newRoute.description}
                    onChange={(e) => setNewRoute({ ...newRoute, description: e.target.value })}
                    className="font-exxaro"
                  />
                </div>
              </TabsContent>

              <TabsContent value="stops" className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="grid gap-2">
                      <Label className="font-exxaro">Pickup Points</Label>
                      {newRoute.startLocation ? (
                        <div className="border rounded-md p-3 space-y-2 max-h-[200px] overflow-y-auto">
                          {availablePickupPoints.length > 0 ? (
                            availablePickupPoints.map((point) => (
                              <div key={point.name} className="flex items-center gap-2">
                                <Switch
                                  checked={selectedPickupPoints.includes(point.name)}
                                  onCheckedChange={() => togglePickupPoint(point.name, true)}
                                />
                                <Label className="font-exxaro cursor-pointer flex items-center">
                                  <MapPinIcon className="h-3 w-3 mr-1 text-green-500" />
                                  {point.name}
                                </Label>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-slate-500 font-exxaro">
                              No pickup points available for this location
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 font-exxaro">Select a start location first</p>
                      )}
                    </div>

                    <div className="grid gap-2 mt-4">
                      <Label className="font-exxaro">Dropoff Points</Label>
                      {newRoute.endLocation ? (
                        <div className="border rounded-md p-3 space-y-2 max-h-[200px] overflow-y-auto">
                          {availableDropoffPoints.length > 0 ? (
                            availableDropoffPoints.map((point) => (
                              <div key={point.name} className="flex items-center gap-2">
                                <Switch
                                  checked={selectedDropoffPoints.includes(point.name)}
                                  onCheckedChange={() => toggleDropoffPoint(point.name, true)}
                                />
                                <Label className="font-exxaro cursor-pointer flex items-center">
                                  <MapPinIcon className="h-3 w-3 mr-1 text-red-500" />
                                  {point.name}
                                </Label>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-slate-500 font-exxaro">
                              No dropoff points available for this location
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 font-exxaro">Select an end location first</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="border rounded-md p-2 bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium font-exxaro">Route Map Visualization</h3>
                        <Button
                          variant="outline"
                          onClick={() => setShowMap(!showMap)}
                          size="sm"
                          className="font-exxaro"
                        >
                          {showMap ? "Hide Map" : "Show Map"}
                        </Button>
                      </div>

                      {showMap && (
                        <div className="relative">
                          <canvas ref={mapCanvasRef} className="w-full h-[300px] rounded-md border"></canvas>

                          {(!newRoute.startLocation || !newRoute.endLocation) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80">
                              <div className="text-center p-4">
                                <MapIcon className="h-12 w-12 text-slate-300 mx-auto mb-2" />
                                <p className="text-sm text-slate-500 font-exxaro">
                                  Select start and end locations to visualize your route
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedPickupPoints.length > 0 && selectedDropoffPoints.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-xs font-medium text-slate-600 font-exxaro mb-2">Route Summary:</h4>
                          <div className="space-y-2">
                            {selectedPickupPoints.map((pickup, i) => (
                              <div key={i} className="flex items-center text-xs bg-slate-100 p-2 rounded-md">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-exxaro">
                                  <MapPinIcon className="h-3 w-3 inline mr-1" />
                                  {pickup}
                                </span>
                                <ArrowRightIcon className="h-3 w-3 mx-2 text-slate-400" />
                                <div className="flex flex-wrap gap-1">
                                  {selectedDropoffPoints.map((dropoff, j) => (
                                    <span key={j} className="bg-red-100 text-red-800 px-2 py-1 rounded font-exxaro">
                                      <MapPinIcon className="h-3 w-3 inline mr-1" />
                                      {dropoff}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="grid gap-4">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium mb-2 font-exxaro">Add Point-to-Point Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="from-point" className="text-xs font-exxaro">
                          From
                        </Label>
                        <Select
                          value={newPointPrice.from}
                          onValueChange={(value) => setNewPointPrice({ ...newPointPrice, from: value })}
                        >
                          <SelectTrigger id="from-point" className="font-exxaro">
                            <SelectValue placeholder="Select pickup" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPickupPoints.map((point) => (
                              <SelectItem key={point} value={point} className="font-exxaro">
                                {point}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="to-point" className="text-xs font-exxaro">
                          To
                        </Label>
                        <Select
                          value={newPointPrice.to}
                          onValueChange={(value) => setNewPointPrice({ ...newPointPrice, to: value })}
                        >
                          <SelectTrigger id="to-point" className="font-exxaro">
                            <SelectValue placeholder="Select dropoff" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedDropoffPoints.map((point) => (
                              <SelectItem key={point} value={point} className="font-exxaro">
                                {point}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="point-price" className="text-xs font-exxaro">
                          Price (R)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="point-price"
                            type="number"
                            value={newPointPrice.price || ""}
                            onChange={(e) => setNewPointPrice({ ...newPointPrice, price: Number(e.target.value) })}
                            className="font-exxaro"
                          />
                          <Button
                            onClick={addPointToPointPrice}
                            disabled={!newPointPrice.from || !newPointPrice.to || newPointPrice.price <= 0}
                            className="whitespace-nowrap"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="p-3 border-b bg-slate-50">
                      <h3 className="text-sm font-medium font-exxaro">Point-to-Point Pricing Table</h3>
                    </div>
                    <div className="p-3">
                      {pointToPricing.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 text-xs font-medium text-slate-500 font-exxaro">From</th>
                                <th className="text-left py-2 text-xs font-medium text-slate-500 font-exxaro">To</th>
                                <th className="text-right py-2 text-xs font-medium text-slate-500 font-exxaro">
                                  Price (R)
                                </th>
                                <th className="text-right py-2 text-xs font-medium text-slate-500 font-exxaro">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {pointToPricing.map((pricing, index) => (
                                <tr key={index} className="border-b last:border-0">
                                  <td className="py-2 text-sm font-exxaro">{pricing.from}</td>
                                  <td className="py-2 text-sm font-exxaro">{pricing.to}</td>
                                  <td className="py-2 text-sm text-right font-exxaro">R{pricing.price.toFixed(2)}</td>
                                  <td className="py-2 text-right">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const updated = pointToPricing.filter((_, i) => i !== index)
                                        setPointToPricing(updated)
                                      }}
                                      className="h-7 w-7 p-0"
                                    >
                                      <TrashIcon className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 text-center py-4 font-exxaro">
                          No point-to-point pricing defined yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                type="button"
                onClick={handleAddRoute}
                disabled={
                  !newRoute.name ||
                  !newRoute.startLocation ||
                  !newRoute.endLocation ||
                  !newRoute.price ||
                  selectedPickupPoints.length === 0 ||
                  selectedDropoffPoints.length === 0
                }
                className="font-exxaro"
              >
                Add Route
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl font-exxaro">Routes</CardTitle>
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-exxaro"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Route</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Price</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Capacity</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Departure</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Frequency</th>
                  <th className="text-left py-3 font-medium text-slate-500 font-exxaro">Status</th>
                  <th className="text-right py-3 font-medium text-slate-500 font-exxaro">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <tr key={route.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="py-3">
                        <div className="flex flex-col">
                          <p className="font-medium font-exxaro">{route.name}</p>
                          <p className="text-sm text-slate-500 font-exxaro">{route.description}</p>
                        </div>
                      </td>
                      <td className="py-3 font-exxaro">R{route.price.toFixed(2)}</td>
                      <td className="py-3 font-exxaro">{route.capacity} seats</td>
                      <td className="py-3 font-exxaro">{route.departureTime}</td>
                      <td className="py-3 font-exxaro">{route.frequency}</td>
                      <td className="py-3">
                        <Badge variant={route.status === "Active" ? "default" : "secondary"} className="font-exxaro">
                          {route.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="font-exxaro">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    prepareRouteEdit(route)
                                  }}
                                  className="font-exxaro"
                                >
                                  <PencilIcon className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                {editingRoute && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle className="font-exxaro">Edit Route</DialogTitle>
                                      <DialogDescription className="font-exxaro">
                                        Make changes to the route details
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-startLocation" className="font-exxaro">
                                            Start Location
                                          </Label>
                                          <Select
                                            value={editingRoute.startLocation}
                                            onValueChange={(value) => handleStartLocationChange(value)}
                                          >
                                            <SelectTrigger id="edit-startLocation" className="font-exxaro">
                                              <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {locations.map((location) => (
                                                <SelectItem key={location} value={location} className="font-exxaro">
                                                  {location}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-endLocation" className="font-exxaro">
                                            End Location
                                          </Label>
                                          <Select
                                            value={editingRoute.endLocation}
                                            onValueChange={(value) => handleEndLocationChange(value)}
                                          >
                                            <SelectTrigger id="edit-endLocation" className="font-exxaro">
                                              <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {locations.map((location) => (
                                                <SelectItem key={location} value={location} className="font-exxaro">
                                                  {location}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>

                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-routeName" className="font-exxaro">
                                          Route Name
                                        </Label>
                                        <Input
                                          id="edit-routeName"
                                          value={editingRoute.name}
                                          onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                                          className="font-exxaro"
                                        />
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-price" className="font-exxaro">
                                            Price (R)
                                          </Label>
                                          <Input
                                            id="edit-price"
                                            type="number"
                                            value={editingRoute.price.toString()}
                                            onChange={(e) =>
                                              setEditingRoute({ ...editingRoute, price: Number(e.target.value) })
                                            }
                                            className="font-exxaro"
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-capacity" className="font-exxaro">
                                            Bus Capacity
                                          </Label>
                                          <Input
                                            id="edit-capacity"
                                            type="number"
                                            value={editingRoute.capacity.toString()}
                                            onChange={(e) =>
                                              setEditingRoute({ ...editingRoute, capacity: Number(e.target.value) })
                                            }
                                            className="font-exxaro"
                                          />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-departureTime" className="font-exxaro">
                                            Departure Time
                                          </Label>
                                          <Input
                                            id="edit-departureTime"
                                            type="time"
                                            value={editingRoute.departureTime}
                                            onChange={(e) =>
                                              setEditingRoute({ ...editingRoute, departureTime: e.target.value })
                                            }
                                            className="font-exxaro"
                                          />
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-returnTime" className="font-exxaro">
                                            Return Time
                                          </Label>
                                          <Input
                                            id="edit-returnTime"
                                            type="time"
                                            value={editingRoute.returnTime}
                                            onChange={(e) =>
                                              setEditingRoute({ ...editingRoute, returnTime: e.target.value })
                                            }
                                            className="font-exxaro"
                                          />
                                        </div>
                                      </div>

                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-frequency" className="font-exxaro">
                                          Frequency
                                        </Label>
                                        <Select
                                          value={editingRoute.frequency}
                                          onValueChange={(value) =>
                                            setEditingRoute({ ...editingRoute, frequency: value })
                                          }
                                        >
                                          <SelectTrigger id="edit-frequency" className="font-exxaro">
                                            <SelectValue placeholder="Select frequency" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Daily" className="font-exxaro">
                                              Daily
                                            </SelectItem>
                                            <SelectItem value="Weekdays" className="font-exxaro">
                                              Weekdays
                                            </SelectItem>
                                            <SelectItem value="Weekends" className="font-exxaro">
                                              Weekends
                                            </SelectItem>
                                            <SelectItem value="Custom" className="font-exxaro">
                                              Custom
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-description" className="font-exxaro">
                                          Description
                                        </Label>
                                        <Input
                                          id="edit-description"
                                          value={editingRoute.description}
                                          onChange={(e) =>
                                            setEditingRoute({ ...editingRoute, description: e.target.value })
                                          }
                                          className="font-exxaro"
                                        />
                                      </div>

                                      <div className="grid gap-2">
                                        <Label className="font-exxaro">Pickup Points</Label>
                                        <div className="border rounded-md p-3 space-y-2">
                                          {availablePickupPoints.length > 0 ? (
                                            availablePickupPoints.map((point) => (
                                              <div key={point.name} className="flex items-center gap-2">
                                                <Switch
                                                  checked={editingRoute.pickupPoints.includes(point.name)}
                                                  onCheckedChange={() => togglePickupPoint(point.name)}
                                                />
                                                <Label className="font-exxaro cursor-pointer">{point.name}</Label>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="text-sm text-slate-500 font-exxaro">
                                              No pickup points available for this location
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      <div className="grid gap-2">
                                        <Label className="font-exxaro">Dropoff Points</Label>
                                        <div className="border rounded-md p-3 space-y-2">
                                          {availableDropoffPoints.length > 0 ? (
                                            availableDropoffPoints.map((point) => (
                                              <div key={point.name} className="flex items-center gap-2">
                                                <Switch
                                                  checked={editingRoute.dropoffPoints.includes(point.name)}
                                                  onCheckedChange={() => toggleDropoffPoint(point.name)}
                                                />
                                                <Label className="font-exxaro cursor-pointer">{point.name}</Label>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="text-sm text-slate-500 font-exxaro">
                                              No dropoff points available for this location
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      <div className="grid gap-2">
                                        <Label className="font-exxaro">Point-to-Point Pricing</Label>
                                        <div className="border rounded-md p-3">
                                          {editingRoute.pointToPricing && editingRoute.pointToPricing.length > 0 ? (
                                            <div className="overflow-x-auto">
                                              <table className="w-full">
                                                <thead>
                                                  <tr className="border-b">
                                                    <th className="text-left py-2 text-xs font-medium text-slate-500 font-exxaro">
                                                      From
                                                    </th>
                                                    <th className="text-left py-2 text-xs font-medium text-slate-500 font-exxaro">
                                                      To
                                                    </th>
                                                    <th className="text-right py-2 text-xs font-medium text-slate-500 font-exxaro">
                                                      Price (R)
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {editingRoute.pointToPricing.map((pricing, index) => (
                                                    <tr key={index} className="border-b last:border-0">
                                                      <td className="py-2 text-sm font-exxaro">{pricing.from}</td>
                                                      <td className="py-2 text-sm font-exxaro">{pricing.to}</td>
                                                      <td className="py-2 text-sm text-right font-exxaro">
                                                        R{pricing.price.toFixed(2)}
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          ) : (
                                            <p className="text-sm text-slate-500 text-center py-2 font-exxaro">
                                              No point-to-point pricing defined
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type="submit"
                                        onClick={handleEditRoute}
                                        disabled={
                                          !editingRoute.name ||
                                          !editingRoute.startLocation ||
                                          !editingRoute.endLocation ||
                                          !editingRoute.price ||
                                          editingRoute.pickupPoints.length === 0 ||
                                          editingRoute.dropoffPoints.length === 0
                                        }
                                        className="font-exxaro"
                                      >
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleToggleRouteStatus(route.id)
                              }}
                              className="font-exxaro"
                            >
                              {route.status === "Active" ? (
                                <>
                                  <XIcon className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckIcon className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleDeleteRoute(route.id)
                              }}
                              className="text-red-600 focus:text-red-600 font-exxaro"
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500 font-exxaro">
                      No routes found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-slate-500 font-exxaro">
            Showing {filteredRoutes.length} of {routes.length} routes
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

