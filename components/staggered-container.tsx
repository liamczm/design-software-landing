"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { X } from "lucide-react"

// Create context for managing the active card state
interface StaggeredContainerContextType {
  activeCard: string | null
  setActiveCard: (id: string | null) => void
}

export const StaggeredContainerContext = createContext<StaggeredContainerContextType>({
  activeCard: null,
  setActiveCard: () => {},
})

export const useStaggeredContainer = () => useContext(StaggeredContainerContext)

interface StaggeredContainerProps {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export default function StaggeredContainer({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
}: StaggeredContainerProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <StaggeredContainerContext.Provider value={{ activeCard, setActiveCard }}>
      <div className="relative">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className={className}
        >
          {children}
        </motion.div>

        <AnimatePresence>
          {activeCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setActiveCard(null)}
              />
              <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-background border border-border rounded-lg shadow-lg">
                <button
                  onClick={() => setActiveCard(null)}
                  className="absolute right-4 top-4 p-2 rounded-full bg-background/80 border border-border hover:bg-muted transition-colors z-10"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div id={`card-detail-${activeCard}`} className="p-6 md:p-8">
                  {/* Content will be injected by the card component */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StaggeredContainerContext.Provider>
  )
}
