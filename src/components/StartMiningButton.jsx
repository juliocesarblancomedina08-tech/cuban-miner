import React from "react";

const StartMiningButton = ({ onPress }) => {
  return (
    <button
      onClick={onPress}
      style={{
        backgroundColor: "#FFD700",
        color: "#222",
        fontSize: "24px",
        fontWeight: "bold",
        padding: "18px 40px",
        borderRadius: "15px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 0 20px #FFD700",
        transition: "all 0.2s ease"
      }}
    >
      START MINING
    </button>
  );
};

export default StartMiningButton;
