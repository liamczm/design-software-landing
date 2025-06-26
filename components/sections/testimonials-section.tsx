"use client"

import TestimonialCard from "@/components/testimonial-card"
import AnimatedContainer from "@/components/animated-container"
import AnimatedText from "@/components/animated-text"

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote: "AIM has completely transformed our design workflow. The collaboration features alone have cut our feedback cycles in half. I can't imagine going back to our old tools after experiencing how seamless everything works together.",
    author: "Sarah Johnson",
    role: "Lead Designer, Acme Inc.",
    avatar: "/placeholder.svg?height=64&width=64"
  },
  {
    quote: "As a freelancer, I need tools that are powerful yet easy to use. AIM strikes that perfect balance and has become essential to my process. The time I save on repetitive tasks lets me focus on being creative.",
    author: "Michael Chen",
    role: "Independent UX Designer",
    avatar: "/placeholder.svg?height=64&width=64"
  },
  {
    quote: "The prototyping capabilities are unmatched. I can create complex interactions that truly represent my vision without writing a single line of code. My clients are always impressed with how realistic the prototypes feel.",
    author: "Emma Rodriguez",
    role: "Product Designer, TechStart",
    avatar: "/placeholder.svg?height=64&width=64"
  },
  {
    quote: "Our team switched to AIM six months ago, and we've seen a 40% increase in productivity. The learning curve was minimal, and the support team has been incredibly responsive whenever we had questions.",
    author: "David Kim",
    role: "Design Director, FutureTech",
    avatar: "/placeholder.svg?height=64&width=64"
  },
  {
    quote: "The design system tools have revolutionized how we maintain consistency across our product suite. What used to take days of manual updates now happens automatically. It's been a game-changer for our team.",
    author: "Jessica Patel",
    role: "UI Team Lead, GlobalApp",
    avatar: "/placeholder.svg?height=64&width=64"
  }
]

interface TestimonialScrollRowProps {
  testimonials: Testimonial[]
  className?: string
}

function TestimonialScrollRow({ testimonials, className = "" }: TestimonialScrollRowProps) {
  return (
    <div className={`flex gap-4 sm:gap-6 min-w-max ${className}`}>
      {testimonials.map((testimonial, index) => (
        <div key={`${testimonial.author}-${index}`} className="w-72 sm:w-80 flex-shrink-0">
          <TestimonialCard
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            avatar={testimonial.avatar}
          />
        </div>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-background/95">
      <div className="container">
        <AnimatedContainer animation="fadeIn" className="max-w-2xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <AnimatedText
            text="Loved by Designers Worldwide"
            tag="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
          />
          <p className="text-base sm:text-lg text-muted-foreground">
            Hear what our users have to say about their experience with AIM.
          </p>
        </AnimatedContainer>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-testimonial-scroll">
            {/* 第一组 */}
            <TestimonialScrollRow testimonials={testimonials} />
            {/* 第二组 (重复，用于无缝循环) */}
            <TestimonialScrollRow testimonials={testimonials} />
          </div>

          {/* 渐变边缘效果 - 响应式 */}
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 md:w-12 bg-gradient-to-r from-background/95 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-8 md:w-12 bg-gradient-to-l from-background/95 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
} 