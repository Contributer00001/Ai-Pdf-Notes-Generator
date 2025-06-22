"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function Workspace() {
    const { fileId } = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId: fileId
    });

    const editorRef = useRef(); // ⬅️ To access save method

    const handleSave = () => {
        if (editorRef.current) {
            editorRef.current.saveEditorContent(); // ⬅️ Trigger save from child
        }
    };

    useEffect(() => {
        console.log(fileInfo);
    }, [fileInfo]);

    return (
        <div>
            <WorkspaceHeader fileName={fileInfo?.fileName} onSave={handleSave} />

            <div className='grid grid-cols-2'>
                <div>
                    {/* Text Editor */}
                    <TextEditor fileId={fileId} ref={editorRef} /> {/* ⬅️ Pass the ref */}
                </div>
                <div>
                    {/* Pdf Viewer */}
                    <PdfViewer fileUrl={fileInfo?.fileUrl} />
                </div>
            </div>
        </div>
    );
}

export default Workspace;
