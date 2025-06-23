import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Layers } from "lucide-react"
import UseCaseCard from "@/components/use-case-card"
import TestimonialCard from "@/components/testimonial-card"
import AnimatedContainer from "@/components/animated-container"
import StaggeredContainer from "@/components/staggered-container"
import StaggeredItem from "@/components/staggered-item"
import AnimatedText from "@/components/animated-text"
import AnimatedButton from "@/components/animated-button"
import PageTransition from "@/components/page-transition"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCases } from "@/lib/use-cases"
import SpotlightCard from "@/components/SpotlightCard"
import ProductsSection from "@/components/products-section"
import StackingCardsSection from "@/components/stacking-cards-section"
import { HoleBackground } from "@/components/animate-ui/backgrounds/hole"


export default function LandingPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/40 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/LogoLarge.svg"
                alt="AIM Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#products"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                href="#use-cases"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Use Cases
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <AnimatedButton size="sm">Get Started</AnimatedButton>
            </div>
          </div>
        </header>

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
                    The all-in-one design platform that empowers creators to bring their visions to life with intuitive
                    tools, seamless collaboration, and limitless possibilities.
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
          <section className="py-12 border-y border-border/50 bg-background/80 overflow-hidden">
            <div className="container">
              <AnimatedContainer animation="fadeIn" duration={0.8}>
                <p className="text-center text-sm font-medium text-muted-foreground mb-8">
                  TRUSTED BY LEADING COMPANIES WORLDWIDE
                </p>
              </AnimatedContainer>

              <div className="relative w-full">
                {/* 第一个滚动容器 - 从左向右 */}
                <div className="flex animate-marquee">
                  <div className="flex items-center gap-16 min-w-full justify-around">
                    <Image
                      src="/logos/adobe.png"
                      width={120}
                      height={32}
                      alt="Adobe"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/figma.png"
                      width={120}
                      height={32}
                      alt="Figma"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/sketch.png"
                      width={120}
                      height={32}
                      alt="Sketch"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/invision.png"
                      width={120}
                      height={32}
                      alt="InVision"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/framer.png"
                      width={120}
                      height={32}
                      alt="Framer"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/canva.png"
                      width={120}
                      height={32}
                      alt="Canva"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                  </div>
                  <div className="flex items-center gap-16 min-w-full justify-around">
                    <Image
                      src="/logos/adobe.png"
                      width={120}
                      height={32}
                      alt="Adobe"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/figma.png"
                      width={120}
                      height={32}
                      alt="Figma"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/sketch.png"
                      width={120}
                      height={32}
                      alt="Sketch"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/invision.png"
                      width={120}
                      height={32}
                      alt="InVision"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/framer.png"
                      width={120}
                      height={32}
                      alt="Framer"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/canva.png"
                      width={120}
                      height={32}
                      alt="Canva"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                  </div>
                </div>

                {/* 第二个滚动容器 - 从右向左，延迟启动 */}
                <div className="flex animate-marquee-reverse mt-8">
                  <div className="flex items-center gap-16 min-w-full justify-around">
                    <Image
                      src="/logos/autodesk.png"
                      width={120}
                      height={32}
                      alt="Autodesk"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/webflow.png"
                      width={120}
                      height={32}
                      alt="Webflow"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/dribbble.png"
                      width={120}
                      height={32}
                      alt="Dribbble"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/behance.png"
                      width={120}
                      height={32}
                      alt="Behance"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/affinity.png"
                      width={120}
                      height={32}
                      alt="Affinity"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/procreate.png"
                      width={120}
                      height={32}
                      alt="Procreate"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                  </div>
                  <div className="flex items-center gap-16 min-w-full justify-around">
                    <Image
                      src="/logos/autodesk.png"
                      width={120}
                      height={32}
                      alt="Autodesk"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/webflow.png"
                      width={120}
                      height={32}
                      alt="Webflow"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/dribbble.png"
                      width={120}
                      height={32}
                      alt="Dribbble"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/behance.png"
                      width={120}
                      height={32}
                      alt="Behance"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/affinity.png"
                      width={120}
                      height={32}
                      alt="Affinity"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                    <Image
                      src="/logos/procreate.png"
                      width={120}
                      height={32}
                      alt="Procreate"
                      className="h-8 w-auto opacity-70 dark:invert"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

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
          <section id="testimonials" className="py-16 md:py-24 bg-background/95">
            <div className="container">
              <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <AnimatedText
                  text="Loved by Designers Worldwide"
                  tag="h2"
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                />
                <p className="text-lg text-muted-foreground">
                  Hear what our users have to say about their experience with Designify.
                </p>
              </AnimatedContainer>

              <div className="relative w-full overflow-hidden">
                <div className="flex animate-testimonial-scroll">
                  <div className="flex gap-6 min-w-max">
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="Designify has completely transformed our design workflow. The collaboration features alone have cut our feedback cycles in half. I can't imagine going back to our old tools after experiencing how seamless everything works together."
                        author="Sarah Johnson"
                        role="Lead Designer, Acme Inc."
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="As a freelancer, I need tools that are powerful yet easy to use. Designify strikes that perfect balance and has become essential to my process. The time I save on repetitive tasks lets me focus on being creative."
                        author="Michael Chen"
                        role="Independent UX Designer"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="The prototyping capabilities are unmatched. I can create complex interactions that truly represent my vision without writing a single line of code. My clients are always impressed with how realistic the prototypes feel."
                        author="Emma Rodriguez"
                        role="Product Designer, TechStart"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="Our team switched to Designify six months ago, and we've seen a 40% increase in productivity. The learning curve was minimal, and the support team has been incredibly responsive whenever we had questions."
                        author="David Kim"
                        role="Design Director, FutureTech"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="The design system tools have revolutionized how we maintain consistency across our product suite. What used to take days of manual updates now happens automatically. It's been a game-changer for our team."
                        author="Jessica Patel"
                        role="UI Team Lead, GlobalApp"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                  </div>
                  <div className="flex gap-6 min-w-max">
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="Designify has completely transformed our design workflow. The collaboration features alone have cut our feedback cycles in half. I can't imagine going back to our old tools after experiencing how seamless everything works together."
                        author="Sarah Johnson"
                        role="Lead Designer, Acme Inc."
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="As a freelancer, I need tools that are powerful yet easy to use. Designify strikes that perfect balance and has become essential to my process. The time I save on repetitive tasks lets me focus on being creative."
                        author="Michael Chen"
                        role="Independent UX Designer"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="The prototyping capabilities are unmatched. I can create complex interactions that truly represent my vision without writing a single line of code. My clients are always impressed with how realistic the prototypes feel."
                        author="Emma Rodriguez"
                        role="Product Designer, TechStart"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="Our team switched to Designify six months ago, and we've seen a 40% increase in productivity. The learning curve was minimal, and the support team has been incredibly responsive whenever we had questions."
                        author="David Kim"
                        role="Design Director, FutureTech"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                    <div className="w-80 flex-shrink-0">
                      <TestimonialCard
                        quote="The design system tools have revolutionized how we maintain consistency across our product suite. What used to take days of manual updates now happens automatically. It's been a game-changer for our team."
                        author="Jessica Patel"
                        role="UI Team Lead, GlobalApp"
                        avatar="/placeholder.svg?height=64&width=64"
                      />
                    </div>
                  </div>
                </div>

                {/* 添加渐变边缘效果 */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background/95 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background/95 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 md:py-24 bg-background/80">
            <div className="container">
              <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                <AnimatedText
                  text="Simple, Transparent Pricing"
                  tag="h2"
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                />
                <p className="text-lg text-muted-foreground">Choose the plan that works best for you or your team.</p>
              </AnimatedContainer>

              <StaggeredContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                <StaggeredItem>
                  <div className="rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 md:p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Starter</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold">$12</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perfect for individual designers and small projects.
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {["3 projects", "Basic components", "Export to PNG/SVG", "7-day history"].map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <AnimatedButton variant="outline" className="w-full">
                      Get Started
                    </AnimatedButton>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="rounded-lg border-2 border-primary bg-background/50 backdrop-blur-sm p-6 md:p-8 flex flex-col relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Professional</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold">$29</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">For professional designers with advanced needs.</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        "Unlimited projects",
                        "Advanced components",
                        "Export to all formats",
                        "30-day history",
                        "Collaboration for 3 users",
                        "Design system tools",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <AnimatedButton className="w-full">Get Started</AnimatedButton>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 md:p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Team</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold">$79</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For design teams that need powerful collaboration.
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        "Everything in Professional",
                        "Unlimited team members",
                        "Advanced permissions",
                        "Unlimited history",
                        "Enterprise support",
                        "Custom integrations",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <AnimatedButton variant="outline" className="w-full">
                      Get Started
                    </AnimatedButton>
                  </div>
                </StaggeredItem>
              </StaggeredContainer>
            </div>
          </section>

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

        {/* Footer */}
        <footer className="border-t border-border/50 py-12 bg-background/90">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <Image
                src="/LogoLarge.svg"
                alt="AIM Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
                  <span className="text-xl font-bold">AIM</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Empowering designers to create the future through intuitive tools and seamless collaboration.
                </p>
                <div className="flex gap-4">
                  {["twitter", "instagram", "github", "dribbble"].map((social) => (
                    <Link
                      key={social}
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20" />
                    </Link>
                  ))}
                </div>
              </div>

              {[
                {
                  title: "Product",
                  links: ["Features", "Use Cases", "Pricing", "Releases"],
                },
                {
                  title: "Resources",
                  links: ["Documentation", "Tutorials", "Blog", "Community"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Contact", "Press"],
                },
                {
                  title: "Legal",
                  links: ["Terms", "Privacy", "Security", "Cookies"],
                },
              ].map((column, i) => (
                <div key={i}>
                  <h3 className="font-medium mb-4">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Designify. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
