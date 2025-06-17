"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StaggeredItemProps {
  children: ReactNode
  className?: string
}

export default function StaggeredItem({ children, className = "" }: StaggeredItemProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
