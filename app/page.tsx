"use client";

import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <main className="game-screen">
        <h1>GAME STARTED</h1>
      </main>
    );
  }

  return (
    <main className="welcome-screen">

      {/* partículas */}
      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>
      <div className="particle p4"></div>

      {/* titulo */}
      <h1 className="game-title">
        ⛏️ CUBAN MINER
      </h1>

      {/* minero */}
      <div className="miner-container">

        <div className="helmet"></div>

        <div className="head">
          <div className="eyes">
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="body"></div>

        <div className="left-arm"></div>

        <div className="pickaxe">
          ⛏
        </div>

        <div className="right-arm"></div>

        <div className="left-leg"></div>

        <div className="right-leg"></div>

      </div>

      <p className="welcome-text">
        Welcome Miner
      </p>

      <button
        className="start-button"
        onClick={() => setStarted(true)}
      >
        START MINING
      </button>

      {/* suelo */}
      <div className="mine-ground"></div>
    </main>
  );
}
