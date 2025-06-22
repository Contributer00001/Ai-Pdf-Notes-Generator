"use client";

import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import EditorExtension from "./EditorExtension";

const TextEditor = forwardRef(({ fileId }, ref) => {
  const notes = useQuery(api.notes.GetNotes, {
    fileId,
  });

  const isEditorDirty = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote,
      Underline,
      Subscript,
      Superscript,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start Taking Notes...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
      handleDOMEvents: {
        input: () => {
          isEditorDirty.current = true;
        },
      },
    },
  });

  // Safely set notes only once when first loaded
  useEffect(() => {
    if (
      editor &&
      typeof notes === "string" &&
      notes.trim() !== "" &&
      !isEditorDirty.current
    ) {
      editor.commands.setContent(notes);
    }
  }, [editor, notes]);

  // Expose editor content to parent
  useImperativeHandle(
    ref,
    () => ({
      getEditorHTML: () => editor?.getHTML(),
    }),
    [editor]
  );

  return (
    <div>
      {editor && <EditorExtension editor={editor} />}
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

TextEditor.displayName = "TextEditor";
export default TextEditor;
