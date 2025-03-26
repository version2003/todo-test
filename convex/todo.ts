import { Id } from "./_generated/dataModel";
import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
// import { handleUserId } from "./auth";
import moment from "moment";
// import { getEmbeddingsWithAI } from "./openai";
import { api } from "./_generated/api";
// import { getEmbeddingsWithAI } from "./openai";

// export const getTodos = query({
//   args: {},
//   handler: async (ctx) => {
//     const 
// })
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    return await ctx.db.query("todos").filter(q => q.eq(q.field("userId"), user?._id)).collect()
    
    // return await ctx.db.query("users").filter((q) => q.eq(q.field("clerkId"), userId?.subject)).collect()
    // return userId?.subject;
  },
});


export const getCompletedTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
    }
    return [];
  },
});

export const getTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .collect();
    }
    return [];
  },
});

export const getInCompleteTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect();
    }
    return [];
  },
});

export const getTodosTotalByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("projectId"), projectId))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();

      return todos?.length || 0;
    }
    return 0;
  },
});

export const todayTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()


    if (userId) {
      const todayStart = moment().startOf("day");
      const todayEnd = moment().endOf("day");

      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter(
          (q) =>
            q.gte(q.field("dueDate"), todayStart.valueOf()) &&
            q.lte(todayEnd.valueOf(), q.field("dueDate"))
        )
        .collect();
    }
    return [];
  },
});

export const overdueTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()


    if (userId) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.lt(q.field("dueDate"), todayStart.getTime()))
        .collect();
    }
    return [];
  },
});

export const completedTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
    }
    return [];
  },
});

export const inCompleteTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("isCompleted"), false))
        .collect();
    }
    return [];
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()

    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.eq(q.field("isCompleted"), true))
        .collect();
      return todos.length || 0;
    }
    return 0;
  },
});

export const checkATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, {"isCompleted" : true });
    return newTaskId;
  },
});

export const unCheckATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, {"isCompleted" : false });
    return newTaskId;
  },
});

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    embedding: v.optional(v.array(v.float64())),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    try {
      const userId = await ctx.auth.getUserIdentity()
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()
  
      if (user) {
        const newTaskId = await ctx.db.insert('todos', {
          userId: user._id,
          taskName,
          description,
          priority,
          dueDate,
          projectId,
          labelId,
          isCompleted: false,
          // embedding,
        });
        return newTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during createATodo mutation", err);

      return null;
    }
  },
});

export const createTodoAndEmbeddings = action({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    // const embedding = await getEmbeddingsWithAI(taskName);
    await ctx.runMutation(api.todo.createATodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      // embedding,
    });
  },
});

export const groupTodosByDate = query({
  args: {},
  handler: async (ctx) => {
    const userId = await ctx.auth.getUserIdentity()
    const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()


    if (userId) {
      const todos = await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .filter((q) => q.gt(q.field("dueDate"), new Date().getTime()))
        .collect();

      const groupedTodos = todos.reduce<any>((acc, todo) => {
        const dueDate = new Date(todo.dueDate).toDateString();
        acc[dueDate] = (acc[dueDate] || []).concat(todo);
        return acc;
      }, {});

      return groupedTodos;
    }
    return [];
  },
});

export const deleteATodo = mutation({
  args: {
    taskId: v.id("todos"),
  },
  handler: async (ctx, { taskId }) => {
    try {
      const userId = await ctx.auth.getUserIdentity()
      const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), userId?.subject)).first()
  
      if (user) {
        const deletedTaskId = await ctx.db.delete(taskId);
        //query todos and map through them and delete

        return deletedTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during deleteATodo mutation", err);

      return null;
    }
  },
});
