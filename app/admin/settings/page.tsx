"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { PaletteIcon, ImageIcon, TypeIcon, SaveIcon, CheckIcon } from "lucide-react"
import Image from "next/image"

export default function AppCustomization() {
  const [activeTab, setActiveTab] = useState("branding")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [branding, setBranding] = useState({
    companyName: "Exxaro",
    primaryColor: "#a5cf4c",
    secondaryColor: "#383b41",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
  })

  const [content, setContent] = useState({
    welcomeTitle: "Convenient bus travel with Exxaro",
    welcomeSubtitle:
      "Book your bus tickets easily for routes between Lephalale, Pretoria, and other destinations. Safe, reliable, and comfortable travel for all Exxaro employees.",
    footerText: "Powered by Exxaro",
    termsUrl: "#",
    privacyUrl: "#",
    supportUrl: "#",
  })

  const [contact, setContact] = useState({
    supportEmail: "support@exxaro.com",
    supportPhone: "+27 12 345 6789",
    address: "Roger Dyason Road, Pretoria West, Pretoria, 0183",
    socialFacebook: "https://facebook.com/exxaro",
    socialTwitter: "https://twitter.com/exxaro",
    socialLinkedIn: "https://linkedin.com/company/exxaro",
  })

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-exxaro">Application Customization</h1>
          <p className="text-slate-500 font-exxaro">
            Customize the appearance and content of your bus booking application
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="font-exxaro">
          {isSaving ? (
            <>Saving...</>
          ) : saveSuccess ? (
            <>
              <CheckIcon className="h-4 w-4 mr-2" />
              Saved
            </>
          ) : (
            <>
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="branding" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="branding" className="font-exxaro">
            <PaletteIcon className="h-4 w-4 mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="content" className="font-exxaro">
            <TypeIcon className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="contact" className="font-exxaro">
            <ImageIcon className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-exxaro">Branding Settings</CardTitle>
              <CardDescription className="font-exxaro">Customize your company branding and colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="font-exxaro">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      value={branding.companyName}
                      onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor" className="font-exxaro">
                      Primary Color
                    </Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: branding.primaryColor }}
                      ></div>
                      <Input
                        id="primaryColor"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="font-exxaro"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor" className="font-exxaro">
                      Secondary Color
                    </Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: branding.secondaryColor }}
                      ></div>
                      <Input
                        id="secondaryColor"
                        value={branding.secondaryColor}
                        onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                        className="font-exxaro"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-exxaro">Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-16 border rounded-md flex items-center justify-center bg-white p-2">
                        <Image
                          src={branding.logo || "/placeholder.svg"}
                          alt="Company Logo"
                          width={120}
                          height={40}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <Button variant="outline" className="font-exxaro">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change Logo
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 font-exxaro">
                      Recommended size: 120 x 40 pixels, SVG or PNG format
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-exxaro">Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-white p-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-sm"></div>
                      </div>
                      <Button variant="outline" className="font-exxaro">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 font-exxaro">
                      Recommended size: 32 x 32 pixels, ICO or PNG format
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4 font-exxaro">Preview</h3>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center">
                      <Image
                        src={branding.logo || "/placeholder.svg"}
                        alt="Company Logo"
                        width={100}
                        height={30}
                        className="h-8 w-auto"
                      />
                      <span className="ml-2 font-bold" style={{ color: branding.secondaryColor }}>
                        {branding.companyName}
                      </span>
                    </div>
                    <Button style={{ backgroundColor: branding.primaryColor }} className="text-white font-exxaro">
                      Sign In
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 rounded-md p-4" style={{ backgroundColor: `${branding.primaryColor}20` }}>
                      <h3 className="font-bold mb-2" style={{ color: branding.secondaryColor }}>
                        Book your trip
                      </h3>
                      <p className="text-sm">Select your route and date to get started</p>
                    </div>
                    <div className="flex-1 rounded-md p-4" style={{ backgroundColor: `${branding.secondaryColor}10` }}>
                      <h3 className="font-bold mb-2" style={{ color: branding.secondaryColor }}>
                        My Trips
                      </h3>
                      <p className="text-sm">View and manage your bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-exxaro">Content Settings</CardTitle>
              <CardDescription className="font-exxaro">
                Customize the text content displayed in your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcomeTitle" className="font-exxaro">
                    Welcome Title
                  </Label>
                  <Input
                    id="welcomeTitle"
                    value={content.welcomeTitle}
                    onChange={(e) => setContent({ ...content, welcomeTitle: e.target.value })}
                    className="font-exxaro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcomeSubtitle" className="font-exxaro">
                    Welcome Subtitle
                  </Label>
                  <Textarea
                    id="welcomeSubtitle"
                    value={content.welcomeSubtitle}
                    onChange={(e) => setContent({ ...content, welcomeSubtitle: e.target.value })}
                    className="font-exxaro"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText" className="font-exxaro">
                    Footer Text
                  </Label>
                  <Input
                    id="footerText"
                    value={content.footerText}
                    onChange={(e) => setContent({ ...content, footerText: e.target.value })}
                    className="font-exxaro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="termsUrl" className="font-exxaro">
                    Terms & Conditions URL
                  </Label>
                  <Input
                    id="termsUrl"
                    value={content.termsUrl}
                    onChange={(e) => setContent({ ...content, termsUrl: e.target.value })}
                    className="font-exxaro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacyUrl" className="font-exxaro">
                    Privacy Policy URL
                  </Label>
                  <Input
                    id="privacyUrl"
                    value={content.privacyUrl}
                    onChange={(e) => setContent({ ...content, privacyUrl: e.target.value })}
                    className="font-exxaro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportUrl" className="font-exxaro">
                    Support URL
                  </Label>
                  <Input
                    id="supportUrl"
                    value={content.supportUrl}
                    onChange={(e) => setContent({ ...content, supportUrl: e.target.value })}
                    className="font-exxaro"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4 font-exxaro">Preview</h3>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="max-w-lg mx-auto">
                    <h1 className="text-2xl font-bold mb-2 text-secondary font-exxaro">{content.welcomeTitle}</h1>
                    <p className="text-slate-600 mb-6 font-exxaro">{content.welcomeSubtitle}</p>

                    <div className="bg-slate-50 p-4 rounded-md">
                      <p className="text-sm font-exxaro">Booking form would appear here</p>
                    </div>

                    <div className="border-t mt-6 pt-4 flex justify-between items-center">
                      <span className="text-sm text-slate-500 font-exxaro">{content.footerText}</span>
                      <div className="flex gap-3">
                        <a href={content.termsUrl} className="text-sm text-primary hover:underline font-exxaro">
                          Terms
                        </a>
                        <a href={content.privacyUrl} className="text-sm text-primary hover:underline font-exxaro">
                          Privacy
                        </a>
                        <a href={content.supportUrl} className="text-sm text-primary hover:underline font-exxaro">
                          Support
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-exxaro">Contact Information</CardTitle>
              <CardDescription className="font-exxaro">Set up contact details and social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail" className="font-exxaro">
                      Support Email
                    </Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={contact.supportEmail}
                      onChange={(e) => setContact({ ...contact, supportEmail: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportPhone" className="font-exxaro">
                      Support Phone
                    </Label>
                    <Input
                      id="supportPhone"
                      value={contact.supportPhone}
                      onChange={(e) => setContact({ ...contact, supportPhone: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-exxaro">
                      Company Address
                    </Label>
                    <Textarea
                      id="address"
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      className="font-exxaro"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="socialFacebook" className="font-exxaro">
                      Facebook URL
                    </Label>
                    <Input
                      id="socialFacebook"
                      value={contact.socialFacebook}
                      onChange={(e) => setContact({ ...contact, socialFacebook: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialTwitter" className="font-exxaro">
                      Twitter URL
                    </Label>
                    <Input
                      id="socialTwitter"
                      value={contact.socialTwitter}
                      onChange={(e) => setContact({ ...contact, socialTwitter: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialLinkedIn" className="font-exxaro">
                      LinkedIn URL
                    </Label>
                    <Input
                      id="socialLinkedIn"
                      value={contact.socialLinkedIn}
                      onChange={(e) => setContact({ ...contact, socialLinkedIn: e.target.value })}
                      className="font-exxaro"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4 font-exxaro">Preview</h3>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3 text-secondary font-exxaro">Contact Us</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-exxaro">
                          <span className="font-medium">Email:</span> {contact.supportEmail}
                        </p>
                        <p className="text-sm font-exxaro">
                          <span className="font-medium">Phone:</span> {contact.supportPhone}
                        </p>
                        <p className="text-sm font-exxaro">
                          <span className="font-medium">Address:</span>
                          <br />
                          {contact.address.split(",").map((line, i) => (
                            <span key={i} className="block">
                              {line.trim()}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3 text-secondary font-exxaro">Connect With Us</h4>
                      <div className="flex gap-4">
                        {contact.socialFacebook && (
                          <a
                            href={contact.socialFacebook}
                            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            f
                          </a>
                        )}
                        {contact.socialTwitter && (
                          <a
                            href={contact.socialTwitter}
                            className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            t
                          </a>
                        )}
                        {contact.socialLinkedIn && (
                          <a
                            href={contact.socialLinkedIn}
                            className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            in
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

