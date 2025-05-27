import React from "react";
import "./Toolbar.css";

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="toolbar">
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullet List
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        Numbered List
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().undo().run()}
      >
        Undo
      </button>
      <button
        className="toolbar-btn"
        onClick={() => editor.chain().focus().redo().run()}
      >
        Redo
      </button>
    </div>
  );
};

export default Toolbar;