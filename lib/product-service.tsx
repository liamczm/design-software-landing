import React from "react"
import { Layers, Zap, Users, Grid, Monitor, Palette, Smartphone } from "lucide-react"
import type { ReactNode } from "react"
import { apiClient, type ApiProduct } from "@/lib/api-client"

// 定义产品功能类型（基于后端API结构）
export interface ProductFeature {
  id?: number
  title: string
  description: string
  helps: string[]
  image: string
}

// 定义产品使用方法类型（基于后端API结构）
export interface ProductHowTo {
  id?: number
  title: string
  description: string
  image: string
}

// 产品类型（结合API数据和本地处理）
export interface Product {
  id: number
  title: string
  subtitle?: string
  icon: string
  tag?: string
  slug?: string
  description: string
  features: ProductFeature[]
  howto: ProductHowTo[]
  videoURL?: string
  image?: string
  detailsId?: number
}

// 获取图标组件
export function getIconComponent(iconName: string): ReactNode {
  switch (iconName?.toLowerCase()) {
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

// 将API产品数据转换为本地产品格式（不包含features和howto，这些从details获取）
function transformApiProductToProduct(apiProduct: ApiProduct, features: ProductFeature[] = [], howto: ProductHowTo[] = []): Product {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    subtitle: apiProduct.subtitle,
    icon: apiProduct.icon || "layers",
    tag: apiProduct.tag,
    slug: apiProduct.slug,
    description: apiProduct.description,
    features,
    howto,
    videoURL: apiProduct.videoURL,
    image: apiProduct.image,
    detailsId: apiProduct.detailsId
  }
}

// 处理base64图片数据
function processImageUrl(imageData: any): string {
  if (typeof imageData === 'string') {
    // 如果是base64数据，添加data URL前缀
    if (imageData.startsWith('/9j/') || imageData.startsWith('iVBOR') || imageData.startsWith('UklGR')) {
      return `data:image/jpeg;base64,${imageData}`
    }
    return imageData
  }
  return "/placeholder.svg?height=400&width=600&text=Image"
}

// 获取所有产品（不包含详情）
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.getProducts()
    
    if (response.success && response.data) {
      // 处理API响应，确保获取正确的产品数组
      const responseData = response.data as any
      const products = Array.isArray(responseData) ? responseData : (responseData.products || [])
      
      return products.map((apiProduct: ApiProduct) => 
        transformApiProductToProduct(apiProduct, [], [])
      )
    } else {
      console.error('获取产品列表失败:', response.message)
      return []
    }
  } catch (error) {
    console.error('获取产品列表时发生错误:', error)
    return []
  }
}

// 通过ID获取产品（不包含详情）
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await apiClient.getProductById(id)
    
    if (response.success && response.data) {
      return transformApiProductToProduct(response.data, [], [])
    } else {
      console.error('获取产品失败:', response.message)
      return null
    }
  } catch (error) {
    console.error('获取产品时发生错误:', error)
    return null
  }
}

// 通过Slug获取产品（不包含详情）- 修复版本：从产品列表中查找
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // 改为从产品列表中查找对应的slug，避免调用有问题的单个产品API
    const allProducts = await getAllProducts()
    const product = allProducts.find(p => p.slug === slug)
    
    if (product) {
      return product
    } else {
      console.error('未找到对应slug的产品:', slug)
      return null
    }
  } catch (error) {
    console.error('通过slug获取产品时发生错误:', error)
    return null
  }
}

// 获取产品详情（包含features和howto）
export async function getProductDetails(detailsId: number): Promise<{ features: ProductFeature[], howto: ProductHowTo[] } | null> {
  try {
    const response = await apiClient.getProductDetails(detailsId)
    
    if (response.success && response.data) {
      const details = response.data
      
      // 处理features数据
      const features: ProductFeature[] = []
      if (details.features && Array.isArray(details.features)) {
        details.features.forEach((feature: any) => {
          features.push({
            id: feature.id,
            title: feature.title || '',
            description: feature.description || '',
            helps: Array.isArray(feature.helps) ? feature.helps : [],
            image: processImageUrl(feature.image)
          })
        })
      }
      
      // 处理howto数据
      const howto: ProductHowTo[] = []
      if (details.howto && Array.isArray(details.howto)) {
        details.howto.forEach((step: any) => {
          howto.push({
            id: step.id,
            title: step.title || '',
            description: step.description || '',
            image: processImageUrl(step.image)
          })
        })
      }
      
      return { features, howto }
    } else {
      console.error('获取产品详情失败:', response.message)
      return null
    }
  } catch (error) {
    console.error('获取产品详情时发生错误:', error)
    return null
  }
}

// 获取完整产品信息（包含features和howto）
export async function getFullProductBySlug(slug: string): Promise<Product | null> {
  try {
    // 首先通过slug获取产品基本信息
    const product = await getProductBySlug(slug)
    
    if (!product) {
      console.error('产品未找到:', slug)
      return null
    }
    
    // 如果没有detailsId，返回基本产品信息（没有features和howto）
    if (!product.detailsId) {
      console.warn('产品缺少detailsId，返回基本信息:', slug)
      return product
    }
    
    // 使用产品的detailsId获取详细信息
    console.log('获取产品详情，detailsId:', product.detailsId)
    const detailsResponse = await apiClient.getProductDetails(product.detailsId)
    
    if (detailsResponse.success && detailsResponse.data) {
      const detailsData = detailsResponse.data as any
      
      // 提取features和howto数据
      const features = detailsData.features || []
      const howto = detailsData.howto || []
      
      console.log(`获取到 ${features.length} 个features 和 ${howto.length} 个howto项目`)
      
      // 转换为组件所需的格式
      const transformedFeatures = features.map((feature: any) => ({
        id: feature._id || feature.id,
        title: feature.title || '',
        description: feature.description || '',
        helps: Array.isArray(feature.helps) ? feature.helps : [],
        image: feature.image || ''
      }))
      
      const transformedHowto = howto.map((item: any) => ({
        id: item._id || item.id,
        title: item.title || '',
        description: item.description || '',
        image: item.image || ''
      }))
      
      // 返回包含详细信息的完整产品
      return {
        ...product,
        features: transformedFeatures,
        howto: transformedHowto
      }
    } else {
      console.error('获取产品详情失败:', detailsResponse.message)
      // 即使详情获取失败，也返回基本产品信息
      return product
    }
  } catch (error) {
    console.error('获取完整产品信息时发生错误:', error)
    // 尝试返回基本产品信息
    try {
      return await getProductBySlug(slug)
    } catch (fallbackError) {
      console.error('获取基本产品信息也失败:', fallbackError)
      return null
    }
  }
}

// 获取相关产品
export async function getRelatedProducts(currentId: number, limit = 2): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts()
    return allProducts
      .filter((product) => product.id !== currentId)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit)
  } catch (error) {
    console.error('获取相关产品时发生错误:', error)
    return []
  }
}

// 检查API连接状态
export async function checkApiConnection(): Promise<boolean> {
  try {
    return await apiClient.testConnection()
  } catch (error) {
    console.error('API连接检查失败:', error)
    return false
  }
}
