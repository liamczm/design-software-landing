"use client"

import AnimatedContainer from "@/components/animated-container"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"
import ProductCardSkeleton from "@/components/product-card-skeleton"
import Skeleton from "@/components/skeleton"

interface ProductsSectionSkeletonProps {
  showTitle?: boolean
  itemCount?: number
}

export default function ProductsSectionSkeleton({ showTitle = true, itemCount = 6 }: ProductsSectionSkeletonProps) {
  return (
    <section id="products" className="py-16 md:py-24 bg-background/95">
      <div className="container">
        {showTitle && (
          <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <div className="mb-4">
              <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6 mx-auto" />
          </AnimatedContainer>
        )}

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: itemCount }).map((_, index) => (
            <StaggeredItem key={index}>
              <ProductCardSkeleton index={index} />
            </StaggeredItem>
          ))}
        </StaggeredContainer>

        {showTitle && (
          <div className="flex justify-center mt-12">
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        )}
      </div>
    </section>
  )
}
