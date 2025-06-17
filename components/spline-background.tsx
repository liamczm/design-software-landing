"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"

export default function SplineBackground() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  // 使用IntersectionObserver检测可见性
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }, // 当10%的元素可见时触发
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // 只在组件可见时加载脚本
    if (!isVisible) return

    // 动态加载Spline Viewer脚本
    const loadSplineScript = () => {
      // 如果脚本已加载，不重复加载
      if (document.querySelector('script[src*="@splinetool/viewer"]')) {
        setIsScriptLoaded(true)
        setIsLoading(false)
        return
      }

      const script = document.createElement("script")
      script.type = "module"
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js"
      script.async = true
      script.onload = () => {
        setIsScriptLoaded(true)
        setIsLoading(false)
      }
      script.onerror = () => {
        setHasError(true)
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }

    loadSplineScript()
  }, [isVisible])

  useEffect(() => {
    // 当脚本加载完成且组件可见时，创建spline-viewer元素
    if (isScriptLoaded && containerRef.current && isVisible) {
      const container = containerRef.current

      // 检查是否已存在spline-viewer
      if (!container.querySelector("spline-viewer")) {
        // 创建新的spline-viewer元素
        const splineViewer = document.createElement("spline-viewer")
        splineViewer.setAttribute("url", "https://prod.spline.design/uVbRT6PwFRv8aUas/scene.splinecode")
        splineViewer.style.width = "100%"
        splineViewer.style.height = "100%"

        // 添加到容器中
        container.appendChild(splineViewer)
      }
    }

    // 当组件不可见时，暂停渲染
    if (!isVisible && containerRef.current) {
      const splineViewer = containerRef.current.querySelector("spline-viewer")
      if (splineViewer) {
        // 移除spline-viewer以暂停渲染
        containerRef.current.removeChild(splineViewer)
      }
    }
  }, [isScriptLoaded, isVisible])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {isLoading && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="sr-only">Loading Spline scene...</span>
        </div>
      )}

      {hasError && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <p className="text-muted-foreground">Failed to load 3D scene. Please refresh the page.</p>
        </div>
      )}

      <div
        ref={containerRef}
        className={`w-full h-full ${isLoading || !isVisible ? "opacity-0" : "opacity-100"} transition-opacity duration-500 ${
          theme === "light" ? "brightness-110 contrast-125" : ""
        }`}
      />
    </div>
  )
}
