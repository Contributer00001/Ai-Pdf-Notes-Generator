import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req) {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log("[pdf-loader] pdfUrl:", pdfUrl);

    const response = await fetch(pdfUrl);
    const data = await response.blob();

    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc => {
        pdfTextContent += doc.pageContent;
    });

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });

    const output = await splitter.createDocuments([pdfTextContent]);

    const splitterList = output
        .map(doc => doc.pageContent?.trim())
        .filter(text => typeof text === "string" && text.length > 10)
        .map(text => text.slice(0, 1000)); // optional trim

    console.log(`[pdf-loader] Final chunk count: ${splitterList.length}`);

    return NextResponse.json({ result: splitterList });
}
