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

// 核心方法：将API产品数据转换为本地产品格式（包含完整的features和howto）
async function transformApiProductToProduct(apiProduct: ApiProduct): Promise<Product> {
  let features: ProductFeature[] = []
  let howto: ProductHowTo[] = []
  
  // 如果产品有detailsId，获取详细信息
  if (apiProduct.detailsId) {
    try {
      console.log(`获取产品详情，detailsId: ${apiProduct.detailsId}`)
      const detailsResponse = await apiClient.getProductDetails(apiProduct.detailsId)
      
      if (detailsResponse.success && detailsResponse.data) {
        const details = detailsResponse.data
        
        // 根据API响应结构处理数据 - API返回 {status: "success", details: {...}}
        const actualDetails = details.details || details
        
        // 处理features数据
        if (actualDetails.features && Array.isArray(actualDetails.features)) {
          features = actualDetails.features.map((feature: any) => ({
            id: feature._id || feature.id,
            title: feature.title || '',
            description: feature.description || '',
            helps: Array.isArray(feature.helps) ? feature.helps : [],
            image: processImageUrl(feature.image)
          }))
        }
        
        // 处理howto数据
        if (actualDetails.howto && Array.isArray(actualDetails.howto)) {
          howto = actualDetails.howto.map((step: any) => ({
            id: step._id || step.id,
            title: step.title || '',
            description: step.description || '',
            image: processImageUrl(step.image)
          }))
        }
        
        console.log(`成功获取 ${features.length} 个features 和 ${howto.length} 个howto项目`)
      } else {
        console.warn(`获取产品详情失败: ${detailsResponse.message}`)
      }
    } catch (error) {
      console.error('获取产品详情时发生错误:', error)
    }
  }
  
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

// 获取所有产品（包含完整的详情信息）
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.getProducts()
    
    if (response.success && response.data) {
      // 处理API响应，确保获取正确的产品数组
      const responseData = response.data as any
      const apiProducts = Array.isArray(responseData) ? responseData : (responseData.products || [])
      
      // 并行获取所有产品的完整信息
      const productPromises = apiProducts.map((apiProduct: ApiProduct) => 
        transformApiProductToProduct(apiProduct)
      )
      
      return await Promise.all(productPromises)
    } else {
      console.error('获取产品列表失败:', response.message)
      return []
    }
  } catch (error) {
    console.error('获取产品列表时发生错误:', error)
    return []
  }
}

// 获取产品列表（仅基本信息，不包含详情）- 用于首页等不需要详情的页面
export async function getProductsBasicInfo(): Promise<Product[]> {
  try {
    const response = await apiClient.getProducts()
    
    if (response.success && response.data) {
      const responseData = response.data as any
      const apiProducts = Array.isArray(responseData) ? responseData : (responseData.products || [])
      
      return apiProducts.map((apiProduct: ApiProduct) => ({
        id: apiProduct.id,
        title: apiProduct.title,
        subtitle: apiProduct.subtitle,
        icon: apiProduct.icon || "layers",
        tag: apiProduct.tag,
        slug: apiProduct.slug,
        description: apiProduct.description,
        features: [], // 基本信息不包含详情
        howto: [],   // 基本信息不包含详情
        videoURL: apiProduct.videoURL,
        image: apiProduct.image,
        detailsId: apiProduct.detailsId
      }))
    } else {
      console.error('获取产品列表失败:', response.message)
      return []
    }
  } catch (error) {
    console.error('获取产品列表时发生错误:', error)
    return []
  }
}

// 通过slug获取完整产品信息（包含features和howto）
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log(`通过slug获取产品: ${slug}`)
    
    // 先获取产品基本信息列表
    const response = await apiClient.getProducts()
    
    if (!response.success || !response.data) {
      console.error('获取产品列表失败:', response.message)
      return null
    }
    
    const responseData = response.data as any
    const apiProducts = Array.isArray(responseData) ? responseData : (responseData.products || [])
    
    // 找到对应slug的产品
    const apiProduct = apiProducts.find((p: ApiProduct) => p.slug === slug)
    
    if (!apiProduct) {
      console.error('未找到对应slug的产品:', slug)
      return null
    }
    
    // 使用transformApiProductToProduct获取完整产品信息
    return await transformApiProductToProduct(apiProduct)
  } catch (error) {
    console.error('通过slug获取产品时发生错误:', error)
    return null
  }
}

// 获取相关产品（基本信息）
export async function getRelatedProducts(currentId: number, limit = 2): Promise<Product[]> {
  try {
    const allProducts = await getProductsBasicInfo()
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
