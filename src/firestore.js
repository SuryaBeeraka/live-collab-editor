import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const createNewDoc = async (user, title = "Untitled") => {
  const docRef = await addDoc(collection(db, "documents"), {
    title,
    createdBy: user.uid,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const updateDocTitle = async (docId, newTitle) => {
  const docRef = doc(db, "documents", docId);
  await updateDoc(docRef, { title: newTitle });
};

export const fetchUserDocs = async (userId) => {
  const q = query(collection(db, "documents"), where("createdBy", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};