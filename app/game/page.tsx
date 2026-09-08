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

export default function GamePage() {
  const router = useRouter();

  const [coins, setCoins] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [hits, setHits] = useState(0);

  const [unlockedMines, setUnlockedMines] = useState(1);
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [elevatorWorking, setElevatorWorking] = useState(false);

  const [surfaceMinerals, setSurfaceMinerals] = useState(0);
  const [storedMinerals, setStoredMinerals] = useState(0);

  const [minerWorking, setMinerWorking] = useState(false);
  const [minerCarrying, setMinerCarrying] = useState(false);
  const [wagonMoving, setWagonMoving] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("MINERO");

  const minePrices = [0, 250, 750, 2000];

  const mineNames = [
    "CARBÓN",
    "COBRE",
    "HIERRO",
    "ORO",
  ];

  const mineMaterials = [
    "Carbón",
    "Cobre",
    "Hierro",
    "Oro",
  ];

  const maxHits = 10;

  const progress =
    Math.min(hits, maxHits) / maxHits * 100;

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
        localStorage.getItem("telegram_username");

      if (savedUsername) {
        setUsername(savedUsername);
      }
    } catch {
      setUsername("MINERO");
    }
  }, []);

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2200);
  };

  const mine = () => {
    if (energy <= 0) {
      showMessage("⚡ SIN ENERGÍA");
      return;
    }

    setMinerWorking(true);
    setEnergy((value) => Math.max(0, value - 2));

    const nextHits = hits + 1;

    if (nextHits >= maxHits) {
      setHits(0);
      setCoins((value) => value + 25);
      setMinerals((value) => value + 1);
      setSurfaceMinerals((value) => value + 1);
      setMinerCarrying(true);

      showMessage("⛏️ ¡MINERAL EXTRAÍDO!");

      setTimeout(() => {
        setMinerWorking(false);
      }, 900);

      setTimeout(() => {
        setMinerCarrying(false);
        setStoredMinerals((value) => value + 1);
      }, 2200);

      return;
    }

    setHits(nextHits);

    setTimeout(() => {
      setMinerWorking(false);
    }, 650);
  };

  const unlockMine = (index: number) => {
    const price = minePrices[index];

    if (unlockedMines >= index + 1) {
      showMessage("⛏️ ESTA MINA YA ESTÁ ABIERTA");
      return;
    }

    if (coins < price) {
      showMessage("💰 MONEDAS INSUFICIENTES");
      return;
    }

    setCoins((value) => value - price);
    setUnlockedMines(index + 1);
    setElevatorFloor(0);

    showMessage(
      `🔓 ${mineNames[index]} DESBLOQUEADA`
    );
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
    const timer = setInterval(() => {
      if (unlockedMines <= 1) return;

      setElevatorWorking(true);

      setElevatorFloor((floor) => {
        if (floor >= unlockedMines - 1) {
          return 0;
        }

        return floor + 1;
      });

      setTimeout(() => {
        setElevatorWorking(false);
      }, 1500);
    }, 3500);

    return () => clearInterval(timer);
  }, [unlockedMines]);

  useEffect(() => {
    if (storedMinerals <= 0) return;

    setWagonMoving(true);

    const timer = setTimeout(() => {
      setStoredMinerals((value) =>
        Math.max(0, value - 1)
      );

      setSurfaceMinerals((value) =>
        Math.max(0, value - 1)
      );

      setCoins((value) => value + 5);

      setWagonMoving(false);

      showMessage("🚃 MINERAL ENTREGADO");
    }, 1800);

    return () => clearTimeout(timer);
  }, [storedMinerals]);

  const elevatorHeight =
    Math.max(82, unlockedMines * 82);

  const elevatorPosition =
    elevatorFloor * 82;

  return (
    <main className="game-page">

      <div className="game-container">

        {message && (
          <div className="game-message">
            {message}
          </div>
        )}

        <header className="game-header">

          <button
            className="profile-header"
            onClick={() => setShowProfile(true)}
          >
            <div className="profile-avatar">
              👷
            </div>

            <div className="profile-name">
              {username}
            </div>
          </button>

          <div className="header-center">
            <div className="mine-title-sub">
              OPERACIÓN MINERA
            </div>
          </div>

          <div className="balance-box">
            <span>🪙</span>
            {coins}
          </div>

        </header>

        <section className="mine-area">

          <div className="surface">

            <div className="surface-sky">
              <div className="sky-light" />
              <div className="sky-cloud sky-cloud-1" />
              <div className="sky-cloud sky-cloud-2" />
            </div>

            <div className="surface-mountains">
              <div className="mountain-back mountain-back-1" />
              <div className="mountain-back mountain-back-2" />
              <div className="mountain-front mountain-front-1" />
              <div className="mountain-front mountain-front-2" />
            </div>

            <div className="mine-entrance">

              <div className="mine-entrance-rock rock-left" />
              <div className="mine-entrance-rock rock-right" />

              <div className="mine-entrance-frame">

                <div className="mine-entrance-light" />

                <div className="mine-entrance-dark">
                  <div className="entrance-depth" />
                </div>

              </div>

              <div className="mine-rail-entry">
                <span />
                <span />
                <span />
                <span />
              </div>

            </div>

            <div className="surface-machine">

              <div className="machine-body" />

              <div className="machine-wheel machine-wheel-left" />
              <div className="machine-wheel machine-wheel-right" />

              <div className="machine-light" />

              <div className="machine-smoke smoke-1" />
              <div className="machine-smoke smoke-2" />

            </div>

            <div className="surface-warehouse">

              <div className="warehouse-roof-3d" />

              <div className="warehouse-main-3d">

                <div className="warehouse-door-3d" />

                <div className="warehouse-window window-left" />
                <div className="warehouse-window window-right" />

                <div className="warehouse-lamp-3d" />

              </div>

              <div className="warehouse-crates">
                <span />
                <span />
                <span />
              </div>

            </div>

            <div className="surface-miner">

              <div className="human-miner">

                <div className="human-head">
                  <div className="human-hair" />
                  <div className="human-face" />
                </div>

                <div className="human-helmet">
                  <div className="helmet-light" />
                </div>

                <div className="human-neck" />

                <div className="human-body">
                  <div className="human-shirt" />
                  <div className="human-belt" />
                </div>

                <div className="human-arm human-arm-left" />
                <div className="human-arm human-arm-right" />

                <div className="human-leg human-leg-left" />
                <div className="human-leg human-leg-right" />

                <div className="human-boot human-boot-left" />
                <div className="human-boot human-boot-right" />

              </div>

            </div>

            <div className="surface-dust dust-surface-1" />
            <div className="surface-dust dust-surface-2" />
            <div className="surface-dust dust-surface-3" />

            <div className="start-mining-area">

              <div className="start-mining-label">
                READY TO WORK?
              </div>

              <button
                className="start-mining-button"
                onClick={mine}
                disabled={energy <= 0}
              >

                <span className="start-mining-shine" />

                <span className="start-mining-icon">
                  ⛏
                </span>

                <span className="start-mining-text">
                  START MINING
                </span>

                <span className="start-mining-energy">
                  ENERGY {energy}/100
                </span>

              </button>

            </div>

          </div>

                    <div
            className="elevator-shaft"
            style={{
              height: `${58 + elevatorHeight}px`,
            }}
          >

            <div
              className="elevator-rail"
              style={{
                height: `${elevatorHeight}px`,
              }}
            />

            <div className="rail-glow" />

            <div
              className="elevator-rope"
              style={{
                height: `${Math.max(
                  elevatorHeight,
                  55
                )}px`,
              }}
            />

            <div
              className={`elevator-cage ${
                elevatorWorking
                  ? "elevator-moving"
                  : ""
              }`}
              style={{
                bottom: `${elevatorPosition}px`,
              }}
            >

              <div className="elevator-top-light" />

              <div className="elevator-bars">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="elevator-light" />

              <div className="elevator-worker">
                👷
              </div>

              <div className="elevator-bag">
                {storedMinerals > 0 ? "⛏️" : ""}
              </div>

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

          {/* MINA 1 */}

          <section className="mine-level coal-mine">

            <div className="mine-depth-marker">
              NIVEL 01 · CARBÓN
            </div>

            <div className="mine-wall">
              <div className="rock-layer" />

              <div className="coal-rock coal-one" />
              <div className="coal-rock coal-two" />
              <div className="coal-rock coal-three" />
              <div className="coal-rock coal-four" />

              <div className="mine-lamp lamp-left" />
              <div className="mine-lamp lamp-right" />

              <div className="mine-tunnel">

                <div className="mine-rails">

                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />

                </div>

              </div>

            </div>

            <div
              className={`miner ${
                minerWorking
                  ? "miner-working"
                  : ""
              }`}
            >

              <div className="miner-head" />
              <div className="miner-body" />

              <div className="miner-arm miner-arm-left" />
              <div className="miner-arm miner-arm-right" />

              <div className="miner-leg miner-leg-left" />
              <div className="miner-leg miner-leg-right" />

              <div className="miner-pickaxe" />

            </div>

            <div className="miner-boss">
              <div className="boss-head" />
              <div className="boss-helmet" />
              <div className="boss-body" />
              <div className="boss-arm boss-arm-left" />
              <div className="boss-arm boss-arm-right" />
            </div>

            <div className="mine-box">
              <div className="mine-box-lid" />
              <div className="mine-box-body" />
              <div className="mine-box-metal" />
              <div className="mine-box-minerals">
                {storedMinerals > 0 ? "◆ ◆ ◆" : ""}
              </div>
            </div>

            {minerWorking && (
              <>
                <div className="dust dust-one" />
                <div className="dust dust-two" />
                <div className="dust dust-three" />
                <div className="dust dust-four" />

                <div className="mineral-particle particle-one" />
                <div className="mineral-particle particle-two" />
                <div className="mineral-particle particle-three" />
                <div className="mineral-particle particle-four" />
              </>
            )}

            <div className="mine-floor-glow" />

          </section>

          {/* MINA 2 */}

          <section className="mine-level copper-mine">

            <div className="mine-depth-marker">
              NIVEL 02 · COBRE
            </div>

            <div className="mine-wall">

              <div className="rock-layer" />

              <div className="copper-vein copper-one" />
              <div className="copper-vein copper-two" />

              <div className="copper-spark spark-one" />
              <div className="copper-spark spark-two" />
              <div className="copper-spark spark-three" />

              <div className="mine-tunnel">

                <div className="mine-rails">
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                </div>

              </div>

            </div>

            <div className="mine-worker-static">
              <div className="miner-head" />
              <div className="miner-body" />
            </div>

            <div className="mine-box">
              <div className="mine-box-lid" />
              <div className="mine-box-body" />
              <div className="mine-box-metal" />
            </div>

            {unlockedMines < 2 && (
              <div className="locked-mine-overlay">

                <div className="lock-icon">
                  🔒
                </div>

                <strong>
                  MINA BLOQUEADA
                </strong>

                <span>
                  Desbloquea esta zona
                </span>

                <button
                  className="unlock-button"
                  onClick={() => unlockMine(1)}
                >
                  🪙 {minePrices[1]}
                </button>

              </div>
            )}

          </section>

                    {/* MINA 3 */}

          <section className="mine-level iron-mine">

            <div className="mine-depth-marker">
              NIVEL 03 · HIERRO
            </div>

            <div className="mine-wall">

              <div className="rock-layer" />

              <div className="iron-rock iron-one" />
              <div className="iron-rock iron-two" />
              <div className="iron-rock iron-three" />
              <div className="iron-rock iron-four" />

              <div className="mine-tunnel">

                <div className="mine-rails">
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                </div>

              </div>

            </div>

            <div className="mine-worker-static">
              <div className="miner-head" />
              <div className="miner-body" />
            </div>

            <div className="mine-box">
              <div className="mine-box-lid" />
              <div className="mine-box-body" />
              <div className="mine-box-metal" />
            </div>

            {unlockedMines < 3 && (
              <div className="locked-mine-overlay">

                <div className="lock-icon">
                  🔒
                </div>

                <strong>
                  MINA BLOQUEADA
                </strong>

                <span>
                  Desbloquea esta zona
                </span>

                <button
                  className="unlock-button"
                  onClick={() => unlockMine(2)}
                >
                  🪙 {minePrices[2]}
                </button>

              </div>
            )}

          </section>

          {/* MINA 4 */}

          <section className="mine-level gold-mine">

            <div className="mine-depth-marker">
              NIVEL 04 · ORO
            </div>

            <div className="mine-wall">

              <div className="rock-layer" />

              <div className="gold-vein gold-one" />
              <div className="gold-vein gold-two" />

              <div className="gold-nugget gold-nugget-one" />
              <div className="gold-nugget gold-nugget-two" />
              <div className="gold-nugget gold-nugget-three" />

              <div className="mine-tunnel">

                <div className="mine-rails">
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                  <span className="rail-sleeper" />
                </div>

              </div>

            </div>

            <div className="mine-worker-static">
              <div className="miner-head" />
              <div className="miner-body" />
            </div>

            <div className="mine-box">
              <div className="mine-box-lid" />
              <div className="mine-box-body" />
              <div className="mine-box-metal" />
            </div>

            {unlockedMines < 4 && (
              <div className="locked-mine-overlay">

                <div className="lock-icon">
                  🔒
                </div>

                <strong>
                  MINA BLOQUEADA
                </strong>

                <span>
                  Desbloquea esta zona
                </span>

                <button
                  className="unlock-button"
                  onClick={() => unlockMine(3)}
                >
                  🪙 {minePrices[3]}
                </button>

              </div>
            )}

          </section>

          <section className="mining-panel">

            <div className="mining-panel-title">

              <strong>
                ⛏️ PRODUCCIÓN
              </strong>

              <span>
                {mineMaterials[unlockedMines - 1]}
              </span>

            </div>

            <div className="mining-progress">

              <div
                className="mining-progress-bar"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mining-stats">

              <div className="mining-stat">
                <strong>
                  {energy}
                </strong>
                <span>
                  Energía
                </span>
              </div>

              <div className="mining-stat">
                <strong>
                  {minerals}
                </strong>
                <span>
                  Minerales
                </span>
              </div>

              <div className="mining-stat">
                <strong>
                  {surfaceMinerals}
                </strong>
                <span>
                  Producción
                </span>
              </div>

            </div>

            <button
              className="mine-button"
              onClick={mine}
              disabled={energy <= 0}
            >
              ⛏️ EXTRAER MINERAL
            </button>

          </section>

                    <section className="production-panel">

            <div className="production-title">
              🏭 CENTRO DE PRODUCCIÓN
            </div>

            <div className="production-value">

              <strong>
                Mineral almacenado
              </strong>

              <span>
                {storedMinerals}
              </span>

            </div>

            <div className="production-value">

              <strong>
                Minas activas
              </strong>

              <span>
                {unlockedMines}/4
              </span>

            </div>

          </section>

          <section className="mine-info-panel">

            <div className="mine-info-row">
              <span>
                Mina actual
              </span>

              <strong>
                {mineNames[unlockedMines - 1]}
              </strong>
            </div>

            <div className="mine-info-row">
              <span>
                Profundidad
              </span>

              <strong>
                NIVEL {unlockedMines}
              </strong>
            </div>

            <div className="mine-info-row">
              <span>
                Monedas
              </span>

              <strong>
                🪙 {coins}
              </strong>
            </div>

          </section>

        </section>

        {showProfile && (
          <div
            className="profile-modal"
            onClick={() => setShowProfile(false)}
          >

            <div
              className="profile-card"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="profile-avatar-large">
                👷
              </div>

              <h2>
                {username}
              </h2>

              <p>
                MINERO DE CUBAN-MINER
              </p>

              <div className="profile-stat-grid">

                <div className="profile-stat">
                  <strong>
                    {coins}
                  </strong>
                  <span>
                    Monedas
                  </span>
                </div>

                <div className="profile-stat">
                  <strong>
                    {minerals}
                  </strong>
                  <span>
                    Minerales
                  </span>
                </div>

                <div className="profile-stat">
                  <strong>
                    {unlockedMines}
                  </strong>
                  <span>
                    Minas
                  </span>
                </div>

                <div className="profile-stat">
                  <strong>
                    {energy}
                  </strong>
                  <span>
                    Energía
                  </span>
                </div>

              </div>

              <button
                className="profile-menu-button"
                onClick={() =>
                  router.push("/profile")
                }
              >
                👤 PERFIL
              </button>

              <button
                className="profile-menu-button"
                onClick={() =>
                  router.push("/friends")
                }
              >
                👥 REFERIDOS
              </button>

              <button
                className="profile-menu-button"
                onClick={() =>
                  router.push("/missions")
                }
              >
                🎯 MISIONES
              </button>

              <button
                className="profile-close"
                onClick={() =>
                  setShowProfile(false)
                }
              >
                CERRAR
              </button>

            </div>

          </div>
        )}

        <nav className="bottom-nav">

          <button
            className="active"
            onClick={() =>
              router.push("/game")
            }
          >
            <span>⛏️</span>
            MINAS
          </button>

          <button
            onClick={() =>
              router.push("/shop")
            }
          >
            <span>🛒</span>
            TIENDA
          </button>

          <button
            onClick={() =>
              router.push("/friends")
            }
          >
            <span>👥</span>
            REFERIDOS
          </button>

          <button
            onClick={() =>
              router.push("/bank")
            }
          >
            <span>🏦</span>
            BANCO
          </button>

          <button
            onClick={() =>
              router.push("/missions")
            }
          >
            <span>🎯</span>
            MISIONES
          </button>

          <button
            onClick={() =>
              router.push("/mapa")
            }
          >
            <span>🌍</span>
            MAPA
          </button>

        </nav>

      </div>

    </main>
  );
}
