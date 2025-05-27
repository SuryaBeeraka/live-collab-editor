// src/components/Editor.jsx
import React, { useEffect, useMemo } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import Navbar from "./Navbar";
import Toolbar from "./Toolbar";
import "./Editor.css";

const getRandomName = () => {
  const names = ["Alice", "Bob", "Charlie", "Surya", "Dev", "Lee"];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomColor = () => {
  const colors = ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a78bfa", "#fb923c"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Editor = () => {
  const user = useMemo(
    () => ({ name: getRandomName(), color: getRandomColor() }),
    []
  );

  const ydoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(
    () => new WebsocketProvider("ws://localhost:1234", "my-room", ydoc),
    [ydoc]
  );

  const awareness = provider.awareness;

  useEffect(() => {
    awareness.setLocalStateField("user", {
      name: user.name,
      color: user.color,
    });
  }, [user, awareness]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user,
        render: (user) => {
          const cursor = document.createElement("span");
          cursor.classList.add("collaboration-cursor__caret");
          cursor.style.borderColor = user.color;

          const label = document.createElement("div");
          label.classList.add("collaboration-cursor__label");
          label.textContent = user.name;
          label.style.setProperty("--label-bg", user.color);

          cursor.appendChild(label);
          return cursor;
        },
      }),
    ],
  });

  return (
    <div className="editor-dark-theme">
      <Navbar user={user} />
      <Toolbar editor={editor} />
      <div className="editor-box">
        <EditorContent editor={editor} className="editor-content" />
      </div>
    </div>
  );
};

export default Editor;