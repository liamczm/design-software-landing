"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface FloatingAnimationProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}

export default function FloatingAnimation({
  children,
  className = "",
  amplitude = 10,
  duration = 4,
  delay = 0,
}: FloatingAnimationProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
