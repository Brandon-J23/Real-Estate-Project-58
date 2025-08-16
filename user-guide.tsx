"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Home,
  ArrowLeft,
  Search,
  Heart,
  User,
  TrendingUp,
  Plus,
  Eye,
  Settings,
  Star,
  Shield,
  ArrowRight,
  Play,
  BookOpen,
  HelpCircle,
  Users,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "./hooks/useAuth"
import { UserMenu } from "./components/user-menu"

const guideSteps = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Play,
    description: "Learn the basics of navigating PrimeRealty",
    content: [
      {
        title: "Welcome to PrimeRealty",
        description: "Your comprehensive real estate platform for buying, selling, and investing in properties.",
        steps: [
          "Visit the homepage to explore featured properties and services",
          "Use the search bar to find properties by location, type, or keywords",
          "Browse property categories like Single Family Homes, Condos, and Townhouses",
          "View detailed property information including photos, specifications, and pricing",
        ],
      },
      {
        title: "Navigation Overview",
        description: "Understanding the main navigation and key sections",
        steps: [
          "Header Navigation: Buy, Sell, Invest, and Contact sections",
          "Search Bar: Live search with suggestions and filters",
          "Property Cards: Quick overview with key details and actions",
          "Footer: Additional resources and contact information",
        ],
      },
    ],
  },
  {
    id: "searching",
    title: "Property Search",
    icon: Search,
    description: "Master the search functionality to find your perfect property",
    content: [
      {
        title: "Live Search Features",
        description: "Get instant results and suggestions as you type",
        steps: [
          "Start typing in the search bar for live suggestions",
          "Choose from location suggestions like 'Beverly Hills, CA' or 'Santa Monica, CA'",
          "Select property types like 'Single Family Home' or 'Condominium'",
          "Use quick location buttons for popular areas",
        ],
      },
      {
        title: "Advanced Filtering",
        description: "Refine your search with detailed filters",
        steps: [
          "Property Type: Filter by Single Family, Condo, Townhouse, etc.",
          "Price Range: Set minimum and maximum price limits",
          "Sort Options: Order by price, newest first, or oldest first",
          "Location Search: Search by city, neighborhood, or ZIP code",
        ],
      },
      {
        title: "Search Results",
        description: "Understanding and navigating search results",
        steps: [
          "View property cards with photos, price, and key details",
          "See property status (For Sale, Pending, Sold)",
          "Check days on market and other important metrics",
          "Click on any property for detailed information",
        ],
      },
    ],
  },
  {
    id: "account-benefits",
    title: "Account Benefits",
    icon: User,
    description: "Unlock premium features by creating your account",
    content: [
      {
        title: "Why Create an Account?",
        description: "Access exclusive features and personalized experiences",
        steps: [
          "Save favorite properties for easy access later",
          "Compare up to 4 properties side-by-side (Premium Feature)",
          "Create and manage your own property listings",
          "Track listing performance with detailed analytics",
          "Receive personalized property recommendations",
          "Access your dashboard with saved searches and preferences",
        ],
      },
      {
        title: "Account Types",
        description: "Choose the account type that fits your needs",
        steps: [
          "Home Buyer: Perfect for finding your dream home",
          "Home Seller: Ideal for listing and selling properties",
          "Real Estate Investor: Advanced tools for investment analysis",
          "Real Estate Agent: Professional features for agents",
        ],
      },
      {
        title: "Sign Up Process",
        description: "Quick and easy account creation",
        steps: [
          "Click 'Get Started' or 'Sign Up' in the header",
          "Fill in your basic information (name, email, phone)",
          "Choose your account type and preferences",
          "Verify your email address",
          "Start exploring premium features immediately",
        ],
      },
    ],
  },
  {
    id: "property-comparison",
    title: "Property Comparison",
    icon: TrendingUp,
    description: "Compare properties side-by-side (Account Required)",
    content: [
      {
        title: "Accessing Property Comparison",
        description: "This premium feature requires a signed-in account",
        steps: [
          "Sign up for a free account to unlock this feature",
          "Save properties to your favorites list",
          "Navigate to your Dashboard → Favorites tab",
          "Click 'Compare Properties' to start comparing",
        ],
      },
      {
        title: "Using the Comparison Tool",
        description: "Make informed decisions with detailed comparisons",
        steps: [
          "Select up to 4 properties from your favorites",
          "View side-by-side comparison of all key metrics",
          "Compare prices, square footage, bedrooms, and bathrooms",
          "Analyze financial information like price per sq ft and property taxes",
          "Review features and amenities for each property",
          "Access direct links to view full property details",
        ],
      },
      {
        title: "Comparison Categories",
        description: "Comprehensive comparison across multiple categories",
        steps: [
          "Basic Information: Property type, status, days on market",
          "Property Specifications: Bedrooms, bathrooms, square footage",
          "Financial Information: Price per sq ft, taxes, HOA fees",
          "Features & Amenities: Pool, garage, smart home features",
          "Market Data: Last sold price, rent estimates, value trends",
        ],
      },
    ],
  },
  {
    id: "listing-property",
    title: "Listing Your Property",
    icon: Plus,
    description: "Create and manage property listings",
    content: [
      {
        title: "Creating a New Listing",
        description: "Step-by-step process to list your property",
        steps: [
          "Sign in to your account and click 'Create New Listing'",
          "Enter property details: address, type, bedrooms, bathrooms",
          "Add property features and write a compelling description",
          "Set your pricing and market information",
          "Choose contact preferences (direct contact or through agent)",
          "Upload high-quality photos of your property",
        ],
      },
      {
        title: "Listing Management",
        description: "Track and optimize your property listings",
        steps: [
          "View all your listings in the Dashboard",
          "Monitor views, inquiries, and favorites for each listing",
          "Edit listing details and update photos as needed",
          "Track days on market and performance metrics",
          "Respond to inquiries and manage communications",
        ],
      },
      {
        title: "Contact Options",
        description: "Choose how buyers can reach you",
        steps: [
          "Direct Contact: Buyers contact you directly",
          "Through Agent: Work with our professional agents",
          "Provide your contact information for direct inquiries",
          "Select from our network of experienced real estate agents",
        ],
      },
    ],
  },
  {
    id: "dashboard",
    title: "User Dashboard",
    icon: Settings,
    description: "Manage your account and track activity",
    content: [
      {
        title: "Dashboard Overview",
        description: "Your central hub for all real estate activities",
        steps: [
          "View key statistics: active listings, total views, inquiries",
          "Access three main tabs: My Listings, Favorites, Analytics",
          "Quick actions: Create new listing, view performance metrics",
          "Recent activity feed with important updates",
        ],
      },
      {
        title: "My Listings Tab",
        description: "Manage all your property listings",
        steps: [
          "View all your active, pending, and sold listings",
          "See performance metrics for each property",
          "Edit or delete listings with quick actions",
          "Track views, inquiries, and favorites for each listing",
        ],
      },
      {
        title: "Favorites Tab",
        description: "Manage your saved properties",
        steps: [
          "View all properties you've saved as favorites",
          "Quick access to property comparison tool",
          "Remove properties from favorites if no longer interested",
          "Direct links to view full property details",
        ],
      },
      {
        title: "Analytics Tab",
        description: "Track your real estate activity performance",
        steps: [
          "Performance overview with key metrics",
          "Average days on market for your listings",
          "Total property value and inquiry rates",
          "Recent activity timeline with important events",
        ],
      },
    ],
  },
]

const faqItems = [
  {
    question: "Do I need an account to browse properties?",
    answer:
      "No, you can browse and search properties without an account. However, creating a free account unlocks premium features like property comparison, saving favorites, and creating listings.",
  },
  {
    question: "Is the property comparison feature free?",
    answer:
      "Yes! The property comparison feature is completely free, but it requires you to create an account and save properties to your favorites first. This helps us provide you with a personalized experience.",
  },
  {
    question: "How do I save properties to compare later?",
    answer:
      "Click the heart icon on any property card to save it to your favorites. Once you have multiple favorites, you can access the comparison tool from your dashboard.",
  },
  {
    question: "Can I list my property for free?",
    answer:
      "Yes, creating property listings is free for all registered users. You can create unlimited listings and track their performance through your dashboard.",
  },
  {
    question: "How do I contact property owners or agents?",
    answer:
      "Each property listing includes contact information and buttons to call, email, or send a message to the listing contact (either the owner or their agent).",
  },
  {
    question: "What information do I need to create a listing?",
    answer:
      "You'll need basic property details (address, type, size), pricing information, property features, photos, and your contact preferences. Our step-by-step wizard guides you through the entire process.",
  },
  {
    question: "How do I edit or delete my listings?",
    answer:
      "Go to your Dashboard → My Listings tab. Click the menu button (three dots) on any listing to edit details, update photos, or delete the listing.",
  },
  {
    question: "Can I work with a real estate agent through the platform?",
    answer:
      "When creating a listing, you can choose to work with one of our professional agents. They'll handle inquiries and help market your property effectively.",
  },
]

export default function UserGuide() {
  const { user, loading } = useAuth()
  const [activeStep, setActiveStep] = useState("getting-started")

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to make the most of PrimeRealty's features. From searching properties to creating listings and
            comparing options, we'll guide you through everything.
          </p>
        </div>

        {/* Account Benefits Highlight */}
        {!user && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Unlock Premium Features</h3>
                    <p className="text-gray-600">
                      Create a free account to access property comparison, save favorites, and create listings
                    </p>
                  </div>
                </div>
                <Link href="/sign-up">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up Free
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Guide Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {guideSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeStep === step.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <step.icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs text-gray-500">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {guideSteps.map((step) => (
              <div key={step.id} className={activeStep === step.id ? "block" : "hidden"}>
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Special highlight for property comparison */}
                  {step.id === "property-comparison" && !user && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-6 w-6 text-yellow-600" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Account Required</h4>
                          <p className="text-yellow-700 text-sm">
                            Property comparison is a premium feature that requires a free account. Sign up to unlock
                            this powerful tool for making informed property decisions.
                          </p>
                        </div>
                      </div>
                      <Link href="/sign-up">
                        <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white">
                          Create Free Account
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {step.content.map((section, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <p className="text-gray-600">{section.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {section.steps.map((stepItem, stepIndex) => (
                            <div key={stepIndex} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-blue-600 text-sm font-medium">{stepIndex + 1}</span>
                              </div>
                              <p className="text-gray-700">{stepItem}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Key Features Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Live Search</h3>
              <p className="text-gray-600 text-sm">
                Get instant suggestions and results as you type. Search by location, property type, or keywords.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Property Comparison</h3>
              <p className="text-gray-600 text-sm">
                Compare up to 4 properties side-by-side with detailed metrics. Requires free account.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Listing</h3>
              <p className="text-gray-600 text-sm">
                Create professional property listings with our step-by-step wizard and photo upload.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600 text-sm">
                Save properties you're interested in and access them anytime from your dashboard.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
              <p className="text-gray-600 text-sm">
                Track views, inquiries, and performance metrics for your property listings.
              </p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Agent Network</h3>
              <p className="text-gray-600 text-sm">
                Connect with professional real estate agents or handle inquiries directly.
              </p>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of users who have found their perfect property with PrimeRealty
              </p>
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

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Additional Help?</h3>
          <p className="text-gray-600 mb-6">Our support team is here to help you make the most of PrimeRealty</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
              <Phone className="h-4 w-4 mr-2" />
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
