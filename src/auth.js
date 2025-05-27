// src/auth.js
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const logoutUser = () => signOut(auth);

export { auth, signInUser, registerUser, logoutUser };