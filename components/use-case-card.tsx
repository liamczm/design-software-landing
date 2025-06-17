"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useStaggeredContainer } from "./staggered-container"
import { useCases } from "@/lib/use-cases"
import AnimatedButton from "@/components/animated-button"

interface UseCaseCardProps {
  image: string
  title: string
  description: string
  slug: string
}

export default function UseCaseCard({ image, title, description, slug }: UseCaseCardProps) {
  const { activeCard, setActiveCard } = useStaggeredContainer()
  const detailRef = useRef<HTMLDivElement>(null)
  const isActive = activeCard === slug

  // Get full use case data
  const useCase = useCases.find((uc) => uc.slug === slug)

  function handleClick() {
    if (isActive) return
    setActiveCard(slug)
  }

  // Portal the detail content when active
  useEffect(() => {
    if (isActive && useCase) {
      const detailContainer = document.getElementById(`card-detail-${slug}`)
      if (detailContainer && detailRef.current) {
        detailContainer.appendChild(detailRef.current)
      }
    }
  }, [isActive, slug, useCase])

  return (
    <>
      <div className="group cursor-pointer" onClick={handleClick}>
        <div className="overflow-hidden rounded-lg border border-border bg-background/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/50 glow-border">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-30 transition-opacity group-hover:opacity-50" />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-medium">{title}</h3>
            <p className="mb-4 text-muted-foreground">{description}</p>
            <div className="flex items-center text-sm font-medium text-primary">
              <span>Learn more</span>
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Detail content (will be moved to the portal) */}
      <div className="hidden">
        <div ref={detailRef}>
          {useCase && (
            <div className="space-y-8">
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                <Image
                  src={useCase.image || "/placeholder.svg"}
                  alt={useCase.title}
                  width={1200}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{useCase.title}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">Overview</h3>
                  <p className="text-muted-foreground mb-6">{useCase.fullDescription}</p>

                  <h3 className="text-xl font-medium mb-4">Key Benefits</h3>
                  <div className="space-y-4">
                    {useCase.benefits.map((benefit, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Example Projects</h3>
                  <div className="space-y-4">
                    {useCase.examples.map((example, index) => (
                      <div key={index} className="border border-border rounded-lg overflow-hidden">
                        <div className="h-40 relative">
                          <Image
                            src={example.image || "/placeholder.svg"}
                            alt={example.title}
                            width={400}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium mb-1">{example.title}</h4>
                          <p className="text-sm text-muted-foreground">{example.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <AnimatedButton>
                  Explore This Use Case
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
