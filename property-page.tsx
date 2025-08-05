"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Home,
  Heart,
  Bed,
  Bath,
  Square,
  MapPin,
  TrendingUp,
  Star,
  Users,
  Award,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"
import { GuidedTour, TourTrigger } from "./components/guided-tour"

// Mock property data
const featuredProperties = [
  {
    id: 1,
    address: "1234 Oceanview Drive, Malibu, CA",
    price: 2850000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    image: "/placeholder.svg?height=200&width=300",
    type: "Single Family Home",
    status: "For Sale",
    daysOnMarket: 12,
  },
  {
    id: 2,
    address: "456 Pine Street, Beverly Hills, CA",
    price: 1750000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    image: "/placeholder.svg?height=200&width=300",
    type: "Condominium",
    status: "For Sale",
    daysOnMarket: 45,
  },
  {
    id: 3,
    address: "789 Sunset Blvd, West Hollywood, CA",
    price: 1250000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=200&width=300",
    type: "Townhouse",
    status: "For Sale",
    daysOnMarket: 8,
  },
]

const quickSearchLocations = [
  "Beverly Hills, CA",
  "Santa Monica, CA",
  "Malibu, CA",
  "Hollywood, CA",
  "Pasadena, CA",
  "Manhattan Beach, CA",
]

export default function PropertyPage() {
  const { user, loading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showTour, setShowTour] = useState(false)

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
    // Navigate to search results
    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`
  }

  const handleQuickSearch = (location: string) => {
    setSearchQuery(location)
    window.location.href = `/search?q=${encodeURIComponent(location)}`
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Check if user is new and should see tour
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("primeRealty_hasSeenTour")
    if (!hasSeenTour && !loading) {
      // Show tour after a short delay
      setTimeout(() => {
        setShowTour(true)
      }, 1000)
    }
  }, [loading])

  const handleTourComplete = () => {
    setShowTour(false)
    localStorage.setItem("primeRealty_hasSeenTour", "true")
  }

  const startTour = () => {
    setShowTour(true)
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

  return (
    <div className="min-h-screen bg-background">
      {/* Guided Tour */}
      <GuidedTour isOpen={showTour} onClose={handleTourComplete} />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PrimeRealty</span>
            </Link>

            <nav id="main-nav" className="hidden md:flex items-center space-x-8">
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

            <div id="auth-buttons" className="flex items-center space-x-3">
              {user ? (
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

      {/* Hero Section */}
      <section id="hero-section" className="bg-gradient-to-b from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-blue-600"> Home</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover premium properties in California's most desirable locations. Search, compare, and connect with
              trusted agents.
            </p>

            {/* Search Bar */}
            <div id="search-bar" className="max-w-2xl mx-auto mb-8 relative">
              <div className="flex">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Search by location, address, or property type..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="h-14 text-lg pr-12 rounded-r-none border-r-0"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                  )}
                </div>
                <Button onClick={handleSearch} className="h-14 px-8 rounded-l-none bg-blue-600 hover:bg-blue-700">
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              {/* Live Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-64 overflow-y-auto">
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

            {/* Quick Search Buttons */}
            <div id="quick-search-buttons" className="flex flex-wrap justify-center gap-3 mb-8">
              {quickSearchLocations.map((location) => (
                <Button
                  key={location}
                  variant="outline"
                  onClick={() => handleQuickSearch(location)}
                  className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                >
                  {location}
                </Button>
              ))}
            </div>

            {/* Tour Trigger */}
            <div className="mb-8">
              <TourTrigger onStart={startTour} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Properties Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Expert Agents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Benefits Banner */}
      {!user && (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Unlock Premium Features</h2>
              <p className="text-xl text-blue-100 mb-6">
                Create a free account to compare properties, save favorites, and access exclusive listings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    Sign Up Free
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={startTour}
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Take a Tour
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover handpicked premium properties in California's most sought-after neighborhoods
            </p>
          </div>

          <div id="property-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.address}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-100 text-green-800">{property.status}</Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        if (!user) {
                          window.location.href = "/sign-up"
                        }
                      }}
                    >
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

                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
              >
                View All Properties
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PrimeRealty?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the tools and expertise you need to make informed real estate decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600 text-sm">
                Advanced search with live suggestions and intelligent filtering to find exactly what you're looking for.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Property Comparison</h3>
              <p className="text-gray-600 text-sm">
                Compare up to 4 properties side-by-side with detailed metrics and analysis tools.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Agents</h3>
              <p className="text-gray-600 text-sm">
                Connect with experienced local agents who know the market and can guide your journey.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Listings</h3>
              <p className="text-gray-600 text-sm">
                Access exclusive properties and get first access to new listings in your preferred areas.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600 text-sm">
                Save properties you love and get notifications when similar properties become available.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
              <p className="text-gray-600 text-sm">
                Get detailed market analysis, price trends, and neighborhood insights to make informed decisions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied clients who found their perfect property with PrimeRealty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start Searching
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              {!user && (
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Create Free Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
