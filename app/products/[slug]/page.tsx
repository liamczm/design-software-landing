"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { notFound } from "next/navigation"
import AnimatedContainer from "@/components/animated-container"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import HorizontalSteps from "@/components/horizontal-steps"
import { getFullProductBySlug, getRelatedProducts, getIconComponent, type Product } from "@/lib/product-service"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const productData = await getFullProductBySlug(params.slug)
        
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
  }, [params.slug])

  if (isLoading) {
    return (
      <PageTransition>
        <div className="container py-12 md:py-16">
          <Link
            href="/#products"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all products
          </Link>

          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="h-6 bg-muted rounded mb-4 w-32"></div>
                <div className="h-12 bg-muted rounded mb-6"></div>
                <div className="h-6 bg-muted rounded mb-8 w-3/4"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-muted rounded w-32"></div>
                  <div className="h-12 bg-muted rounded w-32"></div>
                </div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  if (error) {
    return (
      <PageTransition>
        <div className="container py-12 md:py-16">
          <Link
            href="/#products"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
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
      <div className="container py-12 md:py-16">
        <Link
          href="/#products"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedContainer animation="fadeIn" duration={0.8}>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {product.tag || "New"}
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                Pro
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 glow-text">
              {product.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{product.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton size="lg" className="group glow-border">
                Try for free
              </AnimatedButton>
              <AnimatedButton size="lg" variant="outline">
                View demo
              </AnimatedButton>
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="slideUp" delay={0.3} duration={0.8}>
            <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-lg overflow-hidden glow-border">
              <Image
                src={product.features[0]?.image || product.image || "/placeholder.svg?height=600&width=800"}
                width={800}
                height={600}
                alt={product.title}
                className="w-full h-auto"
                priority
              />
            </div>
          </AnimatedContainer>
        </div>

        {/* 产品功能部分 */}
        {product.features && product.features.length > 0 && (
          <div className="mb-16">
            <AnimatedContainer animation="fadeIn" delay={0.2} duration={0.8}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Powerful Features & Capabilities</h2>
              <div className="grid grid-cols-1 gap-8">
                {product.features.map((feature, index) => (
                  <AnimatedContainer
                    key={feature.id || index}
                    collapsible
                    title={feature.title}
                    summary={feature.description}
                    defaultOpen={index === 0}
                    animation="fadeIn"
                    className="w-full"
                  >
                    <div className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                          <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                          {feature.helps && feature.helps.length > 0 && (
                            <div className="p-6 bg-muted/10 rounded-lg border border-border/30">
                              <h5 className="text-sm font-medium mb-4">How this helps you:</h5>
                              <ul className="space-y-3 text-sm">
                                {feature.helps.map((help, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{help}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-lg overflow-hidden glow-border">
                          <Image
                            src={feature.image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(feature.title)}`}
                            width={500}
                            height={300}
                            alt={feature.title}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <AnimatedButton size="sm" variant="outline">
                          Learn more about this feature
                        </AnimatedButton>
                      </div>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        )}

        {/* How It Works 部分 */}
        {product.howto && product.howto.length > 0 && (
          <div className="mb-16">
            <AnimatedContainer
              animation="fadeIn"
              delay={0.3}
              duration={0.8}
              className="bg-background/30 p-8 rounded-xl border border-border/30"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">How It Works</h2>
              <HorizontalSteps
                steps={product.howto.map((step) => step.description)}
                images={product.howto.map((step) => step.image)}
                className="mb-8"
              />
              {product.videoURL && (
                <div className="mt-12 pt-8 border-t border-border/30">
                  <h3 className="text-xl font-medium mb-6">Product Video</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-md overflow-hidden glow-border aspect-video md:col-span-1">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                          Demo
                        </div>
                        <div className="h-12 w-12 rounded-full bg-black/50 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                      <Image
                        src={product.image || "/placeholder.svg?height=200&width=350&text=Video+Thumbnail"}
                        width={350}
                        height={200}
                        alt={`${product.title} video thumbnail`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <h4 className="font-medium text-lg mb-3">{product.title} Demo</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        Watch this video to see {product.title} in action and learn how it can transform your workflow.
                      </p>
                      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg inline-block">
                        Video source: {product.videoURL}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </AnimatedContainer>
          </div>
        )}

        {/* 相关产品部分 */}
        {relatedProducts.length > 0 && (
          <div>
            <AnimatedContainer animation="fadeIn" delay={0.5} duration={0.8}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="group relative rounded-lg border border-border/50 bg-background/50 p-6 hover:shadow-md transition-all duration-300 glow-border-hover"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getIconComponent(relatedProduct.icon)}
                      </div>
                      <div>
                        <h3 className="font-medium">{relatedProduct.title}</h3>
                        <span className="text-xs text-muted-foreground">{relatedProduct.tag}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedProduct.description}</p>
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
