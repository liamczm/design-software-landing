"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HorizontalStepsProps {
  steps: string[]
  images?: string[] // 可选的图片数组，与步骤一一对应
  className?: string
}

export default function HorizontalSteps({ steps, images, className = "" }: HorizontalStepsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollability = () => {
    const el = scrollRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10) // 10px buffer
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollability()
    el.addEventListener("scroll", checkScrollability)
    window.addEventListener("resize", checkScrollability)

    return () => {
      el.removeEventListener("scroll", checkScrollability)
      window.removeEventListener("resize", checkScrollability)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return

    const scrollAmount = 320 // Approximately the width of one card + gap
    const targetScroll = direction === "left" ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }

  return (
    <div className={`relative ${className}`}>
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <div ref={scrollRef} className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
        <div className="flex space-x-6 min-w-max">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6 w-80 flex-shrink-0 glow-border flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm mr-3">
                  {index + 1}
                </span>
                <div className="h-0.5 bg-border flex-grow"></div>
              </div>

              {/* 始终显示图片占位符，无论是否提供了 images 参数 */}
              <div className="mb-4 rounded-md overflow-hidden border border-border/50">
                <img
                  src={(images && images[index]) || `/placeholder.svg?height=160&width=280&text=Step ${index + 1}`}
                  alt={`Step ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
              </div>

              <p>{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 bg-gradient-to-r from-background to-transparent h-full pointer-events-none"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 bg-gradient-to-l from-background to-transparent h-full pointer-events-none"></div>
    </div>
  )
}
