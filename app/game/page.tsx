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

  const maxHits = 10;
  const progress = Math.min((hits / maxHits) * 100, 100);

  /*
   * PRECIOS PARA DESBLOQUEAR LAS MINAS
   */
  const minePrices = [0, 250, 750, 2000];

  /*
   * MINERÍA MANUAL
   */
  function mine() {
    if (energy <= 0 || hitting) {
      return;
    }

    setHitting(true);

    setEnergy((value) => Math.max(value - 2, 0));

    setTimeout(() => {
      setHits((value) => {
        const next = value + 1;

        if (next >= maxHits) {
          setCoins((value) => value + 25);
          setMinerals((value) => value + 1);
          setSurfaceMinerals((value) => value + 1);

          return 0;
        }

        return next;
      });

      setHitting(false);
    }, 350);
  }

  /*
   * DESBLOQUEAR MINA
   */
  function unlockMine(index) {
    const price = minePrices[index];

    if (unlockedMines >= index + 1) {
      return;
    }

    if (coins < price) {
      return;
    }

    setCoins((value) => value - price);
    setUnlockedMines(index + 1);
  }

  /*
   * SISTEMA DEL ELEVADOR
   *
   * El elevador recorre automáticamente
   * las minas que estén desbloqueadas.
   */
  useEffect(() => {
    if (unlockedMines <= 0) {
      return;
    }

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

        /*
         * Si hay minerales en la mina,
         * el elevador los lleva arriba.
         */
        setSurfaceMinerals((value) => {
          if (value <= 0) {
            return value;
          }

          setStoredMinerals((stored) => stored + 1);

          return value - 1;
        });
      }, 900);
    }, 3500);

    return () => clearInterval(elevatorInterval);
  }, [unlockedMines]);

  /*
   * MINEROS AUTOMÁTICOS
   *
   * Cada mina desbloqueada produce minerales.
   */
  useEffect(() => {
    if (unlockedMines <= 1) {
      return;
    }

    const autoMineInterval = setInterval(() => {
      setSurfaceMinerals((value) => value + (unlockedMines - 1));

      setMinerals((value) => value + (unlockedMines - 1));

      setCoins((value) => value + (unlockedMines - 1) * 2);
    }, 5000);

    return () => clearInterval(autoMineInterval);
  }, [unlockedMines]);

  /*
   * VAGONES
   *
   * Cuando llegan minerales a la superficie,
   * los vagones los llevan al almacén.
   */
  useEffect(() => {
    if (storedMinerals <= 0 || wagonMoving) {
      return;
    }

    setWagonMoving(true);

    const timer = setTimeout(() => {
      setStoredMinerals((value) => Math.max(value - 1, 0));

      setCoins((value) => value + 5);

      setWagonMoving(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [storedMinerals, wagonMoving]);

  /*
   * RECARGA DE ENERGÍA
   */
  useEffect(() => {
    const energyTimer = setInterval(() => {
      setEnergy((value) => Math.min(value + 1, 100));
    }, 3000);

    return () => clearInterval(energyTimer);
  }, []);

  return (
    <main className="game-page">
      <div className="game-container">

        {/* =========================
            CABECERA
        ========================== */}

        <header className="top-bar">

          <div className="profile">
            <div className="avatar">
              M
            </div>

            <div>
              <div className="player-name">
                MINERO
              </div>

              <div className="level">
                NIVEL 1
              </div>
            </div>
          </div>

          <div className="coins">
            <span>🪙</span>
            <strong>{coins}</strong>
          </div>

        </header>


        {/* =========================
            ENERGÍA
        ========================== */}

        <div className="energy-area">

          <div className="energy-text">
            <span>ENERGÍA</span>

            <strong>
              {energy}/100
            </strong>
          </div>

          <div className="energy-bar">
            <div
              className="energy-fill"
              style={{
                width: `${energy}%`,
              }}
            />
          </div>

        </div>


        {/* =========================
            MUNDO DE LA MINA
        ========================== */}

        <section className="mine-world">

          {/* =====================
              SUPERFICIE
          ====================== */}

          <div className="surface">

            <div className="sky-glow" />

            <div className="mountain mountain-one" />
            <div className="mountain mountain-two" />

            {/* ALMACÉN */}

            <div className="warehouse">

              <div className="warehouse-roof">
                🏭
              </div>

              <div className="warehouse-body">
                ALMACÉN
              </div>

            </div>


            {/* ZONA DE VAGONES */}

            <div className="railway">

              <div className="rail rail-one" />
              <div className="rail rail-two" />

              <div
                className={`wagon ${
                  wagonMoving ? "wagon-moving" : ""
                }`}
              >
                <div className="wagon-box">
                  ◆
                </div>

                <div className="wagon-wheel wheel-one" />
                <div className="wagon-wheel wheel-two" />
              </div>

              <div className="wagon-worker">
                👷
              </div>

            </div>


            {/* ZONA DE ENTREGA */}

            <div className="delivery-zone">

              <div className="delivery-box">
                📦
              </div>

              <div className="delivery-text">
                {storedMinerals} MINERALES
              </div>

            </div>

          </div>


          {/* =====================
              ASCENSOR
          ====================== */}

          <div className="elevator-shaft">

            <div className="shaft-line" />

            <div
              className={`elevator ${
                elevatorWorking
                  ? "elevator-working"
                  : ""
              }`}
              style={{
                top: `${elevatorFloor * 23 + 5}%`,
              }}
            >

              <div className="elevator-roof">
                🛗
              </div>

              <div className="elevator-cage">

                <div className="elevator-worker">
                  👷
                </div>

                <div className="elevator-bag">
                  🎒
                </div>

              </div>

            </div>

          </div>


          {/* =====================
              4 POZOS
          ====================== */}

          <div className="mine-shafts">

            {[0, 1, 2, 3].map((index) => {

              const unlocked =
                index < unlockedMines;

              const isActive =
                index === unlockedMines - 1;

              return (
                <div
                  key={index}
                  className={`mine-floor ${
                    unlocked
                      ? "mine-floor-unlocked"
                      : "mine-floor-locked"
                  }`}
                >

                  {/* ROCA */}

                  <div className="rock-wall">

                    <div className="rock-detail detail-one" />
                    <div className="rock-detail detail-two" />
                    <div className="rock-detail detail-three" />
                    <div className="rock-detail detail-four" />

                    <div className="ore ore-a" />
                    <div className="ore ore-b" />
                    <div className="ore ore-c" />

                  </div>


                  {/* MINA */}

                  {unlocked ? (
                    <>

                      <div className="mine-number">
                        MINA {index + 1}
                      </div>

                      <div
                        className={`small-miner ${
                          isActive && hitting
                            ? "small-miner-hit"
                            : ""
                        }`}
                        onClick={
                          index === 0
                            ? mine
                            : undefined
                        }
                      >

                        <div className="small-helmet">
                          <div className="small-lamp" />
                        </div>

                        <div className="small-head">
                          <div className="small-eye left" />
                          <div className="small-eye right" />
                          <div className="small-beard" />
                        </div>

                        <div className="small-body">
                          <div className="small-belt" />
                        </div>

                        <div className="small-arm left" />
                        <div className="small-arm right" />

                        <div className="small-leg left" />
                        <div className="small-leg right" />

                        <div
                          className={`small-pickaxe ${
                            hitting &&
                            index === 0
                              ? "small-pickaxe-hit"
                              : ""
                          }`}
                        />

                      </div>


                      {/* SACO */}

                      <div
                        className={`mine-bag ${
                          index <
                          unlockedMines &&
                          elevatorFloor === index
                            ? "bag-active"
                            : ""
                        }`}
                      >
                        🎒
                      </div>


                      <div className="mine-production">
                        +{index + 1} ◆
                      </div>

                    </>
                  ) : (

                    /* =================
                       MINA BLOQUEADA
                    ================== */

                    <button
                      className="unlock-button"
                      onClick={() =>
                        unlockMine(index)
                      }
                    >

                      <span className="lock">
                        🔒
                      </span>

                      <strong>
                        DESBLOQUEAR
                      </strong>

                      <small>
                        MINA {index + 1}
                      </small>

                      <b>
                        🪙 {minePrices[index]}
                      </b>

                    </button>

                  )}

                </div>
              );
            })}

          </div>


          {/* =====================
              INDICADOR DE MINERÍA
          ====================== */}

          <div className="manual-panel">

            <div className="manual-title">
              ⛏️ MINA PRINCIPAL
            </div>

            <div className="manual-progress">

              <div
                className="manual-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="manual-progress-text">
              {hits}/{maxHits}
            </div>

          </div>


          {/* MINERAL FLOTANTE */}

          {hitting && (
            <div className="impact">
              ✦
            </div>
          )}

        </section>


        {/* =========================
            ESTADÍSTICAS
        ========================== */}

        <div className="stats">

          <div className="stat">

            <div className="stat-icon">
              ◆
            </div>

            <div>
              <small>
                MINERALES
              </small>

              <strong>
                {minerals}
              </strong>
            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              🛗
            </div>

            <div>
              <small>
                MINAS
              </small>

              <strong>
                {unlockedMines}/4
              </strong>
            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              🚋
            </div>

            <div>
              <small>
                ALMACÉN
              </small>

              <strong>
                {storedMinerals}
              </strong>
            </div>

          </div>

        </div>


        {/* =========================
            MENÚ INFERIOR
        ========================== */}

        <nav className="bottom-menu">

          <button
            onClick={() =>
              router.push("/game")
            }
          >
            <span>⛏</span>
            <small>MINAS</small>
          </button>

          <button
            onClick={() =>
              router.push("/shop")
            }
          >
            <span>🛒</span>
            <small>TIENDA</small>
          </button>

          <button
            onClick={() =>
              router.push("/friends")
            }
          >
            <span>👥</span>
            <small>REFERIDOS</small>
          </button>

          <button
            onClick={() =>
              router.push("/bank")
            }
          >
            <span>💰</span>
            <small>BANCO</small>
          </button>

          <button
            onClick={() =>
              router.push("/missions")
            }
          >
            <span>🎯</span>
            <small>MISIONES</small>
          </button>

          <button
            onClick={() =>
              router.push("/profile")
            }
          >
            <span>👤</span>
            <small>PERFIL</small>
          </button>

        </nav>

      </div>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .game-page {
          width: 100%;
          min-height: 100dvh;
          background: #030303;
          color: white;
          overflow: hidden;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }


        .game-container {
          width: 100%;
          max-width: 600px;
          height: 100dvh;
          margin: 0 auto;
          background: #080808;
          position: relative;
          overflow: hidden;
        }


        /* =========================
           TOP BAR
        ========================== */

        .top-bar {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 14px;
          background: #0b0b0b;
          border-bottom: 1px solid #292929;
        }


        .profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }


        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              #f5c542,
              #8d6500
            );
          color: #111;
          font-weight: 900;
          font-size: 17px;
          border: 2px solid #ffe08a;
        }


        .player-name {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }


        .level {
          margin-top: 2px;
          font-size: 9px;
          color: #8d8d8d;
          font-weight: 700;
        }


        .coins {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 16px;
        }


        .coins strong {
          color: #f4c542;
        }


        /* =========================
           ENERGY
        ========================== */

        .energy-area {
          padding: 7px 14px 8px;
          background: #0c0c0c;
        }


        .energy-text {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: #999;
          margin-bottom: 4px;
          font-weight: 800;
        }


        .energy-text strong {
          color: white;
        }


        .energy-bar {
          width: 100%;
          height: 6px;
          background: #222;
          border-radius: 20px;
          overflow: hidden;
        }


        .energy-fill {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #d99800,
              #ffe27a
            );
          transition: width .25s ease;
        }


        /* =========================
           MUNDO DE LA MINA
        ========================== */

        .mine-world {
          height: calc(
            100dvh - 184px
          );
          min-height: 390px;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              #12100c 0%,
              #19130b 8%,
              #21170c 8%,
              #0c0c0c 100%
            );
        }


        /* =========================
           SUPERFICIE
        ========================== */

        .surface {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 26%;
          min-height: 92px;
          background:
            linear-gradient(
              #253b21,
              #172516
            );
          border-bottom: 6px solid #0d0d0d;
          z-index: 20;
          overflow: hidden;
        }


        .sky-glow {
          position: absolute;
          width: 130px;
          height: 60px;
          right: 15%;
          top: 8px;
          background:
            radial-gradient(
              circle,
              rgba(255,205,70,.22),
              transparent 70%
            );
        }


        .mountain {
          position: absolute;
          bottom: 5px;
          width: 0;
          height: 0;
          border-left: 65px solid transparent;
          border-right: 65px solid transparent;
          border-bottom: 65px solid #182319;
        }


        .mountain-one {
          left: 5%;
        }


        .mountain-two {
          left: 25%;
          transform: scale(.7);
        }


        {/* =========================
                ALMACÉN
            ========================== */}

            <div className="warehouse">

              <div className="warehouse-roof">
                🏭
              </div>

              <div className="warehouse-body">
                ALMACÉN
              </div>

              <div className="warehouse-stock">
                ◆ {storedMinerals}
              </div>

            </div>


            {/* =========================
                ZONA DE VAGONES
            ========================== */}

            <div className="railway">

              <div className="rail rail-one" />
              <div className="rail rail-two" />

              <div
                className={`wagon ${
                  wagonMoving ? "wagon-moving" : ""
                }`}
              >

                <div className="wagon-box">
                  {storedMinerals > 0 ? "◆" : ""}
                </div>

                <div className="wagon-wheel wheel-one" />
                <div className="wagon-wheel wheel-two" />

              </div>

              <div className="wagon-worker">
                👷
              </div>

            </div>


            {/* =========================
                ZONA DE CARGA
            ========================== */}

            <div className="delivery-zone">

              <div className="delivery-worker">
                👷
              </div>

              <div className="delivery-box">
                📦
              </div>

              <div className="delivery-text">
                CARGA
              </div>

            </div>

          </div>


          {/* =========================
              ELEVADOR
          ========================== */}

          <div className="elevator-shaft">

            <div className="shaft-line" />

            <div
              className={`elevator ${
                elevatorWorking
                  ? "elevator-working"
                  : ""
              }`}
              style={{
                top: `${elevatorFloor * 23 + 5}%`,
              }}
            >

              <div className="elevator-roof">
                🛗
              </div>

              <div className="elevator-cage">

                <div className="elevator-worker">
                  👷
                </div>

                <div className="elevator-bag">
                  🎒
                </div>

              </div>

            </div>

          </div>


          {/* =========================
              CUATRO POZOS
          ========================== */}

          <div className="mine-shafts">

            {[0, 1, 2, 3].map((index) => {

              const unlocked =
                index < unlockedMines;

              const isActive =
                index === unlockedMines - 1;

              return (

                <div
                  key={index}
                  className={`mine-floor ${
                    unlocked
                      ? "mine-floor-unlocked"
                      : "mine-floor-locked"
                  }`}
                >

                  {/* ROCA */}

                  <div className="rock-wall">

                    <div className="rock-detail detail-one" />
                    <div className="rock-detail detail-two" />
                    <div className="rock-detail detail-three" />
                    <div className="rock-detail detail-four" />

                    <div className="ore ore-a" />
                    <div className="ore ore-b" />
                    <div className="ore ore-c" />

                  </div>


                  {unlocked ? (

                    <>

                      {/* NOMBRE DE LA MINA */}

                      <div className="mine-number">
                        MINA {index + 1}
                      </div>


                      {/* MINERO */}

                      <div
                        className={`small-miner ${
                          isActive && hitting
                            ? "small-miner-hit"
                            : ""
                        }`}
                        onClick={
                          index === 0
                            ? mine
                            : undefined
                        }
                      >

                        <div className="small-helmet">

                          <div className="small-lamp" />

                        </div>


                        <div className="small-head">

                          <div className="small-eye left" />
                          <div className="small-eye right" />

                          <div className="small-beard" />

                        </div>


                        <div className="small-body">

                          <div className="small-belt" />

                        </div>


                        <div className="small-arm left" />
                        <div className="small-arm right" />

                        <div className="small-leg left" />
                        <div className="small-leg right" />


                        <div
                          className={`small-pickaxe ${
                            hitting &&
                            index === 0
                              ? "small-pickaxe-hit"
                              : ""
                          }`}
                        />

                      </div>


                      {/* SACO DE MINERALES */}

                      <div
                        className={`mine-bag ${
                          elevatorFloor === index &&
                          elevatorWorking
                            ? "bag-active"
                            : ""
                        }`}
                      >
                        🎒
                      </div>


                      {/* PRODUCCIÓN */}

                      <div className="mine-production">
                        +{index + 1} ◆
                      </div>


                      {/* PUNTO DE RECOGIDA */}

                      <div className="pickup-point">
                        🪨
                      </div>

                    </>

                  ) : (

                    /* =====================
                       MINA BLOQUEADA
                    ====================== */

                    <button
                      className="unlock-button"
                      onClick={() =>
                        unlockMine(index)
                      }
                    >

                      <span className="lock">
                        🔒
                      </span>

                      <strong>
                        DESBLOQUEAR
                      </strong>

                      <small>
                        MINA {index + 1}
                      </small>

                      <b>
                        🪙 {minePrices[index]}
                      </b>

                    </button>

                  )}

                </div>

              );

            })}

          </div>


          {/* =========================
              PANEL DE MINERÍA MANUAL
          ========================== */}

          <div className="manual-panel">

            <div className="manual-title">
              ⛏️ MINA PRINCIPAL
            </div>

            <div className="manual-progress">

              <div
                className="manual-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="manual-progress-text">
              {hits}/{maxHits}
            </div>

          </div>


          {/* =========================
              IMPACTO
          ========================== */}

          {hitting && (

            <div className="impact">
              ✦
            </div>

          )}

        </section>


        {/* =========================
            ESTADÍSTICAS
        ========================== */}

        <div className="stats">

          <div className="stat">

            <div className="stat-icon">
              ◆
            </div>

            <div>

              <small>
                MINERALES
              </small>

              <strong>
                {minerals}
              </strong>

            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              🛗
            </div>

            <div>

              <small>
                MINAS
              </small>

              <strong>
                {unlockedMines}/4
              </strong>

            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              🚋
            </div>

            <div>

              <small>
                ALMACÉN
              </small>

              <strong>
                {storedMinerals}
              </strong>

            </div>

          </div>

        </div>


        {/* =========================
            MENÚ INFERIOR
        ========================== */}

        <nav className="bottom-menu">

          <button
            onClick={() =>
              router.push("/game")
            }
          >

            <span>
              ⛏
            </span>

            <small>
              MINAS
            </small>

          </button>


          <button
            onClick={() =>
              router.push("/shop")
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
            onClick={() =>
              router.push("/friends")
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
            onClick={() =>
              router.push("/bank")
            }
          >

            <span>
              💰
            </span>

            <small>
              BANCO
            </small>

          </button>


          <button
            onClick={() =>
              router.push("/missions")
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
            onClick={() =>
              router.push("/profile")
            }
          >

            <span>
              👤
            </span>

            <small>
              PERFIL
            </small>

          </button>

        </nav>

      </div>


      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .game-page {
          width: 100%;
          min-height: 100dvh;
          background: #030303;
          color: white;
          overflow: hidden;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }


        .game-container {
          width: 100%;
          max-width: 600px;
          height: 100dvh;
          margin: 0 auto;
          background: #080808;
          position: relative;
          overflow: hidden;
        }


        /* =========================
           TOP BAR
        ========================== */

        .top-bar {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 14px;
          background: #0b0b0b;
          border-bottom: 1px solid #292929;
        }


        .profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }


        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              #f5c542,
              #8d6500
            );
          color: #111;
          font-weight: 900;
          font-size: 17px;
          border: 2px solid #ffe08a;
        }


        .player-name {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }


        .level {
          margin-top: 2px;
          font-size: 9px;
          color: #8d8d8d;
          font-weight: 700;
        }


        .coins {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 16px;
        }


        .coins strong {
          color: #f4c542;
        }


        /* =========================
           ENERGÍA
        ========================== */

        .energy-area {
          padding: 7px 14px 8px;
          background: #0c0c0c;
        }


        .energy-text {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: #999;
          margin-bottom: 4px;
          font-weight: 800;
        }


        .energy-text strong {
          color: white;
        }


        .energy-bar {
          width: 100%;
          height: 6px;
          background: #222;
          border-radius: 20px;
          overflow: hidden;
        }


        .energy-fill {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #d99800,
              #ffe27a
            );
          transition: width .25s ease;
        }


        /* =========================
           MUNDO DE LA MINA
        ========================== */

        .mine-world {
          height:
            calc(100dvh - 184px);
          min-height: 390px;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              #12100c 0%,
              #19130b 8%,
              #21170c 8%,
              #0c0c0c 100%
            );
        }


        /* =========================
           SUPERFICIE
        ========================== */

        .surface {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 26%;
          min-height: 92px;
          background:
            linear-gradient(
              #253b21,
              #172516
            );
          border-bottom:
            6px solid #0d0d0d;
          z-index: 20;
          overflow: hidden;
        }


        .sky-glow {
          position: absolute;
          width: 130px;
          height: 60px;
          right: 15%;
          top: 8px;
          background:
            radial-gradient(
              circle,
              rgba(255,205,70,.22),
              transparent 70%
            );
        }


        .mountain {
          position: absolute;
          bottom: 5px;
          width: 0;
          height: 0;
          border-left:
            65px solid transparent;
          border-right:
            65px solid transparent;
          border-bottom:
            65px solid #182319;
        }


        .mountain-one {
          left: 5%;
        }


        .mountain-two {
          left: 25%;
          transform: scale(.7);
        }


        /* =========================
           ALMACÉN
        ========================== */

        .warehouse {
          position: absolute;
          left: 4%;
          bottom: 7px;
          width: 78px;
          height: 61px;
          z-index: 8;
          text-align: center;
        }


        .warehouse-roof {
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }


        .warehouse-body {
          height: 21px;
          border-radius: 5px;
          background: #5b351b;
          border: 2px solid #9a612f;
          font-size: 7px;
          font-weight: 900;
          padding-top: 5px;
        }


        .warehouse-stock {
          margin-top: 2px;
          color: #f0c13d;
          font-size: 7px;
          font-weight: 900;
        }


        /* =========================
           VÍAS
        ========================== */

        .railway {
          position: absolute;
          left: 27%;
          right: 4%;
          bottom: 5px;
          height: 44px;
        }


        .rail {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: #555;
        }


        .rail-one {
          top: 13px;
        }


        .rail-two {
          top: 29px;
        }


        .wagon {
          position: absolute;
          left: 12%;
          top: 1px;
          width: 52px;
          height: 36px;
          transition:
            transform 1.8s linear;
          z-index: 6;
        }


        .wagon-moving {
          transform:
            translateX(115px);
        }


        .wagon-box {
          position: absolute;
          left: 5px;
          top: 0;
          width: 42px;
          height: 23px;
          border-radius:
            5px 5px 2px 2px;
          background: #734a23;
          border:
            2px solid #b97a37;
          color: #e3b05e;
          text-align: center;
          padding-top: 2px;
          font-size: 13px;
        }


        .wagon-wheel {
          position: absolute;
          bottom: 0;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #151515;
          border: 2px solid #777;
        }


        .wheel-one {
          left: 7px;
        }


        .wheel-two {
          right: 7px;
        }


        .wagon-worker {
          position: absolute;
          right: -18px;
          top: -5px;
          font-size: 21px;
        }


        /* =========================
           ZONA DE CARGA
        ========================== */

        .delivery-zone {
          position: absolute;
          right: 4%;
          top: 8px;
          width: 48px;
          text-align: center;
          z-index: 10;
        }


        .delivery-worker {
          font-size: 20px;
        }


        .delivery-box {
          font-size: 21px;
        }


        .delivery-text {
          color: #d3a83d;
          font-size: 7px;
          font-weight: 900;
        }


        /* =========================
           ELEVADOR
        ========================== */

        .elevator-shaft {
          position: absolute;
          left: 45%;
          top: 20%;
          width: 52px;
          height: 77%;
          z-index: 16;
          pointer-events: none;
        }


        .shaft-line {
          position: absolute;
          left: 50%;
          transform:
            translateX(-50%);
          top: 0;
          bottom: 0;
          width: 30px;
          background:
            linear-gradient(
              90deg,
              #111,
              #454545,
              #111
            );
          border-left: 2px solid #050505;
          border-right: 2px solid #050505;
        }


        .elevator {
          position: absolute;
          left: 50%;
          transform:
            translateX(-50%);
          width: 45px;
          height: 54px;
          transition:
            top 1s ease-in-out;
          z-index: 30;
        }


        .elevator-roof {
          position: absolute;
          top: -8px;
          left: 2px;
          font-size: 22px;
        }


        .elevator-cage {
          position: absolute;
          bottom: 0;
          width: 45px;
          height: 42px;
          border:
            3px solid #9b762c;
          background:
            rgba(35,35,35,.95);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1px;
        }


                .elevator-worker {
          font-size: 18px;
        }

        .elevator-bag {
          font-size: 13px;
        }

        .elevator-cage {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 58px;
          background: linear-gradient(
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
          pointer-events: none;
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

        .elevator-rope {
          position: absolute;
          left: 50%;
          top: -500px;
          transform: translateX(-50%);
          width: 4px;
          height: 500px;
          background: #777;
          box-shadow: 0 0 3px #000;
          z-index: 4;
        }

        .elevator-light {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #f5c542;
          box-shadow: 0 0 8px #f5c542;
          top: 4px;
          right: 4px;
        }

        .elevator-worker {
          font-size: 18px;
          line-height: 1;
          position: relative;
          z-index: 2;
        }

        .elevator-bag {
          font-size: 13px;
          line-height: 1;
          position: absolute;
          bottom: 5px;
          right: 4px;
          z-index: 3;
        }

        .elevator-control {
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 32px;
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
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #777;
        }

        .elevator-control i:first-child {
          background: #56d364;
          box-shadow: 0 0 5px #56d364;
        }

        .elevator-floor-label {
          position: absolute;
          left: 56px;
          white-space: nowrap;
          font-size: 7px;
          font-weight: 900;
          color: #aaa;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid #444;
          padding: 3px 5px;
          border-radius: 4px;
        }

        .elevator-moving {
          animation: elevatorShake 0.25s infinite alternate;
        }

        @keyframes elevatorShake {
          from {
            transform: translateX(-50%) translateY(-1px);
          }
          to {
            transform: translateX(-50%) translateY(1px);
          }
        }

        /* =========================
           MINAS
        ========================= */

        .mine-floor {
          position: relative;
          height: 70px;
          border-top: 2px solid #242424;
          background:
            linear-gradient(
              180deg,
              rgba(55, 39, 25, 0.95),
              rgba(27, 20, 14, 0.98)
            );
          overflow: hidden;
        }

        .mine-floor::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 30%, #66502d 0 2px, transparent 3px),
            radial-gradient(circle at 70% 65%, #4c3b26 0 2px, transparent 3px),
            radial-gradient(circle at 45% 80%, #725832 0 2px, transparent 3px),
            radial-gradient(circle at 85% 20%, #3d3021 0 2px, transparent 3px);
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

        .mine-tunnel {
          position: absolute;
          left: 25px;
          right: 8px;
          bottom: 9px;
          height: 31px;
          border-radius: 5px;
          background: #16120e;
          border: 2px solid #33281c;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
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

        .mine-ore {
          position: absolute;
          right: 9px;
          bottom: 6px;
          font-size: 17px;
          filter: drop-shadow(0 0 4px rgba(255, 193, 7, 0.35));
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
          transition: left 0.8s ease;
        }

        .mine-worker-body {
          font-size: 22px;
          filter: drop-shadow(0 2px 2px #000);
        }

        .mine-worker-bag {
          font-size: 14px;
          transform: translateY(3px);
        }

        .mine-worker.working {
          animation: workerWalk 1.5s infinite ease-in-out;
        }

        @keyframes workerWalk {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(28px);
          }

          100% {
            transform: translateX(0);
          }
        }

        .mine-pickaxe {
          position: absolute;
          left: 63px;
          bottom: 22px;
          font-size: 18px;
          z-index: 8;
          transform: rotate(-25deg);
        }

        .mine-ore-pile {
          position: absolute;
          left: 8px;
          bottom: 5px;
          font-size: 17px;
          z-index: 5;
        }

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
          background: linear-gradient(
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
          box-shadow:
            0 1px 0 #704d08,
            0 2px 5px rgba(0, 0, 0, 0.4);
        }

        .unlock-price {
          display: block;
          margin-top: 2px;
          font-size: 7px;
          opacity: 0.8;
        }

        .mine-level {
          position: absolute;
          right: 8px;
          top: 5px;
          font-size: 7px;
          color: #777;
          font-weight: 900;
          z-index: 5;
        }

        /* =========================
           MANUAL MINING
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
          background: linear-gradient(
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
          background: linear-gradient(
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
          box-shadow:
            0 1px 0 #704d08,
            0 2px 6px rgba(0, 0, 0, 0.4);
        }

        .mine-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .mine-button.hit {
          animation: buttonHit 0.35s ease;
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
           STATS
        ========================= */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
           MENSAJES
        ========================= */

        .game-message {
          position: absolute;
          left: 50%;
          top: 43%;
          transform: translate(-50%, -50%);
          z-index: 100;
          background: rgba(0, 0, 0, 0.88);
          border: 1px solid #f4c33d;
          color: #f4c33d;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 9px;
          font-weight: 1000;
          white-space: nowrap;
          pointer-events: none;
          animation: messagePop 1.2s ease forwards;
        }

        @keyframes messagePop {
          0% {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.8);
          }

          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }

          80% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -70%) scale(1.05);
          }
        }

        /* =========================
           BOTTOM MENU
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
          grid-template-columns: repeat(6, 1fr);
          z-index: 500;
          padding-bottom: env(safe-area-inset-bottom);
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
           ANIMACIONES
        ========================= */

        @keyframes minerHit {
          0% {
            transform: translateX(0);
          }

          35% {
            transform: translateX(8px) rotate(2deg);
          }

          100% {
            transform: translateX(0) rotate(0);
          }
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

        @keyframes spark {
          0% {
            transform: scale(0.3);
            opacity: 1;
          }

          100% {
            transform:
              translateY(-30px)
              translateX(10px)
              scale(1.4);
            opacity: 0;
          }
        }

        @keyframes wagonMove {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(135px);
          }
        }

        @keyframes oreGlow {
          0% {
            filter: drop-shadow(0 0 1px rgba(255, 193, 7, 0.2));
          }

          50% {
            filter: drop-shadow(0 0 6px rgba(255, 193, 7, 0.65));
          }

          100% {
            filter: drop-shadow(0 0 1px rgba(255, 193, 7, 0.2));
          }
        }

        .ore-glow {
          animation: oreGlow 1.5s infinite;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 380px) {
          .game-page {
            padding-bottom: 70px;
          }

          .game-header {
            padding: 7px 8px;
          }

          .header-title {
            font-size: 12px;
          }

          .balance-box {
            font-size: 8px;
            padding: 5px 7px;
          }

          .mine-area {
            height: 310px;
          }

          .surface {
            height: 55px;
          }

          .mine-floor {
            height: 63px;
          }

          .mine-tunnel {
            left: 22px;
            height: 28px;
          }

          .mine-worker-body {
            font-size: 19px;
          }

          .mine-worker-bag {
            font-size: 12px;
          }

          .elevator-cage {
            width: 42px;
            height: 52px;
          }

          .elevator-worker {
            font-size: 16px;
          }

          .elevator-bag {
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
          .game-page {
            max-width: 520px;
            margin: 0 auto;
          }

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
