"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
//testing
const mockProperties = [
  {
    id: 1,
    name: "Modern Condo in LA",
    location: "Los Angeles",
    price: 750000,
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: 2,
    name: "Spacious Home in NY",
    location: "New York",
    price: 850000,
    size: 1600,
    bedrooms: 3,
    bathrooms: 2,
  },
]

const ComparePropertiesPage = () => {
  const [property1, setProperty1] = useState("Modern Condo in LA")
  const [property2, setProperty2] = useState("Spacious Home in NY")

interface Property {
    id: number
    name: string
    location: string
    price: number
    size: number
    bedrooms: number
    bathrooms: number
}

const getProperty = (name: string): Property | null =>
    mockProperties.find((p: Property) => p.name === name) || null

  const p1 = getProperty(property1)
  const p2 = getProperty(property2)

  const highlight = (
    a: number | undefined,
    b: number | undefined,
    compareFn: (a: number, b: number) => boolean
  ) => {
    if (a == null || b == null) return ""
    if (compareFn(a, b)) return "text-green-500 font-semibold"
    if (compareFn(b, a)) return "text-red-500"
    return ""
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Compare Properties</h1>
      <div className="flex gap-4 justify-center mb-8">
        <Input
          value={property1}
          onChange={(e) => setProperty1(e.target.value)}
          placeholder="Enter first property name"
          className="w-64"
        />
        <Input
          value={property2}
          onChange={(e) => setProperty2(e.target.value)}
          placeholder="Enter second property name"
          className="w-64"
        />
      </div>
      <div className="grid grid-cols-2 gap-8">
        {[p1, p2].map((p, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-6">
              <CardTitle className="mb-4 text-xl font-semibold">
                {p?.name || "Property not found"}
              </CardTitle>
              {p && (
                <ul className="space-y-2">
                  <li className={highlight(p.size, index === 0 ? p2?.size : p1?.size, (a, b) => a > b)}>
                    Size: {p.size} sqft
                  </li>
                  <li className={highlight(p.price, index === 0 ? p2?.price : p1?.price, (a, b) => a < b)}>
                    Price: ${p.price.toLocaleString()}
                  </li>
                  <li className={highlight(p.bedrooms, index === 0 ? p2?.bedrooms : p1?.bedrooms, (a, b) => a > b)}>
                    Bedrooms: {p.bedrooms}
                  </li>
                  <li className={highlight(p.bathrooms, index === 0 ? p2?.bathrooms : p1?.bathrooms, (a, b) => a > b)}>
                    Bathrooms: {p.bathrooms}
                  </li>
                  <li className="text-gray-700">Location: {p.location}</li>
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ComparePropertiesPage
