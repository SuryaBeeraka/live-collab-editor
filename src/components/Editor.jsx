import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello, start typing…</p>',
  })

  // Save to localStorage on every update
  useEffect(() => {
    if (!editor) return
    editor.on('update', () => {
      localStorage.setItem('docContent', editor.getHTML())
    })
  }, [editor])

  // Load saved content on mount
  useEffect(() => {
    const saved = localStorage.getItem('docContent')
    if (saved && editor) {
      editor.commands.setContent(saved)
    }
  }, [editor])

  if (!editor) return null

  const MenuBar = () => (
    <div style={{ marginBottom: '0.5rem' }}>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
    </div>
  )

  return (
    <div>
      <MenuBar />
      <EditorContent editor={editor} />
    </div>
  )
}