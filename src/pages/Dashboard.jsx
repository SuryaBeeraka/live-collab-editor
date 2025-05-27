import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserDocs, createNewDoc } from "../firestore";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);

  const loadDocs = async () => {
    const docs = await fetchUserDocs(user.uid);
    setDocs(docs);
  };

  useEffect(() => {
    if (user) loadDocs();
  }, [user]);

  const handleCreateNew = async () => {
    const docId = await createNewDoc(user);
    navigate(`/editor/${docId}`);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-logo" onClick={() => navigate("/dashboard")}>⚡ LiveDocs</div>
        <div className="dashboard-user">
          <img src={user?.photoURL} alt="avatar" className="avatar" />
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-box" onClick={handleCreateNew}>
          <div className="icon">📄</div>
          <button className="create-btn">+ Start a blank document</button>
        </div>

        {docs.map(doc => (
          <div className="dashboard-box" key={doc.id} onClick={() => navigate(`/editor/${doc.id}`)}>
            <div className="icon">📄</div>
            <div className="doc-title">{doc.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;