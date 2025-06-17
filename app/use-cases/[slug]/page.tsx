import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import AnimatedContainer from "@/components/animated-container"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import { getUseCaseBySlug, getRelatedUseCases } from "@/lib/use-cases"

interface UseCasePageProps {
  params: {
    slug: string
  }
}

export default function UseCasePage({ params }: UseCasePageProps) {
  const useCase = getUseCaseBySlug(params.slug)

  if (!useCase) {
    notFound()
  }

  const relatedUseCases = getRelatedUseCases(params.slug)

  return (
    <PageTransition>
      <div className="container py-12 md:py-16">
        <Link
          href="/#use-cases"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all use cases
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedContainer animation="fadeIn" duration={0.8}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{useCase.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{useCase.fullDescription}</p>
            <AnimatedButton size="lg" className="group">
              Explore this use case
            </AnimatedButton>
          </AnimatedContainer>

          <AnimatedContainer animation="slideUp" delay={0.3} duration={0.8}>
            <div className="relative rounded-lg border border-border/50 bg-background/50 shadow-lg overflow-hidden glow-border">
              <Image
                src={useCase.image || "/placeholder.svg"}
                width={800}
                height={600}
                alt={useCase.title}
                className="w-full h-auto"
                priority
              />
            </div>
          </AnimatedContainer>
        </div>

        <div className="mb-16">
          <AnimatedContainer animation="fadeIn" delay={0.2} duration={0.8}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCase.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 glow-border"
                >
                  <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>

        <div className="mb-16">
          <AnimatedContainer animation="fadeIn" delay={0.3} duration={0.8}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Example Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCase.examples.map((example, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-background/50 backdrop-blur-sm overflow-hidden glow-border"
                >
                  <div className="relative h-48">
                    <Image
                      src={example.image || "/placeholder.svg"}
                      alt={example.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover brightness-75"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{example.title}</h3>
                    <p className="text-muted-foreground">{example.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>

        {relatedUseCases.length > 0 && (
          <div>
            <AnimatedContainer animation="fadeIn" delay={0.4} duration={0.8}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Related Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedUseCases.map((relatedUseCase, index) => (
                  <Link key={index} href={`/use-cases/${relatedUseCase.slug}`} className="block">
                    <div className="rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 transition-all hover:shadow-md hover:border-primary/50 h-full glow-border">
                      <h3 className="mb-2 text-xl font-medium">{relatedUseCase.title}</h3>
                      <p className="text-muted-foreground">{relatedUseCase.description}</p>
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
