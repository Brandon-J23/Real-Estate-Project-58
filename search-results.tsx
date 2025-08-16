"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Heart, Bed, Bath, Square, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

// Mock search results including user listings
const mockSearchResults = [
  // User-created listings
  {
    id: 1,
    address: "1234 Oceanview Drive, Malibu, CA 90265",
    price: 2850000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    images: ["/placeholder.svg?height=200&width=300"],
    type: "Single Family Home",
    status: "For Sale",
    daysOnMarket: 12,
    isUserListing: true,
    ownerType: "owner",
  },
  {
    id: 2,
    address: "456 Pine Street, Beverly Hills, CA 90210",
    price: 1750000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    images: ["/placeholder.svg?height=200&width=300"],
    type: "Condominium",
    status: "For Sale",
    daysOnMarket: 45,
    isUserListing: true,
    ownerType: "agent",
  },
  // Regular listings
  {
    id: 4,
    address: "321 Beach Road, Santa Monica, CA 90401",
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4000,
    images: ["/placeholder.svg?height=200&width=300"],
    type: "Single Family Home",
    status: "For Sale",
    daysOnMarket: 8,
    isUserListing: false,
  },
  {
    id: 5,
    address: "654 Mountain View, Pasadena, CA 91101",
    price: 1250000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    images: ["/placeholder.svg?height=200&width=300"],
    type: "Single Family Home",
    status: "For Sale",
    daysOnMarket: 15,
    isUserListing: false,
  },
  {
    id: 6,
    address: "987 Valley Drive, Burbank, CA 91501",
    price: 875000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    images: ["/placeholder.svg?height=200&width=300"],
    type: "Townhouse",
    status: "For Sale",
    daysOnMarket: 22,
    isUserListing: false,
  },
]

export default function SearchResults() {
  const { user, loading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("All Types")
  const [priceRange, setPriceRange] = useState("Any Price")
  const [sortBy, setSortBy] = useState("Newest First")
  const [showFilters, setShowFilters] = useState(false)
  const [results, setResults] = useState(mockSearchResults)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Mock search data for live suggestions
  const mockSearchData = [
    "Beverly Hills, CA",
    "Santa Monica, CA",
    "Malibu, CA",
    "Hollywood, CA",
    "Pasadena, CA",
    "Manhattan Beach, CA",
    "Venice, CA",
    "West Hollywood, CA",
    "Brentwood, CA",
    "Pacific Palisades, CA",
    "Single Family Home",
    "Condominium",
    "Townhouse",
    "Luxury Properties",
    "Oceanview Properties",
    "Mountain View Properties",
    "New Construction",
    "Investment Properties",
  ]

  // Live search function
  const performLiveSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsSearching(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const filtered = mockSearchData.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 6)

    setSearchSuggestions(filtered)
    setShowSuggestions(true)
    setIsSearching(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    performLiveSearch(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  const handleInputFocus = () => {
    if (searchQuery.trim()) {
      performLiveSearch(searchQuery)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200)
  }

  // Add useEffect to handle URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const queryParam = urlParams.get("q")
      const typeParam = urlParams.get("type")
      const priceParam = urlParams.get("price")

      if (queryParam) {
        setSearchQuery(queryParam)
      }
      if (typeParam) {
        setPropertyType(typeParam)
      }
      if (priceParam) {
        setPriceRange(priceParam)
      }
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleSearch = () => {
    // In a real app, this would make an API call
    let filteredResults = mockSearchResults

    if (searchQuery) {
      filteredResults = filteredResults.filter((property) =>
        property.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (propertyType !== "All Types") {
      filteredResults = filteredResults.filter((property) => property.type === propertyType)
    }

    if (priceRange !== "Any Price") {
      const [min, max] = priceRange.split("-").map((p) => Number.parseInt(p.replace(/[^\d]/g, "")))
      filteredResults = filteredResults.filter((property) => {
        if (max) {
          return property.price >= min && property.price <= max
        }
        return property.price >= min
      })
    }

    // Sort results
    switch (sortBy) {
      case "Price: Low to High":
        filteredResults.sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        filteredResults.sort((a, b) => b.price - a.price)
        break
      case "Newest First":
        filteredResults.sort((a, b) => a.daysOnMarket - b.daysOnMarket)
        break
      case "Oldest First":
        filteredResults.sort((a, b) => b.daysOnMarket - a.daysOnMarket)
        break
    }

    setResults(filteredResults)
  }

  useEffect(() => {
    handleSearch()
  }, [searchQuery, propertyType, priceRange, sortBy])

  // Update the search header to show filtered results info
  const getResultsDescription = () => {
    let description = `${results.length} properties found`

    if (searchQuery) {
      description += ` for "${searchQuery}"`
    }

    if (propertyType !== "All Types") {
      description += ` in ${propertyType}`
    }

    if (priceRange !== "Any Price") {
      description += ` in ${priceRange} price range`
    }

    return description
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
              <a href="#" className="text-blue-600 font-medium">
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
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Search Results</h1>
          <p className="text-gray-600">{getResultsDescription()}</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2 relative">
                <Input
                  placeholder="Search by location, address, or keyword..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="h-12 pr-10"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}

                {/* Live Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Types">All Types</SelectItem>
                    <SelectItem value="Single Family Home">Single Family Home</SelectItem>
                    <SelectItem value="Condominium">Condominium</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any Price">Any Price</SelectItem>
                    <SelectItem value="0-750000">Under $750K</SelectItem>
                    <SelectItem value="750000-1500000">$750K - $1.5M</SelectItem>
                    <SelectItem value="1500000-3000000">$1.5M - $3M</SelectItem>
                    <SelectItem value="3000000-999999999">$3M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Newest First">Newest First</SelectItem>
                    <SelectItem value="Oldest First">Oldest First</SelectItem>
                    <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
                    <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {results.map((property) => (
            <Link key={property.id} href={`/property/${property.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.address}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-green-100 text-green-800">{property.status}</Badge>
                    {property.isUserListing && <Badge className="bg-blue-100 text-blue-800">Your Listing</Badge>}
                  </div>
                  <Button variant="outline" size="icon" className="absolute top-3 right-3 bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {property.daysOnMarket} days on market
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(property.price)}</div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                    {property.isUserListing && (
                      <Badge variant="outline" className="text-xs ml-2">
                        Contact: {property.ownerType === "owner" ? "Owner" : "Agent"}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <Card>
            <CardContent className="text-center p-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties</p>
              <Button onClick={() => setResults(mockSearchResults)} variant="outline">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
