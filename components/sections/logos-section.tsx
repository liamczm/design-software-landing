"use client"

import { 
  Palette, 
  Figma, 
  Pen, 
  Eye, 
  FramerIcon as Framer, 
  Paintbrush, 
  Cpu, 
  Globe, 
  Dribbble, 
  Layers3, 
  Brush, 
  Tablet 
} from "lucide-react"
import AnimatedContainer from "@/components/animated-container"

interface Company {
  name: string
  icon: React.ComponentType<{ className?: string }>
}

const companiesRow1: Company[] = [
  { name: "Adobe", icon: Palette },
  { name: "Figma", icon: Figma },
  { name: "Sketch", icon: Pen },
  { name: "InVision", icon: Eye },
  { name: "Framer", icon: Framer },
  { name: "Canva", icon: Paintbrush },
]

const companiesRow2: Company[] = [
  { name: "Autodesk", icon: Cpu },
  { name: "Webflow", icon: Globe },
  { name: "Dribbble", icon: Dribbble },
  { name: "Behance", icon: Layers3 },
  { name: "Affinity", icon: Brush },
  { name: "Procreate", icon: Tablet },
]

interface CompanyLogoProps {
  company: Company
  className?: string
}

function CompanyLogo({ company, className = "" }: CompanyLogoProps) {
  const Icon = company.icon
  
  return (
    <div className={`flex items-center gap-1 sm:gap-2 opacity-70 flex-shrink-0 ${className}`}>
      <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
        {company.name}
      </span>
    </div>
  )
}

interface MarqueeRowProps {
  companies: Company[]
  direction?: "left" | "right"
  className?: string
}

function MarqueeRow({ companies, direction = "left", className = "" }: MarqueeRowProps) {
  const animationClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
  
  return (
    <div className={`flex ${animationClass} ${className}`}>
      {/* 第一组 */}
      <div className="flex items-center gap-8 sm:gap-12 md:gap-16 min-w-full justify-around px-4">
        {companies.map((company, index) => (
          <CompanyLogo key={`${company.name}-1-${index}`} company={company} />
        ))}
      </div>
      {/* 第二组 (重复，用于无缝循环) */}
      <div className="flex items-center gap-8 sm:gap-12 md:gap-16 min-w-full justify-around px-4">
        {companies.map((company, index) => (
          <CompanyLogo key={`${company.name}-2-${index}`} company={company} />
        ))}
      </div>
    </div>
  )
}

export default function LogosSection() {
  return (
    <section className="py-8 sm:py-12 border-y border-border/50 bg-background/80 overflow-hidden">
      <div className="container">
        <AnimatedContainer animation="fadeIn" duration={0.8}>
          <p className="text-center text-xs sm:text-sm font-medium text-muted-foreground mb-6 sm:mb-8">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
        </AnimatedContainer>

        <div className="relative w-full space-y-4 sm:space-y-6 md:space-y-8">
          {/* 第一行 - 从左向右 */}
          <MarqueeRow companies={companiesRow1} direction="left" />
          
          {/* 第二行 - 从右向左 */}
          <MarqueeRow companies={companiesRow2} direction="right" />
        </div>
      </div>
    </section>
  )
} 