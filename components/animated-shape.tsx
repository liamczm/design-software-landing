"use client"

import { useEffect, useRef } from "react"

export default function AnimatedShape() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = 300
      canvas.height = 300
    }

    setCanvasDimensions()

    // Animation variables
    let time = 0
    const points = 8
    const radius = 80
    const amplitude = 15
    const speed = 0.003

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw shape
      ctx.beginPath()

      for (let i = 0; i <= points * 2; i++) {
        const angle = (i / points) * Math.PI
        const x = canvas.width / 2 + Math.cos(angle) * (radius + Math.sin(time + i * 0.5) * amplitude)
        const y = canvas.height / 2 + Math.sin(angle) * (radius + Math.sin(time + i * 0.5) * amplitude)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()

      // Create gradient
      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - radius,
        canvas.height / 2 - radius,
        canvas.width / 2 + radius,
        canvas.height / 2 + radius,
      )
      gradient.addColorStop(0, "rgba(255, 85, 0, 0.1)") // 橙红色 with opacity
      gradient.addColorStop(1, "rgba(255, 120, 50, 0.1)") // 橙红色变体 with opacity

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = "rgba(255, 85, 0, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Update time
      time += speed

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    window.addEventListener("resize", setCanvasDimensions)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-[300px] h-[300px] opacity-70" />
}
