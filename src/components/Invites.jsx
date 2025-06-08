import React, { useEffect, useState } from "react";
import { fetchReceivedInvites, acceptInvite, deleteInvite } from "../firestore";
import { useNavigate } from "react-router-dom";

const Invites = ({ user }) => {
  const [invites, setInvites] = useState([]);
  const navigate = useNavigate();

  const loadInvites = async () => {
    if (user?.email) {
      const data = await fetchReceivedInvites(user.email);
      setInvites(data);
    }
  };

  useEffect(() => {
    loadInvites();
  }, [user]);

  const handleAccept = async (invite) => {
    await acceptInvite(invite.id, user.uid, invite.docId);
    loadInvites();
    navigate(`/editor/${invite.docId}`);
  };

  const handleReject = async (inviteId) => {
    await deleteInvite(inviteId);
    loadInvites();
  };

  if (!invites.length) return null;

  return (
    <div className="shared-section">
      <h3>Shared with You</h3>
      {invites.map((invite) => (
        <div key={invite.id} className="invite-box">
          <p><strong>{invite.from}</strong> invited you to collaborate.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => handleAccept(invite)} style={{ backgroundColor: "#22c55e", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
              Accept
            </button>
            <button onClick={() => handleReject(invite.id)} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invites;