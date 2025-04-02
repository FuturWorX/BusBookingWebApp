"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneIcon, MailIcon, BuildingIcon, ShieldIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@exxaro.com",
    phone: "+27 71 234 5678",
    department: "Mining Operations",
    employeeId: "EX-12345",
    profileImage: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Simulate saving process
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  const getInitials = () => {
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`
  }

  return (
    <Card className="border border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-secondary font-exxaro">Personal Information</CardTitle>
        <CardDescription className="font-exxaro">Update your personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={userData.profileImage} />
            <AvatarFallback className="bg-primary/20 text-primary text-xl font-exxaro">{getInitials()}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="mt-2">
              <Label
                htmlFor="profile-image"
                className="text-sm font-exxaro cursor-pointer text-primary hover:underline"
              >
                Change profile picture
              </Label>
              <Input
                id="profile-image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // In a real app, you would upload this to a server
                    // For now, we'll just create a local URL
                    const url = URL.createObjectURL(e.target.files[0])
                    setUserData((prev) => ({ ...prev, profileImage: url }))
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="font-exxaro">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="font-exxaro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="font-exxaro">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="font-exxaro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-exxaro">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <MailIcon className="h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="pl-10 font-exxaro"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-exxaro">
              Phone Number
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <PhoneIcon className="h-4 w-4" />
              </div>
              <Input
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="pl-10 font-exxaro"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="font-exxaro">
              Department
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <BuildingIcon className="h-4 w-4" />
              </div>
              <Input
                id="department"
                name="department"
                value={userData.department}
                onChange={handleInputChange}
                className="pl-10 font-exxaro"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeId" className="font-exxaro">
              Employee ID
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-slate-400">
                <ShieldIcon className="h-4 w-4" />
              </div>
              <Input
                id="employeeId"
                name="employeeId"
                value={userData.employeeId}
                onChange={handleInputChange}
                className="pl-10 font-exxaro"
                disabled={true} // Employee ID should not be editable
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving} className="font-exxaro">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="font-exxaro">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="font-exxaro">
            Edit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

