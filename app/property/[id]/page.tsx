import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Heart,
  Share2,
  Phone,
  Mail,
  Play,
  Camera,
  Star,
  Home,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock property data - in a real app, this would come from your database
const getPropertyData = (id: string) => {
  return {
    id,
    price: "$750,000",
    address: "123 Oak Street",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90210",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    lotSize: "0.25 acres",
    yearBuilt: "2018",
    garage: 2,
    propertyType: "Single Family Home",
    status: "For Sale",
    daysOnMarket: 15,
    mlsNumber: "MLS123456",
    description:
      "Welcome to this stunning modern home in the heart of Beverly Hills. This beautifully designed 4-bedroom, 3-bathroom residence offers the perfect blend of luxury and comfort. The open-concept living space features high ceilings, premium finishes, and an abundance of natural light throughout. The gourmet kitchen boasts top-of-the-line appliances, quartz countertops, and a large island perfect for entertaining. The master suite includes a walk-in closet and spa-like bathroom with dual vanities and a soaking tub. Additional highlights include a private backyard oasis with mature landscaping, a two-car garage, and proximity to top-rated schools and shopping.",
    features: [
      "Open concept floor plan",
      "Gourmet kitchen with island",
      "Master suite with walk-in closet",
      "Private backyard with landscaping",
      "Two-car attached garage",
      "High ceilings throughout",
      "Premium hardwood floors",
      "Energy-efficient appliances",
      "Central air conditioning",
      "Security system",
      "Sprinkler system",
      "Close to schools and shopping",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    agent: {
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      phone: "(555) 123-4567",
      email: "sarah@primerealty.com",
      image: "/placeholder.svg?height=150&width=150",
      rating: 4.9,
      reviews: 127,
      yearsExperience: 8,
    },
    monthlyPayment: "$3,200",
    propertyTax: "$625/month",
    insurance: "$150/month",
    hoaFees: "N/A",
  }
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyData(params.id)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">PrimeRealty</span>
              </Link>
              <div className="hidden md:flex items-center text-gray-500">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <Link href="/" className="hover:text-blue-600">
                  Back to Search
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Property Images Gallery */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-96 md:h-[500px]">
          {/* Main Image */}
          <div className="md:col-span-2 relative group cursor-pointer">
            <Image
              src={property.images[0] || "/placeholder.svg"}
              alt="Main property image"
              fill
              className="object-cover rounded-l-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-l-lg" />
            <Button className="absolute bottom-4 left-4 bg-white text-gray-900 hover:bg-gray-100" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Virtual Tour
            </Button>
          </div>

          {/* Thumbnail Grid */}
          <div className="hidden md:block md:col-span-2">
            <div className="grid grid-cols-2 gap-2 h-full">
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Property image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Button variant="secondary">
                        <Camera className="h-4 w-4 mr-2" />
                        View All {property.images.length} Photos
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{property.price}</div>
                <Badge className="bg-green-100 text-green-800">{property.status}</Badge>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.beds} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.baths} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.sqft} Sq Ft</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.garage} Car Garage</span>
                </div>
              </div>
            </div>

            {/* Property Description */}
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-4">About This Property</CardTitle>
                <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Property Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Type:</span>
                        <span>{property.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year Built:</span>
                        <span>{property.yearBuilt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lot Size:</span>
                        <span>{property.lotSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">MLS Number:</span>
                        <span>{property.mlsNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days on Market:</span>
                        <span>{property.daysOnMarket} days</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Monthly Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Monthly Payment:</span>
                        <span className="font-semibold">{property.monthlyPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property Tax:</span>
                        <span>{property.propertyTax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Insurance:</span>
                        <span>{property.insurance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">HOA Fees:</span>
                        <span>{property.hoaFees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-4">Features & Amenities</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-4">Location & Neighborhood</CardTitle>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Map integration would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Image
                    src={property.agent.image || "/placeholder.svg"}
                    alt={property.agent.name}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-xl font-semibold">{property.agent.name}</h3>
                  <p className="text-gray-600">{property.agent.title}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">
                      {property.agent.rating} ({property.agent.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{property.agent.yearsExperience} years experience</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {property.agent.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-4">Request Information</CardTitle>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Input type="tel" placeholder="Phone Number" />
                  <Textarea placeholder="I'm interested in this property. Please send me more information." rows={4} />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Mortgage Calculator */}
            <Card>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-4">Mortgage Calculator</CardTitle>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Price</label>
                    <Input defaultValue={property.price.replace("$", "").replace(",", "")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                    <Input placeholder="150,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                    <Input placeholder="6.5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
                    <Input placeholder="30" />
                  </div>
                  <Button variant="outline" className="w-full">
                    Calculate Payment
                  </Button>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Estimated Monthly Payment</p>
                    <p className="text-2xl font-bold text-blue-600">{property.monthlyPayment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 2,
                price: "$695,000",
                address: "456 Pine Avenue, Santa Monica, CA",
                beds: 3,
                baths: 2,
                sqft: "2,100",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: 3,
                price: "$825,000",
                address: "789 Elm Street, Beverly Hills, CA",
                beds: 4,
                baths: 3,
                sqft: "2,600",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                id: 4,
                price: "$720,000",
                address: "321 Maple Drive, West Hollywood, CA",
                beds: 3,
                baths: 3,
                sqft: "2,300",
                image: "/placeholder.svg?height=250&width=400",
              },
            ].map((similarProperty) => (
              <Card key={similarProperty.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={similarProperty.image || "/placeholder.svg"}
                      alt={`Property at ${similarProperty.address}`}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xl font-bold text-blue-600 mb-2">{similarProperty.price}</div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{similarProperty.address}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{similarProperty.beds} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{similarProperty.baths} baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{similarProperty.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
