"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  slug: string
  linkPath?: string
}

export default function FeatureCard({ icon, title, description, slug, linkPath = "/products/" }: FeatureCardProps) {
  return (
    <Link href={`${linkPath}${slug}`} className="block">
      <motion.div
        className="group relative rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 transition-all hover:shadow-md hover:border-primary/50 glow-border"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
        <motion.div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
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
      </motion.div>
    </Link>
  )
}
