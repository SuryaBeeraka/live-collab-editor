# 📝 CollabDocs - Live Collaborative Editor

A real-time collaborative document editor built with:

- ✨ React + TipTap for rich-text editing
- ⚡ Yjs + y-websocket for CRDT-based collaboration
- 🔐 Firebase Authentication & Firestore for user login and document persistence
- 🐳 Docker Compose for full development environment setup

---

## 🚀 Features

- Real-time multi-user document editing
- Authenticated login using Google or email/password (via Firebase)
- Document dashboard with title editing
- Invite users via shareable document links
- Collaborative cursors with username and color
- Auto-save to Firestore (with debouncing)
- Full Dockerized setup with live-reloading
---
## Tech Stack
	•	Frontend: React, TipTap, Tailwind CSS
	•	Collaboration: Yjs (Conflict-free Replicated Data Types-powered), y-websocket
	•	Authentication & Storage: Firebase Auth + Firestore
	•	DevOps: Docker, Docker Compose

---
## 📦 Scripts
npm install        # install dependencies
npm run dev        # start Vite dev server (for client only)
PORT=1234 npx y-websocket   # run WebSocket server manually (if needed)
