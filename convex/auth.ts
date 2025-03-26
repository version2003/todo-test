// import { v } from "convex/values";
// import { action, mutation, query, QueryCtx } from "./_generated/server";
// import { auth } from "@clerk/nextjs/server";
// import { api } from "./_generated/api";
// import { Doc } from "./_generated/dataModel";

// export const handleUserId = action({
//     args: {},
//     handler: async (ctx, args): Promise<Doc<"users"> | null> => {
//         const { userId } = await auth();
//         if (!userId) return null;
//         const currentUser = await ctx.runQuery(api.users.getUserByClerkId, { clerkId: userId });
//         return currentUser;
//     }
// });

