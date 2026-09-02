import React from "react";
import AnimatedMiner from "../components/AnimatedMiner";
import StartMiningButton from "../components/StartMiningButton";

const SplashScreen = ({ onStart }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom, #1a1a1a, #3d2c12)",
        color: "#fff",
        overflow: "hidden"
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          color: "#FFD700",
          marginBottom: "20px",
          textShadow: "0 0 20px #FFD700"
        }}
      >
        MINER EMPIRE
      </h1>

      <AnimatedMiner />

      <p
        style={{
          marginTop: "20px",
          fontSize: "22px"
        }}
      >
        Welcome Miner
      </p>

      <div style={{ marginTop: "40px" }}>
        <StartMiningButton
          onPress={onStart}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
