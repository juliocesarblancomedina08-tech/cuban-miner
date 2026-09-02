import React from "react";

const AnimatedMiner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "float 2s infinite ease-in-out"
      }}
    >
      <div style={{ fontSize: "120px" }}>
        👷‍♂️
      </div>

      <div
        style={{
          fontSize: "50px",
          marginTop: "-10px"
        }}
      >
        ⛏️
      </div>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedMiner;
