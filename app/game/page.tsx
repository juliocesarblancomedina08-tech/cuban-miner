"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

type MineData = {
  id: number;
  name: string;
  material: string;
  icon: string;
  price: number;
};

const MINES: MineData[] = [
  {
    id: 1,
    name: "MINA DE CARBÓN",
    material: "CARBÓN",
    icon: "⚫",
    price: 0,
  },
  {
    id: 2,
    name: "MINA DE COBRE",
    material: "COBRE",
    icon: "🟠",
    price: 250,
  },
  {
    id: 3,
    name: "MINA DE HIERRO",
    material: "HIERRO",
    icon: "⚙️",
    price: 750,
  },
  {
    id: 4,
    name: "MINA DE ORO",
    material: "ORO",
    icon: "🟡",
    price: 2000,
  },
];

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

  const currentMine = useMemo(() => {
    return MINES[
      Math.max(
        0,
        Math.min(unlockedMines - 1, MINES.length - 1)
      )
    ];
  }, [unlockedMines]);

  /* =========================================
     WORKERS
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

  const [wagonLoaded, setWagonLoaded] =
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
          ? (window as any).Telegram?.WebApp
          : undefined;

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
      | "wagon"
  ) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      const audio =
        new AudioContextClass();

      const oscillator =
        audio.createOscillator();

      const gain =
        audio.createGain();

      oscillator.connect(gain);
      gain.connect(audio.destination);

      const now =
        audio.currentTime;

      if (type === "mine") {
        oscillator.frequency.setValueAtTime(
          120,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          60,
          now + 0.1
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
          145,
          now + 0.3
        );
      }

      if (type === "wagon") {
        oscillator.frequency.setValueAtTime(
          80,
          now
        );

        oscillator.frequency.linearRampToValueAtTime(
          110,
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
        now + 0.18
      );

      oscillator.start(now);
      oscillator.stop(now + 0.19);
    } catch {
      /* Audio opcional */
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
      const nextHits =
        currentHits + 1;

      if (nextHits >= maxHits) {
        setMinerals(
          (value) => value + 1
        );

        setSurfaceMinerals(
          (value) => value + 1
        );

        setCoins(
          (value) => value + 25
        );

        playSound("coin");

        showMessage(
          `⛏️ ${currentMine.material} EXTRAÍDO  +25 🪙`
        );

        return 0;
      }

      return nextHits;
    });
  };

  /* =========================================
     START MINING
  ========================================= */

  const startMining = () => {
    if (energy < 2) {
      showMessage("⚡ SIN ENERGÍA");
      return;
    }

    setMiningStarted(true);
    setMinerPhase("working");

    mine();
  };

  /* =========================================
     UNLOCK MINE
  ========================================= */

  const unlockMine = (mineId: number) => {
    if (
      mineId < 2 ||
      mineId > MINES.length
    ) {
      return;
    }

    if (
      unlockedMines >= mineId
    ) {
      return;
    }

    const mineData =
      MINES[mineId - 1];

    const price =
      mineData.price;

    if (coins < price) {
      showMessage(
        `🪙 NECESITAS ${price.toLocaleString()} MONEDAS`
      );

      return;
    }

    setCoins(
      (value) => value - price
    );

    setUnlockedMines(mineId);

    /*
     * El elevador vuelve a superficie
     * y después podrá viajar hasta
     * la nueva mina desbloqueada.
     */
    setElevatorFloor(0);

    playSound("unlock");

    showMessage(
      `⛏️ ${mineData.name} DESBLOQUEADA`
    );
  };

  /* =========================================
     ENERGY RECOVERY
  ========================================= */

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setEnergy((value) =>
          Math.min(
            100,
            value + 1
          )
        );
      }, 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* =========================================
     AUTOMATED MINER
  ========================================= */

  useEffect(() => {
    if (!miningStarted) {
      setMinerPhase("idle");
      return;
    }

    let cancelled = false;
    let timer1: number | undefined;
    let timer2: number | undefined;
    let timer3: number | undefined;

    const cycle = () => {
      if (cancelled) {
        return;
      }

      setMinerPhase("working");

      timer1 =
        window.setTimeout(() => {
          if (cancelled) return;

          setMinerPhase("walking");
        }, 2200);

      timer2 =
        window.setTimeout(() => {
          if (cancelled) return;

          setMinerPhase("loading");

          setWorkerHasMineral(true);

          setSurfaceMinerals(
            (value) => value + 1
          );

          setMinerals(
            (value) => value + 1
          );
        }, 4300);

      timer3 =
        window.setTimeout(() => {
          if (cancelled) return;

          cycle();
        }, 6800);
    };

    cycle();

    return () => {
      cancelled = true;

      if (timer1) {
        window.clearTimeout(timer1);
      }

      if (timer2) {
        window.clearTimeout(timer2);
      }

      if (timer3) {
        window.clearTimeout(timer3);
      }
    };
  }, [miningStarted]);

  /* =========================================
     ELEVATOR SYSTEM
  ========================================= */

  useEffect(() => {
    if (!workerHasMineral) {
      return;
    }

    if (elevatorWorking) {
      return;
    }

    let cancelled = false;

    /*
     * El trabajador entrega el mineral
     * al sistema de transporte.
     */

    setElevatorWorking(true);

    /*
     * El elevador baja hasta la mina
     * actualmente desbloqueada.
     */

    setElevatorPhase("down");

    playSound("elevator");

    const targetFloor =
      Math.max(
        0,
        unlockedMines - 1
      );

    const downTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setElevatorFloor(
          targetFloor
        );

        setElevatorPhase(
          "loading"
        );
      }, 1200);

    const loadTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setElevatorPhase("up");
      }, 2600);

    const finishTimer =
      window.setTimeout(() => {
        if (cancelled) return;

        setElevatorFloor(0);

        setWorkerHasMineral(false);

        setStoredMinerals(
          (value) => value + 1
        );

        setElevatorPhase("idle");

        setElevatorWorking(false);
      }, 4600);

    return () => {
      cancelled = true;

      window.clearTimeout(
        downTimer
      );

      window.clearTimeout(
        loadTimer
      );

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
     WAGON SYSTEM
  ========================================= */

  useEffect(() => {
    if (storedMinerals <= 0) {
      setWagonLoaded(false);
      return;
    }

    if (wagonMoving) {
      return;
    }

    setWagonLoaded(true);
    setWagonMoving(true);

    playSound("wagon");

    const timer =
      window.setTimeout(() => {
        setStoredMinerals(
          (value) =>
            Math.max(
              0,
              value - 1
            )
        );

        setWagonLoaded(false);
        setWagonMoving(false);

        setCoins(
          (value) => value + 5
        );

        playSound("coin");

        showMessage(
          "🚋 MINERAL ENTREGADO AL ALMACÉN  +5 🪙"
        );
      }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    storedMinerals,
    wagonMoving,
  ]);

  /* =========================================
     ELEVATOR VISUAL
  ========================================= */

  /*
   * MUY IMPORTANTE:
   *
   * El elevador solo tendrá altura
   * correspondiente a las minas
   * desbloqueadas.
   *
   * Si solo hay Mina 1:
   * superficie → Mina 1.
   *
   * Si desbloqueas Mina 2:
   * superficie → Mina 1 → Mina 2.
   *
   * Las minas bloqueadas quedan
   * completamente fuera del recorrido.
   */

  const unlockedLevelCount =
    Math.max(
      1,
      Math.min(
        unlockedMines,
        MINES.length
      )
    );

  const elevatorLevel =
    Math.max(
      0,
      Math.min(
        unlockedLevelCount - 1,
        elevatorFloor
      )
    );

  /* =========================================
     MINER ANIMATION
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
              <span className="profile-avatar-head" />
              <span className="profile-avatar-body" />
            </button>
          </div>

          <div className="profile-header-info">

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

            <div className="header-mine-name">
              {currentMine.icon}{" "}
              {currentMine.material}
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

        <div
          className={[
            "game-message",
            message
              ? "visible"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {message}
        </div>

        {/* =====================================
            MINE WORLD
        ====================================== */}

        <section
          className={[
            "mine-world",
            hitting ||
            minerPhase === "working"
              ? "mining-active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >

          {/* =================================
              SKY / SURFACE
          ================================== */}

          <div className="sky">

            <div className="sky-glow" />

            <div className="sun" />

            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="cloud cloud-3" />

          </div>

          {/* =================================
              MOUNTAINS
          ================================== */}

          <div className="mountains">

            <div className="mountain mountain-1" />
            <div className="mountain mountain-2" />
            <div className="mountain mountain-3" />
            <div className="mountain mountain-4" />

          </div>

          {/* =================================
              SURFACE FACILITIES
          ================================== */}

          <div className="surface-area">

            {/* MINE TOWER */}

            <div className="mine-tower">

              <div className="tower-frame tower-frame-left" />
              <div className="tower-frame tower-frame-right" />

              <div className="tower-beam tower-beam-top" />
              <div className="tower-beam tower-beam-mid" />

              <div className="tower-pulley">

                <div className="pulley-wheel" />

              </div>

              <div className="tower-sign">
                MINA
              </div>

            </div>

            {/* WAREHOUSE */}

            <div className="warehouse">

              <div className="warehouse-roof" />

              <div className="warehouse-body">

                <div className="warehouse-door" />

                <div className="warehouse-window" />

                <div className="warehouse-light" />

              </div>

              <div className="warehouse-sign">
                ALMACÉN
              </div>

              <div className="warehouse-stock">

                <span />
                <span />
                <span />

              </div>

            </div>

            {/* =================================
              BOSS / SUPERVISOR
          ================================== */}

          <div className="boss-miner">

            <div className="boss-badge">
              JEFE
            </div>

            <div className="human-miner boss-character">

              <div className="miner-shadow" />

              <div className="miner-head">

                <div className="miner-face" />

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
              SURFACE WAGON
          ================================== */}

          <div
            className={[
              "surface-wagon",
              wagonMoving ? "moving" : "",
              wagonLoaded ? "loaded" : "",
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

          </div>

          {/* =================================
              WAGON OPERATOR
          ================================== */}

          <div className="wagon-worker">

            <div className="wagon-worker-badge">
              OPERADOR
            </div>

            <div className="human-miner small-worker">

              <div className="miner-shadow" />

              <div className="miner-head">

                <div className="miner-face" />

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

        </div>

        {/* =====================================
            UNDERGROUND MINE SYSTEM
        ====================================== */}

        <div
          className="underground-shaft"
          style={{
            ["--unlocked-levels" as any]:
              unlockedLevelCount,
          }}
        >

          {/* =================================
              ELEVATOR SHAFT
          ================================== */}

          <div className="elevator-shaft">

            <div className="shaft-wall shaft-wall-left" />
            <div className="shaft-wall shaft-wall-right" />

            <div className="shaft-rope" />

            <div
              className={[
                "mine-elevator",
                elevatorPhase === "down"
                  ? "descending"
                  : "",
                elevatorPhase === "up"
                  ? "ascending"
                  : "",
                elevatorPhase === "loading"
                  ? "loading"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                ["--elevator-level" as any]:
                  elevatorLevel,
              }}
            >

              <div className="elevator-cabin">

                <div className="elevator-light" />

                <div className="elevator-door-left" />
                <div className="elevator-door-right" />

                <div className="elevator-window" />

                <div className="elevator-control">
                  ●
                </div>

              </div>

            </div>

          </div>

          {/* =================================
              MINE LEVELS
          ================================== */}

          <div className="mine-levels">

            {MINES.map((mineData) => {

              const unlocked =
                mineData.id <=
                unlockedMines;

              const isCurrent =
                mineData.id ===
                unlockedMines;

              return (
                <div
                  key={mineData.id}
                  className={[
                    "mine-level",
                    `mine-level-${mineData.id}`,
                    unlocked
                      ? "unlocked"
                      : "locked",
                    isCurrent
                      ? "current"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >

                  {/* =================================
                      ROCK WALL
                  ================================== */}

                  <div className="mine-rock-wall">

                    <div className="rock-detail rock-detail-1" />
                    <div className="rock-detail rock-detail-2" />
                    <div className="rock-detail rock-detail-3" />
                    <div className="rock-detail rock-detail-4" />
                    <div className="rock-detail rock-detail-5" />

                  </div>

                  {/* =================================
                      LEVEL INFORMATION
                  ================================== */}

                  <div className="mine-level-label">

                    <span className="mine-level-number">
                      NIVEL {mineData.id}
                    </span>

                    <strong>
                      {mineData.icon}{" "}
                      {mineData.material}
                    </strong>

                  </div>

                  {/* =================================
                      TUNNEL
                  ================================== */}

                  <div className="mine-tunnel">

                    <div className="tunnel-timber tunnel-timber-left" />

                    <div className="tunnel-timber tunnel-timber-right" />

                    <div className="tunnel-timber tunnel-timber-top" />

                    <div className="tunnel-dark" />

                    {/* =================================
                        RAIL SYSTEM
                    ================================== */}

                    <div className="mine-rails">

                      <div className="rail rail-left" />

                      <div className="rail rail-right" />

                      <div className="rail-sleeper sleeper-1" />
                      <div className="rail-sleeper sleeper-2" />
                      <div className="rail-sleeper sleeper-3" />
                      <div className="rail-sleeper sleeper-4" />
                      <div className="rail-sleeper sleeper-5" />

                    </div>

                    {/* TUNNEL LIGHTS */}

                    <div className="tunnel-light tunnel-light-1" />
                    <div className="tunnel-light tunnel-light-2" />

                  </div>

                  {/* =================================
                      MINER INSIDE MINE
                  ================================== */}

                  {unlocked && (
                    <div className="underground-worker">

                      <div className="worker-label">
                        MINERO
                      </div>

                      <div className="human-miner mine-worker-character">

                        <div className="miner-shadow" />

                        <div className="miner-head">

                          <div className="miner-face" />

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

                        <div className="underground-pickaxe">

                          <div className="pickaxe-handle" />
                          <div className="pickaxe-head" />

                        </div>

                      </div>

                    </div>
                  )}

                  {/* =================================
                      UNDERGROUND WAGON
                  ================================== */}

                  {unlocked && (
                    <div
                      className={[
                        "underground-wagon",
                        wagonMoving
                          ? "wagon-active"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >

                      <div className="underground-wagon-ore" />

                      <div className="wagon-body">
                        <div className="wagon-rim" />
                      </div>

                      <div className="wagon-wheel wagon-wheel-left" />
                      <div className="wagon-wheel wagon-wheel-right" />

                    </div>
                  )}

                  {/* =================================
                      WAGON OPERATOR
                  ================================== */}

                  {unlocked && (
                    <div className="mine-wagon-operator">

                      <div className="operator-label">
                        🚋 OPERADOR
                      </div>

                      <div className="human-miner tiny-worker">

                        <div className="miner-shadow" />

                        <div className="miner-head">

                          <div className="miner-face" />

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
                  )}

                  {/* =================================
                      MINERAL STORAGE
                  ================================== */}

                  {unlocked && (
                    <div className="mine-storage">

                      <div className="mine-storage-crate">
                        <span />
                        <span />
                        <span />
                      </div>

                      <div className="mine-storage-label">
                        MINERAL
                      </div>

                    </div>
                  )}

                  {/* =================================
                      LOCKED MINE
                  ================================== */}

                  {!unlocked && (
                    <div className="locked-mine-panel">

                      <div className="locked-icon">
                        🔒
                      </div>

                      <div className="locked-title">
                        MINA BLOQUEADA
                      </div>

                      <div className="locked-material">
                        {mineData.icon}{" "}
                        {mineData.material}
                      </div>

                      <div className="locked-description">
                        Desbloquea este nivel
                        para continuar la
                        extracción.
                      </div>

                      <button
                        type="button"
                        className="unlock-mine-button"
                        onClick={() =>
                          unlockMine(
                            mineData.id
                          )
                        }
                      >
                        <span>
                          DESBLOQUEAR
                        </span>

                        <strong>
                          {mineData.price.toLocaleString()} 🪙
                        </strong>
                      </button>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

        {/* =====================================
            DUST PARTICLES
        ====================================== */}

        <div className="dust-particle dust-1" />
        <div className="dust-particle dust-2" />
        <div className="dust-particle dust-3" />
        <div className="dust-particle dust-4" />
        <div className="dust-particle dust-5" />
        <div className="dust-particle dust-6" />

        {/* =====================================
            MINERAL PARTICLES
        ====================================== */}

        <div className="mineral-particle mineral-1" />
        <div className="mineral-particle mineral-2" />
        <div className="mineral-particle mineral-3" />
        <div className="mineral-particle mineral-4" />

      </section>

      {/* =====================================
          MINING PANEL
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
          ⛏️ START MINING
        </button>

      </section>

      {/* =====================================
          INFORMATION
      ====================================== */}

      <section className="info-grid">

        <div className="info-card">

          <div className="info-card-label">
            ⚡ ENERGÍA
          </div>

          <div className="info-card-value green">
            {energy}%
          </div>

        </div>

        <div className="info-card">

          <div className="info-card-label">
            ⛏️ MINERALES
          </div>

          <div className="info-card-value gold">
            {minerals}
          </div>

        </div>

        <div className="info-card">

          <div className="info-card-label">
            🏭 ALMACÉN
          </div>

          <div className="info-card-value blue">
            {storedMinerals}
          </div>

        </div>

        <div className="info-card">

          <div className="info-card-label">
            🗺️ MINAS
          </div>

          <div className="info-card-value">
            {unlockedMines}/
            {MINES.length}
          </div>

        </div>

      </section>

      {/* =====================================
          BOTTOM NAVIGATION
      ====================================== */}

      <nav className="bottom-nav">

        <button
          type="button"
          className="bottom-nav-button active"
          onClick={() =>
            playSound("click")
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

      {/*
      =======================================
        PROFILE OVERLAY
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

          {/* PROFILE HEADER */}

          <div className="profile-modal-header">

            <div className="profile-modal-avatar">

              <div className="profile-avatar-helmet">
                <div className="profile-avatar-lamp" />
              </div>

              <div className="profile-avatar-face" />

              <div className="profile-avatar-body" />

            </div>

            <div className="profile-modal-identity">

              <span className="profile-modal-kicker">
                PERFIL DEL MINERO
              </span>

              <strong className="profile-modal-user">
                {username}
              </strong>

              <span className="profile-modal-rank">
                ⛏️ MINERO DE CARBÓN
              </span>

            </div>

            <button
              type="button"
              className="profile-close"
              onClick={() =>
                setShowProfile(false)
              }
              aria-label="Cerrar perfil"
            >
              ×
            </button>

          </div>

          {/* EXPERIENCE */}

          <div className="profile-xp-row">

            <div className="profile-xp-info">

              <span>
                NIVEL 1
              </span>

              <strong>
                NOVATO DE LA MINA
              </strong>

            </div>

            <span className="profile-xp-number">
              {hits * 10}/100 XP
            </span>

          </div>

          <div className="profile-xp-bar">

            <div
              className="profile-xp-fill"
              style={{
                width: `${Math.min(
                  100,
                  hits * 10
                )}%`,
              }}
            />

          </div>

          {/* RESOURCE ROWS */}

          <div className="profile-section-title">
            RECURSOS
          </div>

          <div className="profile-resource-list">

            <div className="profile-resource-row">

              <div className="profile-resource-icon coin-icon">
                🪙
              </div>

              <div className="profile-resource-info">

                <span>
                  MONEDAS
                </span>

                <strong>
                  {coins.toLocaleString()}
                </strong>

              </div>

              <span className="profile-row-arrow">
                ›
              </span>

            </div>

            <div className="profile-resource-row">

              <div className="profile-resource-icon mineral-icon">
                ⛏️
              </div>

              <div className="profile-resource-info">

                <span>
                  MINERALES
                </span>

                <strong>
                  {minerals}
                </strong>

              </div>

              <span className="profile-row-arrow">
                ›
              </span>

            </div>

            <div className="profile-resource-row">

              <div className="profile-resource-icon energy-icon">
                ⚡
              </div>

              <div className="profile-resource-info">

                <span>
                  ENERGÍA
                </span>

                <strong>
                  {energy}%
                </strong>

              </div>

              <div className="profile-mini-bar">

                <span
                  style={{
                    width: `${energy}%`,
                  }}
                />

              </div>

            </div>

            <div className="profile-resource-row">

              <div className="profile-resource-icon mine-icon">
                🏔️
              </div>

              <div className="profile-resource-info">

                <span>
                  MINAS DESBLOQUEADAS
                </span>

                <strong>
                  {unlockedMines}/
                  {MINES.length}
                </strong>

              </div>

              <span className="profile-row-arrow">
                ›
              </span>

            </div>

          </div>

          {/* ACTIVITY */}

          <div className="profile-section-title">
            ACTIVIDAD MINERA
          </div>

          <div className="profile-activity-list">

            <div className="profile-activity-row">

              <div className="activity-icon">
                ⛏️
              </div>

              <div className="activity-info">

                <strong>
                  Producción manual
                </strong>

                <span>
                  {hits}/{maxHits} golpes
                </span>

              </div>

              <div className="activity-status">
                ACTIVO
              </div>

            </div>

            <div className="profile-activity-row">

              <div className="activity-icon">
                🚋
              </div>

              <div className="activity-info">

                <strong>
                  Transporte
                </strong>

                <span>
                  {storedMinerals} minerales
                  en almacén
                </span>

              </div>

              <div className="activity-status">
                {wagonMoving
                  ? "EN RUTA"
                  : "LISTO"}
              </div>

            </div>

            <div className="profile-activity-row">

              <div className="activity-icon">
                ⬆️
              </div>

              <div className="activity-info">

                <strong>
                  Elevador
                </strong>

                <span>
                  Nivel {elevatorLevel + 1}
                </span>

              </div>

              <div className="activity-status">
                {elevatorWorking
                  ? "ACTIVO"
                  : "LISTO"}
              </div>

            </div>

          </div>

          {/* ACHIEVEMENTS */}

          <div className="profile-section-title">
            LOGROS
          </div>

          <div className="profile-achievements">

            <div
              className={[
                "profile-achievement",
                minerals >= 1
                  ? "unlocked"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>
                ⛏️
              </span>

              <div>
                <strong>
                  PRIMER MINERAL
                </strong>

                <small>
                  Extrae tu primer mineral
                </small>
              </div>

            </div>

            <div
              className={[
                "profile-achievement",
                unlockedMines >= 2
                  ? "unlocked"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>
                🔓
              </span>

              <div>
                <strong>
                  NUEVO TERRITORIO
                </strong>

                <small>
                  Desbloquea otra mina
                </small>
              </div>

            </div>

            <div
              className={[
                "profile-achievement",
                minerals >= 10
                  ? "unlocked"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>
                💎
              </span>

              <div>
                <strong>
                  MINERO ACTIVO
                </strong>

                <small>
                  Consigue 10 minerales
                </small>
              </div>

            </div>

          </div>

          {/* PROFILE NAVIGATION */}

          <div className="profile-menu-list">

            <button
              type="button"
              className="profile-menu-row"
              onClick={() => {
                setShowProfile(false);
                goTo("/friends");
              }}
            >

              <span className="profile-menu-icon">
                👥
              </span>

              <span className="profile-menu-text">
                MIS REFERIDOS
              </span>

              <span className="profile-menu-arrow">
                ›
              </span>

            </button>

            <button
              type="button"
              className="profile-menu-row"
              onClick={() => {
                setShowProfile(false);
                goTo("/missions");
              }}
            >

              <span className="profile-menu-icon">
                🎯
              </span>

              <span className="profile-menu-text">
                MIS MISIONES
              </span>

              <span className="profile-menu-arrow">
                ›
              </span>

            </button>

            <button
              type="button"
              className="profile-menu-row"
              onClick={() => {
                setShowProfile(false);
                goTo("/mapa");
              }}
            >

              <span className="profile-menu-icon">
                🌍
              </span>

              <span className="profile-menu-text">
                EXPLORAR MAPA
              </span>

              <span className="profile-menu-arrow">
                ›
              </span>

            </button>

          </div>

        </div>

      </div>
    )}

  </main>
);
}
      
