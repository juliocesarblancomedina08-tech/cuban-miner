"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  const [coins, setCoins] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [hits, setHits] = useState(0);
  const [hitting, setHitting] = useState(false);

  const [unlockedMines, setUnlockedMines] = useState(1);
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [elevatorWorking, setElevatorWorking] = useState(false);

  const [surfaceMinerals, setSurfaceMinerals] = useState(0);
  const [storedMinerals, setStoredMinerals] = useState(0);
  const [wagonMoving, setWagonMoving] = useState(false);

  const [message, setMessage] = useState("");

  const minePrices = [0, 250, 750, 2000];
  const maxHits = 10;

  const progress = Math.min((hits / maxHits) * 100, 100);

  function showMessage(text: string) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 1200);
  }

  function mine() {
    if (energy <= 0 || hitting) return;

    setHitting(true);
    setEnergy((value) => Math.max(value - 2, 0));

    setTimeout(() => {
      setHits((value) => {
        const next = value + 1;

        if (next >= maxHits) {
          setCoins((value) => value + 25);
          setMinerals((value) => value + 1);
          setSurfaceMinerals((value) => value + 1);

          showMessage("+25 🪙  +1 🪨");

          return 0;
        }

        return next;
      });

      setHitting(false);
    }, 350);
  }

  function unlockMine(index: number) {
    const price = minePrices[index];

    if (unlockedMines >= index + 1) return;

    if (coins < price) {
      showMessage("❌ Monedas insuficientes");
      return;
    }

    setCoins((value) => value - price);
    setUnlockedMines(index + 1);

    showMessage(`⛏️ MINA ${index + 1} DESBLOQUEADA`);
  }

  /*
   * ASCENSOR
   *
   * El ascensor baja por las minas desbloqueadas
   * y después vuelve a la superficie.
   */
  useEffect(() => {
    if (unlockedMines <= 0) return;

    const elevatorInterval = setInterval(() => {
      setElevatorWorking(true);

      setElevatorFloor((floor) => {
        const nextFloor = floor + 1;

        if (nextFloor >= unlockedMines) {
          return 0;
        }

        return nextFloor;
      });

      setTimeout(() => {
        setElevatorWorking(false);

        setSurfaceMinerals((value) => {
          if (value <= 0) return value;

          setStoredMinerals((stored) => stored + 1);

          return value - 1;
        });
      }, 900);
    }, 3500);

    return () => {
      clearInterval(elevatorInterval);
    };
  }, [unlockedMines]);

  /*
   * PRODUCCIÓN AUTOMÁTICA
   *
   * Por ahora las minas desbloqueadas producen
   * automáticamente para poder probar el sistema.
   */
  useEffect(() => {
    if (unlockedMines <= 1) return;

    const autoMineInterval = setInterval(() => {
      const amount = unlockedMines - 1;

      setSurfaceMinerals((value) => value + amount);
      setMinerals((value) => value + amount);
      setCoins((value) => value + amount * 2);
    }, 5000);

    return () => {
      clearInterval(autoMineInterval);
    };
  }, [unlockedMines]);

  /*
   * CARRO / VAGONETA
   *
   * Cuando hay mineral almacenado,
   * el carrito lo lleva al almacén.
   */
  useEffect(() => {
    if (storedMinerals <= 0 || wagonMoving) return;

    setWagonMoving(true);

    const timer = setTimeout(() => {
      setStoredMinerals((value) => Math.max(value - 1, 0));
      setCoins((value) => value + 5);
      setWagonMoving(false);
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
  }, [storedMinerals, wagonMoving]);

  /*
   * RECARGA DE ENERGÍA
   */
  useEffect(() => {
    const energyTimer = setInterval(() => {
      setEnergy((value) => Math.min(value + 1, 100));
    }, 3000);

    return () => {
      clearInterval(energyTimer);
    };
  }, []);

  /*
   * POSICIÓN VISUAL DEL ASCENSOR
   */
  const elevatorPosition =
    unlockedMines <= 1
      ? 18
      : 18 + (elevatorFloor / Math.max(unlockedMines - 1, 1)) * 72;

  return (
    <main className="game-page">
      <div className="game-container">

        {/* =========================
            HEADER
        ========================= */}

        <header className="game-header">
          <div>
            <div className="game-logo">
              🇨🇺 CUBAN-MINER ⛏️
            </div>

            <div className="game-subtitle">
              MINA PRINCIPAL
            </div>
          </div>

          <div className="balance-box">
            🪙 {coins}
          </div>
        </header>

        {/* =========================
            MENSAJE
        ========================= */}

        {message && (
          <div className="game-message">
            {message}
          </div>
        )}

        {/* =========================
            ÁREA PRINCIPAL DE LA MINA
        ========================= */}

        <section className="mine-area">

          {/* =========================
              SUPERFICIE
          ========================= */}

          <div className="surface">

            <div className="surface-sky">
              ☁️
            </div>

            <div className="surface-ground">
              <div className="ground-grass" />

              <div className="warehouse">
                <div className="warehouse-roof">
                  🏭
                </div>

                <div className="warehouse-body">
                  <strong>ALMACÉN</strong>

                  <span>
                    🪨 {storedMinerals}
                  </span>
                </div>
              </div>

              <div className="warehouse-stock">
                📦
              </div>

              <div className="surface-worker">
                👷
              </div>

              <div
                className={`wagon ${
                  wagonMoving ? "wagon-moving" : ""
                }`}
              >
                <div className="wagon-body">
                  🛒
                </div>

                <div className="wagon-minerals">
                  🪨
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              POZO DEL ASCENSOR
          ========================= */}

          <div className="elevator-shaft">

            <div className="elevator-rope" />

            <div
              className={`elevator-cage ${
                elevatorWorking ? "elevator-moving" : ""
              }`}
              style={{
                top: `${elevatorPosition}%`,
              }}
            >
              <div className="elevator-bars" />

              <div className="elevator-light" />

              <div className="elevator-worker">
                👷
              </div>

              <div className="elevator-bag">
                🪨
              </div>

              <div className="elevator-control">
                <i />
                <i />
                <i />
              </div>

              <div className="elevator-floor-label">
                NIVEL {elevatorFloor + 1}
              </div>
            </div>
          </div>

          {/* =========================
              MINA 1
          ========================= */}

          <div className="mine-floor">

            <div className="mine-number">
              MINA 1
            </div>

            <div className="mine-level">
              NIVEL 1
            </div>

            <div className="mine-tunnel">

              <div className="mine-ore-pile">
                🪨
              </div>

              <div
                className={`mine-worker ${
                  hitting ? "working" : ""
                }`}
              >
                <div className="mine-worker-body">
                  👷
                </div>

                <div className="mine-worker-bag">
                  🎒
                </div>
              </div>

              <div className="mine-pickaxe">
                ⛏️
              </div>

              <div className="mine-ore ore-glow">
                💎
              </div>
            </div>
          </div>

          {/* =========================
              MINA 2
          ========================= */}

          <div
            className={`mine-floor ${
              unlockedMines < 2 ? "locked" : ""
            }`}
          >
            <div className="mine-number">
              MINA 2
            </div>

            <div className="mine-level">
              NIVEL 2
            </div>

            {unlockedMines < 2 ? (
              <div className="mine-lock">
                <button
                  className="unlock-button"
                  onClick={() => unlockMine(1)}
                >
                  🔒 DESBLOQUEAR MINA

                  <span className="unlock-price">
                    🪙 {minePrices[1]}
                  </span>
                </button>
              </div>
            ) : (
              <div className="mine-tunnel">

                <div className="mine-ore-pile">
                  🪨
                </div>

                <div className="mine-worker working">
                  <div className="mine-worker-body">
                    👷
                  </div>

                  <div className="mine-worker-bag">
                    🎒
                  </div>
                </div>

                <div className="mine-pickaxe">
                  ⛏️
                </div>

                <div className="mine-ore ore-glow">
                  💎
                </div>
              </div>
            )}
          </div>

          {/* =========================
              MINA 3
          ========================= */}

          <div
            className={`mine-floor ${
              unlockedMines < 3 ? "locked" : ""
            }`}
          >
            <div className="mine-number">
              MINA 3
            </div>

            <div className="mine-level">
              NIVEL 3
            </div>

            {unlockedMines < 3 ? (
              <div className="mine-lock">
                <button
                  className="unlock-button"
                  onClick={() => unlockMine(2)}
                >
                  🔒 DESBLOQUEAR MINA

                  <span className="unlock-price">
                    🪙 {minePrices[2]}
                  </span>
                </button>
              </div>
            ) : (
              <div className="mine-tunnel">

                <div className="mine-ore-pile">
                  🪨
                </div>

                <div className="mine-worker working">
                  <div className="mine-worker-body">
                    👷
                  </div>

                  <div className="mine-worker-bag">
                    🎒
                  </div>
                </div>

                <div className="mine-pickaxe">
                  ⛏️
                </div>

                <div className="mine-ore ore-glow">
                  💎
                </div>
              </div>
            )}
          </div>

          {/* =========================
              MINA 4
          ========================= */}

          <div
            className={`mine-floor ${
              unlockedMines < 4 ? "locked" : ""
            }`}
          >
            <div className="mine-number">
              MINA 4
            </div>

            <div className="mine-level">
              NIVEL 4
            </div>

            {unlockedMines < 4 ? (
              <div className="mine-lock">
                <button
                  className="unlock-button"
                  onClick={() => unlockMine(3)}
                >
                  🔒 DESBLOQUEAR MINA

                  <span className="unlock-price">
                    🪙 {minePrices[3]}
                  </span>
                </button>
              </div>
            ) : (
              <div className="mine-tunnel">

                <div className="mine-ore-pile">
                  🪨
                </div>

                <div className="mine-worker working">
                  <div className="mine-worker-body">
                    👷
                  </div>

                  <div className="mine-worker-bag">
                    🎒
                  </div>
                </div>

                <div className="mine-pickaxe">
                  ⛏️
                </div>

                <div className="mine-ore ore-glow">
                  💎
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================
            PANEL DE MINERÍA MANUAL
        ========================= */}

        <section className="manual-panel">

          <div className="manual-title">
            <strong>
              ⛏️ MINERÍA MANUAL
            </strong>

            <span>
              ⚡ {energy}/100
            </span>
          </div>

          <div className="manual-progress">
            <div
              className="manual-progress-bar"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <button
            className={`mine-button ${
              hitting ? "hit" : ""
            }`}
            onClick={mine}
            disabled={energy <= 0 || hitting}
          >
            {hitting
              ? "⛏️ GOLPEANDO..."
              : "⛏️ GOLPEAR LA ROCA"}
          </button>
        </section>

        {/* =========================
            ESTADÍSTICAS
        ========================= */}

        <section className="stats-grid">

          <div className="stat-card">
            <span>
              🪙
            </span>

            <strong>
              {coins}
            </strong>

            <small>
              MONEDAS
            </small>
          </div>

          <div className="stat-card">
            <span>
              🪨
            </span>

            <strong>
              {minerals}
            </strong>

            <small>
              MINERALES
            </small>
          </div>

          <div className="stat-card">
            <span>
              ⛏️
            </span>

            <strong>
              {unlockedMines}/4
            </strong>

            <small>
              MINAS
            </small>
          </div>
        </section>
      </div>

      {/* =========================
          MENÚ INFERIOR
      ========================= */}

      <nav className="bottom-menu">

        <button
          onClick={() => router.push("/game")}
        >
          <span>
            ⛏️
          </span>

          <small>
            MINAS
          </small>
        </button>

        <button
          onClick={() => router.push("/shop")}
        >
          <span>
            🛒
          </span>

          <small>
            TIENDA
          </small>
        </button>

        <button
          onClick={() => router.push("/friends")}
        >
          <span>
            👥
          </span>

          <small>
            REFERIDOS
          </small>
        </button>

        <button
          onClick={() => router.push("/bank")}
        >
          <span>
            🏦
          </span>

          <small>
            BANCO
          </small>
        </button>

        <button
          onClick={() => router.push("/missions")}
        >
          <span>
            🎯
          </span>

          <small>
            MISIONES
          </small>
        </button>

        <button
          onClick={() => router.push("/profile")}
        >
          <span>
            👤
          </span>

          <small>
            PERFIL
          </small>
        </button>

      </nav>

      {/* =========================
          ESTILOS
      ========================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .game-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at top,
              #252525 0%,
              #0c0c0c 45%,
              #050505 100%
            );
          color: #fff;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
          padding-bottom: 75px;
          overflow-x: hidden;
        }

        .game-container {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          padding: 8px;
        }

        /* HEADER */

        .game-header {
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 7px 9px;
          background: #101010;
          border: 1px solid #292929;
          border-radius: 10px;
          margin-bottom: 8px;
          box-shadow:
            0 5px 15px rgba(0, 0, 0, 0.4);
        }

        .game-logo {
          font-size: 12px;
          font-weight: 1000;
          color: #f4c33d;
          letter-spacing: 0.2px;
        }

        .game-subtitle {
          margin-top: 2px;
          font-size: 6px;
          color: #666;
          font-weight: 900;
        }

        .balance-box {
          background: #181818;
          border: 1px solid #3a3a3a;
          border-radius: 7px;
          padding: 6px 9px;
          color: #f4c33d;
          font-size: 9px;
          font-weight: 1000;
          white-space: nowrap;
        }

        /* MENSAJE */

        .game-message {
          position: fixed;
          left: 50%;
          top: 40%;
          transform: translate(-50%, -50%);
          z-index: 1000;
          background: rgba(0, 0, 0, 0.92);
          border: 1px solid #f4c33d;
          border-radius: 8px;
          padding: 8px 13px;
          color: #f4c33d;
          font-size: 9px;
          font-weight: 1000;
          white-space: nowrap;
          animation: messagePop 1.2s ease forwards;
          pointer-events: none;
        }

        @keyframes messagePop {

          0% {
            opacity: 0;
            transform:
              translate(-50%, -40%)
              scale(0.8);
          }

          15% {
            opacity: 1;
            transform:
              translate(-50%, -50%)
              scale(1);
          }

          80% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              translate(-50%, -70%)
              scale(1.05);
          }
        }

        /* =========================
           ÁREA DE LA MINA
        ========================= */

        .mine-area {
          position: relative;
          height: 360px;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid #292929;
          background:
            linear-gradient(
              180deg,
              #202020 0%,
              #17110c 30%,
              #0d0b08 100%
            );
          box-shadow:
            inset 0 0 30px rgba(0, 0, 0, 0.8),
            0 8px 20px rgba(0, 0, 0, 0.45);
        }

        /* SUPERFICIE */

        .surface {
          position: relative;
          height: 58px;
          background:
            linear-gradient(
              180deg,
              #303d52 0%,
              #1c2633 55%,
              #172014 56%,
              #3a2919 100%
            );
          overflow: hidden;
          z-index: 30;
        }

        .surface-sky {
          position: absolute;
          left: 22px;
          top: 4px;
          font-size: 15px;
          opacity: 0.55;
        }

                .surface-ground {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 34px;
          background:
            linear-gradient(
              180deg,
              #26371c,
              #3b2817
            );
        }

        .ground-grass {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 5px;
          background: #516c2b;
          box-shadow:
            0 1px 0 #17220f;
        }

        /* =========================
           ALMACÉN
        ========================= */

        .warehouse {
          position: absolute;
          left: 10px;
          bottom: 3px;
          width: 84px;
          height: 42px;
          z-index: 20;
        }

        .warehouse-roof {
          position: absolute;
          left: 0;
          top: 0;
          width: 84px;
          height: 15px;
          background:
            linear-gradient(
              180deg,
              #7c4b21,
              #432813
            );
          border-radius: 6px 6px 0 0;
          border: 1px solid #2b190c;
          text-align: center;
          font-size: 14px;
          line-height: 15px;
        }

        .warehouse-body {
          position: absolute;
          left: 8px;
          right: 8px;
          top: 13px;
          bottom: 0;
          background:
            linear-gradient(
              180deg,
              #6b4527,
              #3c2615
            );
          border: 1px solid #24160c;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .warehouse-body strong {
          font-size: 7px;
          color: #f0d29a;
        }

        .warehouse-body span {
          font-size: 7px;
          color: #f4c33d;
          font-weight: 900;
        }

        .warehouse-stock {
          position: absolute;
          left: 92px;
          bottom: 4px;
          font-size: 17px;
        }

        .surface-worker {
          position: absolute;
          right: 62px;
          bottom: 3px;
          font-size: 21px;
          z-index: 10;
        }

        /* =========================
           CARRO
        ========================= */

        .wagon {
          position: absolute;
          left: 180px;
          bottom: 1px;
          width: 48px;
          height: 27px;
          z-index: 15;
        }

        .wagon-moving {
          animation: wagonMove 1.8s ease-in-out;
        }

        .wagon-body {
          position: absolute;
          left: 0;
          bottom: 6px;
          font-size: 24px;
        }

        .wagon-minerals {
          position: absolute;
          left: 16px;
          bottom: 15px;
          font-size: 10px;
        }

        .wagon::before,
        .wagon::after {
          content: "";
          position: absolute;
          bottom: 1px;
          width: 7px;
          height: 7px;
          background: #111;
          border: 1px solid #777;
          border-radius: 50%;
        }

        .wagon::before {
          left: 5px;
        }

        .wagon::after {
          left: 31px;
        }

        @keyframes wagonMove {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(120px);
          }
        }

        /* =========================
           ASCENSOR
        ========================= */

        .elevator-shaft {
          position: absolute;
          left: 50%;
          top: 45px;
          bottom: 0;
          width: 58px;
          transform: translateX(-50%);
          background:
            linear-gradient(
              90deg,
              #090909,
              #202020 50%,
              #090909
            );
          border-left: 2px solid #303030;
          border-right: 2px solid #303030;
          z-index: 10;
          pointer-events: none;
        }

        .elevator-rope {
          position: absolute;
          left: 50%;
          top: -50px;
          width: 3px;
          height: 500px;
          transform: translateX(-50%);
          background: #777;
          box-shadow:
            0 0 3px #000;
        }

                .elevator-cage {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 54px;
          background:
            linear-gradient(
              180deg,
              #555 0%,
              #292929 45%,
              #151515 100%
            );
          border: 2px solid #777;
          border-radius: 5px;
          box-shadow:
            inset 0 0 0 2px #111,
            0 4px 12px rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 12;
          transition: top 1.2s ease-in-out;
        }

        .elevator-bars {
          position: absolute;
          inset: 4px;
          border: 2px solid rgba(255, 255, 255, 0.18);
        }

        .elevator-bars::before,
        .elevator-bars::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.18);
        }

        .elevator-bars::before {
          left: 30%;
        }

        .elevator-bars::after {
          right: 30%;
        }

        .elevator-light {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #56d364;
          box-shadow:
            0 0 7px #56d364;
        }

        .elevator-worker {
          font-size: 18px;
          line-height: 1;
          position: relative;
          z-index: 2;
        }

        .elevator-bag {
          position: absolute;
          right: 4px;
          bottom: 5px;
          font-size: 13px;
          line-height: 1;
          z-index: 3;
        }

        .elevator-control {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 27px;
          background: #111;
          border: 1px solid #555;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }

        .elevator-control i {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #777;
        }

        .elevator-control i:first-child {
          background: #56d364;
          box-shadow:
            0 0 5px #56d364;
        }

        .elevator-floor-label {
          position: absolute;
          left: 54px;
          white-space: nowrap;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #444;
          border-radius: 4px;
          padding: 3px 5px;
          font-size: 6px;
          font-weight: 900;
          color: #aaa;
        }

        .elevator-moving {
          animation:
            elevatorShake 0.25s infinite alternate;
        }

        @keyframes elevatorShake {
          from {
            transform:
              translateX(-50%)
              translateY(-1px);
          }

          to {
            transform:
              translateX(-50%)
              translateY(1px);
          }
        }

        /* =========================
           MINAS
        ========================= */

        .mine-floor {
          position: relative;
          height: 75px;
          border-top: 2px solid #242424;
          background:
            linear-gradient(
              180deg,
              rgba(55, 39, 25, 0.98),
              rgba(27, 20, 14, 1)
            );
          overflow: hidden;
        }

        .mine-floor::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(
              circle at 20% 30%,
              #66502d 0 2px,
              transparent 3px
            ),
            radial-gradient(
              circle at 70% 65%,
              #4c3b26 0 2px,
              transparent 3px
            ),
            radial-gradient(
              circle at 45% 80%,
              #725832 0 2px,
              transparent 3px
            ),
            radial-gradient(
              circle at 85% 20%,
              #3d3021 0 2px,
              transparent 3px
            );
          opacity: 0.55;
        }

        .mine-floor.locked {
          filter: grayscale(0.6);
          opacity: 0.75;
        }

        .mine-floor.locked::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 2;
        }

        .mine-number {
          position: absolute;
          left: 7px;
          top: 6px;
          font-size: 8px;
          font-weight: 900;
          color: #777;
          z-index: 5;
        }

        .mine-level {
          position: absolute;
          right: 8px;
          top: 6px;
          font-size: 7px;
          color: #777;
          font-weight: 900;
          z-index: 5;
        }

        .mine-tunnel {
          position: absolute;
          left: 25px;
          right: 8px;
          bottom: 9px;
          height: 35px;
          border-radius: 5px;
          background: #16120e;
          border: 2px solid #33281c;
          box-shadow:
            inset 0 0 15px rgba(0, 0, 0, 0.8);
          z-index: 3;
        }

        .mine-tunnel::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -5px;
          height: 5px;
          background: #3d2c1d;
          border-radius: 0 0 4px 4px;
        }

        .mine-ore-pile {
          position: absolute;
          left: 7px;
          bottom: 5px;
          font-size: 17px;
          z-index: 5;
        }

        .mine-worker {
          position: absolute;
          left: 42px;
          bottom: 7px;
          display: flex;
          align-items: center;
          gap: 2px;
          z-index: 7;
        }

        .mine-worker-body {
          font-size: 21px;
          filter:
            drop-shadow(0 2px 2px #000);
        }

        .mine-worker-bag {
          font-size: 13px;
          transform: translateY(3px);
        }

        .mine-worker.working {
          animation:
            workerWalk 1.5s infinite ease-in-out;
        }

        @keyframes workerWalk {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(25px);
          }

          100% {
            transform: translateX(0);
          }
        }

        .mine-pickaxe {
          position: absolute;
          left: 62px;
          bottom: 22px;
          font-size: 17px;
          z-index: 8;
          transform: rotate(-25deg);
          animation:
            pickaxeHit 1.1s infinite ease-in-out;
        }

        @keyframes pickaxeHit {
          0% {
            transform: rotate(-45deg);
          }

          45% {
            transform: rotate(15deg);
          }

          100% {
            transform: rotate(-45deg);
          }
        }

        .mine-ore {
          position: absolute;
          right: 9px;
          bottom: 6px;
          font-size: 17px;
          z-index: 5;
          animation:
            oreGlow 1.5s infinite;
        }

        @keyframes oreGlow {
          0% {
            filter:
              drop-shadow(
                0 0 1px
                rgba(255, 193, 7, 0.2)
              );
          }

          50% {
            filter:
              drop-shadow(
                0 0 6px
                rgba(255, 193, 7, 0.65)
              );
          }

          100% {
            filter:
              drop-shadow(
                0 0 1px
                rgba(255, 193, 7, 0.2)
              );
          }
        }

               /* =========================
           DESBLOQUEAR MINAS
        ========================= */

        .mine-lock {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .unlock-button {
          border: 1px solid #d69d1c;
          background:
            linear-gradient(
              180deg,
              #f4c33d,
              #b77b0e
            );
          color: #16110a;
          border-radius: 7px;
          padding: 6px 10px;
          font-size: 8px;
          font-weight: 1000;
          cursor: pointer;
          box-shadow:
            0 3px 0 #704d08,
            0 5px 10px rgba(0, 0, 0, 0.4);
        }

        .unlock-button:active {
          transform: translateY(2px);
        }

        .unlock-price {
          display: block;
          margin-top: 2px;
          font-size: 7px;
          opacity: 0.8;
        }

        /* =========================
           PANEL MANUAL
        ========================= */

        .manual-panel {
          margin-top: 8px;
          background: #111;
          border: 1px solid #252525;
          border-radius: 10px;
          padding: 9px;
        }

        .manual-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 7px;
        }

        .manual-title strong {
          font-size: 9px;
          font-weight: 1000;
        }

        .manual-title span {
          font-size: 8px;
          color: #888;
        }

        .manual-progress {
          height: 7px;
          background: #242424;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 7px;
        }

        .manual-progress-bar {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #8f6411,
              #f4c33d
            );
          border-radius: inherit;
          transition: width 0.2s ease;
        }

        .mine-button {
          width: 100%;
          border: 0;
          border-radius: 8px;
          background:
            linear-gradient(
              180deg,
              #f4c33d,
              #b97e12
            );
          color: #16110a;
          padding: 10px;
          font-size: 10px;
          font-weight: 1000;
          cursor: pointer;
          box-shadow:
            0 3px 0 #704d08,
            0 5px 12px rgba(0, 0, 0, 0.45);
        }

        .mine-button:active {
          transform: translateY(2px);
        }

        .mine-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .mine-button.hit {
          animation:
            buttonHit 0.35s ease;
        }

        @keyframes buttonHit {
          0% {
            transform: scale(1);
          }

          40% {
            transform: scale(0.96);
          }

          100% {
            transform: scale(1);
          }
        }

        /* =========================
           ESTADÍSTICAS
        ========================= */

        .stats-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 5px;
          margin-top: 8px;
        }

        .stat-card {
          background: #111;
          border: 1px solid #252525;
          border-radius: 8px;
          padding: 7px 4px;
          text-align: center;
        }

        .stat-card span {
          display: block;
          font-size: 14px;
          margin-bottom: 2px;
        }

        .stat-card strong {
          display: block;
          font-size: 9px;
          color: #eee;
        }

        .stat-card small {
          display: block;
          margin-top: 2px;
          font-size: 6px;
          color: #666;
          font-weight: 900;
        }

        /* =========================
           MENÚ INFERIOR
        ========================= */

        .bottom-menu {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 64px;
          background: #090909;
          border-top: 1px solid #252525;
          display: grid;
          grid-template-columns:
            repeat(6, 1fr);
          z-index: 500;
          padding-bottom:
            env(safe-area-inset-bottom);
        }

        .bottom-menu button {
          border: 0;
          background: transparent;
          color: #777;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          min-width: 0;
        }

        .bottom-menu button span {
          font-size: 19px;
          line-height: 1;
        }

        .bottom-menu button small {
          font-size: 7px;
          font-weight: 900;
          white-space: nowrap;
        }

        .bottom-menu button:first-child {
          color: #f3c33e;
        }

        .bottom-menu button:active {
          transform: scale(0.92);
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 380px) {
          .game-container {
            padding: 6px;
          }

          .mine-area {
            height: 335px;
          }

          .surface {
            height: 55px;
          }

          .mine-floor {
            height: 70px;
          }

          .warehouse {
            left: 7px;
            transform: scale(0.9);
            transform-origin: bottom left;
          }

          .wagon {
            left: 155px;
          }

          .elevator-cage {
            width: 43px;
            height: 50px;
          }

          .elevator-worker {
            font-size: 16px;
          }

          .elevator-bag {
            font-size: 12px;
          }

          .mine-worker-body {
            font-size: 19px;
          }

          .mine-worker-bag {
            font-size: 12px;
          }

          .bottom-menu {
            height: 61px;
          }

          .bottom-menu button span {
            font-size: 17px;
          }

          .bottom-menu button small {
            font-size: 6px;
          }
        }

        @media (min-width: 600px) {
          .bottom-menu {
            left: 50%;
            right: auto;
            width: 520px;
            transform: translateX(-50%);
            border-left: 1px solid #252525;
            border-right: 1px solid #252525;
          }
        }
              `}</style>
    </main>
  );
}
