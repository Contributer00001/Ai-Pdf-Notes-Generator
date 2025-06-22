import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const AddNotes = mutation({
    args:{
        fileId:v.string(),
        notes:v.any(),
        createdBy:v.string()
    },
    handler:async(ctx,args)=>{
        const recordId=await ctx.db.query('notes')
        .filter((q)=>q.eq(q.field('fileId'),args))
    }
})