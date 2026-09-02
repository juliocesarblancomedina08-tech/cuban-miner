import React from "react";

const WelcomeScreen = ({ onEnter }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/assets/mine-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff"
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          color: "#FFD700",
          textShadow: "0 0 20px #FFD700"
        }}
      >
        MINER EMPIRE
      </h1>

      <div
        style={{
          fontSize: "150px",
          animation: "wave 2s infinite"
        }}
      >
        👷‍♂️
      </div>

      <p
        style={{
          fontSize: "22px",
          marginBottom: "40px"
        }}
      >
        Welcome to the Mine
      </p>

      <button
        onClick={onEnter}
        style={{
          padding: "20px 50px",
          fontSize: "24px",
          backgroundColor: "#FFD700",
          color: "#000",
          border: "none",
          borderRadius: "15px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 0 20px #FFD700"
        }}
      >
        START MINING
      </button>

      <style>
        {`
        @keyframes wave {
          0% { transform: translateY(0px);}
          50% { transform: translateY(-10px);}
          100% { transform: translateY(0px);}
        }
        `}
      </style>
    </div>
  );
};

export default WelcomeScreen;
