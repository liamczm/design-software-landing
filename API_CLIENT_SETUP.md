# API 客户端设置

## 概述
已创建了一个完整的 API 客户端来从后端服务器获取数据，支持从 `http://8.147.132.134:8186/api/v1/products` 获取产品数据。

## 文件结构
```
lib/
└── api-client.ts          # 主要的API客户端文件
components/
└── api-test.tsx           # API测试组件
```

## API 客户端功能

### 1. 核心功能
- ✅ 获取所有产品 (`getProducts()`)
- ✅ 根据ID获取单个产品 (`getProductById(id)`)
- ✅ 根据slug获取单个产品 (`getProductBySlug(slug)`)
- ✅ 测试API连接 (`testConnection()`)

### 2. 错误处理
- 网络错误处理
- HTTP状态码检查
- 超时处理
- 详细的错误日志

### 3. 类型安全
- TypeScript 类型定义
- 完整的接口声明
- 泛型支持

## 使用方法

### 基本使用
```typescript
import { apiClient, getProducts } from '@/lib/api-client'

// 方法 1: 使用便捷函数
const products = await getProducts()

// 方法 2: 使用客户端实例
const response = await apiClient.getProducts()
if (response.success) {
  console.log('产品数据:', response.data)
}
```

### 在组件中使用
```typescript
"use client"

import { useEffect, useState } from 'react'
import { getProducts, type ApiProduct } from '@/lib/api-client'

export default function ProductList() {
  const [products, setProducts] = useState<ApiProduct[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts()
      if (response.success && response.data) {
        setProducts(response.data)
      }
    }
    loadProducts()
  }, [])

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  )
}
```

## API 响应格式

### 成功响应
```typescript
{
  data: ApiProduct[],    // 产品数据数组
  success: true,         // 成功标志
  status: 200           // HTTP状态码
}
```

### 错误响应
```typescript
{
  success: false,        // 失败标志
  status: 500,          // HTTP状态码
  message: "错误信息"    // 错误描述
}
```

## 产品数据结构
```typescript
interface ApiProduct {
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
  [key: string]: any    // 支持额外字段
}
```

## 控制台输出

API 客户端会自动输出详细的日志信息：

### 请求日志
```
🚀 发起 API 请求: http://8.147.132.134:8186/api/v1/products
📡 API 响应状态: 200
✅ API 响应数据: [产品数据]
```

### 测试日志
```
🔄 初始化 API 客户端...
🧪 测试API连接...
🎉 API 连接成功!
📦 获取到的产品数据: [详细数据]
📊 总共获取到 X 个产品
1. 产品名称 (ID: 1)
2. 产品名称 (ID: 2)
...
```

### 错误日志
```
❌ API 请求失败: [错误信息]
⚠️ API 连接失败: [失败原因]
💥 API 测试过程中发生错误: [异常详情]
```

## 测试组件

已创建了 `ApiTest` 组件用于可视化测试 API 连接：

### 功能特性
- 实时显示连接状态
- 显示获取到的产品数量
- 展示产品列表
- 错误信息展示
- 加载状态指示

### 查看测试结果
1. 访问主页
2. 滚动到 "API 连接测试" 部分
3. 查看连接状态和数据
4. 打开浏览器控制台查看详细日志

## 配置说明

### API 端点
```typescript
const API_BASE_URL = 'http://8.147.132.134:8186/api/v1'
```

### 自定义配置
```typescript
// 创建自定义 API 客户端
const customClient = new ApiClient('https://your-api.com/api/v1')
```

## CORS 注意事项

如果遇到 CORS 错误，请确保：
1. 后端服务器允许跨域请求
2. 正确配置 CORS 头部
3. 如果是开发环境，可以考虑使用代理

## 下一步

1. 检查控制台输出确认数据获取成功
2. 根据实际 API 响应调整数据类型
3. 在其他组件中集成 API 客户端
4. 添加缓存和数据管理功能 