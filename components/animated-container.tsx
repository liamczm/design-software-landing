"use client"

import type { ReactNode } from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type Variant } from "framer-motion"
import { ChevronDown } from "lucide-react"

type AnimationVariant = "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "none"

interface AnimatedContainerProps {
  children: ReactNode
  animation?: AnimationVariant
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  collapsible?: boolean
  title?: string
  defaultOpen?: boolean
  summary?: string
  image?: string
  featureMode?: boolean
  features?: Array<{
    title: string
    description: string
    content?: ReactNode
  }>
  hidePricing?: boolean
}

const variants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  slideUp: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  slideLeft: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  slideRight: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
  scale: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
}

const getInitialVariant = (animation: AnimationVariant): Variant => {
  switch (animation) {
    case "fadeIn":
      return { ...variants.hidden, opacity: 0 }
    case "slideUp":
      return { ...variants.hidden, y: 50, opacity: 0 }
    case "slideLeft":
      return { ...variants.hidden, x: 50, opacity: 0 }
    case "slideRight":
      return { ...variants.hidden, x: -50, opacity: 0 }
    case "scale":
      return { ...variants.hidden, scale: 0.8, opacity: 0 }
    case "none":
    default:
      return variants.hidden
  }
}

export default function AnimatedContainer({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  collapsible = false,
  title = "",
  defaultOpen = false,
  summary = "",
  image = "",
  featureMode = false,
  features = [],
  hidePricing = false,
}: AnimatedContainerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [openFeatures, setOpenFeatures] = useState<Record<string, boolean>>({})
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 使用 IntersectionObserver 替代 useScrollAnimation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // 一旦元素可见，停止观察
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // 初始化 openFeatures 状态
  useEffect(() => {
    if (features.length > 0) {
      const initialState: Record<string, boolean> = {}
      features.forEach((feature, index) => {
        initialState[index.toString()] = false
      })
      setOpenFeatures(initialState)
    }
  }, [features])

  // 切换单个 feature 的展开/折叠状态
  const toggleFeature = (index: string) => {
    setOpenFeatures((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // 如果不是可折叠的，渲染标准的动画容器
  if (!collapsible) {
    return (
      <motion.div
        ref={ref}
        initial={getInitialVariant(animation)}
        animate={isVisible || !once ? variants[animation] : getInitialVariant(animation)}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)' // 强制硬件加速
        }}
        className={`${className} ${hidePricing ? "pricing-hidden" : ""}`}
      >
        {title && <h3 className="text-xl font-medium mb-3">{title}</h3>}
        {summary && <p className="text-muted-foreground mb-4 max-w-prose">{summary}</p>}
        {children}
      </motion.div>
    )
  }

  // 如果是 feature 模式，渲染带有单独可折叠 features 的容器
  if (featureMode && features.length > 0) {
    return (
      <motion.div
        ref={ref}
        initial={getInitialVariant(animation)}
        animate={isVisible || !once ? variants[animation] : getInitialVariant(animation)}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        className={`${className}`}
      >
        {title && <h3 className="text-xl font-medium mb-4">{title}</h3>}
        {summary && <p className="text-muted-foreground mb-6">{summary}</p>}

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => toggleFeature(index.toString())}
              >
                <h4 className="font-medium">{feature.title}</h4>
                <motion.div
                  animate={{ rotate: openFeatures[index.toString()] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </div>

              {feature.description && (
                <div className="px-4 pb-2 text-sm text-muted-foreground">{feature.description}</div>
              )}

              <AnimatePresence>
                {openFeatures[index.toString()] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0">{feature.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {children}
      </motion.div>
    )
  }

  // 对于普通的可折叠容器，保持原有的实现
  return (
    <motion.div
      ref={ref}
      initial={getInitialVariant(animation)}
      animate={isVisible || !once ? variants[animation] : getInitialVariant(animation)}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={`${className} border border-border rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm`}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>

      {summary && <div className="px-4 pb-2 text-sm text-muted-foreground">{summary}</div>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {image && (
              <div className="p-4 pt-0">
                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto rounded-md object-cover" />
              </div>
            )}
            <div className="p-4 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
