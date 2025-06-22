import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
    args: {
        splitText: v.any(),
        fileId: v.string()
    },
    handler: async (ctx,args) => {
        await ConvexVectorStore.fromTexts(
            args.splitText, // Array
            args.splitText.map(() => ({ fileId: args.fileId })), // Array of objects
            new GoogleGenerativeAIEmbeddings({
                apiKey:'AIzaSyDfCMgSeLBmE5aDJEwOKmlHTXKaGJ6-D_0',
                model: "text-embedding-004", // 768 dimensions
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }),
            { ctx }
        );
        return "Completed.."
    },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
        new GoogleGenerativeAIEmbeddings({
                apiKey:'AIzaSyDfCMgSeLBmE5aDJEwOKmlHTXKaGJ6-D_0',
                model: "text-embedding-004", // 768 dimensions
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title",
            }), { ctx });

    const resultAll = await vectorStore.similaritySearch(args.query.toLowerCase().trim(), 10);
    const result = resultAll.filter(q => q.metadata.fileId === args.fileId);
    console.log("Matched results:", result);

    return JSON.stringify(result);
  },
});
