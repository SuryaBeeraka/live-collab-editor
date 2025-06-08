// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { logoutUser } from "../auth";
import { useNavigate, useParams } from "react-router-dom";
import { updateDocTitle } from "../firestore";
import "./Navbar.css";

const Navbar = ({ user, title }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [docTitle, setDocTitle] = useState(title || "");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { docId } = useParams();

  useEffect(() => {
    setDocTitle(title || "");
  }, [title]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleBlur = async () => {
    setEditing(false);
    const trimmed = docTitle.trim();
    if (trimmed && trimmed !== title) {
      await updateDocTitle(docId, trimmed);
    }
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        ⚡ <span className="logo-text">CollabDocs</span>
      </div>

      {/* Only show title if passed */}
      {title && (
        <div className="doc-title" onClick={() => setEditing(true)}>
          {editing ? (
            <input
              className="title-input"
              value={docTitle}
              autoFocus
              onChange={(e) => setDocTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.target.blur();
              }}
            />
          ) : (
            <>
              <span>{docTitle}</span> ✏️
            </>
          )}
        </div>
      )}

      <div className="profile-section">
        <div className="profile-avatar" onClick={() => setShowMenu(!showMenu)}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <span>{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</span>
          )}
        </div>
        {showMenu && (
          <div className="profile-menu">
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;