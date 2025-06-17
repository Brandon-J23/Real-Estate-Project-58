import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Bed, Bath, Square, Home, TrendingUp, Users, Phone, Mail, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RealEstateHomepage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">PrimeRealty</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/buy" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Buy
              </Link>
              <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sell
              </Link>
              <Link href="/invest" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Invest
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Find Your Perfect Home</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover exceptional properties with PrimeRealty. Whether you're buying, selling, or investing, we're here
              to make your real estate journey seamless and successful.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Enter location, property type, or keyword..." className="pl-10 h-12 text-lg" />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg">Search Properties</Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
                  New York
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
                  Los Angeles
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
                  Chicago
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">
                  Miami
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600">Properties Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">5K+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Property Type</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of properties to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Single Family Homes", count: "2,847", image: "/placeholder.svg?height=200&width=300" },
              { name: "Condominiums", count: "1,923", image: "/placeholder.svg?height=200&width=300" },
              { name: "Townhouses", count: "856", image: "/placeholder.svg?height=200&width=300" },
              { name: "Investment Properties", count: "1,234", image: "/placeholder.svg?height=200&width=300" },
            ].map((category, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
              <p className="text-xl text-gray-600">Handpicked properties that offer exceptional value and quality</p>
            </div>
            <Button variant="outline" className="hidden md:inline-flex">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                price: "$750,000",
                address: "123 Oak Street, Beverly Hills, CA",
                beds: 4,
                baths: 3,
                sqft: "2,400",
                image: "/placeholder.svg?height=250&width=400",
                featured: true,
              },
              {
                id: 2,
                price: "$525,000",
                address: "456 Pine Avenue, Santa Monica, CA",
                beds: 3,
                baths: 2,
                sqft: "1,800",
                image: "/placeholder.svg?height=250&width=400",
                featured: false,
              },
              {
                id: 3,
                price: "$1,200,000",
                address: "789 Sunset Boulevard, Hollywood, CA",
                beds: 5,
                baths: 4,
                sqft: "3,200",
                image: "/placeholder.svg?height=250&width=400",
                featured: true,
              },
            ].map((property) => (
              <Card key={property.id} className="group cursor-pointer hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={`Property at ${property.address}`}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {property.featured && <Badge className="absolute top-4 left-4 bg-blue-600">Featured</Badge>}
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="opacity-90">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{property.price}</div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.address}</span>
                    </div>
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
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Buy a Home</CardTitle>
                <p className="text-gray-600">
                  Find your dream home with our extensive listings and expert guidance throughout the buying process.
                </p>
                <Button variant="outline" className="mt-4">
                  Start Buying
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Sell Your Property</CardTitle>
                <p className="text-gray-600">
                  Get the best value for your property with our proven marketing strategies and negotiation expertise.
                </p>
                <Button variant="outline" className="mt-4">
                  Start Selling
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Investment Opportunities</CardTitle>
                <p className="text-gray-600">
                  Discover lucrative investment properties and build your real estate portfolio with our expert advice.
                </p>
                <Button variant="outline" className="mt-4">
                  Explore Investments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Make Your Move?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have found their perfect property with PrimeRealty. Let's make your
            real estate dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 border-2 border-white"
            >
              Browse Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">PrimeRealty</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner in real estate. Making property dreams come true since 2008.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/buy" className="hover:text-white transition-colors">
                    Buy Property
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="hover:text-white transition-colors">
                    Sell Property
                  </Link>
                </li>
                <li>
                  <Link href="/invest" className="hover:text-white transition-colors">
                    Investment
                  </Link>
                </li>
                <li>
                  <Link href="/mortgage" className="hover:text-white transition-colors">
                    Mortgage
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/agents" className="hover:text-white transition-colors">
                    Our Agents
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@primerealty.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>123 Business Ave, Suite 100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PrimeRealty. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
