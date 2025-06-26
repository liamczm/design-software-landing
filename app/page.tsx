import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Layers } from "lucide-react"
import UseCaseCard from "@/components/use-case-card"
import AnimatedContainer from "@/components/animated-container"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"
import AnimatedText from "@/components/animated-text"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import SiteHeader from "@/components/sections/site-header"
import SiteFooter from "@/components/sections/site-footer"
import LogosSection from "@/components/sections/logos-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import PricingSection from "@/components/sections/pricing-section"
import { useCases } from "@/lib/use-cases"
import SpotlightCard from "@/components/SpotlightCard"
import ProductsSection from "@/components/sections/products-section"
import StackingCardsSection from "@/components/sections/stacking-cards-section"
import { HoleBackground } from "@/components/animate-ui/backgrounds/hole"


export default function LandingPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <SiteHeader showThemeToggle={true} isHomePage={true} />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-end">
            {/* HoleBackground 动态背景 */}
            <HoleBackground 
              className="absolute inset-0 -z-10"
              strokeColor="#404040"
              numberOfLines={40}
              numberOfDiscs={30}
              particleRGBColor={[100, 100, 100]}
            />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background/95 to-transparent pointer-events-none" />

            <div className="container relative pb-16 md:pb-24">
              <div className="max-w-2xl mb-0 md:mb-0 pl-0 md:pl-0">
                <AnimatedContainer animation="fadeIn" duration={0.8}>
                  <AnimatedText
            text="让设计回归设计"
                    tag="h1"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                  />
                </AnimatedContainer>

                <AnimatedContainer animation="fadeIn" delay={0.2} duration={0.8}>
                  <p className="text-xl text-muted-foreground mb-8 md:mb-10">
                    数据驱动，一模到底的方案设计平台
                  </p>
                </AnimatedContainer>

                <AnimatedContainer animation="fadeIn" delay={0.4} duration={0.8}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <AnimatedButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </AnimatedButton>
                    <AnimatedButton size="lg" variant="outline">
                      Watch Demo
                    </AnimatedButton>
                  </div>
                </AnimatedContainer>
              </div>
            </div>
          </section>

          {/* Logos Section */}
          <LogosSection />

          {/* Stacking Cards Section */}
          <StackingCardsSection />

          {/* Products Section */}
          <ProductsSection />

          {/* Use Cases Section */}
          <section id="use-cases" className="py-16 md:py-24 bg-background/80">
            <div className="container">
              <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <AnimatedText
                  text="Designed for Every Creative Need"
                  tag="h2"
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                />
                <p className="text-lg text-muted-foreground">
                  See how Designify empowers creators across different disciplines and projects.
                </p>
              </AnimatedContainer>

              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {useCases.map((useCase, index) => (
                  <StaggeredItem key={useCase.slug}>
                    <UseCaseCard
                      image={useCase.image}
                      title={useCase.title}
                      description={useCase.description}
                      slug={useCase.slug}
                    />
                  </StaggeredItem>
                ))}
              </StaggeredContainer>
            </div>
          </section>

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Pricing Section */}
          <PricingSection />

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-background/95">
            <div className="container">
              <AnimatedContainer animation="fadeIn">
                <SpotlightCard
                  className="max-w-4xl mx-auto bg-background/80"
                  spotlightColor="rgba(255, 85, 0, 0.2)"
                >
                  <AnimatedText
                    text="Ready to Transform Your Design Process?"
                    tag="h2"
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                  />
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of designers who have already elevated their workflow with Designify. Start your free
                    14-day trial today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedButton size="lg" className="group glow-border">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </AnimatedButton>
                    <AnimatedButton size="lg" variant="outline">
                      Schedule a Demo
                    </AnimatedButton>
                  </div>
                </SpotlightCard>
              </AnimatedContainer>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </PageTransition>
  )
}
