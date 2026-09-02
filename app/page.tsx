"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [sparkles, setSparkles] = useState<number[]>([]);

  useEffect(() => {
    setSparkles(Array.from({ length: 18 }, (_, i) => i));
  }, []);

  const startGame = () => {
    setStarted(true);

    setTimeout(() => {
      router.push("/game");
    }, 450);
  };

  return (
    <main className={`welcome-screen ${started ? "welcome-exit" : ""}`}>
      <div className="mine-background">

        <div className="mine-glow" />

        {sparkles.map((spark) => (
          <span
            key={spark}
            className="sparkle"
            style={{
              left: `${8 + ((spark * 17) % 84)}%`,
              top: `${12 + ((spark * 29) % 70)}%`,
              animationDelay: `${(spark % 6) * 0.45}s`,
            }}
          >
            ✦
          </span>
        ))}

        <div className="welcome-logo">
          <div className="flag">🇨🇺</div>

          <div className="logo-cuban">
            CUBAN
          </div>

          <div className="logo-miner">
            MINER⛏️
          </div>

          <div className="tagline">
            TU MINA, TU RECOMPENSA
          </div>
        </div>

        <div className="miner-character">

          <div className="miner-shadow" />

          <div className="miner-body">
            <div className="helmet">
              <div className="lamp" />
            </div>

            <div className="miner-head">
              <div className="eye eye-left" />
              <div className="eye eye-right" />
              <div className="smile" />
            </div>

            <div className="miner-shirt" />

            <div className="miner-arm holding-arm">
              <div className="glove" />
            </div>

            <div className="miner-arm waving-arm">
              <div className="glove">
                👋
              </div>
            </div>

            <div className="pickaxe">
              <div className="pickaxe-handle" />
              <div className="pickaxe-head" />
            </div>
          </div>
        </div>

        <button
          className="start-mining-button"
          onClick={startGame}
          disabled={started}
        >
          <span>START MINING</span>
          <small>⛏️ COMENZAR</small>
        </button>

      </div>
    </main>
  );
}
