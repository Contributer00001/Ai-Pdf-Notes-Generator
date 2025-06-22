"use client"
import React, { useState } from 'react'
import {
    Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, Code,
    Blockquote, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    ChevronDown, ChevronUp, Highlighter,
    Sparkles, Loader2
} from 'lucide-react'
import { useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { chatSession } from '../../../configs/AIModel'
import { useUser } from '@clerk/nextjs';

function EditorExtension({ editor }) {
    const { fileId } = useParams();
    const [loadAI, setLoadAI] = useState(false)
    const SearchAI = useAction(api.myActions.search)
    const saveNotes = useMutation(api.notes.AddNotes)
    const { user } = useUser()

    const onAiClick = async () => {
        setLoadAI(true)

        // toast("AI is getting your answer...")
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        console.log("selectedText:", selectedText);

        const result = await SearchAI({
            query: selectedText,
            fileId: fileId
        })

        const UnformattedAns = JSON.parse(result);
        let AllUnformattedAns = '';
        UnformattedAns && UnformattedAns.forEach(item => {
            AllUnformattedAns = AllUnformattedAns + item.pageContent
        });

        const PROMPT = `
You are a helpful academic assistant.

The user has asked the following question:
"${selectedText}"

You are given extracted text content from a PDF that may contain the answer:
---
${AllUnformattedAns}
---

TASK:
- Using the provided content, answer the user's question clearly and concisely.
- Format the response strictly in HTML (use tags such as <ul>, <li>, <b>, <p>, <code>, etc.).
- Do not include phrases like "Based on the provided text" or similar.
- Do not repeat the question in the answer.
- If the content does not contain an answer, respond with:
  <p><i>Sorry, this PDF section does not contain an answer to your question.</i></p>

Guidelines:
- Use a precise and academic tone.
- Convert equations and technical terms into readable, HTML-friendly format.

Return only the HTML-formatted answer.
`;



        const AiModelResult = await chatSession.sendMessage(PROMPT);
        console.log(AiModelResult.response.text());

        const FinalAns = AiModelResult.response.text().replace('```', '').replace('html', '').replace('```', '')

        const AllText = editor.getHTML();
        editor.commands.setContent(AllText + '<p><strong>Answer:</strong>' + FinalAns + '</p>')
        setLoadAI(false)

        saveNotes({
            notes: editor.getHTML(),
            fileId: fileId,
            createdBy:user?.primaryEmailAddress?.em
        })
    }

    return editor && (
        <div className='p-5 '>
            <div className="control-group ">
                <div className="button-group flex gap-3 flex-wrap">
                    {/* Headings */}
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
                    >
                        <Heading1 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
                    >
                        <Heading2 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
                    >
                        <Heading3 />
                    </button>
                    {/* Bold, Italic, Underline, Strike */}
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'text-blue-500' : ''}
                    >
                        <Underline />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-blue-500' : ''}
                    >
                        <Strikethrough />
                    </button>
                    {/* Code */}
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={editor.isActive('code') ? 'text-blue-500' : ''}
                    >
                        <Code />
                    </button>
                    {/* Highlight */}
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'text-blue-500' : ''}
                    >
                        <Highlighter />
                    </button>
                    {/* Bullet List */}
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
                    >
                        <List />
                    </button>
                    {/* Ordered List */}
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'text-blue-500' : ''}
                    >
                        <ListOrdered />
                    </button>
                    {/* Align Left */}
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}
                    >
                        <AlignLeft />
                    </button>
                    {/* Align Center */}
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}
                    >
                        <AlignCenter />
                    </button>
                    {/* Align Right */}
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}
                    >
                        <AlignRight />
                    </button>
                    {/* Align Justify */}
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : ''}
                    >
                        <AlignJustify />
                    </button>
                    {/* Subscript */}
                    <button
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        className={editor.isActive('subscript') ? 'text-blue-500' : ''}
                    >
                        <ChevronDown />
                    </button>
                    {/* Superscript */}
                    <button
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        className={editor.isActive('superscript') ? 'text-blue-500' : ''}
                    >
                        <ChevronUp />
                    </button>
                    <button
                        onClick={() => onAiClick()}
                        className={'hover:text-blue-500'}
                    >
                        {loadAI ? (
                            <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                            <Sparkles />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditorExtension
