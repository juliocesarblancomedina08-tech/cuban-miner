import React, { useState } from "react";
import AnimatedMiner from "../components/AnimatedMiner";
import GameStore from "../store/GameStore";

const HomeScreen = () => {
  const [coins, setCoins] = useState(
    GameStore.minerCoins
  );

  const [usdt] = useState(
    GameStore.usdtBalance
  );

  const [mining, setMining] = useState(false);

  const startMining = () => {
    GameStore.startMining();

    setMining(true);

    const reward = 10;

    GameStore.addCoins(reward);

    setCoins(GameStore.minerCoins);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #2a1f0a, #0f0f0f)",
        color: "#fff",
        padding: "20px"
      }}
    >
      <h1
        style={{
          color: "#FFD700",
          textAlign: "center"
        }}
      >
        MINER EMPIRE
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px"
        }}
      >
        <div>
          <h3>USDT</h3>
          <p>{usdt}</p>
        </div>

        <div>
          <h3>Miner Coins</h3>
          <p>{coins}</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center"
        }}
      >
        <AnimatedMiner />
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px"
        }}
      >
        <button
          onClick={startMining}
          style={{
            backgroundColor: "#FFD700",
            color: "#000",
            padding: "15px 25px",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          START MINING
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center"
        }}
      >
        Status:
        {" "}
        {mining
          ? "🟢 Mining"
          : "🔴 Stopped"}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "40px"
        }}
      >
        <button>SHOP</button>

        <button>WALLET</button>

        <button>WITHDRAW</button>
      </div>
    </div>
  );
};

export default HomeScreen;
