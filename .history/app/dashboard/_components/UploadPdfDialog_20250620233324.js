"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import React, { useState } from 'react'
import { Input } from "../../../components/ui/input"
import { useAction, useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Button from "../../../components/ui/button"
import { Loader2Icon } from "lucide-react"
import uuid4 from 'uuid4';
import { useUser } from "@clerk/nextjs"
import axios from "axios"

function UploadPdfDialog({ children }) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry= useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl= useMutation(api.fileStorage.getFileUrl)
    const embeddDocument=useAction(api.myActions.ingest)
    const {user} = useUser()
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false)
    const [fileName,setFileName] = useState()

    const OnFileSelect = (event) => {
        setFile(event.target.files[0])
    }

    const OnUpload = async () => {
        setLoading(true)
    //     const postUrl = await generateUploadUrl();
    //     // Step 2: POST the file to the URL
    //     const result = await fetch(postUrl, {
    //         method: "POST",
    //         headers: { "Content-Type": file?.type },
    //         body: file,
    //     });
    //     const { storageId } = await result.json();
    //     console.log('StorageId', storageId);
    //     const fileId = uuid4(); 
    //     const fileUrl= await getFileUrl({storageId:storageId})
    //     // Step 3: Save the newly allocated storage ID to the database
    //     const resp = await addFileEntry({
    //         fileId: fileId,
    //         storageId: storageId,
    //         fileName: fileName ?? 'Untitled File',
    //         createdBy: user?.primaryEmailAddress?.emailAddress,
    //         fileUrl:fileUrl
    //     });

    //     console.log(resp);
        //Api call to fetch pdf process data
        const ApiResp = await axios.get('/api/pdf-loader');
        console.log(ApiResp.data.result);
        embeddDocument({
            splitText:
        })

        setLoading(false);

    }
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Pdf File</DialogTitle>
                    <DialogDescription asChild>
                        <div className="">
                            <h2 className="mt-5">Select a file to Upload</h2>
                            <div className=" gap-2 p-3 rounded-md border">
                                <input type='file' accept="application/pdf"
                                    onChange={(event) => OnFileSelect(event)} />
                            </div>
                            <div>
                                <label>File Name*</label>
                                <Input placeholder="File Name" onChange={(e)=>setFileName(e.target.value)}/>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={OnUpload}>
                        {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadPdfDialog
