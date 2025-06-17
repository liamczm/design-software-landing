"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import AnimatedContainer from "@/components/animated-container"
import AnimatedText from "@/components/animated-text"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"
import FeatureCard from "@/components/feature-card"
import AnimatedButton from "@/components/animated-button"
import ProductsSectionSkeleton from "@/components/products-section-skeleton"
import { getAllProducts, getIconComponent, type Product } from "@/lib/product-service"

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 减少模拟加载延迟以提高性能
    const loadProducts = async () => {
      setIsLoading(true)

      // 减少模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 300))

      const allProducts = getAllProducts().slice(0, 6) // 只显示前6个产品
      setProducts(allProducts)
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  if (isLoading) {
    return <ProductsSectionSkeleton showTitle={true} itemCount={6} />
  }

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
            A comprehensive collection of specialized tools to elevate every aspect of your design workflow.
          </p>
        </AnimatedContainer>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <StaggeredItem key={product.id}>
              <FeatureCard
                icon={getIconComponent(product.icon)}
                title={product.title}
                description={product.description}
                slug={product.slug}
                linkPath="/products/"
              />
            </StaggeredItem>
          ))}
        </StaggeredContainer>

        <div className="flex justify-center mt-12">
          <AnimatedButton href="/products" size="lg" variant="outline" className="group">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </AnimatedButton>
        </div>
      </div>
    </section>
  )
}
