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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const allProducts = await getAllProducts()
        setProducts(allProducts.slice(0, 6)) // 只显示前6个产品
      } catch (error) {
        console.error('加载产品失败:', error)
        setError('加载产品失败，请稍后重试')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (isLoading) {
    return <ProductsSectionSkeleton showTitle={true} itemCount={6} />
  }

  if (error) {
    return (
      <section id="products" className="py-16 md:py-24 bg-background/95">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-destructive mb-4">{error}</p>
            <AnimatedButton 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              重新加载
            </AnimatedButton>
          </div>
        </div>
      </section>
    )
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
                slug={product.slug || ''}
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
