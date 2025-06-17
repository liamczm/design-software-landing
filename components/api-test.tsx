"use client"

import { useEffect, useState } from "react"
import { apiClient, type ApiProduct } from "@/lib/api-client"

interface ApiTestState {
  loading: boolean
  products: ApiProduct[]
  error: string | null
  connectionStatus: 'testing' | 'success' | 'failed'
}

export default function ApiTest() {
  const [state, setState] = useState<ApiTestState>({
    loading: true,
    products: [],
    error: null,
    connectionStatus: 'testing'
  })

  useEffect(() => {
    const testApi = async () => {
      console.log('🔄 开始测试 API 连接...')
      
      try {
        setState(prev => ({ ...prev, loading: true, connectionStatus: 'testing' }))
        
        const response = await apiClient.getProducts()
        
        if (response.success && response.data) {
          console.log('✅ API 测试成功!')
          console.log('📦 获取到的产品数据:', response.data)
          
          setState({
            loading: false,
            products: response.data,
            error: null,
            connectionStatus: 'success'
          })
          
          // 详细输出每个产品信息
          response.data.forEach((product, index) => {
            console.log(`产品 ${index + 1}:`, {
              id: product.id,
              title: product.title,
              description: product.description,
              tag: product.tag,
              slug: product.slug
            })
          })
          
        } else {
          console.error('❌ API 测试失败:', response.message)
          setState({
            loading: false,
            products: [],
            error: response.message || '未知错误',
            connectionStatus: 'failed'
          })
        }
      } catch (error) {
        console.error('💥 API 测试异常:', error)
        setState({
          loading: false,
          products: [],
          error: error instanceof Error ? error.message : '网络连接异常',
          connectionStatus: 'failed'
        })
      }
    }

    testApi()
  }, [])

  const getStatusIcon = () => {
    switch (state.connectionStatus) {
      case 'testing': return '🔄'
      case 'success': return '✅'
      case 'failed': return '❌'
      default: return '❓'
    }
  }

  const getStatusText = () => {
    switch (state.connectionStatus) {
      case 'testing': return '正在测试API连接...'
      case 'success': return 'API连接成功!'
      case 'failed': return 'API连接失败'
      default: return '未知状态'
    }
  }

  return (
    <div className="p-6 border border-border rounded-lg bg-background/50 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4">API 连接测试</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{getStatusIcon()}</span>
        <span className={`font-medium ${
          state.connectionStatus === 'success' ? 'text-green-600' :
          state.connectionStatus === 'failed' ? 'text-red-600' :
          'text-yellow-600'
        }`}>
          {getStatusText()}
        </span>
      </div>

      {state.loading && (
        <div className="animate-pulse text-muted-foreground">
          正在从 API 获取数据...
        </div>
      )}

      {state.error && (
        <div className="text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-md mb-4">
          <strong>错误:</strong> {state.error}
        </div>
      )}

      {state.connectionStatus === 'success' && (
        <div className="space-y-3">
          <div className="text-green-600 bg-green-50 dark:bg-green-950/20 p-3 rounded-md">
            <strong>成功获取到 {state.products.length} 个产品!</strong>
          </div>
          
          <div className="max-h-64 overflow-y-auto space-y-2">
            {state.products.map((product, index) => (
              <div key={product.id} className="p-3 border border-border/50 rounded-md bg-background/30">
                <div className="font-medium">{index + 1}. {product.title}</div>
                {product.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {product.description.substring(0, 100)}...
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  ID: {product.id} | Tag: {product.tag || 'N/A'} | Slug: {product.slug || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground mt-4">
        API 端点: http://8.147.132.134:8186/api/v1/products
      </div>
    </div>
  )
} 