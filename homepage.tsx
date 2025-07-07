"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Home,
  Building,
  Heart,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Award,
  Menu,
  X,
} from "lucide-react"

export default function Homepage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuredProperties = [
    {
      id: 1,
      title: "Oceanfront Modern Estate",
      price: 3250000,
      address: "Malibu, CA",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4200,
      image: "/placeholder.svg?height=400&width=600",
      status: "New Listing",
      badge: "Luxury",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Urban Loft Downtown",
      price: 1450000,
      address: "Los Angeles, CA",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      image: "/placeholder.svg?height=400&width=600",
      status: "Hot Deal",
      badge: "Trending",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Family Suburban Home",
      price: 925000,
      address: "Pasadena, CA",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2600,
      image: "/placeholder.svg?height=400&width=600",
      status: "Price Drop",
      badge: "Family",
      rating: 4.7,
    },
  ]

  const propertyTypes = [
    {
      title: "Luxury Homes",
      count: "450+",
      image: "/placeholder.svg?height=250&width=350",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Modern Condos",
      count: "680+",
      image: "/placeholder.svg?height=250&width=350",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Investment Properties",
      count: "290+",
      image: "/placeholder.svg?height=250&width=350",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Commercial Spaces",
      count: "125+",
      image: "/placeholder.svg?height=250&width=350",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const services = [
    {
      icon: Home,
      title: "Property Search",
      description: "AI-powered search to find your perfect match",
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Real-time market data and investment insights",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "End-to-end security for all your transactions",
      color: "bg-purple-500",
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description: "Award-winning agents at your service",
      color: "bg-orange-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "First-time Buyer",
      content: "Found my dream home in just 2 weeks! The team was incredible.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Rodriguez",
      role: "Property Investor",
      content: "Best ROI I've seen. Their market analysis is spot-on.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Johnson",
      role: "Home Seller",
      content: "Sold 20% above asking price. Couldn't be happier!",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EstateHub
                </span>
                <div className="text-xs text-muted-foreground">Premium Realty</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-blue-600 font-medium transition-colors">
                Properties
              </a>
              <a href="#" className="text-foreground hover:text-blue-600 font-medium transition-colors">
                Services
              </a>
              <a href="#" className="text-foreground hover:text-blue-600 font-medium transition-colors">
                Invest
              </a>
              <a href="#" className="text-foreground hover:text-blue-600 font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-foreground hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" className="font-medium">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-foreground hover:text-blue-600 font-medium">
                  Properties
                </a>
                <a href="#" className="text-foreground hover:text-blue-600 font-medium">
                  Services
                </a>
                <a href="#" className="text-foreground hover:text-blue-600 font-medium">
                  Invest
                </a>
                <a href="#" className="text-foreground hover:text-blue-600 font-medium">
                  About
                </a>
                <a href="#" className="text-foreground hover:text-blue-600 font-medium">
                  Contact
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost">Sign In</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Get Started</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm">Rated #1 Real Estate Platform 2024</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Dream Home
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Awaits Discovery
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
              Experience the future of real estate with AI-powered search, virtual tours, and expert guidance
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-5xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <Input
                        placeholder="City, neighborhood, or ZIP"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-750k">Under $750K</SelectItem>
                          <SelectItem value="750k-1.5m">$750K - $1.5M</SelectItem>
                          <SelectItem value="1.5m-3m">$1.5M - $3M</SelectItem>
                          <SelectItem value="3m+">$3M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button
                        size="lg"
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Explore
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Cards */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "$2.5B+", label: "Properties Sold", icon: TrendingUp },
              { number: "15K+", label: "Happy Clients", icon: Heart },
              { number: "99.2%", label: "Success Rate", icon: Award },
              { number: "24/7", label: "Support", icon: Shield },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties with Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Featured Properties</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Handpicked Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of premium properties, each offering unique value and exceptional quality
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Card
                key={property.id}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-green-500 hover:bg-green-500">{property.status}</Badge>
                    <Badge variant="secondary">{property.badge}</Badge>
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    {property.rating}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    ${property.price.toLocaleString()}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{property.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{property.sqft.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Explore All Properties
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Property Types with Gradient Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Property Categories</h2>
            <p className="text-xl text-muted-foreground">Explore diverse real estate opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, index) => (
              <Card
                key={index}
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className={`relative h-40 bg-gradient-to-br ${type.gradient} p-6 text-white`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold mb-2">{type.count}</div>
                    <div className="text-sm opacity-90">Available Now</div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Building className="h-8 w-8" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">{type.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services with Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose EstateHub</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience next-generation real estate services powered by technology and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground">Real experiences from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied clients who found their perfect property with EstateHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Phone className="h-5 w-5 mr-2" />
              Call (555) 123-4567
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600"
            >
              <Mail className="h-5 w-5 mr-2" />
              Free Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">EstateHub</span>
                  <div className="text-sm text-gray-400">Premium Realty</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing real estate with cutting-edge technology and personalized service. Your dream property
                is just a click away.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Facebook className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Twitter className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Instagram className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Linkedin className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Explore</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Buy Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sell Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Luxury Homes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Investment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Market Insights
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-3 text-gray-400">
                <p>2024 Innovation Drive</p>
                <p>Los Angeles, CA 90210</p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@estatehub.com
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EstateHub. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
