"use client";

import { useState } from "react";

import MineBackground from "./components/MineBackground";
import MinerHero from "./components/MinerHero";
import StartButton from "./components/StartButton";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <main className="gamePage">
        GAME STARTED
      </main>
    );
  }

  return (
    <main className="homeContainer">

      <MineBackground />

      <h1 className="title">
        CUBAN MINER
      </h1>

      <MinerHero />

      <p className="subtitle">
        Welcome Miner
      </p>

      <StartButton
        onClick={() => setStarted(true)}
      />

    </main>
  );
}
