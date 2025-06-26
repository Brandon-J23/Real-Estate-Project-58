"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  ArrowLeft,
  X,
  Plus,
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  DollarSign,
  TrendingUp,
  Ruler,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

// Mock favorites data with detailed property information
const mockFavorites = [
  {
    id: 4,
    address: "321 Beach Road, Santa Monica, CA 90401",
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4000,
    lotSize: "0.5 acres",
    yearBuilt: 2018,
    garage: 3,
    propertyType: "Single Family Home",
    daysOnMarket: 8,
    pricePerSqft: 800,
    lastSoldPrice: 2950000,
    lastSoldDate: "2020-05-15",
    rentEstimate: 15000,
    hoaFees: 0,
    propertyTax: 32000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: [
      "Ocean View",
      "Swimming Pool",
      "Hardwood Floors",
      "Granite Countertops",
      "Central Air",
      "Security System",
    ],
    description: "Stunning oceanfront property with panoramic views and luxury finishes throughout.",
    status: "For Sale",
  },
  {
    id: 5,
    address: "654 Mountain View, Pasadena, CA 91101",
    price: 1250000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    lotSize: "0.25 acres",
    yearBuilt: 2015,
    garage: 2,
    propertyType: "Single Family Home",
    daysOnMarket: 15,
    pricePerSqft: 568,
    lastSoldPrice: 1100000,
    lastSoldDate: "2019-08-22",
    rentEstimate: 6500,
    hoaFees: 0,
    propertyTax: 12500,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["Mountain View", "Updated Kitchen", "Hardwood Floors", "Central Air", "Fireplace", "Garden"],
    description: "Beautiful home with mountain views and modern updates in desirable Pasadena neighborhood.",
    status: "For Sale",
  },
  {
    id: 6,
    address: "987 Valley Drive, Burbank, CA 91501",
    price: 875000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    lotSize: "0.15 acres",
    yearBuilt: 2020,
    garage: 2,
    propertyType: "Townhouse",
    daysOnMarket: 22,
    pricePerSqft: 547,
    lastSoldPrice: 0,
    lastSoldDate: null,
    rentEstimate: 4200,
    hoaFees: 350,
    propertyTax: 8750,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["New Construction", "Smart Home Features", "Granite Countertops", "Central Air", "Garage"],
    description: "Brand new townhouse with modern amenities and smart home technology.",
    status: "For Sale",
  },
  {
    id: 7,
    address: "456 Downtown Loft, Los Angeles, CA 90013",
    price: 950000,
    bedrooms: 1,
    bathrooms: 1.5,
    sqft: 1200,
    lotSize: "N/A",
    yearBuilt: 2017,
    garage: 1,
    propertyType: "Condominium",
    daysOnMarket: 12,
    pricePerSqft: 792,
    lastSoldPrice: 850000,
    lastSoldDate: "2021-03-10",
    rentEstimate: 4800,
    hoaFees: 650,
    propertyTax: 9500,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["City View", "High Ceilings", "Stainless Steel Appliances", "Hardwood Floors", "Rooftop Access"],
    description: "Modern downtown loft with city views and premium building amenities.",
    status: "For Sale",
  },
  {
    id: 8,
    address: "123 Luxury Estate, Beverly Hills, CA 90210",
    price: 5500000,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 6500,
    lotSize: "1.2 acres",
    yearBuilt: 2019,
    garage: 4,
    propertyType: "Single Family Home",
    daysOnMarket: 35,
    pricePerSqft: 846,
    lastSoldPrice: 0,
    lastSoldDate: null,
    rentEstimate: 25000,
    hoaFees: 0,
    propertyTax: 55000,
    images: ["/placeholder.svg?height=200&width=300"],
    features: ["Pool", "Wine Cellar", "Home Theater", "Gym", "Guest House", "Security System", "Smart Home"],
    description: "Luxury estate with every amenity imaginable in prestigious Beverly Hills location.",
    status: "For Sale",
  },
]

export default function PropertyComparison() {
  const { user, loading } = useAuth()
  const [selectedProperties, setSelectedProperties] = useState<typeof mockFavorites>([])
  const [availableProperties] = useState(mockFavorites)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const addToComparison = (property: (typeof mockFavorites)[0]) => {
    if (selectedProperties.length < 4 && !selectedProperties.find((p) => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property])
    }
  }

  const removeFromComparison = (propertyId: number) => {
    setSelectedProperties(selectedProperties.filter((p) => p.id !== propertyId))
  }

  const clearComparison = () => {
    setSelectedProperties([])
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to compare properties.</p>
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

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Buy
              </a>
              <Link href="/sell" className="text-gray-600 hover:text-blue-600 font-medium">
                Sell
              </Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Invest
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Properties</h1>
            <p className="text-gray-600">Compare up to 4 properties side by side to make informed decisions</p>
          </div>
          {selectedProperties.length > 0 && (
            <Button variant="outline" onClick={clearComparison}>
              Clear All ({selectedProperties.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Properties Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Your Favorites
                </CardTitle>
                <p className="text-sm text-gray-600">Select properties to compare ({selectedProperties.length}/4)</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableProperties.map((property) => {
                  const isSelected = selectedProperties.find((p) => p.id === property.id)
                  const canAdd = selectedProperties.length < 4

                  return (
                    <div
                      key={property.id}
                      className={`p-3 border rounded-lg ${
                        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.address}
                          width={60}
                          height={45}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{formatCurrency(property.price)}</p>
                          <p className="text-xs text-gray-600 truncate">{property.address}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Bed className="h-3 w-3 mr-1" />
                            {property.bedrooms}
                            <Bath className="h-3 w-3 ml-2 mr-1" />
                            {property.bathrooms}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        {isSelected ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromComparison(property.id)}
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToComparison(property)}
                            disabled={!canAdd}
                            className="w-full"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {canAdd ? "Compare" : "Max 4"}
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-3">
            {selectedProperties.length === 0 ? (
              <Card>
                <CardContent className="text-center p-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Comparing Properties</h3>
                  <p className="text-gray-600 mb-6">
                    Select properties from your favorites to see a detailed side-by-side comparison
                  </p>
                  <p className="text-sm text-gray-500">You can compare up to 4 properties at once</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <td className="p-4 font-medium text-gray-900 w-48">Property Details</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 min-w-64">
                              <div className="space-y-3">
                                <div className="relative">
                                  <Image
                                    src={property.images[0] || "/placeholder.svg"}
                                    alt={property.address}
                                    width={240}
                                    height={160}
                                    className="w-full h-32 object-cover rounded"
                                  />
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeFromComparison(property.id)}
                                    className="absolute top-2 right-2 h-6 w-6 bg-white/90"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-blue-600">
                                    {formatCurrency(property.price)}
                                  </div>
                                  <div className="text-sm text-gray-600 line-clamp-2">{property.address}</div>
                                </div>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Basic Information */}
                        <tr className="border-b bg-gray-50">
                          <td className="p-4 font-medium text-gray-900" colSpan={selectedProperties.length + 1}>
                            Basic Information
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Property Type</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              <Badge variant="outline">{property.propertyType}</Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Status</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              <Badge className="bg-green-100 text-green-800">{property.status}</Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Days on Market</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              {property.daysOnMarket} days
                            </td>
                          ))}
                        </tr>

                        {/* Property Specifications */}
                        <tr className="border-b bg-gray-50">
                          <td className="p-4 font-medium text-gray-900" colSpan={selectedProperties.length + 1}>
                            Property Specifications
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-2" />
                              Bedrooms
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              {property.bedrooms}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-2" />
                              Bathrooms
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              {property.bathrooms}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <Square className="h-4 w-4 mr-2" />
                              Square Feet
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              {property.sqft.toLocaleString()} sq ft
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <Ruler className="h-4 w-4 mr-2" />
                              Lot Size
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              {property.lotSize}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <Car className="h-4 w-4 mr-2" />
                              Garage
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              {property.garage} spaces
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Year Built
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              {property.yearBuilt}
                            </td>
                          ))}
                        </tr>

                        {/* Financial Information */}
                        <tr className="border-b bg-gray-50">
                          <td className="p-4 font-medium text-gray-900" colSpan={selectedProperties.length + 1}>
                            Financial Information
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2" />
                              Price per Sq Ft
                            </div>
                          </td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4 font-medium">
                              ${property.pricePerSqft}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Last Sold Price</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              {property.lastSoldPrice ? formatCurrency(property.lastSoldPrice) : "N/A"}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Last Sold Date</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              {formatDate(property.lastSoldDate)}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Rent Estimate</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              {formatCurrency(property.rentEstimate)}/month
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">HOA Fees</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              {property.hoaFees ? `${formatCurrency(property.hoaFees)}/month` : "None"}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Property Tax (Annual)</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              {formatCurrency(property.propertyTax)}
                            </td>
                          ))}
                        </tr>

                        {/* Features */}
                        <tr className="border-b bg-gray-50">
                          <td className="p-4 font-medium text-gray-900" colSpan={selectedProperties.length + 1}>
                            Features & Amenities
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4 text-gray-600">Key Features</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              <div className="space-y-1">
                                {property.features.slice(0, 5).map((feature, index) => (
                                  <div key={index} className="flex items-center text-sm">
                                    <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                                    {feature}
                                  </div>
                                ))}
                                {property.features.length > 5 && (
                                  <div className="text-xs text-gray-500">
                                    +{property.features.length - 5} more features
                                  </div>
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>

                        {/* Actions */}
                        <tr>
                          <td className="p-4 text-gray-600">Actions</td>
                          {selectedProperties.map((property) => (
                            <td key={property.id} className="p-4">
                              <div className="space-y-2">
                                <Link href={`/property/${property.id}`}>
                                  <Button variant="outline" size="sm" className="w-full">
                                    <Eye className="h-3 w-3 mr-1" />
                                    View Details
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="w-full">
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  Contact Agent
                                </Button>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
