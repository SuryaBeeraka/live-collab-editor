// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyB478kuAuqFsMZRBd9vnwnGIBbNFK7Hc84",
  authDomain: "live-collab-editor.firebaseapp.com",
  projectId: "live-collab-editor",
  storageBucket: "live-collab-editor.appspot.com",
  messagingSenderId: "683510936716",
  appId: "1:683510936716:web:135443bae1495f55bf37a9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ Initialize Firestore

export { app, db }; // ✅ Export `db`