"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 85, 0, 0.2)",
}: SpotlightCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setOpacity(0)
  }

  // Add subtle animation even when not hovering
  useEffect(() => {
    if (!isHovering && cardRef.current) {
      const interval = setInterval(() => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return

        // Generate random position within the card
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height

        setPosition({ x, y })
        setOpacity(0.3) // Subtle glow when not hovering
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isHovering])

  return (
    <div
      ref={cardRef}
      className={cn("relative rounded-2xl border border-border/50 p-8 md:p-12 text-center overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content */}
      {children}
    </div>
  )
}
