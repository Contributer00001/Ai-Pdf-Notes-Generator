import { mutation } from "./_generated/server";

export const AddNotes = mutation({
    args:{
        fileId:v.string(),
        notes:vany()
    }
})