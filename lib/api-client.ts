// API 客户端配置
const API_BASE_URL = 'http://8.147.132.134:8186/api/v1'

// API 响应类型定义
interface ApiResponse<T> {
  data?: T
  message?: string
  success: boolean
  status: number
}

// 产品类型定义（基于后端API的响应结构）
export interface ApiProduct {
  id: number
  title: string
  subtitle?: string
  icon?: string
  tag?: string
  slug?: string
  description: string
  features?: any[]
  howto?: any[]
  videoURL?: string
  image?: string
  // 添加其他可能的字段
  [key: string]: any
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  /**
   * 通用的 fetch 方法
   */
  private async fetchWithErrorHandling<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      console.log(`🚀 发起 API 请求: ${url}`)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      console.log(`📡 API 响应状态: ${response.status}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ API 响应数据:`, data)

      return {
        data,
        success: true,
        status: response.status,
      }
    } catch (error) {
      console.error(`❌ API 请求失败:`, error)
      
      return {
        success: false,
        status: 500,
        message: error instanceof Error ? error.message : '未知错误',
      }
    }
  }

  /**
   * 获取所有产品
   */
  async getProducts(): Promise<ApiResponse<ApiProduct[]>> {
    return this.fetchWithErrorHandling<ApiProduct[]>('/products')
  }

  /**
   * 根据ID获取单个产品
   */
  async getProductById(id: number): Promise<ApiResponse<ApiProduct>> {
    return this.fetchWithErrorHandling<ApiProduct>(`/products/${id}`)
  }

  /**
   * 根据slug获取单个产品
   */
  async getProductBySlug(slug: string): Promise<ApiResponse<ApiProduct>> {
    return this.fetchWithErrorHandling<ApiProduct>(`/products/slug/${slug}`)
  }

  /**
   * 测试API连接
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.getProducts()
      return response.success
    } catch (error) {
      console.error('API 连接测试失败:', error)
      return false
    }
  }
}

// 创建默认的 API 客户端实例
export const apiClient = new ApiClient()

// 导出类以便创建自定义实例
export { ApiClient }

// 便捷的导出函数
export const getProducts = () => apiClient.getProducts()
export const getProductById = (id: number) => apiClient.getProductById(id)
export const getProductBySlug = (slug: string) => apiClient.getProductBySlug(slug)
export const testApiConnection = () => apiClient.testConnection()

// 立即测试API连接并输出数据到控制台
console.log('🔄 初始化 API 客户端...')

// 自动执行API测试
;(async () => {
  try {
    console.log('🧪 测试API连接...')
    
    const productsResponse = await apiClient.getProducts()
    
    if (productsResponse.success) {
      console.log('🎉 API 连接成功!')
      console.log('📦 获取到的产品数据:', productsResponse.data)
      
      if (Array.isArray(productsResponse.data)) {
        console.log(`📊 总共获取到 ${productsResponse.data.length} 个产品`)
        
        // 输出每个产品的简要信息
        productsResponse.data.forEach((product, index) => {
          console.log(`${index + 1}. ${product.title || '无标题'} (ID: ${product.id})`)
        })
      }
    } else {
      console.warn('⚠️ API 连接失败:', productsResponse.message)
    }
  } catch (error) {
    console.error('💥 API 测试过程中发生错误:', error)
  }
})() 