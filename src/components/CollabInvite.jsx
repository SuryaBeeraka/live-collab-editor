// src/components/CollabInvite.jsx
import React, { useState } from "react";
import "./CollabInvite.css";
import { sendInvite } from "../firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth";

const CollabInvite = ({ docId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth);

  const handleInvite = async () => {
    try {
      if (!email.trim()) return;

      await sendInvite(email.trim(), docId, user.email);
      setMessage(`✅ Invite sent to ${email}`);
      setEmail("");
    } catch (error) {
      console.error("Invite failed:", error);
      setMessage("❌ Failed to send invite.");
    }
  };

  return (
    <div className="collab-invite">
      <input
        type="email"
        value={email}
        placeholder="Enter collaborator's email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleInvite}>Invite</button>
      {message && <div className="invite-status">{message}</div>}
    </div>
  );
};

export default CollabInvite;