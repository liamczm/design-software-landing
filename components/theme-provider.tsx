"use client"

import { useEffect, useState } from "react"
import type { ThemeProviderProps } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // 确保在客户端渲染时才挂载组件，避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 在服务端渲染和未挂载时，使用默认的 dark 主题避免闪烁
  if (!mounted) {
    return (
      <div className="dark" style={{ colorScheme: 'dark' }}>
        {children}
      </div>
    )
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
