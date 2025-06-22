"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';
import { useQueries, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function Workspace() {
    const { fileId } = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord,{
        fileId:fileId
    })

    useEffect(()=>{
        console.log(fileInfo)
    },[fileInfo])
    
    return (
        <div>
            <WorkspaceHeader fileName={/>

            <div className='grid grid-cols-2'>
                <div>
                    {/* Text Editor */}
                    <TextEditor />
                </div>
                <div>
                    {/* Pdf Viewer */}
                    <PdfViewer fileUrl={fileInfo?.fileUrl}/>
                </div>
            </div>
        </div>
    )
}

export default Workspace
