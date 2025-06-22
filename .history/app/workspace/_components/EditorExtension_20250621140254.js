"use client"
import React from 'react'
import {
  Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Heading3, Code,
  Blockquote, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ChevronDown, ChevronUp, Highlighter,
  Sparkles
} from 'lucide-react'
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';

function EditorExtension({ editor}) {
     const { fileId } = useParams();
    const SearchAI=useAction(api.myActions.search)

    const onAiClick=async()=>{
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        console.log("selectedText:",selectedText);

        const result = await SearchAI({
            query:selectedText,
            fileId:fileId
        })

        const UnformattedAns=JSON.parse(result);
        let answer = '';
        UnformattedAns&&UnformattedAns.forEach(item=>{
            answer=answer+item.pageContent
        });

        const PROMPT="For question:"+selectedText+"and width with the given content as answer,"+
        "please give appropriate "

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
                        <Underline/>
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
                        <Sparkles/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditorExtension
