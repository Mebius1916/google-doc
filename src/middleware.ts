/*
  这个文件是 Next.js 的全局中间件配置，主要作用是通过 Clerk 身份验证服务保护网站路由：
    - 它会自动拦截所有非静态资源请求（如图片/CSS/JS 等）和 API 路由，强制进行用户身份验证检查，
    - 同时排除 Next.js 内部路由和静态文件处理以优化性能，确保未登录用户无法访问受保护页面和后端接口。
*/

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  
  ],
};