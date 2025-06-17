"use client"

import { useEffect, useState, useRef } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px" } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // 如果已经可见，不需要再观察
    if (isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // 一旦元素可见，停止观察
          if (ref.current && observerRef.current) {
            observerRef.current.unobserve(ref.current)
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observerRef.current = observer

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, isVisible])

  return { ref, isVisible }
}
