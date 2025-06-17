import type React from "react"
import Link from "next/link"
import { Layers } from "lucide-react"
import AnimatedButton from "@/components/animated-button"

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/40 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Designify</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
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
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <AnimatedButton size="sm">Get Started</AnimatedButton>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-background/90">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Designify</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Empowering designers to create the future through intuitive tools and seamless collaboration.
              </p>
              <div className="flex gap-4">
                {["twitter", "instagram", "github", "dribbble"].map((social) => (
                  <Link key={social} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
  )
}
