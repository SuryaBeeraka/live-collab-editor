import React, { useState } from "react";
import "./Toolbar.css";

const Toolbar = ({ editor, onSave }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (onSave) {
      await onSave(); 
      setSaved(true);
      setTimeout(() => setSaved(false), 2000); 
    }
  };

  if (!editor) return null;

  return (
    <div className="toolbar">
      <button className="toolbar-btn" onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button className="toolbar-btn" onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      <button className="toolbar-btn" onClick={() => editor.chain().focus().toggleBulletList().run()}>
        Bullet List
      </button>
      <button className="toolbar-btn" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        Numbered List
      </button>
      <button className="toolbar-btn" onClick={() => editor.chain().focus().undo().run()}>
        Undo
      </button>
      <button className="toolbar-btn" onClick={() => editor.chain().focus().redo().run()}>
        Redo
      </button>

      <button className="save-btn" onClick={handleSave}>Save Document</button>

      {saved && <span className="save-msg">✅ Document saved</span>}
    </div>
  );
};

export default Toolbar;