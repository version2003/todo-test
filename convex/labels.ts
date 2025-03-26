import { query, mutation } from "./_generated/server";
import { v } from "convex/values";


export const getLabels = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()
    if (userId) {
      const userLabels = await ctx.db
        .query("labels")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .collect();

      const systemLabels = await ctx.db.query("labels").collect();

      return [...systemLabels, ...userLabels];
    }
    return [];
  },
});

export const getLabelByLabelId = query({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()
    if (user?._id) {
      const project = await ctx.db
        .query("labels")
        .filter((q) => q.eq(q.field("_id"), labelId))
        .collect();

      return project?.[0] || null;
    }
    return null;
  },
});

export const createALabel = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      const userId = await ctx.auth.getUserIdentity()
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()
      if (user?._id) {
        const newTaskId = await ctx.db.insert("labels", {
          userId: user?._id,
          name,
          type: "user",
        });
        return newTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during createALabel mutation", err);

      return null;
    }
  },
});
