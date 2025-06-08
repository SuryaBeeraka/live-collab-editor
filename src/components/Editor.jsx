import React, { useEffect, useMemo, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Toolbar from "./Toolbar";
import CollabInvite from "./CollabInvite";
import "./Editor.css";
import { saveDocContent, loadDocContent } from "../firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import debounce from "lodash.debounce";

const getRandomColor = () => {
  const colors = ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a78bfa", "#fb923c"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Editor = ({ user }) => {
  const { docId } = useParams();
  const [docTitle, setDocTitle] = useState("Untitled");

  const ydoc = useMemo(() => new Y.Doc(), []);
  const provider = useMemo(() => new WebsocketProvider("ws://localhost:1234", docId, ydoc), [docId, ydoc]);

  const userColor = useMemo(() => getRandomColor(), []);
  const awareness = provider.awareness;

  useEffect(() => {
    if (user) {
      awareness.setLocalStateField("user", {
        name: user.displayName || user.email,
        color: userColor,
      });
    }
  }, [user, awareness, userColor]);

  useEffect(() => {
    const fetchDocTitle = async () => {
      const snap = await getDoc(doc(db, "documents", docId));
      if (snap.exists()) {
        const data = snap.data();
        if (data?.title) setDocTitle(data.title);
      }
    };

    if (docId) {
      loadDocContent(docId, ydoc);
      fetchDocTitle();
    }
  }, [docId, ydoc]);

  useEffect(() => {
    const save = debounce(() => {
      saveDocContent(docId, ydoc);
    }, 2000);

    ydoc.on("update", save);
    return () => {
      ydoc.off("update", save);
      save.cancel();
    };
  }, [docId, ydoc]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user.displayName || user.email,
          color: userColor,
        },
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

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="editor-dark-theme">
      <Navbar user={user} title={docTitle} />
      <Toolbar editor={editor} onSave={() => saveDocContent(docId, ydoc)} />
      <CollabInvite docId={docId} />
      <div className="editor-box">
        <EditorContent editor={editor} className="editor-content" />
      </div>
    </div>
  );
};

export default Editor;