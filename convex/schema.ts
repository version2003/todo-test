import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values'
export default defineSchema({
    users : defineTable({
        name : v.string(),
        email : v.string(),
        image : v.optional(v.string()),
        clerkId : v.string()
    }).index("by_clerk_id", ["clerkId"]),
    
    todos: defineTable({
        userId: v.id("users"),
        projectId: v.id("projects"),
        labelId: v.id("labels"),
        taskName: v.string(),
        description: v.optional(v.string()),
        dueDate: v.number(),
        priority: v.optional(v.float64()),
        isCompleted: v.boolean(),
        embedding: v.optional(v.array(v.float64())),
    }).vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["userId"],
    }),
    
    subTodos: defineTable({
        userId: v.id("users"),
        projectId: v.id("projects"),
        labelId: v.id("labels"),
        parentId: v.id("todos"),
        taskName: v.string(),
        description: v.optional(v.string()),
        dueDate: v.number(),
        priority: v.optional(v.float64()),
        isCompleted: v.boolean(),
        embedding: v.optional(v.array(v.float64())),
    }).vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["userId"],
    }),


    labels : defineTable({
        name : v.string(),
        type : v.union(v.literal("user"), v.literal("system")),
        userId : v.union(v.id("users"), v.null())
    }),
    
    projects : defineTable({
        name : v.string(),
        type : v.union(v.literal("user"), v.literal("system")),
        userId : v.union(v.id("users"), v.null())
    }),

})