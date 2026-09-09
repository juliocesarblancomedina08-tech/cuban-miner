"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            username?: string;
            first_name?: string;
          };
        };
        ready?: () => void;
        expand?: () => void;
      };
    };
  }
}

type MinerPhase = "idle" | "working" | "walking" | "loading";

export default function GamePage() {
  const router = useRouter();

  const [username, setUsername] = useState("MINERO");
  const [coins, setCoins] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);

  const [hits, setHits] = useState(0);
  const [hitting, setHitting] = useState(false);
  const [miningStarted, setMiningStarted] = useState(false);

  const maxHits = 10;
  const progress = Math.min((hits / maxHits) * 100, 100);

  const [unlockedMines, setUnlockedMines] = useState(1);

  const mineNames = [
    "CARBÓN",
    "COBRE",
    "HIERRO",
    "ORO",
  ];

  const minePrices = [
    0,
    250,
    750,
    2000,
  ];

  const [minerPhase, setMinerPhase] =
    useState<MinerPhase>("idle");

  const [workerHasMineral, setWorkerHasMineral] =
    useState(false);

  const [surfaceMinerals, setSurfaceMinerals] =
    useState(0);

  const [storedMinerals, setStoredMinerals] =
    useState(0);

  const [elevatorFloor, setElevatorFloor] =
    useState(0);

  const [elevatorWorking, setElevatorWorking] =
    useState(false);

  const [wagonMoving, setWagonMoving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [showProfile, setShowProfile] =
    useState(false);

  useEffect(() => {
    const telegramUser =
      window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (telegramUser) {
      const name =
        telegramUser.username ||
        telegramUser.first_name;

      if (name) {
        setUsername(name);
        localStorage.setItem("username", name);
      }

      window.Telegram?.WebApp?.ready?.();
      window.Telegram?.WebApp?.expand?.();

      return;
    }

    const saved =
      localStorage.getItem("username") ||
      localStorage.getItem("userName") ||
      localStorage.getItem("telegram_username");

    if (saved) {
      setUsername(saved);
    }
  }, []);

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const playSound = (
    frequency = 180,
    duration = 80
  ) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as any).webkitAudioContext;

      if (!AudioContextClass) return;

      const audio =
        new AudioContextClass();

      const oscillator =
        audio.createOscillator();

      const gain =
        audio.createGain();

      oscillator.frequency.value =
        frequency;

      oscillator.type = "square";

      gain.gain.setValueAtTime(
        0.04,
        audio.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + duration / 1000
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start();
      oscillator.stop(
        audio.currentTime + duration / 1000
      );
    } catch {}
  };

  const mine = () => {
    if (!miningStarted) {
      showMessage("⛏️ Pulsa COMENZAR MINERÍA primero");
      return;
    }

    if (energy < 2) {
      showMessage("⚡ No tienes suficiente energía");
      return;
    }

    if (hitting) return;

    setHitting(true);
    setEnergy((value) => Math.max(0, value - 2));
    setHits((value) => value + 1);

    playSound(130, 70);

    setTimeout(() => {
      setHitting(false);
    }, 180);

    if (hits + 1 >= maxHits) {
      setHits(0);
      setMinerals((value) => value + 1);
      setSurfaceMinerals((value) => value + 1);
      setCoins((value) => value + 25);

      showMessage(
        "⛏️ ¡Mineral extraído! +1 🪨 +25 🪙"
      );
    }
  };

  const startMining = () => {
    if (miningStarted) {
      showMessage("⛏️ La minería ya está activa");
      return;
    }

    setMiningStarted(true);
    setMinerPhase("working");

    showMessage("⛏️ Minería iniciada");
  };

  const unlockMine = (index: number) => {
    if (index <= 0) return;

    if (index >= unlockedMines) {
      const price = minePrices[index];

      if (coins < price) {
        showMessage(
          `❌ Necesitas ${price} 🪙`
        );
        return;
      }

      setCoins((value) => value - price);
      setUnlockedMines(index + 1);
      setElevatorFloor(index);

      showMessage(
        `🔓 ¡Mina de ${mineNames[index]} desbloqueada!`
      );

      playSound(500, 120);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setEnergy((value) =>
        Math.min(100, value + 1)
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!miningStarted) return;

    const timer = setInterval(() => {
      setMinerPhase("working");

      setTimeout(() => {
        setMinerPhase("walking");
      }, 1400);

      setTimeout(() => {
        setMinerPhase("loading");
        setWorkerHasMineral(true);
      }, 2800);

      setTimeout(() => {
        setMinerPhase("idle");
      }, 4000);
    }, 5000);

    return () => clearInterval(timer);
  }, [miningStarted]);

  useEffect(() => {
    if (!workerHasMineral) return;
    if (elevatorWorking) return;

    setElevatorWorking(true);

    const timer = setTimeout(() => {
      setStoredMinerals((value) =>
        value + 1
      );

      setSurfaceMinerals((value) =>
        Math.max(0, value - 1)
      );

      setWorkerHasMineral(false);

      setElevatorWorking(false);

      showMessage(
        "🛗 Mineral enviado al almacén"
      );
    }, 2200);

    return () => clearTimeout(timer);
  }, [workerHasMineral, elevatorWorking]);

  useEffect(() => {
    if (storedMinerals <= 0) return;
    if (wagonMoving) return;

    setWagonMoving(true);

    const timer = setTimeout(() => {
      setStoredMinerals((value) =>
        Math.max(0, value - 1)
      );

      setCoins((value) => value + 5);

      setWagonMoving(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [storedMinerals, wagonMoving]);

  const goTo = (path: string) => {
    router.push(path);
  };

  const avatarLetter =
    username.charAt(0).toUpperCase();

  const elevatorPercent =
    unlockedMines <= 1
      ? 0
      : (elevatorFloor /
          (unlockedMines - 1)) *
        100;

  return (
    <main className="game-page">

      <header className="top-header">

        <button
          className="profile-top"
          onClick={() => setShowProfile(true)}
        >
          <div className="avatar">
            {avatarLetter}
          </div>

          <div className="username-box">
            <strong>
              @{username}
            </strong>

            <span>
              ⛏️ MINERO ACTIVO
            </span>
          </div>
        </button>

        <div className="wallet">
          <span>🪙</span>
          <strong>{coins}</strong>
        </div>

      </header>

      {message && (
        <div className="game-message">
          {message}
        </div>
      )}

      <section className="mine-world">

        <div className="sky">
          <div className="moon">🌙</div>
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
        </div>

        <div className="mountains">
          ⛰️ ⛰️ ⛰️
        </div>

        <div className="surface">

          <div className="mine-entrance">
            <div className="entrance-sign">
              ⛏️ CUBAN MINER
            </div>

            <div className="entrance-hole">
              <span>MINA</span>
            </div>
          </div>

          <div className="warehouse">
            <div className="warehouse-title">
              🏭 ALMACÉN
            </div>

            <div className="warehouse-door">
              {storedMinerals} 🪨
            </div>
          </div>

          <div className="boss-supervisor">

            <div className="supervisor-label">
              👑 SUPERVISOR
            </div>

            <div className="supervisor-person">
              🧑‍💼
            </div>

            <span>
              JEFE DE MINA
            </span>

          </div>

        </div>

        <div className="underground">

          <div className="rock-ceiling">
            🪨 🪨 🪨 🪨 🪨 🪨
          </div>

          <div
            className="elevator-system"
            style={{
              height:
                `${Math.max(
                  100,
                  unlockedMines * 120
                )}px`
            }}
          >

            <div className="elevator-rail left" />
            <div className="elevator-rail right" />

            <div
              className={`elevator ${
                elevatorWorking
                  ? "elevator-active"
                  : ""
              }`}
              style={{
                bottom:
                  `${elevatorPercent}%`
              }}
            >
              🛗
            </div>

          </div>

          {mineNames.map(
            (name, index) => {

              const unlocked =
                index < unlockedMines;

              const level =
                index + 1;

              return (
                <div
                  key={name}
                  className={`mine-level ${
                    unlocked
                      ? "mine-unlocked"
                      : "mine-locked"
                  }`}
                >

                  <div className="mine-rocks">
                    🪨 🪨 🪨
                  </div>

                  <div className="mine-header">

                    <div>
                      <small>
                        NIVEL {level}
                      </small>

                      <strong>
                        {name}
                      </strong>
                    </div>

                    <span>
                      {unlocked
                        ? "🟢 ACTIVA"
                        : "🔒 BLOQUEADA"}
                    </span>

                  </div>

                  {unlocked ? (
                    <>

                      <div className="mine-tunnel">

                        <div className="mine-light">
                          💡
                        </div>

                        <div className="worker">

                          <div className="worker-person">
                            👷
                          </div>

                          <span>
                            ENCARGADO
                          </span>

                        </div>

                        <div
                          className={`ore-wagon ${
                            wagonMoving
                              ? "wagon-moving"
                              : ""
                          }`}
                        >
                          🛒
                        </div>

                        <div className="ore-pile">
                          {index === 0 && "⚫"}
                          {index === 1 && "🟠"}
                          {index === 2 && "⚙️"}
                          {index === 3 && "🟡"}
                        </div>

                      </div>

                      <div className="rails">
                        ═══════════════════
                      </div>

                      <div className="mine-status">
                        <span>
                          👷 Encargado trabajando
                        </span>

                        <span>
                          🛒 Transporte
                        </span>
                      </div>

                    </>
                  ) : (
                    <div className="locked-content">

                      <div className="lock-icon">
                        🔒
                      </div>

                      <strong>
                        MINA DE {name}
                      </strong>

                      <span>
                        Desbloquea este nivel
                        para comenzar a extraer
                      </span>

                      <button
                        className="unlock-button"
                        onClick={() =>
                          unlockMine(index)
                        }
                      >
                        🔓 DESBLOQUEAR
                        <b>
                          {minePrices[index]} 🪙
                        </b>
                      </button>

                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>

      </section>

      <section className="mining-panel">

        <div className="panel-title">
          ⛏️ MINERÍA DE CARBÓN
        </div>

        <div className="mining-stats">

          <div>
            <span>🪨 MINERAL</span>
            <strong>{minerals}</strong>
          </div>

          <div>
            <span>⚡ ENERGÍA</span>
            <strong>{energy}%</strong>
          </div>

          <div>
            <span>💥 GOLPES</span>
            <strong>
              {hits}/{maxHits}
            </strong>
          </div>

        </div>

        <div className="energy-bar">
          <div
            style={{
              width: `${energy}%`
            }}
          />
        </div>

        <div className="progress-bar">
          <div
            style={{
              width: `${progress}%`
            }}
          />
        </div>

        <button
          className="start-button"
          onClick={startMining}
        >
          {miningStarted
            ? "🟢 MINERÍA ACTIVA"
            : "⛏️ COMENZAR MINERÍA"}
        </button>

        <button
          className={`mine-button ${
            hitting ? "hitting" : ""
          }`}
          onClick={mine}
        >
          {hitting
            ? "💥 ¡GOLPE!"
            : "⛏️ EXTRAER CARBÓN"}
        </button>

      </section>

            <section className="info-section">

        <div className="info-card">
          <span>🏭</span>
          <strong>
            ALMACÉN
          </strong>
          <small>
            {storedMinerals} minerales
          </small>
        </div>

        <div className="info-card">
          <span>🛗</span>
          <strong>
            ASCENSOR
          </strong>
          <small>
            Nivel {elevatorFloor + 1}
          </small>
        </div>

        <div className="info-card">
          <span>👷</span>
          <strong>
            ENCARGADOS
          </strong>
          <small>
            {unlockedMines} activos
          </small>
        </div>

        <div className="info-card">
          <span>🪙</span>
          <strong>
            GANANCIA
          </strong>
          <small>
            +5 por carga
          </small>
        </div>

      </section>

      <nav className="bottom-nav">

        <button
          className="nav-active"
          onClick={() =>
            goTo("/game")
          }
        >
          <span>⛏️</span>
          <small>MINAS</small>
        </button>

        <button
          onClick={() =>
            goTo("/shop")
          }
        >
          <span>🛒</span>
          <small>TIENDA</small>
        </button>

        <button
          onClick={() =>
            goTo("/friends")
          }
        >
          <span>👥</span>
          <small>REFERIDOS</small>
        </button>

        <button
          onClick={() =>
            goTo("/bank")
          }
        >
          <span>🏦</span>
          <small>BANCO</small>
        </button>

        <button
          onClick={() =>
            goTo("/missions")
          }
        >
          <span>🎯</span>
          <small>MISIONES</small>
        </button>

        <button
          onClick={() =>
            goTo("/mapa")
          }
        >
          <span>🌍</span>
          <small>MAPA</small>
        </button>

      </nav>

      {showProfile && (
        <div
          className="profile-overlay"
          onClick={() =>
            setShowProfile(false)
          }
        >

          <div
            className="profile-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="profile-head">

              <button
                className="close-profile"
                onClick={() =>
                  setShowProfile(false)
                }
              >
                ✕
              </button>

              <div className="profile-avatar">
                {avatarLetter}
              </div>

              <div className="profile-name">
                <strong>
                  @{username}
                </strong>

                <span>
                  ⛏️ MINERO
                </span>
              </div>

            </div>

            <div className="profile-level">

              <div>
                <span>
                  NIVEL DE MINERO
                </span>

                <strong>
                  NIVEL {unlockedMines}
                </strong>
              </div>

              <div className="level-bar">
                <div
                  style={{
                    width:
                      `${Math.max(
                        15,
                        progress
                      )}%`
                  }}
                />
              </div>

            </div>

            <div className="profile-section-title">
              📊 ESTADÍSTICAS
            </div>

            <div className="profile-rows">

              <div className="profile-row">
                <div className="row-icon">
                  🪙
                </div>

                <div>
                  <strong>
                    Monedas
                  </strong>

                  <span>
                    Balance disponible
                  </span>
                </div>

                <b>
                  {coins}
                </b>
              </div>

              <div className="profile-row">
                <div className="row-icon">
                  🪨
                </div>

                <div>
                  <strong>
                    Minerales
                  </strong>

                  <span>
                    Minerales extraídos
                  </span>
                </div>

                <b>
                  {minerals}
                </b>
              </div>

              <div className="profile-row">
                <div className="row-icon">
                  ⚡
                </div>

                <div>
                  <strong>
                    Energía
                  </strong>

                  <span>
                    Energía actual
                  </span>
                </div>

                <b>
                  {energy}%
                </b>
              </div>

              <div className="profile-row">
                <div className="row-icon">
                  ⛏️
                </div>

                <div>
                  <strong>
                    Minas
                  </strong>

                  <span>
                    Minas desbloqueadas
                  </span>
                </div>

                <b>
                  {unlockedMines}/4
                </b>
              </div>

            </div>

                        <div className="profile-section-title">
              🧭 OPERACIONES
            </div>

            <button
              className="profile-action"
              onClick={() =>
                goTo("/friends")
              }
            >
              <div className="action-icon">
                👥
              </div>

              <div>
                <strong>
                  Sistema de referidos
                </strong>

                <span>
                  Invita amigos y gana
                </span>
              </div>

              <b>›</b>
            </button>

            <button
              className="profile-action"
              onClick={() =>
                goTo("/missions")
              }
            >
              <div className="action-icon">
                🎯
              </div>

              <div>
                <strong>
                  Misiones
                </strong>

                <span>
                  Completa tareas
                </span>
              </div>

              <b>›</b>
            </button>

            <button
              className="profile-action"
              onClick={() =>
                goTo("/mapa")
              }
            >
              <div className="action-icon">
                🌍
              </div>

              <div>
                <strong>
                  Mapa de minas
                </strong>

                <span>
                  Explora nuevos niveles
                </span>
              </div>

              <b>›</b>
            </button>

          </div>
        </div>
      )}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .game-page {
          min-height: 100vh;
          background:
            linear-gradient(
              180deg,
              #07111c 0%,
              #0d1820 45%,
              #160f0a 100%
            );
          color: #fff;
          padding-bottom: 90px;
          font-family: Arial, sans-serif;
          overflow-x: hidden;
        }

        .top-header {
          height: 72px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0a121b;
          border-bottom: 1px solid #263442;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .profile-top {
          border: 0;
          background: transparent;
          color: white;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0;
        }

        .avatar,
        .profile-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            #f6b73c,
            #b8660b
          );
          border: 2px solid #ffd86a;
          font-weight: 900;
          box-shadow:
            0 0 14px rgba(
              255,
              190,
              50,
              .3
            );
        }

        .avatar {
          width: 43px;
          height: 43px;
        }

        .username-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .username-box strong {
          font-size: 14px;
        }

        .username-box span {
          color: #8393a3;
          font-size: 9px;
          margin-top: 3px;
        }

        .wallet {
          background: #141f2a;
          border: 1px solid #344351;
          border-radius: 14px;
          padding: 9px 12px;
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .wallet strong {
          color: #ffd45a;
        }

        .game-message {
          position: fixed;
          top: 82px;
          left: 50%;
          transform: translateX(-50%);
          background: #182733;
          border: 1px solid #456074;
          padding: 11px 15px;
          border-radius: 12px;
          z-index: 100;
          font-size: 12px;
          box-shadow:
            0 8px 25px rgba(0,0,0,.45);
          white-space: nowrap;
        }

        .mine-world {
          position: relative;
          min-height: 940px;
          overflow: hidden;
          background: #111;
        }

        .sky {
          height: 145px;
          position: relative;
          background:
            linear-gradient(
              180deg,
              #142d47,
              #203c52
            );
        }

        .moon {
          position: absolute;
          right: 35px;
          top: 20px;
          font-size: 30px;
        }

        .cloud {
          position: absolute;
          opacity: .35;
          font-size: 28px;
        }

        .cloud-1 {
          left: 30px;
          top: 35px;
        }

        .cloud-2 {
          left: 150px;
          top: 70px;
        }

        .mountains {
          height: 50px;
          background: #18242d;
          text-align: center;
          font-size: 38px;
          line-height: 55px;
          overflow: hidden;
        }

        .surface {
          height: 170px;
          background:
            repeating-linear-gradient(
              0deg,
              #352216 0,
              #352216 10px,
              #422a19 11px,
              #422a19 20px
            );
          position: relative;
          border-bottom: 7px solid #24160d;
        }

        .mine-entrance {
          position: absolute;
          left: 12px;
          bottom: 18px;
          text-align: center;
        }

        .entrance-sign {
          background: #171717;
          border: 2px solid #d79b32;
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 9px;
          font-weight: 900;
        }

        .entrance-hole {
          width: 90px;
          height: 72px;
          margin-top: 4px;
          background: #080808;
          border-radius: 50px 50px 8px 8px;
          border: 6px solid #6b4827;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #7d6a58;
          font-size: 10px;
        }

        .warehouse {
          position: absolute;
          right: 10px;
          bottom: 15px;
          background: #49301d;
          border: 2px solid #a56d31;
          width: 105px;
          height: 95px;
          border-radius: 8px;
          text-align: center;
        }

        .warehouse-title {
          background: #17120e;
          padding: 6px;
          font-size: 10px;
          font-weight: 900;
        }

        .warehouse-door {
          margin: 15px auto;
          width: 43px;
          height: 48px;
          background: #17120e;
          border: 2px solid #6e4b2c;
          padding-top: 15px;
          font-size: 10px;
        }

        .boss-supervisor {
          position: absolute;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          text-align: center;
        }

        .supervisor-label {
          background: #171717;
          border: 1px solid #e5a82d;
          color: #ffd85b;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 9px;
          font-weight: 900;
        }

        .supervisor-person {
          font-size: 45px;
          line-height: 50px;
        }

        .boss-supervisor span {
          color: #c2cbd3;
          font-size: 8px;
        }

        .underground {
          position: relative;
          background:
            linear-gradient(
              180deg,
              #17120e,
              #0e0b09
            );
          padding: 15px 8px 30px;
          min-height: 575px;
        }

        .rock-ceiling {
          height: 28px;
          overflow: hidden;
          opacity: .45;
          text-align: center;
        }

        .elevator-system {
          position: absolute;
          left: 50%;
          top: 40px;
          width: 50px;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 3;
        }

        .elevator-rail {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #62676b;
          border-radius: 3px;
        }

        .elevator-rail.left {
          left: 10px;
        }

        .elevator-rail.right {
          right: 10px;
        }

        .elevator {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 27px;
          transition: bottom 1.2s ease;
          background: #252b30;
          border-radius: 8px;
          padding: 3px;
        }

        .elevator-active {
          filter: drop-shadow(
            0 0 7px #ffd34f
          );
        }

        .mine-level {
          position: relative;
          min-height: 120px;
          margin: 10px 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #40372e;
          background:
            linear-gradient(
              90deg,
              #211913,
              #312319,
              #211913
            );
          z-index: 5;
        }

        .mine-unlocked {
          box-shadow:
            inset 0 0 25px
            rgba(214,137,45,.08);
        }

        .mine-locked {
          background:
            linear-gradient(
              90deg,
              #161616,
              #222,
              #161616
            );
        }

        .mine-rocks {
          height: 20px;
          opacity: .3;
          font-size: 12px;
          padding-left: 10px;
        }

        .mine-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          border-bottom: 1px solid #493b30;
        }

        .mine-header div {
          display: flex;
          flex-direction: column;
        }

        .mine-header small {
          font-size: 7px;
          color: #887c71;
        }

        .mine-header strong {
          font-size: 13px;
          color: #f0c15b;
        }

        .mine-header span {
          font-size: 8px;
        }

        .mine-tunnel {
          height: 52px;
          position: relative;
        }

        .mine-light {
          position: absolute;
          left: 18%;
          top: 4px;
          font-size: 15px;
        }

        .worker {
          position: absolute;
          left: 35%;
          bottom: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .worker-person {
          font-size: 31px;
          line-height: 32px;
        }

        .worker span {
          font-size: 6px;
          color: #9d968e;
        }

        .ore-wagon {
          position: absolute;
          left: 55%;
          bottom: 5px;
          font-size: 28px;
          transition: transform 1s ease;
        }

        .wagon-moving {
          transform: translateX(18px);
        }

        .ore-pile {
          position: absolute;
          right: 12%;
          bottom: 5px;
          font-size: 24px;
        }

        .rails {
          text-align: center;
          color: #787878;
          font-size: 9px;
          letter-spacing: 1px;
          height: 13px;
          overflow: hidden;
        }

        .mine-status {
          display: flex;
          justify-content: space-around;
          font-size: 7px;
          color: #81766c;
          padding-bottom: 5px;
        }

        .locked-content {
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 3px;
          text-align: center;
          padding-bottom: 8px;
        }

        .lock-icon {
          font-size: 23px;
        }

        .locked-content strong {
          font-size: 12px;
          color: #999;
        }

        .locked-content span {
          color: #777;
          font-size: 8px;
        }

        .unlock-button {
          margin-top: 5px;
          border: 1px solid #b77a20;
          background: #35230f;
          color: #ffd15a;
          border-radius: 7px;
          padding: 6px 12px;
          font-size: 9px;
          font-weight: 900;
          display: flex;
          gap: 7px;
          align-items: center;
        }

        .unlock-button b {
          color: #fff;
        }

        .mining-panel {
          margin: 12px;
          padding: 15px;
          background: #111b24;
          border: 1px solid #30404e;
          border-radius: 15px;
        }

        .panel-title {
          font-weight: 900;
          color: #f2bd48;
          margin-bottom: 12px;
        }

        .mining-stats {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 7px;
        }

        .mining-stats div {
          background: #17232e;
          border-radius: 9px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mining-stats span {
          color: #7f909e;
          font-size: 7px;
        }

        .mining-stats strong {
          font-size: 14px;
        }

        .energy-bar,
        .progress-bar {
          height: 7px;
          background: #26313a;
          border-radius: 8px;
          overflow: hidden;
          margin-top: 9px;
        }

        .energy-bar div,
        .progress-bar div {
          height: 100%;
          background: #48a85d;
          transition: width .3s;
        }

        .progress-bar div {
          background: #e2a52d;
        }

        .start-button,
        .mine-button {
          width: 100%;
          border: 0;
          border-radius: 10px;
          padding: 13px;
          margin-top: 10px;
          font-weight: 900;
          color: #fff;
        }

        .start-button {
          background: #285f3b;
        }

        .mine-button {
          background:
            linear-gradient(
              135deg,
              #a96313,
              #dc9a28
            );
          font-size: 15px;
        }

        .mine-button.hitting {
          transform: scale(.97);
        }

        .info-section {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 8px;
          padding: 0 12px 12px;
        }

        .info-card {
          background: #121d26;
          border: 1px solid #293944;
          border-radius: 11px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .info-card span {
          font-size: 20px;
        }

        .info-card strong {
          font-size: 10px;
        }

        .info-card small {
          color: #82919d;
          font-size: 8px;
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 72px;
          background: #09121a;
          border-top: 1px solid #2b3945;
          display: grid;
          grid-template-columns:
            repeat(6, 1fr);
          z-index: 60;
          padding-bottom: 4px;
        }

        .bottom-nav button {
          border: 0;
          background: transparent;
          color: #72808c;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }

        .bottom-nav button span {
          font-size: 19px;
        }

        .bottom-nav button small {
          font-size: 7px;
          font-weight: 900;
        }

        .bottom-nav .nav-active {
          color: #ffc84a;
        }

        .profile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.78);
          z-index: 200;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
        }

        .profile-panel {
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          background:
            linear-gradient(
              180deg,
              #14212c,
              #0b1218
            );
          border: 1px solid #344754;
          border-radius: 22px 22px 0 0;
          padding: 18px 14px 25px;
          box-shadow:
            0 -15px 50px rgba(0,0,0,.6);
        }

        .profile-head {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          padding-bottom: 15px;
          border-bottom: 1px solid #283844;
        }

        .profile-avatar {
          width: 58px;
          height: 58px;
          font-size: 21px;
        }

        .profile-name {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .profile-name strong {
          font-size: 17px;
        }

        .profile-name span {
          color: #8c9aa6;
          font-size: 9px;
        }

        .close-profile {
          position: absolute;
          right: 0;
          top: 0;
          border: 0;
          background: #202e38;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .profile-level {
          padding: 14px 0;
        }

        .profile-level > div:first-child {
          display: flex;
          justify-content: space-between;
          margin-bottom: 7px;
        }

        .profile-level span {
          color: #7d8c98;
          font-size: 8px;
        }

        .profile-level strong {
          color: #f1bb42;
          font-size: 9px;
        }

        .level-bar {
          height: 7px;
          background: #26343e;
          border-radius: 10px;
          overflow: hidden;
        }

        .level-bar div {
          height: 100%;
          background: #d99526;
        }

        .profile-section-title {
          color: #71818d;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .8px;
          padding: 8px 3px;
        }

        .profile-rows {
          border: 1px solid #293a46;
          border-radius: 13px;
          overflow: hidden;
        }

        .profile-row {
          min-height: 62px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #263640;
        }

        .profile-row:last-child {
          border-bottom: 0;
        }

        .row-icon,
        .action-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: #1c2b35;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .profile-row div:nth-child(2),
        .profile-action div:nth-child(2) {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .profile-row strong,
        .profile-action strong {
          font-size: 11px;
        }

        .profile-row span,
        .profile-action span {
          color: #71818c;
          font-size: 8px;
        }

        .profile-row > b {
          color: #f3c24f;
          font-size: 12px;
        }

        .profile-action {
          width: 100%;
          border: 1px solid #293b47;
          background: #111c24;
          color: white;
          border-radius: 12px;
          min-height: 60px;
          margin-bottom: 7px;
          padding: 9px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
        }

        .profile-action > b {
          color: #71818c;
          font-size: 22px;
        }

      `}</style>

    </main>
  );
}
