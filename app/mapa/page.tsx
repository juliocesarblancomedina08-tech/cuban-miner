"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Mine = {
  id: number;
  name: string;
  material: string;
  icon: string;
  price: number;
  x: number;
  y: number;
  description: string;
};

const MINES: Mine[] = [
  {
    id: 1,
    name: "MINA DE CARBÓN",
    material: "CARBÓN",
    icon: "🪨",
    price: 0,
    x: 31,
    y: 55,
    description: "Tu primera zona minera.",
  },
  {
    id: 2,
    name: "MINA DE COBRE",
    material: "COBRE",
    icon: "🟠",
    price: 500,
    x: 48,
    y: 43,
    description: "Una zona rica en cobre.",
  },
  {
    id: 3,
    name: "MINA DE HIERRO",
    material: "HIERRO",
    icon: "🔩",
    price: 1500,
    x: 64,
    y: 51,
    description: "Grandes reservas de hierro.",
  },
  {
    id: 4,
    name: "MINA DE ORO",
    material: "ORO",
    icon: "🟡",
    price: 5000,
    x: 76,
    y: 67,
    description: "Una mina de gran valor.",
  },
];

export default function MapaPage() {
  const router = useRouter();

  const [coins, setCoins] = useState(100);
  const [unlockedMines, setUnlockedMines] = useState(1);
  const [selectedMine, setSelectedMine] =
    useState<Mine | null>(null);

  const [message, setMessage] = useState(
    "EXPLORA EL MUNDO Y DESCUBRE NUEVAS MINAS"
  );

  /* =====================================
     CARGAR DATOS DEL JUEGO
  ====================================== */

  useEffect(() => {
    try {
      const savedCoins =
        localStorage.getItem("coins");

      const savedMines =
        localStorage.getItem("unlockedMines");

      if (savedCoins !== null) {
        setCoins(Number(savedCoins));
      }

      if (savedMines !== null) {
        setUnlockedMines(
          Math.max(1, Number(savedMines))
        );
      }
    } catch {
      // Datos locales opcionales
    }
  }, []);

  /* =====================================
     GUARDAR DATOS
  ====================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        "coins",
        String(coins)
      );

      localStorage.setItem(
        "unlockedMines",
        String(unlockedMines)
      );
    } catch {
      // Ignorar errores de almacenamiento
    }
  }, [coins, unlockedMines]);

  /* =====================================
     NAVEGACIÓN
  ====================================== */

  const goTo = (path: string) => {
    router.push(path);
  };

  /* =====================================
     SELECCIONAR MINA
  ====================================== */

  const selectMine = (mine: Mine) => {
    setSelectedMine(mine);

    if (mine.id <= unlockedMines) {
      setMessage(
        `${mine.name} SELECCIONADA`
      );
    } else {
      setMessage(
        `${mine.name} ESTÁ BLOQUEADA`
      );
    }
  };

  /* =====================================
     COMPRAR MINA
  ====================================== */

  const unlockMine = () => {
    if (!selectedMine) {
      return;
    }

    if (
      selectedMine.id <= unlockedMines
    ) {
      setMessage(
        "ESTA MINA YA ESTÁ DESBLOQUEADA"
      );
      return;
    }

    if (
      selectedMine.id !==
      unlockedMines + 1
    ) {
      setMessage(
        "DEBES DESBLOQUEAR LAS MINAS EN ORDEN"
      );
      return;
    }

    if (coins < selectedMine.price) {
      setMessage(
        "NO TIENES SUFICIENTES MONEDAS"
      );
      return;
    }

    setCoins(
      coins - selectedMine.price
    );

    setUnlockedMines(
      unlockedMines + 1
    );

    setMessage(
      `${selectedMine.name} DESBLOQUEADA`
    );
  };

  return (
    <main className="map-page">

      <div className="map-container">

        {/* =================================
            CABECERA
        ================================== */}

        <header className="map-header">

          <button
            type="button"
            className="map-back-button"
            onClick={() =>
              goTo("/game")
            }
          >
            <span>‹</span>
            MINAS
          </button>

          <div className="map-title">
            <span>🌍</span>
            <div>
              <strong>MAPA</strong>
              <small>
                MUNDO MINERO
              </small>
            </div>
          </div>

          <div className="map-coins">
            <span>🪙</span>
            <strong>
              {coins.toLocaleString()}
            </strong>
          </div>

        </header>

        {/* =================================
            MENSAJE
        ================================== */}

        <div className="map-message">
          <span>✦</span>
          {message}
          <span>✦</span>
        </div>

        {/* =================================
            MAPA
        ================================== */}

        <section className="world-map">

          <div className="map-stars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          <div className="map-grid" />

          <div className="map-ocean-glow" />

          {/* CONTINENTES / TERRITORIOS */}

          <div className="continent continent-1">
            <span />
            <span />
            <span />
          </div>

          <div className="continent continent-2">
            <span />
            <span />
            <span />
          </div>

          <div className="continent continent-3">
            <span />
            <span />
            <span />
          </div>

          <div className="continent continent-4">
            <span />
            <span />
          </div>

          <div className="continent continent-5">
            <span />
            <span />
            <span />
          </div>

          {/* =================================
              LÍNEAS DE RUTA
          ================================== */}

          <div
            className="mine-route route-1"
          />

          {unlockedMines >= 2 && (
            <div
              className="mine-route route-2"
            />
          )}

          {unlockedMines >= 3 && (
            <div
              className="mine-route route-3"
            />
          )}

          {/* =================================
              MINAS
          ================================== */}

          {MINES.map((mine) => {
            const unlocked =
              mine.id <= unlockedMines;

            const nextMine =
              mine.id ===
              unlockedMines + 1;

            return (
              <button
                type="button"
                key={mine.id}
                className={[
                  "map-mine",
                  unlocked
                    ? "mine-unlocked"
                    : "mine-locked",
                  nextMine
                    ? "mine-next"
                    : "",
                ].join(" ")}
                style={{
                  left: `${mine.x}%`,
                  top: `${mine.y}%`,
                }}
                onClick={() =>
                  selectMine(mine)
                }
              >

                <div className="mine-marker">

                  <div className="mine-marker-ring" />

                  <div className="mine-marker-icon">
                    {unlocked
                      ? mine.icon
                      : "🔒"}
                  </div>

                  {unlocked && (
                    <div className="mine-marker-pulse" />
                  )}

                </div>

                <div className="mine-label">

                  <strong>
                    {mine.name}
                  </strong>

                  <small>
                    {unlocked
                      ? mine.material
                      : `🔒 ${mine.price.toLocaleString()} 🪙`}
                  </small>

                </div>

              </button>
            );
          })}

          {/* =================================
              BRÚJULA
          ================================== */}

          <div className="map-compass">

            <div className="compass-n">
              N
            </div>

            <div className="compass-arrow">
              ▲
            </div>

            <div className="compass-center">
              +
            </div>

            <div className="compass-s">
              S
            </div>

          </div>

        </section>

                {/* =================================
            PANEL DE MINA
        ================================== */}

        {selectedMine && (
          <section className="selected-mine-panel">

            <div className="selected-mine-top">

              <div className="selected-mine-icon">
                {selectedMine.id <=
                unlockedMines
                  ? selectedMine.icon
                  : "🔒"}
              </div>

              <div className="selected-mine-info">

                <span>
                  ZONA {selectedMine.id}
                </span>

                <h2>
                  {selectedMine.name}
                </h2>

                <p>
                  {selectedMine.description}
                </p>

              </div>

              <button
                type="button"
                className="close-mine-panel"
                onClick={() =>
                  setSelectedMine(null)
                }
              >
                ×
              </button>

            </div>

            {/* MINA DESBLOQUEADA */}

            {selectedMine.id <=
              unlockedMines && (
              <div className="selected-mine-unlocked">

                <div className="mine-status">
                  <span />
                  DESBLOQUEADA
                </div>

                <button
                  type="button"
                  className="enter-mine-button"
                  onClick={() =>
                    goTo("/game")
                  }
                >
                  <span>⛏️</span>

                  <div>
                    <strong>
                      ENTRAR A LA MINA
                    </strong>

                    <small>
                      COMENZAR A MINAR
                    </small>
                  </div>

                  <b>›</b>
                </button>

              </div>
            )}

            {/* PRÓXIMA MINA */}

            {selectedMine.id ===
              unlockedMines + 1 && (
              <div className="selected-mine-locked">

                <div className="unlock-price">

                  <span>
                    PRECIO DE DESBLOQUEO
                  </span>

                  <strong>
                    🪙{" "}
                    {selectedMine.price.toLocaleString()}
                  </strong>

                </div>

                <button
                  type="button"
                  className="unlock-mine-button"
                  onClick={unlockMine}
                >
                  <span>
                    🔓
                  </span>

                  DESBLOQUEAR MINA
                </button>

              </div>
            )}

            {/* MINA BLOQUEADA MÁS ADELANTE */}

            {selectedMine.id >
              unlockedMines + 1 && (
              <div className="future-mine-warning">

                <span>
                  🔒
                </span>

                <div>
                  <strong>
                    ZONA BLOQUEADA
                  </strong>

                  <small>
                    DESBLOQUEA LAS MINAS
                    ANTERIORES PRIMERO
                  </small>
                </div>

              </div>
            )}

          </section>
        )}

        {/* =================================
            INFORMACIÓN
        ================================== */}

        <section className="map-information">

          <div className="map-info-title">

            <span>
              EXPLORACIÓN
            </span>

            <strong>
              {unlockedMines}/
              {MINES.length} MINAS
            </strong>

          </div>

          <div className="map-progress">

            <div
              className="map-progress-fill"
              style={{
                width: `${
                  (unlockedMines /
                    MINES.length) *
                  100
                }%`,
              }}
            />

          </div>

          <p>
            Desbloquea nuevas zonas para
            encontrar materiales más valiosos.
          </p>

        </section>

        {/* =================================
            LEYENDA
        ================================== */}

        <section className="map-legend">

          <div className="legend-item">

            <span className="legend-dot active" />

            <span>
              MINA DESBLOQUEADA
            </span>

          </div>

          <div className="legend-item">

            <span className="legend-dot next" />

            <span>
              PRÓXIMA MINA
            </span>

          </div>

          <div className="legend-item">

            <span className="legend-dot locked" />

            <span>
              BLOQUEADA
            </span>

          </div>

        </section>

                {/* =================================
            BOTTOM NAVIGATION
        ================================== */}

        <nav className="map-bottom-nav">

          <button
            type="button"
            onClick={() =>
              goTo("/game")
            }
          >
            <span>⛏️</span>
            <small>MINAS</small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop")
            }
          >
            <span>🛒</span>
            <small>TIENDA</small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/friends")
            }
          >
            <span>👥</span>
            <small>REFERIDOS</small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/bank")
            }
          >
            <span>🏦</span>
            <small>BANCO</small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/missions")
            }
          >
            <span>🎯</span>
            <small>MISIONES</small>
          </button>

          <button
            type="button"
            className="nav-active"
            onClick={() =>
              goTo("/mapa")
            }
          >
            <span>🌍</span>
            <small>MAPA</small>
          </button>

        </nav>

      </div>

    </main>
  );
            }
