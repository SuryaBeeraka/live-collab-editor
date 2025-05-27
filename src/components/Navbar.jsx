// src/components/Navbar.jsx
import React, { useState } from "react";
import { logoutUser } from "../auth";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [docTitle, setDocTitle] = useState("Untitled");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

  const handleTitleClick = () => setIsEditingTitle(true);

  const handleTitleBlur = () => {
    if (docTitle.trim() === "") setDocTitle("Untitled");
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  return (
    <div className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        ⚡ LiveDocs
      </div>

      <div className="doc-title">
        {isEditingTitle ? (
          <input
            className="title-input"
            value={docTitle}
            autoFocus
            onChange={(e) => setDocTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
          />
        ) : (
          <span onClick={handleTitleClick}>
            {docTitle} <span role="img" aria-label="edit">✏️</span>
          </span>
        )}
      </div>

      <div className="profile-section">
        <div className="profile-avatar" onClick={() => setShowMenu(!showMenu)}>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="avatar" />
          ) : (
            <span>{getInitial(user?.displayName || user?.email)}</span>
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