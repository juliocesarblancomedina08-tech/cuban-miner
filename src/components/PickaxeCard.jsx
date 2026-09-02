import React from "react";

const PickaxeCard = ({
  pickaxe,
  onBuy
}) => {
  return (
    <div
      style={{
        background: "#242424",
        border: "2px solid #FFD700",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "15px",
        color: "#fff"
      }}
    >
      <h2
        style={{
          color: "#FFD700"
        }}
      >
        {pickaxe.name}
      </h2>

      <p>
        Cost:
        {" "}
        {pickaxe.cost}
        {" "}
        Miner Coins
      </p>

      <p>
        Duration:
        {" "}
        {pickaxe.durabilityDays}
        {" "}
        days
      </p>

      <p>
        Reward:
        {" "}
        {pickaxe.reward}
        {" "}
        Miner Coins
      </p>

      <p>
        Mining Rate:
        {" "}
        {pickaxe.miningRate}
        {" "}
        coins/min
      </p>

      <button
        onClick={() => onBuy(pickaxe.id)}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          padding: "10px 20px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        BUY PICKAXE
      </button>
    </div>
  );
};

export default PickaxeCard;
