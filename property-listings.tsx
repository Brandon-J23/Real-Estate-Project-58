"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Search,
  Home,
  Heart,
  Bed,
  Bath,
  Square,
  MapPin,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"
import { useSearchParams } from "next/navigation"

// Mock property data - in real app, this would come from API
const allProperties = [
  {
    id: 1,
    title: "Modern Family Home",
    price: 750000,
    address: "456 Pine Street, Beverly Hills, CA",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90210",
    beds: 4,
    baths: 3,
    sqft: 2400,
    lotSize: "0.3 acres",
    yearBuilt: 2018,
    propertyType: "single-family",
    listingType: "sale",
    daysOnMarket: 15,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=300&width=400"],
    featured: true,
    description: "Beautiful modern family home with updated kitchen and spacious backyard.",
    features: ["Swimming Pool", "Hardwood Floors", "Updated Kitchen", "Garage"],
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      company: "Luxury Properties Group",
    },
  },
  {
    id: 2,
    title: "Downtown Luxury Condo",
    price: 525000,
    address: "789 Main Avenue, Los Angeles, CA",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90015",
    beds: 2,
    baths: 2,
    sqft: 1200,
    lotSize: "N/A",
    yearBuilt: 2020,
    propertyType: "condo",
    listingType: "sale",
    daysOnMarket: 8,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=300&width=400"],
    featured: false,
    description: "Stunning downtown condo with city views and modern amenities.",
    features: ["City View", "Gym Access", "Concierge", "Balcony"],
    agent: {
      name: "Michael Chen",
      phone: "(555) 234-5678",
      company: "Premier Real Estate",
    },
  },
  {
    id: 3,
    title: "Charming Townhouse",
    price: 425000,
    address: "321 Oak Street, Pasadena, CA",
    city: "Pasadena",
    state: "CA",
    zipCode: "91101",
    beds: 3,
    baths: 2.5,
    sqft: 1800,
    lotSize: "0.1 acres",
    yearBuilt: 2015,
    propertyType: "townhouse",
    listingType: "sale",
    daysOnMarket: 22,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=300&width=400"],
    featured: false,
    description: "Charming townhouse in quiet neighborhood with great schools nearby.",
    features: ["Patio", "Fireplace", "Walk-in Closets", "Laundry Room"],
    agent: {
      name: "Emily Rodriguez",
      phone: "(555) 345-6789",
      company: "Coastal Realty",
    },
  },
  {
    id: 4,
    title: "Investment Duplex",
    price: 850000,
    address: "654 Investment Blvd, Santa Monica, CA",
    city: "Santa Monica",
    state: "CA",
    zipCode: "90401",
    beds: 6,
    baths: 4,
    sqft: 3200,
    lotSize: "0.2 acres",
    yearBuilt: 2010,
    propertyType: "multi-family",
    listingType: "sale",
    daysOnMarket: 35,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=300&width=400"],
    featured: true,
    description: "Excellent investment opportunity with two separate units.",
    features: ["Rental Income", "Separate Entrances", "Parking", "Storage"],
    agent: {
      name: "David Kim",
      phone: "(555) 456-7890",
      company: "Investment Properties Inc",
    },
  },
  {
    id: 5,
    title: "Luxury Estate",
    price: 2200000,
    address: "123 Mansion Drive, Malibu, CA",
    city: "Malibu",
    state: "CA",
    zipCode: "90265",
    beds: 6,
    baths: 5,
    sqft: 5200,
    lotSize: "1.2 acres",
    yearBuilt: 2019,
    propertyType: "single-family",
    listingType: "sale",
    daysOnMarket: 45,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=300&width=400"],
    featured: true,
    description: "Stunning luxury estate with ocean views and premium finishes.",
    features: ["Ocean View", "Wine Cellar", "Home Theater", "Guest House"],
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      company: "Luxury Properties Group",
    },
  },
  {
    id: 6,
    title: "Cozy Starter Home",
    price: 385000,
    address: "987 Elm Street, Burbank, CA",
    city: "Burbank",
    state: "CA",
    zipCode: "91501",
    beds: 2,
    baths: 1,
    sqft: 950,
    lotSize: "0.15 acres",
    yearBuilt: 1985,
    propertyType: "single-family",
    listingType: "sale",
    daysOnMarket: 12,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=300&width=400"],
    featured: false,
    description: "Perfect starter home with great potential for customization.",
    features: ["Large Yard", "Original Hardwood", "Detached Garage", "Fruit Trees"],
    agent: {
      name: "Lisa Wong",
      phone: "(555) 567-8901",
      company: "Family Homes Realty",
    },
  },
]

const propertyTypeLabels = {
  "single-family": "Single Family Homes",
  condo: "Condominiums",
  townhouse: "Townhouses",
  "multi-family": "Multi-Family Properties",
  land: "Land",
}

export default function PropertyListings() {
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState(allProperties)
  const [filteredProperties, setFilteredProperties] = useState(allProperties)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPropertyType, setSelectedPropertyType] = useState(searchParams?.get("type") || "any")
  const [priceRange, setPriceRange] = useState([0, 3000000])
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [sortBy, setSortBy] = useState("price-low")

  // Initialize filters from URL params
  useEffect(() => {
    const type = searchParams?.get("type")
    if (type) {
      setSelectedPropertyType(type)
    }
  }, [searchParams])

  // Apply filters
  useEffect(() => {
    let filtered = [...allProperties]

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.city.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Property type filter
    if (selectedPropertyType !== "any") {
      filtered = filtered.filter((property) => property.propertyType === selectedPropertyType)
    }

    // Price range filter
    filtered = filtered.filter((property) => property.price >= priceRange[0] && property.price <= priceRange[1])

    // Bedrooms filter
    if (bedrooms) {
      filtered = filtered.filter((property) => property.beds >= Number.parseInt(bedrooms))
    }

    // Bathrooms filter
    if (bathrooms) {
      filtered = filtered.filter((property) => property.baths >= Number.parseInt(bathrooms))
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return b.yearBuilt - a.yearBuilt
        case "oldest":
          return a.yearBuilt - b.yearBuilt
        case "sqft-large":
          return b.sqft - a.sqft
        case "sqft-small":
          return a.sqft - b.sqft
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }, [searchQuery, selectedPropertyType, priceRange, bedrooms, bathrooms, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedPropertyType("any")
    setPriceRange([0, 3000000])
    setBedrooms("")
    setBathrooms("")
    setSortBy("price-low")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
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
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
                Buy
              </Link>
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

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedPropertyType
              ? propertyTypeLabels[selectedPropertyType as keyof typeof propertyTypeLabels]
              : "All Properties"}
          </h1>
          <p className="text-gray-600">
            {filteredProperties.length} properties found
            {selectedPropertyType !== "any" &&
              ` in ${propertyTypeLabels[selectedPropertyType as keyof typeof propertyTypeLabels]}`}
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location, title, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="sqft-large">Largest First</SelectItem>
                  <SelectItem value="sqft-small">Smallest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters Toggle */}
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Property Type */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Property Type</Label>
                    <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Type</SelectItem>
                        <SelectItem value="single-family">Single Family</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="multi-family">Multi-Family</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000000}
                      min={0}
                      step={50000}
                      className="mt-2"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Min Bedrooms</Label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Min Bathrooms</Label>
                    <Select value={bathrooms} onValueChange={setBathrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Active Filters */}
        {(selectedPropertyType !== "any" ||
          searchQuery ||
          bedrooms ||
          bathrooms ||
          priceRange[0] > 0 ||
          priceRange[1] < 3000000) && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {selectedPropertyType !== "any" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {propertyTypeLabels[selectedPropertyType as keyof typeof propertyTypeLabels]}
                  <button
                    onClick={() => setSelectedPropertyType("any")}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-2 text-gray-500 hover:text-gray-700">
                    ×
                  </button>
                </Badge>
              )}
              {bedrooms && (
                <Badge variant="secondary" className="px-3 py-1">
                  {bedrooms}+ Bedrooms
                  <button onClick={() => setBedrooms("")} className="ml-2 text-gray-500 hover:text-gray-700">
                    ×
                  </button>
                </Badge>
              )}
              {bathrooms && (
                <Badge variant="secondary" className="px-3 py-1">
                  {bathrooms}+ Bathrooms
                  <button onClick={() => setBathrooms("")} className="ml-2 text-gray-500 hover:text-gray-700">
                    ×
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 3000000) && (
                <Badge variant="secondary" className="px-3 py-1">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  <button
                    onClick={() => setPriceRange([0, 3000000])}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Home className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
            {filteredProperties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <Card
                  className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                    <div className={`bg-gray-300 ${viewMode === "list" ? "h-full" : "h-48"}`}>
                      {/* Property image would go here */}
                    </div>
                    {property.featured && (
                      <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-600">Featured</Badge>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Handle favorite toggle
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge variant="secondary" className="absolute bottom-3 left-3">
                      {property.daysOnMarket} days on market
                    </Badge>
                  </div>
                  <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{formatPrice(property.price)}</div>
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                    {viewMode === "list" && (
                      <div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {property.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {property.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{property.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Listed by {property.agent.name}</p>
                          <p>{property.agent.company}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
