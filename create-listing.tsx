"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Home, ArrowLeft, Upload, X, Plus, User, Phone, Mail, Save } from "lucide-react"
import Link from "next/link"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

interface ListingFormData {
  // Basic Property Info
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: string
  listingType: string
  price: string

  // Property Details
  bedrooms: string
  bathrooms: string
  sqft: string
  lotSize: string
  yearBuilt: string
  garage: string

  // Listing Details
  description: string
  features: string[]

  // Pricing & Market Info
  lastSoldPrice: string
  lastSoldDate: string
  rentEstimate: string
  pricePerSqft: string

  // Contact Preference
  contactType: "owner" | "agent"

  // Owner Contact (if contactType is 'owner')
  ownerName: string
  ownerPhone: string
  ownerEmail: string

  // Agent Selection (if contactType is 'agent')
  selectedAgent: string

  // Images
  images: File[]
}

const propertyFeatures = [
  "Ocean View",
  "Swimming Pool",
  "Hardwood Floors",
  "Granite Countertops",
  "Stainless Steel Appliances",
  "Walk-in Closets",
  "Central Air",
  "Security System",
  "Smart Home Features",
  "Private Balcony",
  "Fireplace",
  "Wine Cellar",
  "Gym/Fitness Room",
  "Home Office",
  "Guest House",
  "Solar Panels",
  "Updated Kitchen",
  "Master Suite",
  "Laundry Room",
  "Storage Space",
]

const availableAgents = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "Luxury Properties Group",
    phone: "(555) 123-4567",
    email: "sarah.johnson@luxuryproperties.com",
    experience: "15+ years",
    specialties: ["Luxury Homes", "Waterfront Properties"],
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Premier Real Estate",
    phone: "(555) 234-5678",
    email: "michael.chen@premierrealestate.com",
    experience: "12+ years",
    specialties: ["Investment Properties", "Commercial"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Coastal Realty",
    phone: "(555) 345-6789",
    email: "emily.rodriguez@coastalrealty.com",
    experience: "8+ years",
    specialties: ["First-time Buyers", "Condominiums"],
  },
]

export default function CreateListing() {
  const { user, loading } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ListingFormData>({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "",
    listingType: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    lotSize: "",
    yearBuilt: "",
    garage: "",
    description: "",
    features: [],
    lastSoldPrice: "",
    lastSoldDate: "",
    rentEstimate: "",
    pricePerSqft: "",
    contactType: "owner",
    ownerName:
      user?.user_metadata?.first_name && user?.user_metadata?.last_name
        ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
        : "",
    ownerPhone: user?.user_metadata?.phone || "",
    ownerEmail: user?.email || "",
    selectedAgent: "",
    images: [],
  })

  const steps = [
    { title: "Property Details", description: "Basic property information" },
    { title: "Features & Description", description: "Property features and description" },
    { title: "Pricing & Market", description: "Pricing and market information" },
    { title: "Contact & Agent", description: "Contact preferences" },
    { title: "Photos & Review", description: "Upload photos and review" },
  ]

  const handleInputChange = (field: keyof ListingFormData, value: string | string[] | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would submit to your API
    console.log("Listing data:", formData)
    alert("Listing created successfully!")

    setIsSubmitting(false)
  }

  const nextStep = () => {
    // Validation for Step 1 (Property Details)
    if (currentStep === 0) {
      if (!formData.address.trim() || !formData.zipCode.trim()) {
        alert("Please fill in both the Property Address and ZIP Code before proceeding.")
        return
      }
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to create a property listing.</p>
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PrimeRealty</span>
            </Link>

            <div className="flex items-center space-x-3">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Property Listing</h1>
          <p className="text-gray-600">List your property and connect with potential buyers</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-3 hidden md:block">
                  <div className={`text-sm font-medium ${index <= currentStep ? "text-blue-600" : "text-gray-600"}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ml-4 ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Step 1: Property Details */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Property Details</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Property Address</Label>
                          <Input
                            id="address"
                            placeholder="123 Main Street"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value="New York City"
                            className="mt-1 bg-gray-100"
                            disabled
                            readOnly
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value="New York"
                            className="mt-1 bg-gray-100"
                            disabled
                            readOnly
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            placeholder="10001"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="propertyType">Property Type</Label>
                          <Select
                            value={formData.propertyType}
                            onValueChange={(value) => handleInputChange("propertyType", value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single-family">Single Family Home</SelectItem>
                              <SelectItem value="condo">Condominium</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="multi-family">Multi-Family</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <Label htmlFor="bedrooms">Bedrooms</Label>
                          <Input
                            id="bedrooms"
                            type="number"
                            placeholder="3"
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bathrooms">Bathrooms</Label>
                          <Input
                            id="bathrooms"
                            type="number"
                            step="0.5"
                            placeholder="2.5"
                            value={formData.bathrooms}
                            onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sqft">Square Feet</Label>
                          <Input
                            id="sqft"
                            type="number"
                            placeholder="2000"
                            value={formData.sqft}
                            onChange={(e) => handleInputChange("sqft", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="garage">Garage Spaces</Label>
                          <Input
                            id="garage"
                            type="number"
                            placeholder="2"
                            value={formData.garage}
                            onChange={(e) => handleInputChange("garage", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="lotSize">Lot Size</Label>
                          <Input
                            id="lotSize"
                            placeholder="0.25 acres"
                            value={formData.lotSize}
                            onChange={(e) => handleInputChange("lotSize", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="yearBuilt">Year Built</Label>
                          <Input
                            id="yearBuilt"
                            type="number"
                            placeholder="2020"
                            value={formData.yearBuilt}
                            onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Features & Description */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Features & Description</h2>

                      <div className="mb-6">
                        <Label htmlFor="description">Property Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your property in detail. Highlight unique features, recent updates, and what makes it special..."
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className="mt-1 min-h-32"
                        />
                      </div>

                      <div>
                        <Label>Property Features</Label>
                        <p className="text-sm text-gray-600 mb-3">Select all features that apply to your property</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {propertyFeatures.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox
                                id={feature}
                                checked={formData.features.includes(feature)}
                                onCheckedChange={() => handleFeatureToggle(feature)}
                              />
                              <Label htmlFor={feature} className="text-sm">
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pricing & Market */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Pricing & Market Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="listingType">Listing Type</Label>
                          <Select
                            value={formData.listingType}
                            onValueChange={(value) => handleInputChange("listingType", value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select listing type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sale">For Sale</SelectItem>
                              <SelectItem value="rent">For Rent</SelectItem>
                              <SelectItem value="lease">For Lease</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">
                            {formData.listingType === "rent" || formData.listingType === "lease"
                              ? "Monthly Rent"
                              : "Listing Price"}
                          </Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="750000"
                            value={formData.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="lastSoldPrice">Last Sold Price (Optional)</Label>
                          <Input
                            id="lastSoldPrice"
                            type="number"
                            placeholder="650000"
                            value={formData.lastSoldPrice}
                            onChange={(e) => handleInputChange("lastSoldPrice", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastSoldDate">Last Sold Date (Optional)</Label>
                          <Input
                            id="lastSoldDate"
                            type="date"
                            value={formData.lastSoldDate}
                            onChange={(e) => handleInputChange("lastSoldDate", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="rentEstimate">Rent Estimate (Optional)</Label>
                          <Input
                            id="rentEstimate"
                            type="number"
                            placeholder="3500"
                            value={formData.rentEstimate}
                            onChange={(e) => handleInputChange("rentEstimate", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pricePerSqft">Price per Sq Ft</Label>
                          <Input
                            id="pricePerSqft"
                            type="number"
                            placeholder="375"
                            value={formData.pricePerSqft}
                            onChange={(e) => handleInputChange("pricePerSqft", e.target.value)}
                            className="mt-1"
                            readOnly
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Automatically calculated based on price and square footage
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact & Agent */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Contact Preferences</h2>

                      <div className="mb-6">
                        <Label>Who should potential buyers contact?</Label>
                        <RadioGroup
                          value={formData.contactType}
                          onValueChange={(value: "owner" | "agent") => handleInputChange("contactType", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="owner" id="owner" />
                            <Label htmlFor="owner">Contact me directly (property owner)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="agent" id="agent" />
                            <Label htmlFor="agent">Contact through a real estate agent</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.contactType === "owner" && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Your Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="ownerName">Full Name</Label>
                              <Input
                                id="ownerName"
                                placeholder="John Doe"
                                value={formData.ownerName}
                                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="ownerPhone">Phone Number</Label>
                              <Input
                                id="ownerPhone"
                                type="tel"
                                placeholder="(555) 123-4567"
                                value={formData.ownerPhone}
                                onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label htmlFor="ownerEmail">Email Address</Label>
                              <Input
                                id="ownerEmail"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.ownerEmail}
                                onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.contactType === "agent" && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Select a Real Estate Agent</h3>
                          <div className="space-y-3">
                            {availableAgents.map((agent) => (
                              <Card
                                key={agent.id}
                                className={`cursor-pointer transition-colors ${
                                  formData.selectedAgent === agent.id
                                    ? "ring-2 ring-blue-600 bg-blue-50"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => handleInputChange("selectedAgent", agent.id)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                      <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="font-semibold">{agent.name}</h4>
                                          <p className="text-sm text-gray-600">{agent.company}</p>
                                          <p className="text-sm text-gray-600">{agent.experience}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-sm text-gray-600">
                                            <Phone className="h-3 w-3 inline mr-1" />
                                            {agent.phone}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            <Mail className="h-3 w-3 inline mr-1" />
                                            {agent.email}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex gap-1 mt-2">
                                        {agent.specialties.map((specialty) => (
                                          <Badge key={specialty} variant="secondary" className="text-xs">
                                            {specialty}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5: Photos & Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Photos & Final Review</h2>

                      <div className="mb-6">
                        <Label>Property Photos</Label>
                        <p className="text-sm text-gray-600 mb-3">
                          Upload high-quality photos of your property. The first photo will be used as the main listing
                          image.
                        </p>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <div className="space-y-2">
                            <Button variant="outline" onClick={() => document.getElementById("photo-upload")?.click()}>
                              <Plus className="h-4 w-4 mr-2" />
                              Upload Photos
                            </Button>
                            <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                          </div>
                          <input
                            id="photo-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>

                        {formData.images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                                {index === 0 && <Badge className="absolute bottom-1 left-1 text-xs">Main Photo</Badge>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Listing Summary</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Address:</span>
                                <span className="font-medium">
                                  {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Property Type:</span>
                                <span className="font-medium">{formData.propertyType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-medium text-blue-600">
                                  ${Number.parseInt(formData.price || "0").toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Bedrooms/Bathrooms:</span>
                                <span className="font-medium">
                                  {formData.bedrooms} bed, {formData.bathrooms} bath
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Square Feet:</span>
                                <span className="font-medium">
                                  {Number.parseInt(formData.sqft || "0").toLocaleString()} sq ft
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Contact:</span>
                                <span className="font-medium">
                                  {formData.contactType === "owner" ? "Property Owner" : "Real Estate Agent"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                    Previous
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button 
                      onClick={nextStep}
                      disabled={currentStep === 0 && (!formData.address.trim() || !formData.zipCode.trim())}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Listing...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Listing
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 ${
                        index <= currentStep ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Use high-quality, well-lit photos to showcase your property</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Write a detailed description highlighting unique features</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Price competitively based on local market conditions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Consider working with an agent for professional guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
