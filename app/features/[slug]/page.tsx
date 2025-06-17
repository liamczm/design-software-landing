import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import AnimatedContainer from "@/components/animated-container"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import { getFeatureBySlug, getRelatedFeatures } from "@/lib/features"

interface FeaturePageProps {
  params: {
    slug: string
  }
}

export default function FeaturePage({ params }: FeaturePageProps) {
  const feature = getFeatureBySlug(params.slug)

  if (!feature) {
    notFound()
  }

  const relatedFeatures = getRelatedFeatures(params.slug)

  return (
    <PageTransition>
      <div className="container py-12 md:py-16">
        <Link
          href="/#features"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all features
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedContainer animation="fadeIn" duration={0.8}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{feature.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{feature.description}</p>
            <AnimatedButton size="lg" className="group">
              Try this feature
            </AnimatedButton>
          </AnimatedContainer>

          <AnimatedContainer animation="slideUp" delay={0.3} duration={0.8}>
            <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-lg overflow-hidden">
              <Image
                src={feature.image || "/placeholder.svg?height=600&width=800"}
                width={800}
                height={600}
                alt={feature.title}
                className="w-full h-auto"
                priority
              />
            </div>
          </AnimatedContainer>
        </div>

        <div className="mb-16">
          <AnimatedContainer animation="fadeIn" delay={0.2} duration={0.8}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feature.benefits.map((benefit, index) => (
                <div key={index} className="rounded-lg border border-border bg-background p-6">
                  <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>

        <div className="mb-16">
          <AnimatedContainer animation="fadeIn" delay={0.3} duration={0.8}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">How It Works</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-6">{feature.howItWorks}</p>
                <ul className="space-y-3">
                  {feature.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-lg overflow-hidden">
                <Image
                  src={feature.howItWorksImage || "/placeholder.svg?height=600&width=800"}
                  width={800}
                  height={600}
                  alt={`How ${feature.title} works`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AnimatedContainer>
        </div>

        {relatedFeatures.length > 0 && (
          <div>
            <AnimatedContainer animation="fadeIn" delay={0.4} duration={0.8}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Related Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedFeatures.map((relatedFeature, index) => (
                  <Link key={index} href={`/features/${relatedFeature.slug}`} className="block">
                    <div className="rounded-lg border border-border bg-background p-6 transition-all hover:shadow-md hover:border-primary/50 h-full">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {relatedFeature.icon}
                      </div>
                      <h3 className="mb-2 text-xl font-medium">{relatedFeature.title}</h3>
                      <p className="text-muted-foreground">{relatedFeature.description}</p>
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
