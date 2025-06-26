import type React from "react"
import SiteHeader from "@/components/sections/site-header"
import SiteFooter from "@/components/sections/site-footer"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
    </div>
  )
}
