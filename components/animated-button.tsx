"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  href?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export default function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  href,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)' // 强制硬件加速
      }}
    >
      <Button
        className={cn("relative overflow-hidden", className)}
        variant={variant}
        size={size}
        onClick={onClick}
        asChild={!!href}
        type={type}
        disabled={disabled}
      >
        {href ? (
          <a href={href} className="relative">
            {children}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 0.3 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ willChange: 'transform' }}
            />
          </a>
        ) : (
          <>
            {children}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 0.3 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ willChange: 'transform' }}
            />
          </>
        )}
      </Button>
    </motion.div>
  )
}
