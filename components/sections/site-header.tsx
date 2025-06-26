import Link from "next/link"
import Image from "next/image"
import AnimatedButton from "@/components/animated-button"
import { ThemeToggle } from "@/components/theme-toggle"

interface SiteHeaderProps {
  showThemeToggle?: boolean
  isHomePage?: boolean
}

export default function SiteHeader({ showThemeToggle = false, isHomePage = false }: SiteHeaderProps) {
  const TitleComponent = isHomePage ? 'h1' : 'span'
  
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/40 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/LogoLarge.svg"
              alt="AIM Logo"
              width={48}
              height={48}
              className="h-12 w-12 dark:invert"
            />
            <TitleComponent className={isHomePage ? "text-2xl font-bold" : "text-xl font-bold"}>
              AIM
            </TitleComponent>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <Link
            href="/#use-cases"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Use Cases
          </Link>
          <Link
            href="/#testimonials"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {showThemeToggle && <ThemeToggle />}
          <AnimatedButton size="sm">Get Started</AnimatedButton>
        </div>
      </div>
    </header>
  )
} 