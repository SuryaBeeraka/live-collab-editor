import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  setDoc,
  deleteDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { encodeStateAsUpdate, applyUpdate } from "yjs";

// 🔨 Create a new document with user as initial collaborator
export const createNewDoc = async (user, tempId) => {
  const docRef = doc(db, "documents", tempId);
  await setDoc(docRef, {
    title: "Untitled",
    userId: user.uid,
    createdAt: serverTimestamp(),
    content: "",
    collaborators: [user.uid],
  });
  return tempId;
};

// ✏️ Update document title
export const updateDocTitle = async (docId, newTitle) => {
  const docRef = doc(db, "documents", docId);
  await updateDoc(docRef, { title: newTitle });
};

// 💾 Save Yjs CRDT binary content
export const saveDocContent = async (docId, ydoc) => {
  const update = encodeStateAsUpdate(ydoc);
  await setDoc(
    doc(db, "documents", docId),
    {
      binary: Array.from(update),
      updatedAt: new Date(),
    },
    { merge: true }
  );
};

// 📥 Load document binary into Yjs
export const loadDocContent = async (docId, ydoc) => {
  const snap = await getDoc(doc(db, "documents", docId));
  if (snap.exists() && snap.data().binary) {
    const binary = new Uint8Array(snap.data().binary);
    applyUpdate(ydoc, binary);
  }
};

// 📄 Fetch all documents owned by or shared with the user
export const fetchUserDocs = async (userId) => {
  const q = query(collection(db, "documents"));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((doc) => doc.userId === userId || doc.collaborators?.includes(userId));
};

// 🗑️ Delete document by ID
export const deleteDocById = async (docId) => {
  await deleteDoc(doc(db, "documents", docId));
};

// ➕ Add user to collaborators list
export const addCollaborator = async (docId, userId) => {
  const docRef = doc(db, "documents", docId);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const current = snap.data().collaborators || [];
    if (!current.includes(userId)) {
      await updateDoc(docRef, {
        collaborators: [...current, userId],
      });
    }
  }
};

// 🔔 Send an invite to collaborate
export const sendInvite = async (email, docId, senderEmail) => {
  await addDoc(collection(db, "invites"), {
    to: email,
    docId,
    from: senderEmail,
    sentAt: serverTimestamp(),
    status: "pending",
  });
};

// 📩 Get all invites received by user
export const fetchReceivedInvites = async (email) => {
  const q = query(collection(db, "invites"), where("to", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Accept invite (add to collaborators + delete invite)
export const acceptInvite = async (inviteId, userId, docId) => {
  await addCollaborator(docId, userId);
  await deleteDoc(doc(db, "invites", inviteId)); // remove after acceptance
};

// ❌ Reject invite
export const deleteInvite = async (inviteId) => {
  await deleteDoc(doc(db, "invites", inviteId));
};

// 🔁 Export Firestore DB instance
export { db };