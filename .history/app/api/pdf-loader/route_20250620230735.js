import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl = 'https://brazen-ladybug-912.convex.cloud/api/storage/50abb309-264f-4194-af2c-37e0120e8abe'

export async function GET(req) {

    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    // const pdfUrl = searchParams.get('pdfUrl');
    console.log(pdfUrl)
    //1. Load the pdf file
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc => {
        pdfTextContent = pdfTextContent + doc.pageContent;
    })

    //2. Splitting text into small chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });

    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList=[];
    output.forEach(doc=>{
        splitterList.push(doc.pageContent)
    })

    return NextResponse.json({ result: splitterList })
}