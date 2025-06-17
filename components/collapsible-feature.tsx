"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import AnimatedContainer from "@/components/animated-container"
import AnimatedButton from "@/components/animated-button"

interface CollapsibleFeatureProps {
  title: string
  slug: string
  description: string
  icon: React.ReactNode
  details: string
  benefits: Array<{ title: string; description: string }>
  image: string
}

export default function CollapsibleFeature({
  title,
  slug,
  description,
  icon,
  details,
  benefits,
  image,
}: CollapsibleFeatureProps) {
  return (
    <AnimatedContainer
      collapsible
      title={title}
      summary={description}
      image={image}
      defaultOpen={false}
      animation="fadeIn"
      className="h-full"
    >
      <div className="space-y-4">
        <p className="text-muted-foreground">{details}</p>

        {benefits.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Key Benefits</h4>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="border-l-2 border-primary/50 pl-3">
                  <h5 className="font-medium text-sm">{benefit.title}</h5>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2">
          <Link href={`/products/${slug}`}>
            <AnimatedButton size="sm" className="w-full">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </AnimatedContainer>
  )
}
