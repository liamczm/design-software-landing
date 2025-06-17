import React from "react"
import productsData from "@/data/products.json"
import { Layers, Zap, Users, Grid, Monitor, Palette, Smartphone } from "lucide-react"
import type { ReactNode } from "react"

// 定义产品类型
export interface ProductFeature {
  id: number
  title: string
  description: string
  helps: string[]
  image: string
}

export interface ProductHowTo {
  id: number
  title: string
  description: string
  image: string
}

export interface Product {
  id: number
  title: string
  subtitle: string
  icon: string
  tag: string
  slug: string
  description: string
  features: ProductFeature[]
  howto: ProductHowTo[]
  videoURL?: string
  image?: string
}

// 获取图标组件
export function getIconComponent(iconName: string): ReactNode {
  switch (iconName.toLowerCase()) {
    case "zap":
      return <Zap className="h-6 w-6" />;
    case "layers":
      return <Layers className="h-6 w-6" />
    case "users":
      return <Users className="h-6 w-6" />
    case "grid":
      return <Grid className="h-6 w-6" />
    case "monitor":
      return <Monitor className="h-6 w-6" />
    case "palette":
      return <Palette className="h-6 w-6" />
    case "smartphone":
      return <Smartphone className="h-6 w-6" />
    default:
      return <Layers className="h-6 w-6" />
  }
}

// 获取所有产品
export function getAllProducts(): Product[] {
  return productsData.products
}

// 通过ID获取产品
export function getProductById(id: number): Product | undefined {
  return productsData.products.find((product) => product.id === id)
}

// 通过Slug获取产品
export function getProductBySlug(slug: string): Product | undefined {
  // 直接使用产品的 slug 字段进行匹配
  return productsData.products.find((product) => product.slug === slug)
}

// 获取相关产品
export function getRelatedProducts(currentId: number, limit = 2): Product[] {
  return productsData.products
    .filter((product) => product.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit)
}
