"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AnimatedContainer from "@/components/animated-container"
import AnimatedText from "@/components/animated-text"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"
import PageTransition from "@/components/page-transition"
import FeatureCard from "@/components/feature-card"
import AnimatedButton from "@/components/animated-button"
import ProductsSectionSkeleton from "@/components/products-section-skeleton"
import { getAllProducts, getIconComponent, type Product } from "@/lib/product-service"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string>("All Products")

  useEffect(() => {
    // 模拟加载延迟
    const loadProducts = async () => {
      setIsLoading(true)

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const allProducts = getAllProducts()
      setProducts(allProducts)
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  const filteredProducts =
    selectedTag === "All Products" ? products : products.filter((product) => product.tag === selectedTag)

  const uniqueTags = Array.from(new Set(products.map((p) => p.tag)))

  if (isLoading) {
    return (
      <PageTransition>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 pt-16">
            <section className="py-8 md:py-12 bg-background/95">
              <div className="container">
                <div className="flex items-center mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </div>

                <ProductsSectionSkeleton showTitle={true} itemCount={7} />
              </div>
            </section>
          </main>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 pt-16">
          <section className="py-8 md:py-12 bg-background/95">
            <div className="container">
              <div className="flex items-center mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </div>

              <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <AnimatedText
                  text="All Design Products"
                  tag="h1"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 glow-text"
                />
                <p className="text-lg text-muted-foreground">
                  Explore our complete suite of design tools and find the perfect solution for your creative needs.
                </p>
              </AnimatedContainer>

              <div className="mb-8">
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  <AnimatedButton
                    size="sm"
                    variant={selectedTag === "All Products" ? "secondary" : "outline"}
                    className="rounded-full"
                    onClick={() => setSelectedTag("All Products")}
                  >
                    All Products
                  </AnimatedButton>
                  {uniqueTags.map((tag) => (
                    <AnimatedButton
                      key={tag}
                      size="sm"
                      variant={selectedTag === tag ? "secondary" : "outline"}
                      className="rounded-full"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </AnimatedButton>
                  ))}
                </div>
              </div>

              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
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

              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found for the selected category.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  )
}
