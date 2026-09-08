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
      };
    };
  }
}

type MinerPhase =
  | "idle"
  | "working"
  | "walking"
  | "loading";

type ElevatorPhase =
  | "idle"
  | "down"
  | "loading"
  | "up";

export default function GamePage() {
  const router = useRouter();

  /* =========================================
     PLAYER
  ========================================= */

  const [username, setUsername] = useState("MINERO");

  const [coins, setCoins] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);

  /* =========================================
     MINING
  ========================================= */

  const [hits, setHits] = useState(0);
  const [hitting, setHitting] = useState(false);
  const [miningStarted, setMiningStarted] = useState(false);

  const maxHits = 10;
  const progress = Math.min(
    100,
    Math.round((hits / maxHits) * 100)
  );

  /* =========================================
     MINES
  ========================================= */

  const [unlockedMines, setUnlockedMines] = useState(1);

  const minePrices = [0, 250, 750, 2000];

  const mineNames = [
    "CARBÓN",
    "COBRE",
    "HIERRO",
    "ORO",
  ];

  /* =========================================
     WORKER SYSTEM
  ========================================= */

  const [minerPhase, setMinerPhase] =
    useState<MinerPhase>("idle");

  const [workerHasMineral, setWorkerHasMineral] =
    useState(false);

  const [surfaceMinerals, setSurfaceMinerals] =
    useState(0);

  const [storedMinerals, setStoredMinerals] =
    useState(0);

  /* =========================================
     ELEVATOR
  ========================================= */

  const [elevatorFloor, setElevatorFloor] =
    useState(0);

  const [elevatorPhase, setElevatorPhase] =
    useState<ElevatorPhase>("idle");

  const [elevatorWorking, setElevatorWorking] =
    useState(false);

  /* =========================================
     WAGON
  ========================================= */

  const [wagonMoving, setWagonMoving] =
    useState(false);

  /* =========================================
     UI
  ========================================= */

  const [message, setMessage] = useState("");
  const [showProfile, setShowProfile] =
    useState(false);

  /* =========================================
     TELEGRAM USER
  ========================================= */

  useEffect(() => {
    try {
      const telegram =
        typeof window !== "undefined"
          ? window.Telegram?.WebApp
          : undefined;

      const telegramUser =
        telegram?.initDataUnsafe?.user;

      if (telegramUser?.username) {
        setUsername(`@${telegramUser.username}`);
        return;
      }

      if (telegramUser?.first_name) {
        setUsername(telegramUser.first_name);
        return;
      }

      const savedUsername =
        localStorage.getItem("username") ||
        localStorage.getItem("userName") ||
        localStorage.getItem(
          "telegram_username"
        );

      if (savedUsername) {
        setUsername(savedUsername);
      }
    } catch {
      setUsername("MINERO");
    }
  }, []);

  /* =========================================
     MESSAGE
  ========================================= */

  const showMessage = (text: string) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage((current) =>
        current === text ? "" : current
      );
    }, 2200);
  };

  /* =========================================
     SOUND
  ========================================= */

  const playSound = (
    type:
      | "mine"
      | "coin"
      | "unlock"
      | "click"
      | "elevator"
  ) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return;

      const audio =
        new AudioContextClass();

      const oscillator =
        audio.createOscillator();

      const gain =
        audio.createGain();

      oscillator.connect(gain);
      gain.connect(audio.destination);

      const now = audio.currentTime;

      if (type === "mine") {
        oscillator.frequency.setValueAtTime(
          110,
          now
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          65,
          now + 0.09
        );
      }

      if (type === "coin") {
        oscillator.frequency.setValueAtTime(
          520,
          now
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          850,
          now + 0.12
        );
      }

      if (type === "unlock") {
        oscillator.frequency.setValueAtTime(
          260,
          now
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          720,
          now + 0.22
        );
      }

      if (type === "elevator") {
        oscillator.frequency.setValueAtTime(
          90,
          now
        );
        oscillator.frequency.linearRampToValueAtTime(
          130,
          now + 0.25
        );
      }

      if (type === "click") {
        oscillator.frequency.setValueAtTime(
          240,
          now
        );
      }

      gain.gain.setValueAtTime(
        0.045,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.16
      );

      oscillator.start(now);
      oscillator.stop(now + 0.17);
    } catch {
      /* Audio is optional */
    }
  };

  /* =========================================
     MANUAL MINING
  ========================================= */

  const mine = () => {
    if (energy < 2) {
      showMessage("⚡ SIN ENERGÍA");
      return;
    }

    setMiningStarted(true);
    setHitting(true);
    setEnergy((value) =>
      Math.max(0, value - 2)
    );

    playSound("mine");

    window.setTimeout(() => {
      setHitting(false);
    }, 280);

    setHits((currentHits) => {
      const nextHits = currentHits + 1;

      if (nextHits >= maxHits) {
        setMinerals((value) => value + 1);
        setSurfaceMinerals(
          (value) => value + 1
        );
        setCoins((value) => value + 25);

        playSound("coin");

        showMessage(
          "⛏️ MINERAL EXTRAÍDO  +25 🪙"
        );

        return 0;
      }

      return nextHits;
    });
  };

  /* =========================================
     START WORK
  ========================================= */

  const startMining = () => {
    setMiningStarted(true);
    setMinerPhase("working");
    mine();
  };

  /* =========================================
     UNLOCK MINE
  ========================================= */

  const unlockMine = (index: number) => {
    if (index < 1 || index > 3) {
      return;
    }

    if (unlockedMines >= index + 1) {
      return;
    }

    const price = minePrices[index];

    if (coins < price) {
      showMessage(
        `🪙 NECESITAS ${price} MONEDAS`
      );
      return;
    }

    setCoins((value) =>
      value - price
    );

    setUnlockedMines(index + 1);
    setElevatorFloor(0);

    playSound("unlock");

    showMessage(
      `⛏️ ${mineNames[index]} DESBLOQUEADA`
    );
  };

  /* =========================================
     ENERGY RECOVERY
  ========================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnergy((value) =>
        Math.min(100, value + 1)
      );
    }, 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* =========================================
     WORKER AUTOMATION
  ========================================= */

  useEffect(() => {
    if (!miningStarted) {
      setMinerPhase("idle");
      return;
    }

    let active = true;

    const runCycle = () => {
      if (!active) return;

      setMinerPhase("working");

      const walkingTimer =
        window.setTimeout(() => {
          if (!active) return;
          setMinerPhase("walking");
        }, 2200);

      const loadingTimer =
        window.setTimeout(() => {
          if (!active) return;

          setMinerPhase("loading");

          setWorkerHasMineral(true);
          setSurfaceMinerals(
            (value) => value + 1
          );
          setMinerals(
            (value) => value + 1
          );
        }, 4300);

      const nextCycleTimer =
        window.setTimeout(() => {
          if (!active) return;

          setMinerPhase("working");
          runCycle();
        }, 6800);

      return () => {
        window.clearTimeout(
          walkingTimer
        );
        window.clearTimeout(
          loadingTimer
        );
        window.clearTimeout(
          nextCycleTimer
        );
      };
    };

    const cleanup = runCycle();

    return () => {
      active = false;

      if (cleanup) {
        cleanup();
      }
    };
  }, [miningStarted]);

  /* =========================================
     ELEVATOR AUTOMATION
  ========================================= */

  useEffect(() => {
    if (!workerHasMineral) {
      return;
    }

    if (elevatorWorking) {
      return;
    }

    let cancelled = false;

    setElevatorWorking(true);
    setElevatorPhase("down");

    playSound("elevator");

    const downTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setElevatorPhase("loading");
      }, 1100);

    const loadTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setElevatorPhase("up");
      }, 2300);

    const finishTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setElevatorFloor(
          Math.max(0, unlockedMines - 1)
        );

        setWorkerHasMineral(false);

        setStoredMinerals(
          (value) => value + 1
        );

        setElevatorPhase("idle");
        setElevatorWorking(false);
      }, 4100);

    return () => {
      cancelled = true;

      window.clearTimeout(downTimer);
      window.clearTimeout(loadTimer);
      window.clearTimeout(
        finishTimer
      );
    };
  }, [
    workerHasMineral,
    elevatorWorking,
    unlockedMines,
  ]);

  /* =========================================
     WAGON AUTOMATION
  ========================================= */

  useEffect(() => {
    if (storedMinerals <= 0) {
      return;
    }

    if (wagonMoving) {
      return;
    }

    setWagonMoving(true);

    const timer =
      window.setTimeout(() => {
        setStoredMinerals((value) =>
          Math.max(0, value - 1)
        );

        setCoins((value) =>
          value + 5
        );

        setWagonMoving(false);

        playSound("coin");

        showMessage(
          "🚋 MINERAL ENTREGADO  +5 🪙"
        );
      }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [storedMinerals, wagonMoving]);

  /* =========================================
     ELEVATOR POSITION
  ========================================= */

  const elevatorHeight =
    Math.max(
      86,
      unlockedMines * 82
    );

  const elevatorPosition =
    Math.max(
      0,
      Math.min(
        unlockedMines - 1,
        elevatorFloor
      )
    );

  const elevatorTravel =
    Math.max(
      0,
      (unlockedMines - 1) * 82
    );

  const elevatorOffset =
    elevatorTravel > 0
      ? elevatorPosition *
        (elevatorTravel /
          Math.max(
            1,
            unlockedMines - 1
          ))
      : 0;

  /* =========================================
     MINER POSITION
  ========================================= */

  const minerClass = [
    "human-miner",
    minerPhase === "working"
      ? "working"
      : "",
    minerPhase === "walking"
      ? "walking"
      : "",
    minerPhase === "loading"
      ? "loading"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* =========================================
     NAVIGATION
  ========================================= */

  const goTo = (path: string) => {
    playSound("click");
    router.push(path);
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="game-page">
      <div className="game-container">

        {/* =====================================
            HEADER
        ====================================== */}

        <header className="game-header">

          <div className="profile-top">
            <button
              type="button"
              className="profile-avatar-button"
              onClick={() => {
                playSound("click");
                setShowProfile(true);
              }}
              aria-label="Abrir perfil"
            >
              <span />
            </button>
          </div>

          <div>
            <div className="profile-label">
              MINERO
            </div>

            <div className="profile-name">
              {username}
            </div>
          </div>

          <div className="header-center">
            <div className="header-status">
              <span className="header-status-dot" />
              OPERACIÓN ACTIVA
            </div>
          </div>

          <div className="balance-box">
            <div className="balance-label">
              BALANCE
            </div>

            <div className="balance-value">
              {coins.toLocaleString()} 🪙
            </div>
          </div>
        </header>

        {/* =====================================
            MESSAGE
        ====================================== */}

        <div className="game-message">
          {message}
        </div>

        {/* =====================================
            WORLD
        ====================================== */}

        <section
          className={[
            "mine-world",
            hitting || minerPhase === "working"
              ? "mining-active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >

          {/* SKY */}

          <div className="sky">
            <div className="sky-glow" />

            <div className="sun" />

            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="cloud cloud-3" />
          </div>

          {/* MOUNTAINS */}

          <div className="mountains">
            <div className="mountain mountain-1" />
            <div className="mountain mountain-2" />
            <div className="mountain mountain-3" />
            <div className="mountain mountain-4" />
          </div>

          <div className="fog-layer" />

          {/* =================================
              MINE ENTRANCE
          ================================== */}

          <div className="mine-entrance">

            <div className="mine-mountain-body" />

            <div className="mine-rock-highlight" />

            <div className="mine-timber">
              <div className="mine-timber-top" />
            </div>

            <div className="mine-mouth">
              <div className="mine-mouth-glow" />
            </div>

            <div className="mine-rail-ground">
              <span className="mine-rail-sleeper" />
              <span className="mine-rail-sleeper" />
              <span className="mine-rail-sleeper" />
              <span className="mine-rail-sleeper" />
              <span className="mine-rail-sleeper" />
              <span className="mine-rail-sleeper" />
            </div>

          </div>

          {/* =================================
              WAREHOUSE
          ================================== */}

          <div className="warehouse">

            <div className="warehouse-roof" />

            <div className="warehouse-body">

              <div className="warehouse-door" />

              <div className="warehouse-window" />

            </div>

            <div className="warehouse-sign">
              STORAGE
            </div>

          </div>

          {/* =================================
              BOSS MINER
          ================================== */}

          <div className="boss-miner">

            <div className="boss-badge">
              JEFE
            </div>

            <div className="human-miner">

              <div className="miner-shadow" />

              <div className="miner-head">
                <div className="miner-helmet">
                  <div className="miner-lamp" />
                </div>
              </div>

              <div className="miner-body">

                <div className="miner-arm miner-arm-left">
                  <span className="miner-hand" />
                </div>

                <div className="miner-arm miner-arm-right">
                  <span className="miner-hand" />
                </div>

              </div>

              <div className="miner-leg miner-leg-left">
                <span className="miner-boot" />
              </div>

              <div className="miner-leg miner-leg-right">
                <span className="miner-boot" />
              </div>

            </div>

          </div>

          {/* =================================
              ACTIVE MINER
          ================================== */}

          <div
            className={minerClass}
            style={{
              left:
                minerPhase === "walking"
                  ? "63%"
                  : minerPhase === "loading"
                  ? "65%"
                  : "43%",
              bottom:
                minerPhase === "loading"
                  ? "92px"
                  : "72px",
            }}
          >

            <div className="miner-shadow" />

            <div className="miner-head">
              <div className="miner-helmet">
                <div className="miner-lamp" />
              </div>
            </div>

            <div className="miner-body">

              <div className="miner-arm miner-arm-left">
                <span className="miner-hand" />
              </div>

              <div className="miner-arm miner-arm-right">
                <span className="miner-hand" />
              </div>

            </div>

            <div className="miner-leg miner-leg-left">
              <span className="miner-boot" />
            </div>

            <div className="miner-leg miner-leg-right">
              <span className="miner-boot" />
            </div>

            {minerPhase === "working" && (
              <div className="pickaxe">
                <div className="pickaxe-handle" />
                <div className="pickaxe-head" />
              </div>
            )}

          </div>

          {/* =================================
              MINERAL CRATES
          ================================== */}

          <div className="mineral-crate crate-1">
            <div className="crate-ore" />
          </div>

          <div className="mineral-crate crate-2">
            <div className="crate-ore" />
          </div>

          {/* =================================
              WAGON
          ================================== */}

          <div
            className={[
              "mine-wagon",
              wagonMoving
                ? "moving"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >

            <div className="wagon-ore" />

            <div className="wagon-body">
              <div className="wagon-rim" />
            </div>

            <div className="wagon-wheel wagon-wheel-left" />
            <div className="wagon-wheel wagon-wheel-right" />

            <div className="wagon-lamp" />

          </div>

          {/* =================================
              ELEVATOR
          ================================== */}

          <div
            className="elevator-system"
            style={{
              height: `${elevatorHeight}px`,
            }}
          >

            <div
              className="elevator-shaft"
              style={{
                height: `${elevatorHeight}px`,
              }}
            />

            <div
              className="elevator-rail"
              style={{
                height: `${elevatorHeight}px`,
              }}
            />

            <div
              className="elevator-rope"
              style={{
                height: `${Math.max(
                  70,
                  elevatorHeight
                )}px`,
              }}
            />

            <div
              className="elevator-car"
              style={{
                bottom:
                  `${elevatorOffset}px`,
                transition:
                  "bottom 1.2s ease-in-out",
              }}
            >
              <div className="elevator-light" />
            </div>

          </div>

                    {/* =================================
              UNDERGROUND
          ================================== */}

          <div className="underground">

            {/* MINE 4 */}

            {unlockedMines >= 4 && (
              <div className="mine-level level-4">

                <div className="tunnel">
                  <div className="tunnel-support tunnel-support-1" />
                  <div className="tunnel-support tunnel-support-2" />
                  <div className="tunnel-beam" />
                </div>

                <div className="mine-lamp lamp-1" />
                <div className="mine-lamp lamp-2" />

                <div className="ore-vein gold-vein">
                  <span className="ore-spark ore-spark-1" />
                  <span className="ore-spark ore-spark-2" />
                  <span className="ore-spark ore-spark-3" />
                </div>

              </div>
            )}

            {/* MINE 3 */}

            {unlockedMines >= 3 && (
              <div className="mine-level level-3">

                <div className="tunnel">
                  <div className="tunnel-support tunnel-support-1" />
                  <div className="tunnel-support tunnel-support-2" />
                  <div className="tunnel-beam" />
                </div>

                <div className="mine-lamp lamp-1" />
                <div className="mine-lamp lamp-2" />

                <div className="ore-vein iron-vein">
                  <span className="ore-spark ore-spark-1" />
                  <span className="ore-spark ore-spark-2" />
                  <span className="ore-spark ore-spark-3" />
                </div>

              </div>
            )}

            {/* MINE 2 */}

            {unlockedMines >= 2 && (
              <div className="mine-level level-2">

                <div className="tunnel">
                  <div className="tunnel-support tunnel-support-1" />
                  <div className="tunnel-support tunnel-support-2" />
                  <div className="tunnel-beam" />
                </div>

                <div className="mine-lamp lamp-1" />
                <div className="mine-lamp lamp-2" />

                <div className="ore-vein copper-vein">
                  <span className="ore-spark ore-spark-1" />
                  <span className="ore-spark ore-spark-2" />
                  <span className="ore-spark ore-spark-3" />
                </div>

              </div>
            )}

            {/* MINE 1 */}

            <div className="mine-level level-1">

              <div className="tunnel">
                <div className="tunnel-support tunnel-support-1" />
                <div className="tunnel-support tunnel-support-2" />
                <div className="tunnel-beam" />
              </div>

              <div className="mine-lamp lamp-1" />
              <div className="mine-lamp lamp-2" />

              <div className="ore-vein coal-vein">
                <span className="ore-spark ore-spark-1" />
                <span className="ore-spark ore-spark-2" />
                <span className="ore-spark ore-spark-3" />
              </div>

            </div>

          </div>

          {/* =================================
              DUST
          ================================== */}

          <div className="dust-particle dust-1" />
          <div className="dust-particle dust-2" />
          <div className="dust-particle dust-3" />
          <div className="dust-particle dust-4" />

          {/* =================================
              MINERAL PARTICLES
          ================================== */}

          <div
            className="mineral-particle"
            style={{
              left: "46%",
              bottom: "185px",
            }}
          />

          <div
            className="mineral-particle"
            style={{
              left: "52%",
              bottom: "191px",
            }}
          />

          <div
            className="mineral-particle"
            style={{
              left: "57%",
              bottom: "181px",
            }}
          />

          {/* =================================
              GROUND
          ================================== */}

          <div className="surface-ground">

            <div className="ground-grass" />

            <div className="ground-rock rock-1" />
            <div className="ground-rock rock-2" />
            <div className="ground-rock rock-3" />
            <div className="ground-rock rock-4" />

          </div>

        </section>

        {/* =====================================
            START MINING
        ====================================== */}

        <section className="mining-panel">

          <div className="mining-progress-header">

            <div className="mining-progress-title">
              PRODUCCIÓN MANUAL
            </div>

            <div className="mining-progress-value">
              {hits}/{maxHits}
            </div>

          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <button
            type="button"
            className={[
              "start-mining-button",
              hitting
                ? "mining-now"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={startMining}
          >
            START MINING
          </button>

        </section>

        {/* =====================================
            INFORMATION
        ====================================== */}

        <section className="info-grid">

          <div className="info-card">
            <div className="info-card-label">
              ENERGÍA
            </div>

            <div className="info-card-value green">
              ⚡ {energy}%
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-label">
              MINERALES
            </div>

            <div className="info-card-value gold">
              ⛏ {minerals}
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-label">
              EN ALMACÉN
            </div>

            <div className="info-card-value blue">
              {storedMinerals}
            </div>
          </div>

        </section>

        {/* =====================================
            BOTTOM NAV
        ====================================== */}

        <nav className="bottom-nav">

          <button
            type="button"
            className="bottom-nav-button active"
            onClick={() => {
              playSound("click");
            }}
          >
            <span className="bottom-nav-icon">
              ⛏️
            </span>

            <span className="bottom-nav-label">
              MINAS
            </span>
          </button>

          <button
            type="button"
            className="bottom-nav-button"
            onClick={() =>
              goTo("/shop")
            }
          >
            <span className="bottom-nav-icon">
              🛒
            </span>

            <span className="bottom-nav-label">
              TIENDA
            </span>
          </button>

          <button
            type="button"
            className="bottom-nav-button"
            onClick={() =>
              goTo("/friends")
            }
          >
            <span className="bottom-nav-icon">
              👥
            </span>

            <span className="bottom-nav-label">
              REFERIDOS
            </span>
          </button>

          <button
            type="button"
            className="bottom-nav-button"
            onClick={() =>
              goTo("/bank")
            }
          >
            <span className="bottom-nav-icon">
              🏦
            </span>

            <span className="bottom-nav-label">
              BANCO
            </span>
          </button>

          <button
            type="button"
            className="bottom-nav-button"
            onClick={() =>
              goTo("/missions")
            }
          >
            <span className="bottom-nav-icon">
              🎯
            </span>

            <span className="bottom-nav-label">
              MISIONES
            </span>
          </button>

          <button
            type="button"
            className="bottom-nav-button"
            onClick={() =>
              goTo("/mapa")
            }
          >
            <span className="bottom-nav-icon">
              🌍
            </span>

            <span className="bottom-nav-label">
              MAPA
            </span>
          </button>

        </nav>

      </div>

            {/* =======================================
          PROFILE MODAL
      ======================================== */}

      {showProfile && (
        <div
          className="profile-overlay"
          onClick={() =>
            setShowProfile(false)
          }
        >

          <div
            className="profile-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="profile-modal-top">

              <div className="profile-modal-avatar" />

              <div>
                <div className="profile-modal-title">
                  PERFIL DEL MINERO
                </div>

                <div className="profile-modal-user">
                  {username}
                </div>
              </div>

              <button
                type="button"
                className="profile-close"
                onClick={() =>
                  setShowProfile(false)
                }
              >
                ×
              </button>

            </div>

            {/* =================================
                PROFILE STATS
            ================================== */}

            <div className="profile-stats">

              <div className="profile-stat">

                <div className="profile-stat-label">
                  MONEDAS
                </div>

                <div className="profile-stat-value">
                  {coins.toLocaleString()} 🪙
                </div>

              </div>

              <div className="profile-stat">

                <div className="profile-stat-label">
                  MINERALES
                </div>

                <div className="profile-stat-value">
                  {minerals}
                </div>

              </div>

              <div className="profile-stat">

                <div className="profile-stat-label">
                  MINAS
                </div>

                <div className="profile-stat-value">
                  {unlockedMines}/4
                </div>

              </div>

              <div className="profile-stat">

                <div className="profile-stat-label">
                  ENERGÍA
                </div>

                <div className="profile-stat-value">
                  {energy}%
                </div>

              </div>

            </div>

            {/* =================================
                PROFILE ACTIONS
            ================================== */}

            <div className="profile-actions">

              <button
                type="button"
                className="profile-action"
                onClick={() => {
                  setShowProfile(false);
                  goTo("/profile");
                }}
              >
                👤 VER PERFIL COMPLETO
              </button>

              <button
                type="button"
                className="profile-action"
                onClick={() => {
                  setShowProfile(false);
                  goTo("/friends");
                }}
              >
                👥 MIS REFERIDOS
              </button>

              <button
                type="button"
                className="profile-action"
                onClick={() => {
                  setShowProfile(false);
                  goTo("/missions");
                }}
              >
                🎯 MIS MISIONES
              </button>

              <button
                type="button"
                className="profile-action"
                onClick={() => {
                  setShowProfile(false);
                  goTo("/mapa");
                }}
              >
                🌍 EXPLORAR MAPA
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

