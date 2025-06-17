import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { notFound } from "next/navigation"
import AnimatedContainer from "@/components/animated-container"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import HorizontalSteps from "@/components/horizontal-steps"
import { getProductBySlug, getRelatedProducts, getIconComponent } from "@/lib/product-service"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id, 2)

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
                src={product.features[0]?.image || "/placeholder.svg?height=600&width=800"}
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
        <div className="mb-16">
          <AnimatedContainer animation="fadeIn" delay={0.2} duration={0.8}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Powerful Features & Capabilities</h2>
            <div className="grid grid-cols-1 gap-8">
              {product.features.map((feature, index) => (
                <AnimatedContainer
                  key={feature.id}
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
                      </div>
                      <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-lg overflow-hidden glow-border">
                        <Image
                          src={
                            feature.image ||
                            `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(feature.title) || "/placeholder.svg"}`
                          }
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

        {/* How It Works 部分 */}
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

        {/* 相关产品部分 */}
        {relatedProducts.length > 0 && (
          <div>
            <AnimatedContainer animation="fadeIn" delay={0.5} duration={0.8}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`} className="block">
                    <div className="rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 transition-all hover:shadow-md hover:border-primary/50 h-full glow-border hover:translate-y-[-4px] duration-300">
                      <div className="flex items-start gap-4">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary flex-shrink-0">
                          {getIconComponent(relatedProduct.icon)}
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-medium">{relatedProduct.title}</h3>
                          <p className="text-muted-foreground">{relatedProduct.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-primary">
                            <span>Learn more</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
