import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// This is to create the user
export const syncUser = mutation({
    args :{
        name : v.string(),
        email : v.string(),
        clerkId : v.string(),
        image : v.optional(v.string())
    },
    handler: async(ctx, args) =>{
        // checking if the user already exists
        const existingUser = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), args.clerkId)).first()

        if(existingUser){
            return
        }
        // save user to the db
        return await ctx.db.insert("users",{
            ...args
        })
    }
}) 

export const getUserByClerkId = query({

    args : {clerkId : v.string()},

    handler: async (ctx, args) => {
        const user = await ctx.db.query('users').withIndex("by_clerk_id",
            (q) => q.eq("clerkId", args.clerkId)
        ).first();

        return user
    }
})