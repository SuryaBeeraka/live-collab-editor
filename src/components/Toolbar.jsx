import React, { useState } from "react";
import { jsPDF } from "jspdf"; // ✅ import jsPDF
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

  const handleExportPDF = () => {
    if (!editor) return;

    const doc = new jsPDF();
    const text = editor.getText();
    const lines = doc.splitTextToSize(text, 180); // wrap text within page width
    doc.text(lines, 10, 10);
    doc.save("document.pdf");
  };

  const handleExportMarkdown = () => {
    if (!editor) return;
    const markdown = editor.getText(); // for real Markdown, use getJSON() with custom parser

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    window.URL.revokeObjectURL(url);
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
      <button className="export-btn" onClick={handleExportPDF}>Export PDF</button>
      <button className="export-btn" onClick={handleExportMarkdown}>Export MD</button>

      {saved && <span className="save-msg">✅ Document saved</span>}
    </div>
  );
};

export default Toolbar;