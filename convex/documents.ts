import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// 创建新文档的 mutation 函数（用于修改数据库）
export const create = mutation({
  // 定义参数类型：
  // title: 可选的字符串，用于文档标题
  // initialContent: 可选的字符串，用于文档初始内容
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // 获取当前用户身份
    const user = await ctx.auth.getUserIdentity();
    
    // 如果用户未登录，抛出未授权错误
    if (!user) {
      throw new ConvexError("Unathorized");
    }

    // 在数据库中创建新文档
    return await ctx.db.insert("documents", {
      // 如果没有提供标题，使用默认标题 "Untitled document"
      title: args.title ?? "Untitled coument",
      // 存储文档所有者的 ID
      ownerId: user.subject,
      // 存储文档的初始内容
      initialContent: args.initialContent,
    });
  }
})

// 连接documents数据库
export const get = query({
  args: {
    paginationOpts: paginationOptsValidator
  },
  handler: async (ctx, args) => {
    // 分页获取数据，ctx是上下文对象，args是传入的参数
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  }
});