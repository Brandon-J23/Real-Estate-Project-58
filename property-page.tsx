"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Home, TrendingUp, Users, Phone, Mail, Heart, Bed, Bath, Square } from "lucide-react"
import Link from "next/link"

export default function PropertyPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const quickLocations = ["New York", "Los Angeles", "Chicago", "Miami"]

  const stats = [
    { number: "10K+", label: "Properties Listed" },
    { number: "5K+", label: "Happy Clients" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" },
  ]

  const propertyTypes = [
    { title: "Single Family Homes", count: "2,847 available" },
    { title: "Condominiums", count: "1,205 available" },
    { title: "Townhouses", count: "892 available" },
    { title: "Investment Properties", count: "1,234 available" },
  ]

  const featuredProperties = [
    {
      id: 1,
      price: 750000,
      address: "456 Pine Street, Beverly Hills, CA",
      beds: 4,
      baths: 3,
      sqft: 2400,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      id: 2,
      price: 525000,
      address: "456 Pine Avenue, Santa Monica, CA",
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
    },
    {
      id: 3,
      price: 1200000,
      address: "789 Sunset Boulevard, Hollywood, CA",
      beds: 5,
      baths: 4,
      sqft: 3200,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
  ]

  const services = [
    {
      icon: Home,
      title: "Buy a Home",
      description:
        "Find your dream home with our extensive listings and expert guidance throughout the buying process.",
      buttonText: "Start Buying",
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Sell Your Property",
      description:
        "Get the best value for your property with our proven marketing strategies and negotiation expertise.",
      buttonText: "Start Selling",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Investment Opportunities",
      description:
        "Discover lucrative investment properties and build your real estate portfolio with our expert advice.",
      buttonText: "Explore Investments",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PrimeRealty</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-blue-600 font-medium">
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

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-gray-600">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Find Your Perfect Home</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover exceptional properties with PrimeRealty. Whether you're buying, selling, or investing, we're here
            to make your real estate journey seamless and successful.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="flex">
              <Input
                placeholder="Enter location, property type, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 text-base rounded-r-none border-r-0"
              />
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 rounded-l-none">
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Quick Location Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {quickLocations.map((location) => (
              <Button key={location} variant="outline" size="sm" className="text-gray-600">
                {location}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Property Type */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Property Type</h2>
            <p className="text-gray-600">
              Explore our diverse range of properties to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-32 bg-gray-400"></div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Handpicked properties that offer exceptional value and quality</p>
            </div>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              View All Properties →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gray-300"></div>
                  {property.featured && (
                    <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-600">Featured</Badge>
                  )}
                  <Button variant="outline" size="icon" className="absolute top-3 right-3 bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">${property.price.toLocaleString()}</div>
                  <p className="text-gray-600 mb-4">{property.address}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600">Comprehensive real estate services tailored to your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    {service.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Move?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have found their perfect property with PrimeRealty. Let's make your
            real estate dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Browse Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">PrimeRealty</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner in real estate. Making property dreams come true since 2008.
              </p>
              <p className="text-gray-400">
                <Phone className="h-4 w-4 inline mr-2" />
                (555) 123-4567
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Buy Property
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sell Property
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Investment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Mortgage
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Our Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>
                  <Mail className="h-4 w-4 inline mr-2" />
                  info@primerealty.com
                </p>
                <p>
                  <Phone className="h-4 w-4 inline mr-2" />
                  (555) 123-4567
                </p>
                <p>123 Business Ave, Suite 100</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PrimeRealty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
