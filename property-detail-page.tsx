"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Home,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Building,
  Ruler,
  User,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

// Mock property data - in real app, this would come from props or API
const propertyData = {
  id: 1,
  address: "1234 Oceanview Drive, Malibu, CA 90265",
  type: "Single Family Home",
  price: 2850000,
  lastSoldPrice: 2650000,
  lastSoldDate: "2022-03-15",
  rentEstimate: 12500,
  size: 3200,
  lotSize: "0.75 acres",
  bedrooms: 4,
  bathrooms: 3.5,
  garage: 2,
  yearBuilt: 2019,
  daysOnMarket: 12,
  pricePerSqft: 891,
  status: "For Sale",
  description:
    "Stunning contemporary villa featuring panoramic ocean views, open-concept living spaces, and premium finishes throughout. This architectural masterpiece boasts floor-to-ceiling windows, a gourmet kitchen with top-of-the-line appliances, and seamless indoor-outdoor living. The master suite includes a private balcony and spa-like bathroom. Additional highlights include an infinity pool, three-car garage, and smart home technology. Perfect for entertaining with multiple outdoor spaces and breathtaking sunset views.",
  features: [
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
  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  estimates: {
    zestimate: 2920000,
    zestimateChange: 2.5,
    redfin: 2875000,
    redfinChange: 1.8,
    automated: 2890000,
    automatedChange: 2.1,
  },
  priceHistory: [
    { date: "2024-01-15", price: 2850000, event: "Listed for sale" },
    { date: "2022-03-15", price: 2650000, event: "Sold" },
    { date: "2022-02-01", price: 2700000, event: "Listed for sale" },
    { date: "2019-08-20", price: 2400000, event: "Sold (new construction)" },
  ],
  owner: {
    name: "Sarah Johnson",
    title: "Listing Agent",
    company: "Luxury Properties Group",
    phone: "(555) 123-4567",
    email: "sarah.johnson@luxuryproperties.com",
    image: "/placeholder.svg?height=120&width=120",
    experience: "15+ years experience",
    listings: 47,
    recentSales: 23,
  },
}

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const { user, loading } = useAuth()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Buy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Sell
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Invest
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              {loading ? (
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" className="text-gray-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-blue-600">
              Properties
            </Link>
            <span>/</span>
            <span>Malibu</span>
            <span>/</span>
            <span className="text-gray-900">Property Details</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </Link>

        {/* Property Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {propertyData.status}
                </Badge>
                <Badge variant="outline">{propertyData.type}</Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{propertyData.address}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Malibu, CA 90265</span>
              </div>
              <div className="text-4xl font-bold text-blue-600">{formatCurrency(propertyData.price)}</div>
              <div className="text-sm text-gray-600 mt-1">
                Last sold: {formatCurrency(propertyData.lastSoldPrice)} on {formatDate(propertyData.lastSoldDate)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsFavorited(!isFavorited)}>
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={propertyData.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Property image ${currentImageIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-[400px] lg:h-[500px] object-cover rounded-t-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {propertyData.images.length}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {propertyData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 ${index === currentImageIndex ? "ring-2 ring-blue-600" : ""}`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={60}
                          className="w-20 h-15 object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="estimates">Estimates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Property Overview</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{propertyData.bedrooms}</div>
                            <div className="text-sm text-gray-600">Bedrooms</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{propertyData.bathrooms}</div>
                            <div className="text-sm text-gray-600">Bathrooms</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Square className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{propertyData.size.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Sq Ft</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{propertyData.garage}</div>
                            <div className="text-sm text-gray-600">Garage</div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h4 className="font-semibold mb-4">Description</h4>
                        <p className="text-gray-700 leading-relaxed">{propertyData.description}</p>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <h4 className="font-semibold mb-4">Features & Amenities</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {propertyData.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Property Type:</span>
                            <span className="font-medium">{propertyData.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Year Built:</span>
                            <span className="font-medium">{propertyData.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lot Size:</span>
                            <span className="font-medium">{propertyData.lotSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Days on Market:</span>
                            <span className="font-medium">{propertyData.daysOnMarket} days</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price per Sq Ft:</span>
                            <span className="font-medium">${propertyData.pricePerSqft}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rent Estimate:</span>
                            <span className="font-medium">{formatCurrency(propertyData.rentEstimate)}/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Property ID:</span>
                            <span className="font-medium">#{propertyData.id.toString().padStart(6, "0")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="font-medium">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Price History</h3>
                      <div className="space-y-4">
                        {propertyData.priceHistory.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="font-medium">{entry.event}</div>
                                <div className="text-sm text-gray-600">{formatDate(entry.date)}</div>
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-blue-600">{formatCurrency(entry.price)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="estimates" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Value Estimates</h3>
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold">Zestimate</div>
                                <div className="text-sm text-gray-600">Zillow's automated valuation</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">
                                  {formatCurrency(propertyData.estimates.zestimate)}
                                </div>
                                <div className="flex items-center text-sm text-green-600">
                                  <TrendingUp className="h-3 w-3 mr-1" />+{propertyData.estimates.zestimateChange}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold">Redfin Estimate</div>
                                <div className="text-sm text-gray-600">Redfin's automated valuation</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">
                                  {formatCurrency(propertyData.estimates.redfin)}
                                </div>
                                <div className="flex items-center text-sm text-green-600">
                                  <TrendingUp className="h-3 w-3 mr-1" />+{propertyData.estimates.redfinChange}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold">PrimeRealty Estimate</div>
                                <div className="text-sm text-gray-600">Our automated valuation model</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold">
                                  {formatCurrency(propertyData.estimates.automated)}
                                </div>
                                <div className="flex items-center text-sm text-green-600">
                                  <TrendingUp className="h-3 w-3 mr-1" />+{propertyData.estimates.automatedChange}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Price per Sq Ft</span>
                  </div>
                  <span className="font-semibold">${propertyData.pricePerSqft}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Days on Market</span>
                  </div>
                  <span className="font-semibold">{propertyData.daysOnMarket} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Year Built</span>
                  </div>
                  <span className="font-semibold">{propertyData.yearBuilt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Lot Size</span>
                  </div>
                  <span className="font-semibold">{propertyData.lotSize}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Listing Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={propertyData.owner.image || "/placeholder.svg"}
                    alt={propertyData.owner.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{propertyData.owner.name}</h3>
                    <p className="text-sm text-gray-600">{propertyData.owner.title}</p>
                    <p className="text-sm text-gray-600">{propertyData.owner.company}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{propertyData.owner.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span>{propertyData.owner.listings} active listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span>{propertyData.owner.recentSales} recent sales</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {propertyData.owner.phone}
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Tour
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Get Pre-Approved
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Calculate Mortgage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
