import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

// Action: Ingest split text chunks and embed into vector DB
export const ingest = action({
  args: {
    splitText: v.array(v.string()),  // Ensure it's an array of strings
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: 'AIzaSyDfCMgSeLBmE5aDJEwOKmlHTXKaGJ6-D_0',
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => ({ fileId: args.fileId })),  // associate each chunk with fileId
      embeddings,
      { ctx }
    );

    return "Embedding completed";
  },
});

// Action: Perform semantic search on fileId-filtered chunks
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: 'AIzaSyDfCMgSeLBmE5aDJEwOKmlHTXKaGJ6-D_0',
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    const vectorStore = new ConvexVectorStore(embeddings, { ctx });

    const results = await vectorStore.similaritySearch(args.query, 5);  // Get top 5 similar chunks
    const filtered = results.filter(r => r.metadata?.fileId === args.fileId);

    console.log("Matched Chunks:", filtered.map(r => r.pageContent));  // Log matched content

    return filtered.map(r => r.pageContent);  // Return only text content
  },
});

