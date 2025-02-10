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
│  │  ├─ 📄alignButton.tsx 
│  │  ├─ 📄convex-client-provider.tsx
│  │  ├─ 📄fontFamilyButton.tsx
│  │  ├─ 📄fontSizeButton.tsx
│  │  ├─ 📄fullscreen-loader.tsx
│  │  ├─ 📄headingButton.tsx
│  │  ├─ 📄highLightButton.tsx
│  │  ├─ 📄imageButton.tsx
│  │  ├─ 📄lineHeightButton.tsx
│  │  ├─ 📄linkButton.tsx
│  │  ├─ 📄ListButton.tsx
│  │  ├─ 📄maker.tsx
│  │  ├─ 📄remove-dialog.tsx
│  │  ├─ 📄rename-dialog.tsx
│  │  ├─ 📄textColorButton.tsx
│  │  └─ 📄toolBarButton.tsx
│  ├─ 📁constants
│  │  ├─ 📄margin.ts
│  │  └─ 📄templates.ts
│  ├─ 📁extensions
│  │  ├─ 📄font-size.ts
│  │  └─ 📄line-height.ts
│  ├─ 📁hooks
│  │  ├─ 📄use-debounce.ts
│  │  ├─ 📄use-mobile.tsx
│  │  ├─ 📄use-search-params.ts
│  │  └─ 📄use-toast.ts
│  ├─ 📁lib
│  │  ├─ 📄useSections.ts
│  │  └─ 📄utils.ts
│  ├─ 📁store
│  │  └─ 📄use-editor-store.ts
│  └─ 📄middleware.ts
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
