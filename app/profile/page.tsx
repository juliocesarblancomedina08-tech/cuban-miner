"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [username, setUsername] = useState("MINERO");
  const [firstName, setFirstName] = useState("MINERO");

  const [coins, setCoins] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [unlockedMines, setUnlockedMines] = useState(1);

  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(35);

  const [miningHits, setMiningHits] = useState(0);
  const [daysActive, setDaysActive] = useState(1);

  const [showStats, setShowStats] = useState(false);

  /* =====================================
     OBTENER USUARIO DE TELEGRAM
  ====================================== */

  useEffect(() => {
    try {
      const telegram =
        typeof window !== "undefined"
          ? (window as any).Telegram?.WebApp
          : undefined;

      const telegramUser =
        telegram?.initDataUnsafe?.user;

      if (telegramUser) {
        if (telegramUser.username) {
          setUsername(
            `@${telegramUser.username}`
          );
        }

        if (telegramUser.first_name) {
          setFirstName(
            telegramUser.first_name
          );
        }

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
        setFirstName(
          savedUsername.replace("@", "")
        );
      }
    } catch {
      setUsername("MINERO");
      setFirstName("MINERO");
    }
  }, []);

  /* =====================================
     CARGAR DATOS DEL JUEGO
  ====================================== */

  useEffect(() => {
    try {
      const savedCoins =
        localStorage.getItem("coins");

      const savedMinerals =
        localStorage.getItem("minerals");

      const savedEnergy =
        localStorage.getItem("energy");

      const savedMines =
        localStorage.getItem(
          "unlockedMines"
        );

      const savedHits =
        localStorage.getItem(
          "miningHits"
        );

      const savedXP =
        localStorage.getItem(
          "miningXP"
        );

      if (savedCoins !== null) {
        setCoins(
          Number(savedCoins)
        );
      }

      if (savedMinerals !== null) {
        setMinerals(
          Number(savedMinerals)
        );
      }

      if (savedEnergy !== null) {
        setEnergy(
          Number(savedEnergy)
        );
      }

      if (savedMines !== null) {
        setUnlockedMines(
          Math.max(
            1,
            Number(savedMines)
          )
        );
      }

      if (savedHits !== null) {
        setMiningHits(
          Number(savedHits)
        );
      }

      if (savedXP !== null) {
        const xp = Math.max(
          0,
          Number(savedXP)
        );

        setLevel(
          Math.floor(xp / 100) + 1
        );

        setExperience(
          xp % 100
        );
      }
    } catch {
      // Datos locales opcionales
    }
  }, []);

  /* =====================================
     EXPERIENCIA
  ====================================== */

  const experienceMax = 100;

  const experiencePercent =
    Math.min(
      100,
      Math.max(
        0,
        experience
      )
    );

  /* =====================================
     RANGO
  ====================================== */

  const levelName =
    level <= 1
      ? "NOVATO"
      : level <= 3
      ? "MINERO"
      : level <= 5
      ? "EXPERTO"
      : "MAESTRO";

  /* =====================================
     RANGO DE EXPLORACIÓN
  ====================================== */

  const rank =
    unlockedMines >= 4
      ? "LEYENDA"
      : unlockedMines >= 3
      ? "CAPATAZ"
      : unlockedMines >= 2
      ? "EXPLORADOR"
      : "APRENDIZ";

  /* =====================================
     NAVEGACIÓN
  ====================================== */

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <main className="profile-page">

      <div className="profile-page-container">

        {/* =================================
            CABECERA
        ================================== */}

        <header className="profile-header">

          <button
            type="button"
            className="profile-back-button"
            onClick={() =>
              goTo("/game")
            }
          >
            <span className="back-arrow">
              ‹
            </span>

            <span>
              VOLVER
            </span>
          </button>

          <div className="profile-header-title">
            PERFIL
          </div>

          <div className="profile-header-status">
            ONLINE
            <span />
          </div>

        </header>

        {/* =================================
            PERFIL PRINCIPAL
        ================================== */}

        <section className="profile-hero">

          <div className="profile-hero-background">

            <div className="profile-rock rock-a" />
            <div className="profile-rock rock-b" />
            <div className="profile-rock rock-c" />

            <div className="profile-light light-a" />
            <div className="profile-light light-b" />

          </div>

          {/* AVATAR */}

          <div className="player-avatar-frame">

            <div className="player-avatar-glow" />

            <div className="player-avatar">

              <div className="avatar-shadow" />

              <div className="avatar-head">

                <div className="avatar-hair" />

                <div className="avatar-face">

                  <div className="avatar-eye eye-left" />
                  <div className="avatar-eye eye-right" />

                  <div className="avatar-nose" />

                  <div className="avatar-mouth" />

                </div>

                <div className="avatar-helmet">

                  <div className="avatar-helmet-lamp" />

                </div>

              </div>

              <div className="avatar-neck" />

              <div className="avatar-body">

                <div className="avatar-overall" />

                <div className="avatar-strap strap-left" />
                <div className="avatar-strap strap-right" />

                <div className="avatar-badge">
                  ⛏
                </div>

              </div>

            </div>

          </div>

          {/* NOMBRE */}

          <div className="player-name-area">

            <div className="player-rank">
              {rank}
            </div>

            <h1>
              {firstName}
            </h1>

            <div className="player-username">
              {username}
            </div>

          </div>

          {/* NIVEL */}

          <div className="player-level-box">

            <div className="level-top">

              <span>
                NIVEL {level}
              </span>

              <span>
                {levelName}
              </span>

            </div>

            <div className="level-progress">

              <div
                className="level-progress-fill"
                style={{
                  width: `${experiencePercent}%`,
                }}
              />

            </div>

            <div className="level-bottom">

              <span>
                EXP
              </span>

              <span>
                {experience}/{experienceMax}
              </span>

            </div>

          </div>

        </section>

                {/* =================================
            RECURSOS
        ================================== */}

        <section className="profile-main-stats">

          <div className="profile-stat-card coins-card">

            <div className="profile-stat-icon">
              🪙
            </div>

            <div className="profile-stat-content">

              <div className="profile-stat-title">
                MONEDAS
              </div>

              <div className="profile-stat-number">
                {coins.toLocaleString()}
              </div>

              <div className="profile-stat-description">
                CAPITAL DEL MINERO
              </div>

            </div>

          </div>

          <div className="profile-stat-card mineral-card">

            <div className="profile-stat-icon">
              ⛏
            </div>

            <div className="profile-stat-content">

              <div className="profile-stat-title">
                MINERALES
              </div>

              <div className="profile-stat-number">
                {minerals.toLocaleString()}
              </div>

              <div className="profile-stat-description">
                RECURSOS EXTRAÍDOS
              </div>

            </div>

          </div>

          <div className="profile-stat-card energy-card">

            <div className="profile-stat-icon">
              ⚡
            </div>

            <div className="profile-stat-content">

              <div className="profile-stat-title">
                ENERGÍA
              </div>

              <div className="profile-stat-number">
                {energy}%
              </div>

              <div className="profile-stat-description">
                POTENCIA DISPONIBLE
              </div>

            </div>

          </div>

          <div className="profile-stat-card mine-card">

            <div className="profile-stat-icon">
              ⛏️
            </div>

            <div className="profile-stat-content">

              <div className="profile-stat-title">
                MINAS
              </div>

              <div className="profile-stat-number">
                {unlockedMines}/4
              </div>

              <div className="profile-stat-description">
                ZONAS DESBLOQUEADAS
              </div>

            </div>

          </div>

        </section>

        {/* =================================
            ACTIVIDAD MINERA
        ================================== */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <div className="section-kicker">
                RENDIMIENTO
              </div>

              <h2>
                ACTIVIDAD MINERA
              </h2>

            </div>

            <div className="section-decoration">
              ⛏
            </div>

          </div>

          <div className="activity-panel">

            <div className="activity-row">

              <div className="activity-label">
                GOLPES DE PICO
              </div>

              <div className="activity-value">
                {miningHits.toLocaleString()}
              </div>

            </div>

            <div className="activity-divider" />

            <div className="activity-row">

              <div className="activity-label">
                DÍAS ACTIVO
              </div>

              <div className="activity-value">
                {daysActive}
              </div>

            </div>

            <div className="activity-divider" />

            <div className="activity-row">

              <div className="activity-label">
                ESTADO
              </div>

              <div className="activity-status">
                <span />
                MINANDO
              </div>

            </div>

          </div>

        </section>

        {/* =================================
            LOGROS
        ================================== */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <div className="section-kicker">
                PROGRESO
              </div>

              <h2>
                LOGROS
              </h2>

            </div>

            <button
              type="button"
              className="small-section-button"
              onClick={() =>
                setShowStats(
                  !showStats
                )
              }
            >
              {showStats
                ? "OCULTAR"
                : "VER MÁS"}
            </button>

          </div>

          <div className="achievements-grid">

            <div className="achievement-card unlocked">

              <div className="achievement-icon">
                ⛏
              </div>

              <div className="achievement-info">

                <div className="achievement-name">
                  PRIMER GOLPE
                </div>

                <div className="achievement-description">
                  Comenzaste a minar
                </div>

              </div>

              <div className="achievement-check">
                ✓
              </div>

            </div>

            <div
              className={[
                "achievement-card",
                unlockedMines >= 2
                  ? "unlocked"
                  : "locked",
              ].join(" ")}
            >

              <div className="achievement-icon">
                ◈
              </div>

              <div className="achievement-info">

                <div className="achievement-name">
                  SEGUNDA MINA
                </div>

                <div className="achievement-description">
                  Desbloquea una nueva zona
                </div>

              </div>

              <div className="achievement-check">
                {unlockedMines >= 2
                  ? "✓"
                  : "🔒"}
              </div>

            </div>

            <div
              className={[
                "achievement-card",
                unlockedMines >= 3
                  ? "unlocked"
                  : "locked",
              ].join(" ")}
            >

              <div className="achievement-icon">
                ◆
              </div>

              <div className="achievement-info">

                <div className="achievement-name">
                  PROFUNDIDADES
                </div>

                <div className="achievement-description">
                  Llega a la tercera mina
                </div>

              </div>

              <div className="achievement-check">
                {unlockedMines >= 3
                  ? "✓"
                  : "🔒"}
              </div>

            </div>

            <div
              className={[
                "achievement-card",
                unlockedMines >= 4
                  ? "unlocked"
                  : "locked",
              ].join(" ")}
            >

              <div className="achievement-icon">
                ★
              </div>

              <div className="achievement-info">

                <div className="achievement-name">
                  MAESTRO MINERO
                </div>

                <div className="achievement-description">
                  Desbloquea todas las minas
                </div>

              </div>

              <div className="achievement-check">
                {unlockedMines >= 4
                  ? "✓"
                  : "🔒"}
              </div>

            </div>

          </div>

          {showStats && (
            <div className="extra-profile-panel">

              <div className="extra-profile-title">
                ESTADÍSTICAS ADICIONALES
              </div>

              <div className="extra-profile-grid">

                <div>
                  <span>
                    PRODUCCIÓN
                  </span>

                  <strong>
                    {minerals * 5}
                  </strong>
                </div>

                <div>
                  <span>
                    EFICIENCIA
                  </span>

                  <strong>
                    {energy}%
                  </strong>
                </div>

                <div>
                  <span>
                    RANGO
                  </span>

                  <strong>
                    {rank}
                  </strong>
                </div>

                <div>
                  <span>
                    NIVEL
                  </span>

                  <strong>
                    {level}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </section>

                {/* =================================
            DATOS DEL JUGADOR
        ================================== */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <div className="section-kicker">
                IDENTIDAD
              </div>

              <h2>
                DATOS DEL JUGADOR
              </h2>

            </div>

          </div>

          <div className="player-information">

            <div className="information-item">

              <div className="information-icon">
                👤
              </div>

              <div className="information-content">

                <span>
                  USUARIO
                </span>

                <strong>
                  {username}
                </strong>

              </div>

            </div>

            <div className="information-item">

              <div className="information-icon">
                🏆
              </div>

              <div className="information-content">

                <span>
                  RANGO
                </span>

                <strong>
                  {rank}
                </strong>

              </div>

            </div>

            <div className="information-item">

              <div className="information-icon">
                ⛏
              </div>

              <div className="information-content">

                <span>
                  ESPECIALIDAD
                </span>

                <strong>
                  MINERÍA
                </strong>

              </div>

            </div>

            <div className="information-item">

              <div className="information-icon">
                🌍
              </div>

              <div className="information-content">

                <span>
                  EXPLORACIÓN
                </span>

                <strong>
                  {unlockedMines} ZONAS
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* =================================
            BOTONES
        ================================== */}

        <section className="profile-actions-section">

          <button
            type="button"
            className="profile-large-button primary"
            onClick={() =>
              goTo("/game")
            }
          >

            <span className="large-button-icon">
              ⛏️
            </span>

            <span className="large-button-content">

              <strong>
                VOLVER A MINAR
              </strong>

              <small>
                CONTINUAR OPERACIÓN
              </small>

            </span>

            <span className="large-button-arrow">
              ›
            </span>

          </button>

          <button
            type="button"
            className="profile-large-button"
            onClick={() =>
              goTo("/mapa")
            }
          >

            <span className="large-button-icon">
              🌍
            </span>

            <span className="large-button-content">

              <strong>
                EXPLORAR MAPA
              </strong>

              <small>
                DESCUBRIR NUEVAS MINAS
              </small>

            </span>

            <span className="large-button-arrow">
              ›
            </span>

          </button>

          <button
            type="button"
            className="profile-large-button"
            onClick={() =>
              goTo("/missions")
            }
          >

            <span className="large-button-icon">
              🎯
            </span>

            <span className="large-button-content">

              <strong>
                MISIONES
              </strong>

              <small>
                COMPLETA OBJETIVOS
              </small>

            </span>

            <span className="large-button-arrow">
              ›
            </span>

          </button>

        </section>

        {/* =================================
            PIE
        ================================== */}

        <footer className="profile-footer">

          <div className="footer-logo">

            <div className="footer-pickaxe">
              ⛏
            </div>

            <div>

              <strong>
                CUBAN-MINER
              </strong>

              <span>
                MINING ADVENTURE
              </span>

            </div>

          </div>

          <div className="footer-divider" />

          <div className="footer-text">
            TU AVENTURA MINERA
            CONTINÚA
          </div>

        </footer>

        {/* =================================
            MENÚ INFERIOR
        ================================== */}

        <nav className="profile-bottom-nav">

          <button
            type="button"
            onClick={() =>
              goTo("/game")
            }
          >
            <span>
              ⛏️
            </span>

            <small>
              MINAS
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/shop")
            }
          >
            <span>
              🛒
            </span>

            <small>
              TIENDA
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/friends")
            }
          >
            <span>
              👥
            </span>

            <small>
              REFERIDOS
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/bank")
            }
          >
            <span>
              🏦
            </span>

            <small>
              BANCO
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/missions")
            }
          >
            <span>
              🎯
            </span>

            <small>
              MISIONES
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              goTo("/mapa")
            }
          >
            <span>
              🌍
            </span>

            <small>
              MAPA
            </small>
          </button>

        </nav>

      </div>

    </main>
  );
}
