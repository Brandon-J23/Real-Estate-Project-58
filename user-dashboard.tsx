"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Home,
  ArrowLeft,
  Plus,
  Edit,
  Eye,
  MoreVertical,
  Trash2,
  Heart,
  MessageCircle,
  Bed,
  Bath,
  Square,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

// Mock user listings data - in real app, this would come from API
const mockUserListings = [
  {
    id: 1,
    address: "1234 Oceanview Drive, Malibu, CA 90265",
    price: 2850000,
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    status: "Active",
    daysOnMarket: 12,
    views: 245,
    inquiries: 8,
    favorites: 15,
    images: ["/placeholder.svg?height=200&width=300"],
    createdAt: "2024-01-15",
    type: "Single Family Home",
    contactType: "owner",
  },
  {
    id: 2,
    address: "456 Pine Street, Beverly Hills, CA 90210",
    price: 1750000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2400,
    status: "Pending",
    daysOnMarket: 45,
    views: 189,
    inquiries: 12,
    favorites: 23,
    images: ["/placeholder.svg?height=200&width=300"],
    createdAt: "2023-12-01",
    type: "Condominium",
    contactType: "agent",
  },
  {
    id: 3,
    address: "789 Sunset Boulevard, Hollywood, CA 90028",
    price: 950000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    status: "Sold",
    daysOnMarket: 23,
    views: 156,
    inquiries: 6,
    favorites: 9,
    images: ["/placeholder.svg?height=200&width=300"],
    createdAt: "2023-11-15",
    type: "Townhouse",
    contactType: "owner",
    soldDate: "2024-01-08",
    soldPrice: 975000,
  },
]

const mockFavorites = [
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
  },
]

export default function UserDashboard() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("listings")

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
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Sold":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to view your dashboard.</p>
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const activeListings = mockUserListings.filter((listing) => listing.status === "Active")
  const totalViews = mockUserListings.reduce((sum, listing) => sum + listing.views, 0)
  const totalInquiries = mockUserListings.reduce((sum, listing) => sum + listing.inquiries, 0)

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
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your property listings and track performance</p>
          </div>
          <Link href="/sell">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Listing
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-blue-600">{activeListings.length}</p>
                </div>
                <Home className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-green-600">{totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold text-purple-600">{totalInquiries}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockUserListings.reduce((sum, listing) => sum + listing.favorites, 0)}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockUserListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={listing.images[0] || "/placeholder.svg"}
                      alt={listing.address}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-3 left-3 ${getStatusColor(listing.status)}`}>
                      {listing.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="absolute top-3 right-3 bg-white/90">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(listing.price)}</div>
                    {listing.status === "Sold" && listing.soldPrice && (
                      <div className="text-sm text-green-600 mb-2">
                        Sold for {formatCurrency(listing.soldPrice)} on {formatDate(listing.soldDate!)}
                      </div>
                    )}
                    <p className="text-gray-600 mb-4 line-clamp-2">{listing.address}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{listing.bedrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{listing.bathrooms}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{listing.sqft.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold text-blue-600">{listing.views}</div>
                        <div className="text-gray-600">Views</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">{listing.inquiries}</div>
                        <div className="text-gray-600">Inquiries</div>
                      </div>
                      <div>
                        <div className="font-semibold text-red-600">{listing.favorites}</div>
                        <div className="text-gray-600">Favorites</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Listed: {formatDate(listing.createdAt)}</span>
                        <span>{listing.daysOnMarket} days on market</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockUserListings.length === 0 && (
              <Card>
                <CardContent className="text-center p-12">
                  <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-6">Create your first property listing to get started</p>
                  <Link href="/sell">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Listing
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Favorite Properties</h3>
                <p className="text-gray-600">Properties you've saved for later</p>
              </div>
              {mockFavorites.length > 1 && (
                <Link href="/compare">
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Compare Properties
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockFavorites.map((property) => (
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
                      <Button variant="outline" size="icon" className="absolute top-3 right-3 bg-white/90">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(property.price)}</div>
                      <p className="text-gray-600 mb-4">{property.address}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
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
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {mockFavorites.length === 0 && (
              <Card>
                <CardContent className="text-center p-12">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-6">Start browsing properties and save your favorites</p>
                  <Link href="/search">
                    <Button className="bg-blue-600 hover:bg-blue-700">Browse Properties</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Days on Market</span>
                      <span className="font-semibold">
                        {Math.round(
                          mockUserListings.reduce((sum, listing) => sum + listing.daysOnMarket, 0) /
                            mockUserListings.length,
                        )}{" "}
                        days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Property Value</span>
                      <span className="font-semibold">
                        {formatCurrency(mockUserListings.reduce((sum, listing) => sum + listing.price, 0))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Inquiry Rate</span>
                      <span className="font-semibold">{((totalInquiries / totalViews) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New inquiry on Oceanview Drive</span>
                      <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Property favorited by 3 users</span>
                      <span className="text-xs text-gray-500 ml-auto">5h ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Listing viewed 15 times today</span>
                      <span className="text-xs text-gray-500 ml-auto">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
