import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string(),

    },
    handler: async (ctx, args) => {
        // if user exists
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();
        //else new entry
        if (user?.length == 0) {
            await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
                upgrade:false
            });

            return 'Inserted New User...'
        }

        return 'User Already Exists'
    }
})

export const userUpgradePlan=mutation({
    args:{
        userEmail:v.string()
    },
    handler:await(ctx,args)=>{
        const result = await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email')))
    }
})