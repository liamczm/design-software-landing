"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

interface WavesProps {
  lineColor?: string
  backgroundColor?: string
  waveSpeedX?: number
  waveSpeedY?: number
  waveAmpX?: number
  waveAmpY?: number
  friction?: number
  tension?: number
  maxCursorMove?: number
  xGap?: number
  yGap?: number
}

export default function Waves({
  lineColor = "#fff",
  backgroundColor = "rgba(255, 255, 255, 0.2)",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
}: WavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef<number>(0)
  const pointsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; targetX: number; targetY: number }>>(
    [],
  )
  const { theme } = useTheme()
  const lastMouseUpdateRef = useRef(0)

  // Adjust colors based on theme
  const actualLineColor = theme === "dark" ? lineColor : "rgba(0, 0, 0, 0.5)"
  const actualBackgroundColor = theme === "dark" ? backgroundColor : "rgba(0, 0, 0, 0.05)"

  // 使用 IntersectionObserver 检测可见性
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current)
      }
    }
  }, [])

  // Initialize canvas and points
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({ width: canvas.width, height: canvas.height })

      // Initialize points grid
      const points = []
      const rows = Math.ceil(canvas.height / yGap) + 2
      const cols = Math.ceil(canvas.width / xGap) + 2

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          points.push({
            x: x * xGap,
            y: y * yGap,
            vx: 0,
            vy: 0,
            targetX: x * xGap,
            targetY: y * yGap,
          })
        }
      }
      pointsRef.current = points
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [xGap, yGap])

  // Handle mouse movement with throttling
  const throttledMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseUpdateRef.current > 16) { // 60fps limit
      setMousePosition({ x: e.clientX, y: e.clientY })
      lastMouseUpdateRef.current = now
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    window.addEventListener("mousemove", throttledMouseMove)
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [throttledMouseMove, isVisible])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !isVisible) return

    let time = 0
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const animate = () => {
      if (!canvasRef.current || !isVisible) return
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      time += 0.01
      const { x: mouseX, y: mouseY } = mousePosition

      // Update points with reduced calculations
      pointsRef.current.forEach((point) => {
        // Wave motion
        point.targetX = point.x + Math.sin(time + point.y * waveSpeedY) * waveAmpX
        point.targetY = point.y + Math.sin(time + point.x * waveSpeedX) * waveAmpY

        // Mouse influence (simplified)
        const dx = mouseX - point.x
        const dy = mouseY - point.y
        const distanceSquared = dx * dx + dy * dy
        const maxDistanceSquared = maxCursorMove * maxCursorMove
        
        if (distanceSquared < maxDistanceSquared) {
          const influence = 1 - distanceSquared / maxDistanceSquared
          point.targetX -= dx * influence * 0.5
          point.targetY -= dy * influence * 0.5
        }

        // Apply physics
        point.vx += (point.targetX - point.x) * tension
        point.vy += (point.targetY - point.y) * tension
        point.vx *= friction
        point.vy *= friction
        point.x += point.vx
        point.y += point.vy
      })

      // Draw connections
      ctx.beginPath()
      ctx.strokeStyle = actualLineColor
      ctx.fillStyle = actualBackgroundColor
      ctx.lineWidth = 0.5

      const rows = Math.ceil(dimensions.height / yGap) + 1
      const cols = Math.ceil(dimensions.width / xGap) + 1

      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const i = y * cols + x
          const p0 = pointsRef.current[i]
          const p1 = pointsRef.current[i + 1]
          const p2 = pointsRef.current[i + cols]
          const p3 = pointsRef.current[i + cols + 1]

          if (p0 && p1 && p2 && p3) {
            ctx.moveTo(p0.x, p0.y)
            ctx.lineTo(p1.x, p1.y)
            ctx.lineTo(p3.x, p3.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.closePath()
          }
        }
      }

      ctx.stroke()
      ctx.fill()

      if (isVisible) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    dimensions,
    mousePosition,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    actualLineColor,
    actualBackgroundColor,
    isVisible,
  ])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10" 
      style={{ willChange: 'transform' }}
    />
  )
}
