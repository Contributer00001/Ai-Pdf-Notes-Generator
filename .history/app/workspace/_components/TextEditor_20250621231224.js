import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Blockquote from '@tiptap/extension-blockquote'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import React, { useEffect } from 'react'
import EditorExtension from "./EditorExtension"
import { useQueries, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

function TextEditor({ fileId }) {

    const notes = useQuery(api.notes.GetNotes, {
        fileId: fileId
    }
    )

    console.log(notes);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Blockquote,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Subscript,
            Superscript,
            Highlight,
            Placeholder.configure({
                placeholder: 'Start Taking Notes..'
            })
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5'
            }
        }
    })
 
    useEffect(()=>{
        editor&&editor.commands.setContent(notes)
    },[editor&&notes])

    return (
        <div>
            <EditorExtension editor={editor} />
            <div className='overflow-scroll h-[88vh]'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TextEditor
