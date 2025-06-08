// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Editor from "./components/Editor";
import { auth } from "./auth";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(undefined); // undefined = loading state
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed. User:", firebaseUser?.email);
      setUser(firebaseUser);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Optional full-screen loading UI
  if (user === undefined) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Root route redirects based on login */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />

      {/* Dashboard (requires login) */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
      />

      {/* Editor (requires login) */}
      <Route
        path="/editor/:docId"
        element={user ? <Editor user={user} /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;