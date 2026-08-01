'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, List, ListOrdered, Quote, Undo, Redo,
  Heading2, Heading3, Link as LinkIcon, Image as ImageIcon
} from 'lucide-react'

type Props = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = 'Tulis konten di sini...' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[300px] prose prose-sm max-w-none focus:outline-none px-4 py-3',
      },
    },
  })

  if (!editor) return null

  function addLink() {
    const url = window.prompt('URL:')
    if (url) editor!.chain().focus().setLink({ href: url }).run()
  }

  function addImage() {
    const url = window.prompt('URL gambar:')
    if (url) editor!.chain().focus().setImage({ src: url }).run()
  }

  const btn = (active: boolean) =>
    `p-1.5 rounded text-sm transition-colors ${active ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`

  return (
    <div className="border border-slate-300 rounded overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))} title="Bold"><Bold className="h-4 w-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))} title="Italic"><Italic className="h-4 w-4" /></button>
        <div className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 className="h-4 w-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))} title="Heading 3"><Heading3 className="h-4 w-4" /></button>
        <div className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))} title="Bullet List"><List className="h-4 w-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))} title="Ordered List"><ListOrdered className="h-4 w-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))} title="Blockquote"><Quote className="h-4 w-4" /></button>
        <div className="w-px h-5 bg-slate-200 mx-1" />
        <button type="button" onClick={addLink} className={btn(editor.isActive('link'))} title="Insert Link"><LinkIcon className="h-4 w-4" /></button>
        <button type="button" onClick={addImage} className={btn(false)} title="Insert Image"><ImageIcon className="h-4 w-4" /></button>
        <div className="w-px h-5 bg-slate-200 mx-1 ml-auto" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)} title="Undo"><Undo className="h-4 w-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)} title="Redo"><Redo className="h-4 w-4" /></button>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
