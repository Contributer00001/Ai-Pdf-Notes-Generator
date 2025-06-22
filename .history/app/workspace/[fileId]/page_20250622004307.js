"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId });
  const editorRef = useRef();
  const { user } = useUser();
  const saveNotes = useMutation(api.notes.AddNotes);

  const handleSave = async () => {
    const html = editorRef.current?.getEditorHTML();
    if (!html || !fileId || !user?.primaryEmailAddress?.emailAddress) return;

    await saveNotes({
      notes: html,
      fileId,
      createdBy: user.primaryEmailAddress.emailAddress
    });
  }

  return (
    <div>
      <WorkspaceHeader fileName={fileInfo?.fileName} onSave={handleSave} />
      <div className='grid grid-cols-2'>
        <TextEditor fileId={fileId} ref={editorRef} />
        <PdfViewer fileUrl={fileInfo?.fileUrl} />
      </div>
    </div>
  )
}

export default Workspace;
