"use client"

import { features } from "@/lib/features"
import CollapsibleFeature from "@/components/collapsible-feature"
import AnimatedText from "@/components/animated-text"
import AnimatedContainer from "@/components/animated-container"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"

export default function CollapsibleProductsSection() {
  return (
    <section id="products" className="py-16 md:py-24 bg-background/95">
      <div className="container">
        <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <AnimatedText
            text="Our Suite of Design Products"
            tag="h2"
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          />
          <p className="text-lg text-muted-foreground">
            A comprehensive collection of specialized tools to elevate every aspect of your design workflow. Click on
            each product to learn more.
          </p>
        </AnimatedContainer>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((product, index) => (
            <StaggeredItem key={index}>
              <CollapsibleFeature
                title={product.title}
                slug={product.slug}
                description={product.description}
                icon={product.icon}
                details={product.howItWorks}
                benefits={product.benefits}
                image={product.image}
              />
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  )
}
