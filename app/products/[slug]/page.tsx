"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { notFound } from "next/navigation"
import AnimatedContainer from "@/components/animated-container"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import HorizontalSteps from "@/components/horizontal-steps"
import { getProductBySlug, getRelatedProducts, getIconComponent, type Product } from "@/lib/product-service"
import { Features } from "@/components/ui/features"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}



export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const productData = await getProductBySlug(resolvedParams.slug)
        
        if (!productData) {
          notFound()
          return
        }

        setProduct(productData)

        // 获取相关产品
        const related = await getRelatedProducts(productData.id, 2)
        setRelatedProducts(related)
      } catch (error) {
        console.error('加载产品详情失败:', error)
        setError('加载产品详情失败，请稍后重试')
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [resolvedParams.slug])

  if (isLoading) {
    return (
      <PageTransition>
        <div className="container py-8 md:py-12">
          <Link
            href="/#products"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all products
          </Link>

          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <div className="h-5 bg-muted rounded mb-3 w-24"></div>
                <div className="h-10 bg-muted rounded mb-4"></div>
                <div className="h-5 bg-muted rounded mb-6 w-3/4"></div>
                <div className="flex gap-3">
                  <div className="h-10 bg-muted rounded w-28"></div>
                  <div className="h-10 bg-muted rounded w-28"></div>
                </div>
              </div>
              <div className="h-80 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (error) {
    return (
      <PageTransition>
        <div className="container py-8 md:py-12">
          <Link
            href="/#products"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all products
          </Link>

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
      </PageTransition>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <PageTransition>
      <div className="container py-8 md:py-12">
        <Link
          href="/#products"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all products
        </Link>

        {/* Hero Section - 与skeleton布局一致 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <AnimatedContainer animation="fadeIn" duration={0.8}>
            <div className="flex items-center gap-2 mb-3 min-h-[20px]">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {product.tag || "New"}
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                Pro
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 min-h-[40px] flex items-center">
              {product.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 min-h-[20px]">{product.description}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <AnimatedButton size="default" className="group h-10">
                Try for free
              </AnimatedButton>
              <AnimatedButton size="default" variant="outline" className="h-10">
                View demo
              </AnimatedButton>
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="slideUp" delay={0.3} duration={0.8}>
            <div className="relative rounded-lg border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden h-80">
              {product.videoURL ? (
                <iframe
                  src={product.videoURL}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  title={`${product.title} video`}
                />
              ) : (
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=600"}
                  width={600}
                  height={400}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  priority
                />
              )}
            </div>
          </AnimatedContainer>
        </div>

        {/* Features Section - Features组件 */}
        {product.features && product.features.length > 0 && (
          <div className="mb-12">
            <AnimatedContainer animation="fadeIn" delay={0.2} duration={0.8}>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">Key Features</h2>
              <Features 
                primaryColor="primary"
                progressGradientLight="bg-gradient-to-r from-primary/80 to-primary"
                progressGradientDark="bg-gradient-to-r from-primary/60 to-primary/80"
                features={product.features
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((feature, index) => ({
                    id: feature.id || index,
                    title: feature.title,
                    description: feature.description + (feature.helps && feature.helps.length > 0 
                      ? ` Benefits: ${feature.helps.join(', ')}` 
                      : ''),
                    image: feature.image || `/placeholder.svg?height=240&width=400&text=${encodeURIComponent(feature.title)}`
                  }))}
              />
            </AnimatedContainer>
          </div>
        )}

        {/* How It Works Section - 与features对齐 */}
        {product.howto && product.howto.length > 0 && (
          <div className="mb-12">
            <AnimatedContainer
              animation="fadeIn"
              delay={0.3}
              duration={0.8}
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">How It Works</h2>
              <HorizontalSteps
                steps={product.howto.map((step) => step.description)}
                images={product.howto.map((step) => step.image)}
                className="mb-6"
              />
            </AnimatedContainer>
          </div>
        )}

        {/* Related Products Section - 更紧凑的布局 */}
        {relatedProducts.length > 0 && (
          <div>
            <AnimatedContainer animation="fadeIn" delay={0.5} duration={0.8}>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="group relative rounded-lg border bg-card/50 backdrop-blur-sm p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getIconComponent(relatedProduct.icon)}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{relatedProduct.title}</h3>
                        <span className="text-xs text-muted-foreground">{relatedProduct.tag}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <Link
                      href={`/products/${relatedProduct.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Learn more
                      <ArrowLeft className="ml-1 h-3 w-3 rotate-180" />
                    </Link>
                  </div>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
