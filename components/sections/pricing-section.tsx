"use client"

import { ArrowRight } from "lucide-react"
import AnimatedContainer from "@/components/animated-container"
import AnimatedText from "@/components/animated-text"
import AnimatedButton from "@/components/animated-button"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"

interface PricingPlan {
  name: string
  price: number
  description: string
  features: string[]
  isPopular?: boolean
  buttonVariant?: "default" | "outline"
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 12,
    description: "Perfect for individual designers and small projects.",
    features: ["3 projects", "Basic components", "Export to PNG/SVG", "7-day history"],
    buttonVariant: "outline"
  },
  {
    name: "Professional",
    price: 29,
    description: "For professional designers with advanced needs.",
    features: [
      "Unlimited projects",
      "Advanced components",
      "Export to all formats",
      "30-day history",
      "Collaboration for 3 users",
      "Design system tools"
    ],
    isPopular: true,
    buttonVariant: "default"
  },
  {
    name: "Team",
    price: 79,
    description: "For design teams that need powerful collaboration.",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Advanced permissions",
      "Unlimited history",
      "Enterprise support",
      "Custom integrations"
    ],
    buttonVariant: "outline"
  }
]

interface PricingCardProps {
  plan: PricingPlan
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div 
      className={`
        rounded-lg backdrop-blur-sm p-4 sm:p-6 md:p-8 flex flex-col relative
        ${plan.isPopular 
          ? 'border-2 border-primary bg-background/50' 
          : 'border border-border bg-background/50'
        }
      `}
    >
      {plan.isPopular && (
        <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-medium mb-2">{plan.name}</h3>
        <div className="mb-2">
          <span className="text-2xl sm:text-3xl font-bold">${plan.price}</span>
          <span className="text-sm sm:text-base text-muted-foreground">/month</span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {plan.description}
        </p>
      </div>
      
      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center text-xs sm:text-sm">
            <ArrowRight className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <AnimatedButton 
        variant={plan.buttonVariant} 
        className="w-full text-sm sm:text-base"
        size="sm"
      >
        Get Started
      </AnimatedButton>
    </div>
  )
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-background/80">
      <div className="container">
        <AnimatedContainer 
          animation="fadeIn" 
          className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
        >
          <AnimatedText
            text="Simple, Transparent Pricing"
            tag="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
          />
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Choose the plan that works best for you or your team.
          </p>
        </AnimatedContainer>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4">
          {pricingPlans.map((plan, index) => (
            <StaggeredItem key={plan.name}>
              <PricingCard plan={plan} />
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
} 