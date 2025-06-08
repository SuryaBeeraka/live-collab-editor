// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserDocs, createNewDoc, deleteDocById } from "../firestore";
import { v4 as uuidv4 } from "uuid";
import Invites from "../components/Invites";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDocs = async () => {
    try {
      const docs = await fetchUserDocs(user.uid);
      setDocs(docs);
    } catch (err) {
      console.error("Failed to fetch user docs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadDocs();
  }, [user]);

  const handleCreateNew = async () => {
    const tempId = uuidv4();
    await createNewDoc(user, tempId);
    await loadDocs();
    navigate(`/editor/${tempId}`);
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDocById(docId);
      setDocs((prev) => prev.filter((d) => d.id !== docId));
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  };

  return (
    <div className="dashboard">
      <Navbar user={user} title={null} /> {/* Hide document title input */}

      <div className="dashboard-content">
        <div className="dashboard-box" onClick={handleCreateNew}>
          <div className="icon">📄</div>
          <button className="create-btn">+ Start a blank document</button>
        </div>

        {loading ? (
          <div className="loading-msg">Loading your documents...</div>
        ) : docs.length === 0 ? (
          <div className="empty-msg">No documents yet. Start one above!</div>
        ) : (
          docs.map((doc) => (
            <div
              className="dashboard-box"
              key={doc.id}
              onClick={() => navigate(`/editor/${doc.id}`)}
            >
              <div className="icon">📄</div>
              <div className="doc-title">{doc.title}</div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(doc.id);
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      <Invites user={user} />
    </div>
  );
};

export default Dashboard;