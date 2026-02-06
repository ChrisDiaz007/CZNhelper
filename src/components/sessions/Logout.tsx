import React, { useContext } from "react";
import AuthContext from "../../auth/AuthContext";

const Logout: React.FC = () => {
  const { logout, user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <button
      onClick={logout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
