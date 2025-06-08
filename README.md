# 📝 Live Collaborative Editor

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

## 🛠️ Project Structure
live-collab-editor/
├── src/                   # React app codebase
│   ├── components/        # Navbar, Toolbar, Editor, etc.
│   ├── pages/             # Dashboard, Login
│   ├── utils/             # Export helpers
│   └── firebaseConfig.js  # Firebase setup
├── y-websocket/           # WebSocket server powered by y-websocket
│   ├── Dockerfile.yjs     # Custom Dockerfile for y-websocket
│   └── …
├── Dockerfile.client      # Dockerfile for React frontend
├── docker-compose.yml     # Docker Compose setup
└── README.md              # You’re here!
