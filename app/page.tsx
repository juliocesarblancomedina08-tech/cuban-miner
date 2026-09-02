"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [entering, setEntering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 180);

    return () => window.clearTimeout(timer);
  }, []);

  const startGame = () => {
    if (entering) return;

    setEntering(true);

    window.setTimeout(() => {
      router.push("/game");
    }, 420);
  };

  return (
    <main
      className={`splash ${
        loaded ? "is-loaded" : ""
      } ${entering ? "is-entering" : ""}`}
    >
      {/* FONDO PRINCIPAL */}
      <div
        className="splash-art"
        aria-hidden="true"
      />

      {/* OSCURECIMIENTO / VIÑETA */}
      <div
        className="splash-vignette"
        aria-hidden="true"
      />

      {/* PARTÍCULAS DE POLVO */}
      <div
        className="floating-dust"
        aria-hidden="true"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <i
            key={index}
            className={`dust dust-${index + 1}`}
          />
        ))}
      </div>

      {/* INTERFAZ PRINCIPAL */}
      <section className="splash-ui">

        {/* LOGO */}
        <div className="brand-badge">
          <span className="brand-pick">
            ⛏
          </span>

          <span>
            CUBAN MINER
          </span>
        </div>

        {/* MENSAJE DE BIENVENIDA */}
        <div className="welcome-card">

          <span className="welcome-kicker">
            MINING ADVENTURE
          </span>

          <h1>
            WELCOME, MINER
          </h1>

          <p>
            Excava • Mejora • Descubre
          </p>

        </div>

        {/* BOTÓN PARA ENTRAR AL JUEGO */}
        <button
          type="button"
          className="start-mining"
          onClick={startGame}
          disabled={entering}
          aria-label="Comenzar a minar"
        >

          <span className="button-icon">
            ⛏
          </span>

          <span>
            {entering
              ? "ENTERING MINE..."
              : "START MINING"}
          </span>

          <span className="button-arrow">
            ›
          </span>

        </button>

        {/* VERSIÓN */}
        <div className="version-pill">
          CUBAN MINER • v0.1
        </div>

      </section>

      {/* BRILLO INFERIOR */}
      <div
        className="bottom-glow"
        aria-hidden="true"
      />

    </main>
  );
            }
