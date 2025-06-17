# 主题闪烁问题修复

## 问题描述
在导航到 `/products` 页面时，页面会短暂显示为浅色主题，然后切换到深色主题，造成不良的用户体验。

## 问题根因
1. **服务端渲染 (SSR) 与客户端不匹配**: 服务端不知道用户的主题偏好
2. **ThemeProvider 挂载延迟**: React 组件挂载前没有应用正确的主题
3. **缺少主题预加载**: 没有在页面加载前设置主题类

## 修复方案

### 1. 优化 ThemeProvider 组件
```typescript
// 在未挂载时使用 dark 主题容器，避免显示默认的 light 主题
if (!mounted) {
  return (
    <div className="dark" style={{ colorScheme: 'dark' }}>
      {children}
    </div>
  )
}
```

### 2. 添加防闪烁内联脚本
在 `<head>` 中添加同步执行的脚本，在页面渲染前立即应用正确的主题：

```javascript
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {
    // 默认使用 dark 主题
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
```

### 3. 优化 ThemeProvider 配置
- 禁用系统主题检测 (`enableSystem={false}`)
- 关闭主题切换过渡动画 (`disableTransitionOnChange={true}`)
- 明确指定存储键 (`storageKey="theme"`)

## 修复效果
- ✅ 消除主题闪烁
- ✅ 页面导航时保持一致的主题
- ✅ 改善用户体验
- ✅ 支持主题持久化

## 测试步骤
1. 访问主页
2. 点击 "View All Products" 按钮
3. 观察页面是否有主题闪烁
4. 在不同主题间切换，测试持久化是否正常

## 技术说明
这个解决方案使用了以下技术：
- **内联脚本**: 在 HTML 解析时同步执行，避免异步延迟
- **错误处理**: 对 localStorage 访问进行异常捕获
- **回退机制**: 当检测失败时使用默认的 dark 主题
- **CSP 兼容**: 使用 `dangerouslySetInnerHTML` 注入脚本 