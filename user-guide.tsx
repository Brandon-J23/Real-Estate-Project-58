"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  ArrowLeft,
  Search,
  Heart,
  User,
  TrendingUp,
  Plus,
  Settings,
  Star,
  ArrowRight,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

const keyFeatures = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Type to get instant suggestions for locations and property types",
    highlight: false,
    action: "Try searching for 'Beverly Hills' or 'Condo'",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description: "Click the heart icon on any property to save it for later",
    highlight: false,
    action: "Browse properties and save your favorites",
  },
  {
    icon: TrendingUp,
    title: "Compare Properties",
    description: "Compare up to 4 properties side-by-side with detailed metrics",
    highlight: true,
    action: "Sign up to unlock this premium feature",
    requiresAccount: true,
  },
  {
    icon: Plus,
    title: "List Your Property",
    description: "Create professional listings with photos and detailed information",
    highlight: false,
    action: "Click 'Sell' to create your first listing",
    requiresAccount: true,
  },
  {
    icon: Settings,
    title: "Personal Dashboard",
    description: "Track your listings, manage favorites, and view analytics",
    highlight: false,
    action: "Access from your profile menu after signing up",
    requiresAccount: true,
  },
]

const quickTips = [
  "Use the search bar for instant property suggestions",
  "Save properties to favorites to compare them later",
  "Create an account to unlock property comparison",
  "List your property for free with our easy wizard",
  "Track performance with detailed analytics",
]

export default function UserGuide() {
  const { user, loading } = useAuth()

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

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Start Guide</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get up to speed with PrimeRealty's key features in just a few minutes
          </p>
        </div>

        {/* Account Benefits Highlight */}
        {!user && (
          <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Unlock Premium Features</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Create a free account to access property comparison, save favorites, create listings, and track
                  analytics
                </p>
                <Link href="/sign-up">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Sign Up Free - It Takes 30 Seconds
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className={`relative ${feature.highlight ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}>
                {feature.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Premium Feature
                    </span>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      feature.highlight ? "bg-blue-600" : "bg-gray-100"
                    }`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.highlight ? "text-white" : "text-gray-600"}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

                  {feature.requiresAccount && !user ? (
                    <div className="space-y-2">
                      <p className="text-xs text-orange-600 font-medium">Account Required</p>
                      <Link href="/sign-up">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 bg-transparent">
                          Sign Up to Access
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-xs text-blue-600 font-medium">{feature.action}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Tips</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <p className="text-gray-700 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Comparison Spotlight */}
        <Card className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Property Comparison</h3>
                  <p className="text-gray-600">
                    Compare up to 4 properties side-by-side with detailed metrics and analysis
                  </p>
                  {!user && (
                    <p className="text-sm text-purple-600 font-medium mt-1">Sign up required to access this feature</p>
                  )}
                </div>
              </div>
              {!user ? (
                <Link href="/sign-up">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Sign Up to Compare
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse & Search</h3>
              <p className="text-gray-600 text-sm">
                Use our smart search to find properties by location, type, or keywords
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save & Compare</h3>
              <p className="text-gray-600 text-sm">Save favorites and compare properties (requires free account)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect & Buy</h3>
              <p className="text-gray-600 text-sm">Contact property owners or agents directly through the platform</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6">Join thousands of users finding their perfect property</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user ? (
                  <>
                    <Link href="/sign-up">
                      <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                        <User className="h-5 w-5 mr-2" />
                        Create Free Account
                      </Button>
                    </Link>
                    <Link href="/search">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Browse Properties
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard">
                      <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                        <Settings className="h-5 w-5 mr-2" />
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Link href="/sell">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Create Listing
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
