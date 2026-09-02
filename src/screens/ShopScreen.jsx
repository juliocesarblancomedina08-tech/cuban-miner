import React, { useState } from "react";
import { ECONOMY } from "../config/economy";
import GameStore from "../store/GameStore";
import PickaxeCard from "../components/PickaxeCard";

const ShopScreen = () => {
  const [coins, setCoins] = useState(
    GameStore.minerCoins
  );

  const [message, setMessage] = useState("");

  const buyPickaxe = (pickaxeId) => {
    const result =
      GameStore.buyPickaxe(pickaxeId);

    setMessage(result.message);

    setCoins(GameStore.minerCoins);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#121212",
        color: "#fff",
        padding: "20px"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#FFD700"
        }}
      >
        PICKAXE SHOP
      </h1>

      <h3
        style={{
          textAlign: "center"
        }}
      >
        Miner Coins: {coins}
      </h3>

      {message && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#00ff88"
          }}
        >
          {message}
        </div>
      )}

      {ECONOMY.PICKAXES.map(
        (pickaxe) => (
          <PickaxeCard
            key={pickaxe.id}
            pickaxe={pickaxe}
            onBuy={buyPickaxe}
          />
        )
      )}
    </div>
  );
};

export default ShopScreen;
