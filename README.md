```
google-doc
├─ 📁convex
│  ├─ 📁_generated 自动生成的文件
│  ├─ 📄auth.config.ts 配置convex
│  ├─ 📄documents.ts 定义convex数据库crud逻辑接口
│  └─ 📄schema.ts 定义数据库schema
├─ 📁public
├─ 📁src
│  ├─ 📁app
│  │  ├─ 📁(home) 首页 
│  │  │  ├─ 📄document-menu.tsx 表格行
│  │  │  ├─ 📄document-row.tsx 首页文档表格的具体行组件
│  │  │  ├─ 📄documents-table.tsx 首页文档表格组件
│  │  │  ├─ 📄navbar.tsx 首页导航栏组件
│  │  │  ├─ 📄page.tsx 首页主体页面
│  │  │  ├─ 📄search-input.tsx 首页搜索框组件
│  │  │  └─ 📄templates-gallery.tsx 首页模板库组件
│  │  ├─ 📁api
│  │  │  └─ 📁liveblocks-auth
│  │  │     └─ 📄route.ts liveblocks鉴权逻辑
│  │  ├─ 📁documents 协作文档
│  │  │  └─ 📁[documentId] 
│  │  │     ├─ 📄action.ts 从clerk获取用户列表
│  │  │     ├─ 📄avatars.tsx 右上角在线协作用户头像
│  │  │     ├─ 📄document-input.tsx 文档title编辑框
│  │  │     ├─ 📄document.tsx 文档主体组件
│  │  │     ├─ 📄editor.tsx a4纸组件
│  │  │     ├─ 📄inbox.tsx 右上角消息通知组件
│  │  │     ├─ 📄loading.tsx 加载组件
│  │  │     ├─ 📄narbar.tsx 导航栏组件
│  │  │     ├─ 📄page.tsx 文档主体页面
│  │  │     ├─ 📄room.tsx liveblocks在线协作组件
│  │  │     ├─ 📄ruler.tsx 尺组件
│  │  │     ├─ 📄threads.tsx liveblocks评论组件
│  │  │     └─ 📄toolbar.tsx 工具栏组件
│  │  ├─ 📁fonts
│  │  ├─ 📄error.tsx liveblocks错误组件
│  │  ├─ 📄favicon.ico
│  │  ├─ 📄globals.css 全局css
│  │  └─ 📄layout.tsx 布局组件
│  ├─ 📁components toolbar组件
│  │  ├─ 📁ui shadcnUI组件
│  │  ├─ 📄alignButton.tsx 文本对齐按钮组件
│  │  ├─ 📄convex-client-provider.tsx Convex客户端Provider组件
│  │  ├─ 📄fontFamilyButton.tsx 字体选择按钮组件
│  │  ├─ 📄fontSizeButton.tsx 字号选择按钮组件
│  │  ├─ 📄fullscreen-loader.tsx 全屏加载组件
│  │  ├─ 📄headingButton.tsx 标题样式按钮组件
│  │  ├─ 📄highLightButton.tsx 文本高亮按钮组件
│  │  ├─ 📄imageButton.tsx 图片上传按钮组件
│  │  ├─ 📄lineHeightButton.tsx 行高调整按钮组件
│  │  ├─ 📄linkButton.tsx 超链接按钮组件
│  │  ├─ 📄ListButton.tsx 列表样式按钮组件
│  │  ├─ 📄maker.tsx 文档水印组件
│  │  ├─ 📄remove-dialog.tsx 删除确认对话框组件
│  │  ├─ 📄rename-dialog.tsx 重命名对话框组件
│  │  ├─ 📄textColorButton.tsx 文字颜色按钮组件
│  │  └─ 📄toolBarButton.tsx 工具栏按钮基础组件
│  ├─ 📁constants
│  │  ├─ 📄margin.ts 边距抽离
│  │  └─ 📄templates.ts 首页模板抽离
│  ├─ 📁extensions
│  │  ├─ 📄font-size.ts 自定义字体大小扩展
│  │  └─ 📄line-height.ts 自定义行高扩展
│  ├─ 📁hooks
│  │  ├─ 📄use-debounce.ts 自定义防抖hook
│  │  ├─ 📄use-mobile.tsx shadcn自带hook
│  │  ├─ 📄use-search-params.ts 基于nuqs的useQueryState封装
│  │  └─ 📄use-toast.ts shadcn自带hook
│  ├─ 📁lib
│  │  ├─ 📄useSections.ts 工具栏配置抽离
│  │  └─ 📄utils.ts cn函数
│  ├─ 📁store
│  │  └─ 📄use-editor-store.ts zustand状态管理
│  └─ 📄middleware.ts  clerk中间件
```


#### 联动流程
1. 用户通过Clerk登录 → 获取JWT令牌
2. Liveblocks使用Clerk身份建立连接
3. 文档编辑时：
   - Liveblocks实时同步操作
   - 定期提交操作日志到Convex
4. Convex处理：
   - 验证权限（通过Clerk身份）
   - 持久化存储数据
   - 触发业务逻辑

#### 优势组合
- 🔐 Clerk统一权限控制
- 💾 Convex保证数据一致性
- ⚡ Liveblocks处理高频交互
- 🔗 通过用户ID体系实现数据关联
