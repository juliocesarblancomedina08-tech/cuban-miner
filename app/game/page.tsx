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
  const [elevatorWorking, setElevatorWorking] =
    useState(false);

  const [surfaceMinerals, setSurfaceMinerals] =
    useState(0);

  const [storedMinerals, setStoredMinerals] =
    useState(0);

  const [wagonMoving, setWagonMoving] =
    useState(false);

  const [message, setMessage] = useState("");

  const [showProfile, setShowProfile] =
    useState(false);

  const [username, setUsername] =
    useState("MINERO");

  const minePrices = [
    0,
    250,
    750,
    2000,
  ];

  const mineNames = [
    "CARBÓN",
    "COBRE",
    "HIERRO",
    "ORO",
  ];

  const mineIcons = [
    "🪨",
    "🟠",
    "⚙️",
    "🟡",
  ];

  const maxHits = 10;

  const progress =
    Math.min(
      (hits / maxHits) * 100,
      100
    );

  /*
   * =========================
   * USUARIO
   * =========================
   */

  useEffect(() => {
    try {
      const telegram =
        typeof window !== "undefined"
          ? (
              window as typeof window & {
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
            ).Telegram?.WebApp;

      const telegramUser =
        telegram?.initDataUnsafe?.user;

      if (telegramUser?.username) {
        setUsername(
          `@${telegramUser.username}`
        );
        return;
      }

      if (telegramUser?.first_name) {
        setUsername(
          telegramUser.first_name
        );
        return;
      }

      const savedUsername =
        localStorage.getItem(
          "username"
        ) ||
        localStorage.getItem(
          "userName"
        ) ||
        localStorage.getItem(
          "telegram_username"
        );

      if (savedUsername) {
        setUsername(
          savedUsername
        );
      }
    } catch {
      setUsername("MINERO");
    }
  }, []);

  /*
   * =========================
   * MENSAJES
   * =========================
   */

  function showMessage(
    text: string
  ) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 1400);
  }

  /*
   * =========================
   * MINERÍA MANUAL
   * =========================
   */

  function mine() {
    if (
      energy <= 0 ||
      hitting
    ) {
      return;
    }

    setHitting(true);

    setEnergy(
      (value) =>
        Math.max(
          value - 2,
          0
        )
    );

    setTimeout(() => {
      setHits((value) => {
        const next =
          value + 1;

        if (
          next >= maxHits
        ) {
          setCoins(
            (value) =>
              value + 25
          );

          setMinerals(
            (value) =>
              value + 1
          );

          setSurfaceMinerals(
            (value) =>
              value + 1
          );

          showMessage(
            "+25 🪙  +1 🪨"
          );

          return 0;
        }

        return next;
      });

      setHitting(false);
    }, 350);
  }

  /*
   * =========================
   * DESBLOQUEAR MINA
   * =========================
   */

  function unlockMine(
    index: number
  ) {
    const price =
      minePrices[index];

    if (
      unlockedMines >=
      index + 1
    ) {
      return;
    }

    if (
      coins < price
    ) {
      showMessage(
        "❌ MONEDAS INSUFICIENTES"
      );
      return;
    }

    setCoins(
      (value) =>
        value - price
    );

    setUnlockedMines(
      index + 1
    );

    setElevatorFloor(0);

    showMessage(
      `⛏️ MINA ${
        index + 1
      } DESBLOQUEADA`
    );
  }

  /*
   * =========================
   * ASCENSOR
   * =========================
   *
   * El ascensor solamente
   * utiliza las minas que
   * están desbloqueadas.
   */

  useEffect(() => {
    if (
      unlockedMines <= 0
    ) {
      return;
    }

    const elevatorInterval =
      setInterval(() => {

        setElevatorWorking(
          true
        );

        setElevatorFloor(
          (floor) => {
            const next =
              floor + 1;

            if (
              next >=
              unlockedMines
            ) {
              return 0;
            }

            return next;
          }
        );

        setTimeout(() => {

          setElevatorWorking(
            false
          );

          setSurfaceMinerals(
            (value) => {

              if (
                value <= 0
              ) {
                return value;
              }

              setStoredMinerals(
                (stored) =>
                  stored + 1
              );

              return value - 1;
            }
          );

        }, 900);

      }, 3500);

    return () => {
      clearInterval(
        elevatorInterval
      );
    };
  }, [
    unlockedMines,
  ]);

  /*
   * =========================
   * PRODUCCIÓN AUTOMÁTICA
   * =========================
   */

  useEffect(() => {
    if (
      unlockedMines <= 1
    ) {
      return;
    }

    const autoMineInterval =
      setInterval(() => {

        const amount =
          unlockedMines - 1;

        setSurfaceMinerals(
          (value) =>
            value + amount
        );

        setMinerals(
          (value) =>
            value + amount
        );

        setCoins(
          (value) =>
            value +
            amount * 2
        );

      }, 5000);

    return () => {
      clearInterval(
        autoMineInterval
      );
    };
  }, [
    unlockedMines,
  ]);

  /*
   * =========================
   * VAGONETA
   * =========================
   */

  useEffect(() => {

    if (
      storedMinerals <= 0 ||
      wagonMoving
    ) {
      return;
    }

    setWagonMoving(
      true
    );

    const timer =
      setTimeout(() => {

        setStoredMinerals(
          (value) =>
            Math.max(
              value - 1,
              0
            )
        );

        setCoins(
          (value) =>
            value + 5
        );

        setWagonMoving(
          false
        );

      }, 1800);

    return () => {
      clearTimeout(timer);
    };

  }, [
    storedMinerals,
    wagonMoving,
  ]);

  /*
   * =========================
   * ENERGÍA
   * =========================
   */

  useEffect(() => {

    const energyTimer =
      setInterval(() => {

        setEnergy(
          (value) =>
            Math.min(
              value + 1,
              100
            )
        );

      }, 3000);

    return () => {
      clearInterval(
        energyTimer
      );
    };

  }, []);

  /*
   * =========================
   * POSICIÓN ASCENSOR
   * =========================
   */

  const elevatorPosition =
    unlockedMines <= 1
      ? 8
      : 8 +
        (
          elevatorFloor /
          Math.max(
            unlockedMines - 1,
            1
          )
        ) *
        78;

  /*
   * =========================
   * PERFIL
   * =========================
   */

  function openProfile() {
    setShowProfile(
      true
    );
  }

  function closeProfile() {
    setShowProfile(
      false
    );
  }

  /*
   * =========================
   * MAPA
   * =========================
   */

  function openMap() {
    router.push(
      "/mapa"
    );
  }

  return (
    <main className="game-page">

      <div className="game-container">

        <header className="game-header">

          <button
            className="profile-header"
            onClick={
              openProfile
            }
          >

            <div className="profile-avatar">
              👷
            </div>

            <div className="profile-name">
              {username}
            </div>

          </button>

          <div className="header-center">

            <div className="mine-title">
              ⛏️ MINA DE{" "}
              {mineNames[0]}
            </div>

            <div className="mine-title-sub">
              NIVEL 1
            </div>

          </div>

          <div className="balance-box">
            🪙 {coins}
          </div>

        </header>

        {message && (
          <div className="game-message">
            {message}
          </div>
        )}

        <section className="mine-area">

          <div className="surface">

            <div className="sun">
              ☀️
            </div>

            <div className="cloud cloud-one">
              ☁️
            </div>

            <div className="cloud cloud-two">
              ☁️
            </div>

            <div className="mountain mountain-one" />
            <div className="mountain mountain-two" />

            <div className="surface-ground">

              <div className="ground-grass" />

              <div className="warehouse">

                <div className="warehouse-roof">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="warehouse-body">

                  <strong>
                    ALMACÉN
                  </strong>

                  <span>
                    🪨{" "}
                    {storedMinerals}
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
                  wagonMoving
                    ? "wagon-moving"
                    : ""
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
              ASCENSOR DINÁMICO
          ========================= */}

          <div
            className="elevator-shaft"
            style={{
              height:
                `${
                  58 +
                  unlockedMines *
                    82
                }px`,
            }}
          >

            <div
              className="elevator-rail"
              style={{
                height:
                  `${
                    unlockedMines *
                    82
                  }px`,
              }}
            />

            <div className="rail-glow" />

            <div
              className="elevator-rope"
              style={{
                height:
                  `${
                    Math.max(
                      unlockedMines *
                        82,
                      55
                    )
                  }px`,
              }}
            />

            <div
              className={`elevator-cage ${
                elevatorWorking
                  ? "elevator-moving"
                  : ""
              }`}
              style={{
                top:
                  `${elevatorPosition}%`,
              }}
            >

              <div className="elevator-top-light" />

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
                NIVEL{" "}
                {elevatorFloor + 1}
              </div>

            </div>

          </div>

                    <section className="mine-level mine-level-one">

            <div className="mine-wall">
              <div className="rock-layer rock-layer-one" />
              <div className="rock-layer rock-layer-two" />
              <div className="rock-layer rock-layer-three" />

              <div className="mine-sign">
                <span>⛏️</span>
                <strong>MINA 1</strong>
                <small>CARBÓN</small>
              </div>

              <div className="mine-tunnel">
                <div className="tunnel-roof" />

                <div className="mine-cart">
                  <div className="cart-body">
                    🛒
                  </div>
                  <div className="cart-rocks">
                    🪨 🪨
                  </div>
                </div>

                <div
                  className={`miner-character ${
                    hitting ? "miner-hitting" : ""
                  }`}
                >
                  <div className="miner-helmet">
                    ⛑️
                  </div>

                  <div className="miner-body">
                    👷
                  </div>

                  <div className="miner-pickaxe">
                    ⛏️
                  </div>
                </div>

                <div className="coal-rock coal-one">
                  <span>🪨</span>
                  <i />
                  <i />
                  <i />
                </div>

                <div className="coal-rock coal-two">
                  <span>🪨</span>
                  <i />
                  <i />
                  <i />
                </div>

                <div className="coal-rock coal-three">
                  <span>🪨</span>
                  <i />
                  <i />
                  <i />
                </div>

                <div className="mine-lamp lamp-one">
                  💡
                </div>

                <div className="mine-lamp lamp-two">
                  💡
                </div>

                <div className="mine-particle particle-one">
                  ✦
                </div>

                <div className="mine-particle particle-two">
                  ✦
                </div>

                <div className="mine-particle particle-three">
                  ✦
                </div>

              </div>
            </div>

            <div className="manual-mining-panel">

              <div className="mining-panel-header">
                <div>
                  <strong>
                    ⛏️ EXTRACCIÓN MANUAL
                  </strong>

                  <span>
                    Golpea la roca para extraer carbón
                  </span>
                </div>

                <div className="energy-mini">
                  ⚡ {energy}/100
                </div>
              </div>

              <div className="mining-progress">
                <div
                  className="mining-progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mining-progress-text">
                <span>
                  GOLPES
                </span>

                <strong>
                  {hits}/{maxHits}
                </strong>
              </div>

              <button
                className={`mine-button ${
                  hitting ? "mine-button-hit" : ""
                }`}
                onClick={mine}
                disabled={
                  energy <= 0 ||
                  hitting
                }
              >
                <span className="mine-button-icon">
                  ⛏️
                </span>

                <span className="mine-button-text">
                  {hitting
                    ? "¡GOLPEANDO!"
                    : energy <= 0
                    ? "SIN ENERGÍA"
                    : "GOLPEAR ROCA"}
                </span>
              </button>

              <div className="mining-reward">
                <span>
                  🎁 RECOMPENSA
                </span>

                <strong>
                  10 golpes → +25 🪙 +1 🪨
                </strong>
              </div>

            </div>

          </section>

          <section className="mine-level mine-level-two">

            <div className="mine-depth-marker">
              <span>↓</span>
              NIVEL 2
            </div>

            <div className="mine-wall">

              <div className="rock-layer rock-layer-one" />
              <div className="rock-layer rock-layer-two" />
              <div className="rock-layer rock-layer-three" />

              <div className="mine-sign copper-sign">
                <span>🟠</span>
                <strong>MINA 2</strong>
                <small>COBRE</small>
              </div>

              <div className="mine-tunnel">

                <div className="tunnel-roof" />

                <div className="copper-vein">
                  <span>🟠</span>
                  <span>🟠</span>
                  <span>🟠</span>
                  <span>🟠</span>
                </div>

                <div className="miner-character auto-miner">
                  <div className="miner-helmet">
                    ⛑️
                  </div>

                  <div className="miner-body">
                    👷
                  </div>

                  <div className="miner-pickaxe">
                    ⛏️
                  </div>
                </div>

                <div className="mine-drill">
                  ⚙️
                </div>

                <div className="mine-lamp lamp-one">
                  💡
                </div>

                <div className="copper-particle copper-particle-one">
                  ✦
                </div>

                <div className="copper-particle copper-particle-two">
                  ✦
                </div>

              </div>

              {unlockedMines < 2 && (
                <div className="locked-mine-overlay">

                  <div className="locked-icon">
                    🔒
                  </div>

                  <strong>
                    MINA BLOQUEADA
                  </strong>

                  <span>
                    Desbloquea esta mina
                    para extraer COBRE
                  </span>

                  <button
                    className="unlock-button"
                    onClick={() =>
                      unlockMine(1)
                    }
                  >
                    <span>
                      ⛏️ DESBLOQUEAR
                    </span>

                    <strong>
                      🪙 {minePrices[1]}
                    </strong>
                  </button>

                </div>
              )}

            </div>

          </section>

                    <section className="mine-level mine-level-three">

            <div className="mine-depth-marker">
              <span>↓</span>
              NIVEL 3
            </div>

            <div className="mine-wall">

              <div className="rock-layer rock-layer-one" />
              <div className="rock-layer rock-layer-two" />
              <div className="rock-layer rock-layer-three" />

              <div className="mine-sign iron-sign">
                <span>⚙️</span>
                <strong>MINA 3</strong>
                <small>HIERRO</small>
              </div>

              <div className="mine-tunnel">

                <div className="tunnel-roof" />

                <div className="iron-vein">
                  <span>⚙️</span>
                  <span>⚙️</span>
                  <span>⚙️</span>
                  <span>⚙️</span>
                  <span>⚙️</span>
                </div>

                <div className="miner-character auto-miner">
                  <div className="miner-helmet">
                    ⛑️
                  </div>

                  <div className="miner-body">
                    👷
                  </div>

                  <div className="miner-pickaxe">
                    ⛏️
                  </div>
                </div>

                <div className="iron-machine">
                  ⚙️
                </div>

                <div className="mine-lamp lamp-one">
                  💡
                </div>

                <div className="mine-lamp lamp-two">
                  💡
                </div>

                <div className="iron-particle iron-particle-one">
                  ✦
                </div>

                <div className="iron-particle iron-particle-two">
                  ✦
                </div>

                <div className="iron-particle iron-particle-three">
                  ✦
                </div>

              </div>

              {unlockedMines < 3 && (
                <div className="locked-mine-overlay">

                  <div className="locked-icon">
                    🔒
                  </div>

                  <strong>
                    MINA BLOQUEADA
                  </strong>

                  <span>
                    Desbloquea esta mina
                    para extraer HIERRO
                  </span>

                  <button
                    className="unlock-button"
                    onClick={() =>
                      unlockMine(2)
                    }
                  >
                    <span>
                      ⛏️ DESBLOQUEAR
                    </span>

                    <strong>
                      🪙 {minePrices[2]}
                    </strong>
                  </button>

                </div>
              )}

            </div>

          </section>


          <section className="mine-level mine-level-four">

            <div className="mine-depth-marker">
              <span>↓</span>
              NIVEL 4
            </div>

            <div className="mine-wall">

              <div className="rock-layer rock-layer-one" />
              <div className="rock-layer rock-layer-two" />
              <div className="rock-layer rock-layer-three" />

              <div className="mine-sign gold-sign">
                <span>🟡</span>
                <strong>MINA 4</strong>
                <small>ORO</small>
              </div>

              <div className="mine-tunnel">

                <div className="tunnel-roof" />

                <div className="gold-vein">
                  <span>🟡</span>
                  <span>🟡</span>
                  <span>🟡</span>
                  <span>🟡</span>
                  <span>🟡</span>
                  <span>🟡</span>
                </div>

                <div className="miner-character auto-miner">
                  <div className="miner-helmet">
                    ⛑️
                  </div>

                  <div className="miner-body">
                    👷
                  </div>

                  <div className="miner-pickaxe">
                    ⛏️
                  </div>
                </div>

                <div className="gold-machine">
                  ⚙️
                </div>

                <div className="mine-lamp lamp-one">
                  💡
                </div>

                <div className="mine-lamp lamp-two">
                  💡
                </div>

                <div className="gold-particle gold-particle-one">
                  ✦
                </div>

                <div className="gold-particle gold-particle-two">
                  ✦
                </div>

                <div className="gold-particle gold-particle-three">
                  ✦
                </div>

                <div className="gold-particle gold-particle-four">
                  ✦
                </div>

              </div>

              {unlockedMines < 4 && (
                <div className="locked-mine-overlay">

                  <div className="locked-icon">
                    🔒
                  </div>

                  <strong>
                    MINA BLOQUEADA
                  </strong>

                  <span>
                    Desbloquea esta mina
                    para extraer ORO
                  </span>

                  <button
                    className="unlock-button"
                    onClick={() =>
                      unlockMine(3)
                    }
                  >
                    <span>
                      ⛏️ DESBLOQUEAR
                    </span>

                    <strong>
                      🪙 {minePrices[3]}
                    </strong>
                  </button>

                </div>
              )}

            </div>

          </section>


          <section className="production-panel">

            <div className="production-title">
              📊 PRODUCCIÓN DE LA MINA
            </div>

            <div className="production-grid">

              <div className="production-card">
                <span className="production-icon">
                  🪨
                </span>

                <div>
                  <small>
                    EXTRAÍDO
                  </small>

                  <strong>
                    {minerals}
                  </strong>
                </div>
              </div>

              <div className="production-card">
                <span className="production-icon">
                  📦
                </span>

                <div>
                  <small>
                    ALMACENADO
                  </small>

                  <strong>
                    {storedMinerals}
                  </strong>
                </div>
              </div>

              <div className="production-card">
                <span className="production-icon">
                  🪨
                </span>

                <div>
                  <small>
                    EN SUPERFICIE
                  </small>

                  <strong>
                    {surfaceMinerals}
                  </strong>
                </div>
              </div>

            </div>

          </section>


          <section className="mine-info-panel">

            <div className="mine-info-title">
              ⛏️ SISTEMA DE MINAS
            </div>

            <div className="mine-info-list">

              {mineNames.map(
                (name, index) => (
                  <div
                    key={name}
                    className={`mine-info-row ${
                      unlockedMines >=
                      index + 1
                        ? "mine-info-unlocked"
                        : "mine-info-locked"
                    }`}
                  >

                    <div className="mine-info-left">

                      <span className="mine-info-icon">
                        {mineIcons[index]}
                      </span>

                      <div>
                        <strong>
                          MINA {index + 1}
                        </strong>

                        <small>
                          {name}
                        </small>
                      </div>

                    </div>

                    <div className="mine-info-status">

                      {unlockedMines >=
                      index + 1 ? (
                        <>
                          <span>
                            DESBLOQUEADA
                          </span>

                          <b>
                            ✓
                          </b>
                        </>
                      ) : (
                        <>
                          <span>
                            BLOQUEADA
                          </span>

                          <b>
                            🔒
                          </b>
                        </>
                      )}

                    </div>

                  </div>
                )
              )}

            </div>

          </section>


          <div className="bottom-space" />

        </section>

                {showProfile && (
          <div
            className="profile-modal-backdrop"
            onClick={closeProfile}
          >
            <div
              className="profile-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="profile-modal-header">

                <div className="profile-modal-avatar">
                  👷
                </div>

                <div className="profile-modal-user">

                  <strong>
                    {username}
                  </strong>

                  <span>
                    ⛏️ MINERO
                  </span>

                </div>

                <button
                  className="profile-close"
                  onClick={closeProfile}
                >
                  ✕
                </button>

              </div>


              <div className="profile-stats">

                <div className="profile-stat">

                  <span>
                    🪙
                  </span>

                  <small>
                    MONEDAS
                  </small>

                  <strong>
                    {coins}
                  </strong>

                </div>


                <div className="profile-stat">

                  <span>
                    🪨
                  </span>

                  <small>
                    MINERALES
                  </small>

                  <strong>
                    {minerals}
                  </strong>

                </div>


                <div className="profile-stat">

                  <span>
                    ⛏️
                  </span>

                  <small>
                    GOLPES
                  </small>

                  <strong>
                    {hits}
                  </strong>

                </div>

              </div>


              <div className="profile-menu">

                <button
                  onClick={() => {
                    closeProfile();
                    router.push(
                      "/profile"
                    );
                  }}
                >
                  <span>
                    👤
                  </span>

                  <div>
                    <strong>
                      MI PERFIL
                    </strong>

                    <small>
                      Ver información de tu cuenta
                    </small>
                  </div>

                  <b>
                    ›
                  </b>
                </button>


                <button
                  onClick={() => {
                    closeProfile();
                    router.push(
                      "/friends"
                    );
                  }}
                >
                  <span>
                    👥
                  </span>

                  <div>
                    <strong>
                      REFERIDOS
                    </strong>

                    <small>
                      Invita amigos y gana recompensas
                    </small>
                  </div>

                  <b>
                    ›
                  </b>
                </button>


                <button
                  onClick={() => {
                    closeProfile();
                    router.push(
                      "/missions"
                    );
                  }}
                >
                  <span>
                    🎯
                  </span>

                  <div>
                    <strong>
                      MISIONES
                    </strong>

                    <small>
                      Completa tareas y gana monedas
                    </small>
                  </div>

                  <b>
                    ›
                  </b>
                </button>

              </div>


              <button
                className="profile-modal-close-button"
                onClick={closeProfile}
              >
                CERRAR
              </button>

            </div>
          </div>
        )}


        <nav className="bottom-navigation">

          <button
            className="bottom-nav-item active"
            onClick={() =>
              router.push("/game")
            }
          >

            <span className="bottom-nav-icon">
              ⛏️
            </span>

            <span className="bottom-nav-label">
              MINAS
            </span>

          </button>


          <button
            className="bottom-nav-item"
            onClick={() =>
              router.push("/shop")
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
            className="bottom-nav-item"
            onClick={() =>
              router.push("/friends")
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
            className="bottom-nav-item"
            onClick={() =>
              router.push("/bank")
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
            className="bottom-nav-item"
            onClick={() =>
              router.push("/missions")
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
            className="bottom-nav-item"
            onClick={openMap}
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
    </main>
  );
              }

