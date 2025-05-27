// src/components/CollaboratorSidebar.jsx
import React, { useEffect, useState } from "react";

const CollaboratorSidebar = ({ awareness }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updateUsers = () => {
      const states = Array.from(awareness.getStates().values());
      const collaborators = states.map((state) => state.user).filter(Boolean);
      setUsers(collaborators);
    };

    awareness.on("change", updateUsers);
    updateUsers(); // initialize once

    return () => awareness.off("change", updateUsers);
  }, [awareness]);

  return (
    <div className="sidebar">
      <h3>Active Users</h3>
      {users.map((user, index) => (
        <div key={index} className="user-tag">
          <span
            className="color-dot"
            style={{ backgroundColor: user.color }}
          ></span>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default CollaboratorSidebar;