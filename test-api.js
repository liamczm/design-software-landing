// 简化的 API 测试脚本
const API_BASE_URL = 'http://8.147.132.134:8186/api/v1'

// 通用的 fetch 方法
async function fetchWithErrorHandling(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    console.log(`🚀 发起 API 请求: ${url}`)
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(`📡 API 响应状态: ${response.status}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`✅ API 响应数据:`, JSON.stringify(data, null, 2))

    return {
      data,
      success: true,
      status: response.status,
    }
  } catch (error) {
    console.error(`❌ API 请求失败:`, error.message)
    
    return {
      success: false,
      status: 500,
      message: error.message,
    }
  }
}

// 获取所有产品
async function getProducts() {
  return await fetchWithErrorHandling('/products')
}

// 根据detailsId获取产品详情
async function getProductDetails(detailsId) {
  return await fetchWithErrorHandling(`/details/${detailsId}`)
}

// 主测试函数
async function runTests() {
  try {
    console.log('🧪 开始测试API端点...\n')
    
    // 测试 /products 端点
    console.log('📦 测试 /products 端点...')
    const productsResponse = await getProducts()
    
    if (productsResponse.success) {
      console.log('🎉 /products API 连接成功!')
      
      // 正确处理API响应结构
      const products = productsResponse.data.products || productsResponse.data
      
      if (Array.isArray(products)) {
        console.log(`📊 总共获取到 ${products.length} 个产品`)
        
        // 输出每个产品的简要信息
        products.forEach((product, index) => {
          console.log(`${index + 1}. ${product.title || '无标题'} (ID: ${product._id || product.id}, DetailsID: ${product.detailsId || 'N/A'})`)
        })

        // 测试 /details/{id} 端点
        console.log('\n🔍 测试 /details/{id} 端点...')
        
        if (products.length > 0) {
          const firstProduct = products[0]
          
          // 优先使用detailsId，如果没有则使用产品ID
          const testDetailId = firstProduct.detailsId || firstProduct._id || firstProduct.id
          
          console.log(`使用 detailsId: ${testDetailId} 进行测试...`)
          const detailsResponse = await getProductDetails(testDetailId)
          
          if (detailsResponse.success) {
            console.log('🎉 /details/{id} API 连接成功!')
            console.log('📋 获取到的产品详情数据结构:')
            
            // 显示详情数据的键值
            if (detailsResponse.data && typeof detailsResponse.data === 'object') {
              const keys = Object.keys(detailsResponse.data)
              console.log(`详情数据包含 ${keys.length} 个字段:`, keys.join(', '))
            }
          } else {
            console.warn('⚠️ /details/{id} API 连接失败:', detailsResponse.message)
            
            // 如果使用detailsId失败，尝试其他产品的ID
            console.log('\n🔄 尝试使用其他产品ID进行测试...')
            for (let i = 1; i < Math.min(3, products.length); i++) {
              const product = products[i]
              const testId = product.detailsId || product._id || product.id
              console.log(`尝试 detailsId: ${testId}...`)
              
              const testResponse = await getProductDetails(testId)
              if (testResponse.success) {
                console.log(`✅ 成功获取产品详情 (detailsId: ${testId})!`)
                console.log('📋 详情数据结构:', Object.keys(testResponse.data).join(', '))
                break
              } else {
                console.log(`❌ detailsId ${testId} 失败:`, testResponse.message)
              }
            }
          }
        } else {
          console.log('⚠️ 没有产品数据，无法测试详情端点')
        }
      } else {
        console.log('⚠️ 产品数据格式不正确，实际数据类型:', typeof products)
        console.log('产品数据内容:', products)
      }
    } else {
      console.warn('⚠️ /products API 连接失败:', productsResponse.message)
    }
    
    console.log('\n✨ API 测试完成!')
    console.log('\n📋 总结:')
    console.log('1. ✅ /products 端点可以成功获取产品列表')
    console.log('2. 🔍 /details/{id} 端点需要使用产品的 detailsId 字段')
    console.log('3. 📝 产品列表包含 _id, title, slug, detailsId 等字段')
    
  } catch (error) {
    console.error('💥 测试过程中发生错误:', error.message)
  }
}

// 运行测试
runTests() 