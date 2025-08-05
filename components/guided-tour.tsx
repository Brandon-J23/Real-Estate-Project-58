"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft, Play, SkipForward } from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  highlight?: boolean
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to PrimeRealty! 🏠",
    description: "Let's take a quick tour of the key features to help you get started.",
    target: "hero-section",
    position: "bottom",
  },
  {
    id: "search",
    title: "Smart Search",
    description:
      "Start typing to get live suggestions for locations and property types. Try 'Beverly Hills' or 'Condo'!",
    target: "search-bar",
    position: "bottom",
    highlight: true,
  },
  {
    id: "quick-search",
    title: "Quick Location Search",
    description: "Click these buttons for instant searches in popular California locations.",
    target: "quick-search-buttons",
    position: "top",
  },
  {
    id: "property-cards",
    title: "Property Cards",
    description: "Each card shows key details. Click the heart to save favorites (account required).",
    target: "property-grid",
    position: "top",
  },
  {
    id: "account-benefits",
    title: "Sign Up for Premium Features",
    description: "Create a free account to unlock property comparison, save favorites, and create listings.",
    target: "auth-buttons",
    position: "left",
    highlight: true,
  },
  {
    id: "navigation",
    title: "Main Navigation",
    description: "Explore Buy, Sell, and Invest sections. Each offers specialized tools and features.",
    target: "main-nav",
    position: "bottom",
  },
]

interface GuidedTourProps {
  isOpen: boolean
  onClose: () => void
}

export function GuidedTour({ isOpen, onClose }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const updateTooltipPosition = () => {
      const step = tourSteps[currentStep]
      const element = document.getElementById(step.target)

      if (element) {
        setTargetElement(element)
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        let top = 0
        let left = 0

        switch (step.position) {
          case "top":
            top = rect.top + scrollTop - 20
            left = rect.left + scrollLeft + rect.width / 2
            break
          case "bottom":
            top = rect.bottom + scrollTop + 20
            left = rect.left + scrollLeft + rect.width / 2
            break
          case "left":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.left + scrollLeft - 20
            break
          case "right":
            top = rect.top + scrollTop + rect.height / 2
            left = rect.right + scrollLeft + 20
            break
        }

        setTooltipPosition({ top, left })

        // Scroll element into view
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }

    updateTooltipPosition()
    window.addEventListener("resize", updateTooltipPosition)
    window.addEventListener("scroll", updateTooltipPosition)

    return () => {
      window.removeEventListener("resize", updateTooltipPosition)
      window.removeEventListener("scroll", updateTooltipPosition)
    }
  }, [currentStep, isOpen])

  if (!isOpen) return null

  const currentStepData = tourSteps[currentStep]
  const isLastStep = currentStep === tourSteps.length - 1
  const isFirstStep = currentStep === 0

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-black/50 z-50" style={{ pointerEvents: "auto" }}>
        {/* Highlight circle for targeted element */}
        {targetElement && currentStepData.highlight && (
          <div
            className="absolute border-4 border-blue-400 rounded-lg animate-pulse"
            style={{
              top: targetElement.getBoundingClientRect().top + window.pageYOffset - 8,
              left: targetElement.getBoundingClientRect().left + window.pageXOffset - 8,
              width: targetElement.getBoundingClientRect().width + 16,
              height: targetElement.getBoundingClientRect().height + 16,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Tooltip */}
        <Card
          className="absolute w-80 shadow-2xl border-2 border-blue-200 z-60"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform:
              currentStepData.position === "left"
                ? "translateX(-100%)"
                : currentStepData.position === "right"
                  ? "translateX(0)"
                  : "translateX(-50%)",
          }}
        >
          <CardContent className="p-6">
            {/* Arrow pointer */}
            <div
              className={`absolute w-0 h-0 ${
                currentStepData.position === "top"
                  ? "border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white -bottom-2 left-1/2 transform -translate-x-1/2"
                  : currentStepData.position === "bottom"
                    ? "border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white -top-2 left-1/2 transform -translate-x-1/2"
                    : currentStepData.position === "left"
                      ? "border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white -right-2 top-1/2 transform -translate-y-1/2"
                      : "border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white -left-2 top-1/2 transform -translate-y-1/2"
              }`}
            />

            {/* Close button */}
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="pr-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentStepData.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{currentStepData.description}</p>

              {/* Progress indicator */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep ? "bg-blue-600" : index < currentStep ? "bg-blue-300" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {!isFirstStep && (
                    <Button variant="outline" size="sm" onClick={prevStep}>
                      <ArrowLeft className="h-3 w-3 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={skipTour}>
                    <SkipForward className="h-3 w-3 mr-1" />
                    Skip Tour
                  </Button>
                </div>

                <Button size="sm" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  {isLastStep ? "Finish" : "Next"}
                  {!isLastStep && <ArrowRight className="h-3 w-3 ml-1" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export function TourTrigger({ onStart }: { onStart: () => void }) {
  return (
    <Button onClick={onStart} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
      <Play className="h-4 w-4 mr-2" />
      Take a Quick Tour
    </Button>
  )
}
