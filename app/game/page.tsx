"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  const [coins, setCoins] = useState(0);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [hits, setHits] = useState(0);
  const [mining, setMining] = useState(false);

  const maxHits = 10;
  const progress = Math.min((hits / maxHits) * 100, 100);

  function mine() {
    if (mining || energy <= 0) {
      return;
    }

    setMining(true);
    setEnergy((value) => Math.max(0, value - 1));

    const nextHits = hits + 1;

    if (nextHits >= maxHits) {
      setHits(0);
      setMinerals((value) => value + 1);
      setCoins((value) => value + 5);
    } else {
      setHits(nextHits);
      setCoins((value) => value + 1);
    }

    window.setTimeout(() => {
      setMining(false);
    }, 300);
  }

  return (
    <main className="game-page">

      <div className="game-container">

        {/* CABECERA */}

        <header className="game-header">

          <button
            type="button"
            className="profile-button"
            onClick={() => router.push("/profile")}
          >
            <div className="avatar">
              👷
            </div>

            <div>
              <div className="small-label">
                MINERO
              </div>

              <div className="level">
                NIVEL 1
              </div>
            </div>
          </button>

          <div className="coins-box">
            <div className="small-label">
              MINER COINS
            </div>

            <div className="coins">
              🪙 {coins.toLocaleString()}
            </div>
          </div>

        </header>

        {/* ENERGÍA */}

        <div className="energy-section">

          <div className="energy-label">
            <span>⚡ ENERGÍA</span>
            <span>{energy}/100</span>
          </div>

          <div className="energy-bar">
            <div
              className="energy-fill"
              style={{ width: `${energy}%` }}
            />
          </div>

        </div>

        {/* MINA */}

        <section
          className={`mine ${mining ? "mine-hit" : ""}`}
          onClick={mine}
        >

          <div className="mine-glow" />

          <div className="mine-ceiling" />

          <div className="mine-wall">

            <div className="rock rock-1" />
            <div className="rock rock-2" />
            <div className="rock rock-3" />
            <div className="rock rock-4" />
            <div className="rock rock-5" />

          </div>

          <div className="mine-floor" />

          {/* LÁMPARA */}

          <div className="lamp">

            <div className="lamp-wire" />

            <div className="lamp-light" />

          </div>

          {/* TÍTULO */}

          <div className="mine-title">

            <div>
              MINA 01
            </div>

            <strong>
              PRIMERA MINA
            </strong>

            <span>
              EXTRAE MINERALES
            </span>

          </div>

          {/* PARED PARA PICAR */}

          <div className="ore-wall">

            <div className="ore-crack crack-1" />
            <div className="ore-crack crack-2" />
            <div className="ore-crack crack-3" />
            <div className="ore-crack crack-4" />

            <div className="ore-center">

              <div className="ore-icon">
                ◆
              </div>

              <div className="ore-name">
                ROCA
              </div>

              <div className="ore-hits">
                {hits}/{maxHits}
              </div>

            </div>

          </div>

          {/* MINERO */}

          <div className={`miner ${mining ? "miner-mining" : ""}`}>

            <div className="miner-shadow" />

            <div className="miner-legs">
              <div className="leg left-leg" />
              <div className="leg right-leg" />
            </div>

            <div className="miner-body">

              <div className="shirt" />

              <div className="belt" />

            </div>

            <div className="miner-head">

              <div className="hair" />

              <div className="eye eye-left" />
              <div className="eye eye-right" />

              <div className="beard" />

            </div>

            <div className="helmet">

              <div className="helmet-light" />

            </div>

            <div className="arm arm-back" />
            <div className="arm arm-front" />

            {/* PICO */}

            <div className="pickaxe">

              <div className="pickaxe-stick" />

              <div className="pickaxe-metal">

                <div className="metal-left" />
                <div className="metal-right" />

              </div>

            </div>

          </div>

          {/* IMPACTO */}

          {mining && (
            <div className="impact">

              <span className="spark spark-1">✦</span>
              <span className="spark spark-2">✦</span>
              <span className="spark spark-3">✧</span>
              <span className="spark spark-4">✦</span>

              <span className="dust dust-1" />
              <span className="dust dust-2" />
              <span className="dust dust-3" />

            </div>
          )}

          {/* PROGRESO */}

          <div className="rock-progress">

            <div className="progress-top">
              <span>
                RESISTENCIA DE LA ROCA
              </span>

              <span>
                {Math.round(progress)}%
              </span>
            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />

            </div>

            <div className="tap-text">
              {energy > 0
                ? "👆 TOCA LA PANTALLA PARA PICAR"
                : "⚡ SIN ENERGÍA"}
            </div>

          </div>

        </section>

        {/* INFORMACIÓN */}

        <div className="stats">

          <div>
            <span>
              MINERALES
            </span>

            <strong>
              💎 {minerals}
            </strong>
          </div>

          <div>
            <span>
              GANANCIA
            </span>

            <strong>
              +1 🪙
            </strong>
          </div>

        </div>

        {/* MENÚ */}

        <nav className="bottom-menu">

          <button
            type="button"
            className="menu-active"
            onClick={() => router.push("/game")}
          >
            <span>⛏️</span>
            <small>MINAS</small>
          </button>

          <button
            type="button"
            onClick={() => router.push("/shop")}
          >
            <span>🛒</span>
            <small>TIENDA</small>
          </button>

          <button
            type="button"
            onClick={() => router.push("/friends")}
          >
            <span>👥</span>
            <small>REFERIDOS</small>
          </button>

          <button
            type="button"
            onClick={() => router.push("/bank")}
          >
            <span>🏦</span>
            <small>BANCO</small>
          </button>

          <button
            type="button"
            onClick={() => router.push("/missions")}
          >
            <span>🎯</span>
            <small>MISIONES</small>
          </button>

          <button
            type="button"
            onClick={() => router.push("/profile")}
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
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background: #000;
          color: white;
        }

        .game-container {
          width: 100%;
          max-width: 480px;
          height: 100%;
          margin: auto;
          display: flex;
          flex-direction: column;
          background: #050403;
        }

        .game-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 15px 8px;
          background: #050403;
          border-bottom: 1px solid rgba(255, 190, 50, .1);
        }

        .profile-button {
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 13px;
          padding: 7px 10px;
          background: rgba(255,255,255,.04);
          color: white;
        }

        .avatar {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #21170b;
          font-size: 22px;
        }

        .small-label {
          font-size: 9px;
          font-weight: 900;
          color: rgba(255,255,255,.4);
        }

        .level {
          margin-top: 2px;
          font-size: 12px;
          font-weight: 900;
          color: #f5bd3e;
        }

        .coins-box {
          text-align: right;
        }

        .coins {
          margin-top: 2px;
          font-size: 17px;
          font-weight: 900;
          color: #f5bd3e;
        }

        .energy-section {
          padding: 4px 15px 10px;
          background: #050403;
        }

        .energy-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 9px;
          font-weight: 900;
          color: rgba(255,255,255,.45);
        }

        .energy-label span:last-child {
          color: #f5bd3e;
        }

        .energy-bar {
          height: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: rgba(255,255,255,.08);
        }

        .energy-fill {
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            #8a5b12,
            #e5a927,
            #ffe07a
          );
          transition: width .25s ease;
        }

        .mine {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          cursor: pointer;
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(176, 119, 32, .13),
              transparent 55%
            ),
            linear-gradient(
              180deg,
              #1b140c,
              #0b0805 55%,
              #030303
            );
        }

        .mine-glow {
          position: absolute;
          left: 50%;
          top: 15%;
          width: 280px;
          height: 280px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(255, 190, 50, .08);
          filter: blur(55px);
        }

        .mine-ceiling {
          position: absolute;
          left: -10%;
          top: 0;
          width: 120%;
          height: 65px;
          background: linear-gradient(
            135deg,
            #312519,
            #0c0906,
            #241a0e
          );
          clip-path: polygon(
            0 0,
            100% 0,
            100% 65%,
            82% 48%,
            65% 72%,
            48% 45%,
            30% 70%,
            12% 45%,
            0 60%
          );
        }

        .mine-wall {
          position: absolute;
          inset: 55px 0 55px;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.04) 0 2px,
              transparent 3px
            );
          background-size: 75px 75px;
        }

        .rock {
          position: absolute;
          border: 1px solid rgba(255,255,255,.035);
          border-radius: 50%;
          opacity: .7;
        }

        .rock-1 {
          width: 100px;
          height: 55px;
          left: 3%;
          top: 15%;
          transform: rotate(25deg);
        }

        .rock-2 {
          width: 120px;
          height: 65px;
          right: 5%;
          top: 23%;
          transform: rotate(-20deg);
        }

        .rock-3 {
          width: 90px;
          height: 50px;
          left: 10%;
          bottom: 25%;
        }

        .rock-4 {
          width: 130px;
          height: 60px;
          right: 8%;
          bottom: 18%;
          transform: rotate(18deg);
        }

        .rock-5 {
          width: 70px;
          height: 45px;
          left: 43%;
          top: 15%;
        }

        .mine-floor {
          position: absolute;
          left: -10%;
          bottom: 0;
          width: 120%;
          height: 80px;
          background: linear-gradient(
            165deg,
            #21180d,
            #090705
          );
          clip-path: polygon(
            0 30%,
            20% 10%,
            40% 30%,
            60% 8%,
            80% 28%,
            100% 5%,
            100% 100%,
            0 100%
          );
        }

        .lamp {
          position: absolute;
          left: 50%;
          top: 0;
          z-index: 5;
          transform: translateX(-50%);
        }

        .lamp-wire {
          width: 2px;
          height: 25px;
          margin: auto;
          background: #555;
        }

        .lamp-light {
          width: 26px;
          height: 18px;
          border-radius: 8px 8px 12px 12px;
          background: #f3b934;
          box-shadow:
            0 0 12px #ffd85a,
            0 0 40px rgba(255,190,50,.55);
        }

        .mine-title {
          position: absolute;
          top: 12px;
          left: 0;
          right: 0;
          z-index: 8;
          text-align: center;
        }

        .mine-title div {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .35em;
          color: rgba(255,190,50,.6);
        }

        .mine-title strong {
          display: block;
          margin-top: 3px;
          font-size: 20px;
        }

        .mine-title span {
          display: block;
          margin-top: 2px;
          font-size: 9px;
          color: rgba(255,255,255,.35);
        }

        .ore-wall {
          position: absolute;
          right: -5px;
          top: 29%;
          width: 43%;
          height: 40%;
          min-height: 155px;
          border-radius: 30px 0 0 30px;
          border: 2px solid rgba(255,255,255,.08);
          background:
            radial-gradient(
              circle at 30% 30%,
              rgba(255,255,255,.08) 0 3px,
              transparent 4px
            ),
            radial-gradient(
              circle at 70% 70%,
              rgba(255,255,255,.06) 0 3px,
              transparent 4px
            ),
            linear-gradient(
              135deg,
              #554838,
              #292016 50%,
              #100d09
            );
          background-size: 50px 50px, 70px 70px, auto;
          box-shadow:
            inset 15px 0 30px rgba(0,0,0,.45),
            0 15px 30px rgba(0,0,0,.5);
        }

        .ore-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ore-icon {
          font-size: 35px;
          color: rgba(255,199,82,.35);
        }

        .ore-name {
          margin-top: 4px;
          font-size: 9px;
          font-weight: 900;
          color: rgba(255,255,255,.5);
        }

        .ore-hits {
          margin-top: 5px;
          font-size: 10px;
          font-weight: 900;
          color: #eab63f;
        }

        .ore-crack {
          position: absolute;
          height: 2px;
          width: 65px;
          background: rgba(0,0,0,.6);
          transform-origin: left;
        }

        .crack-1 {
          left: 15%;
          top: 25%;
          transform: rotate(35deg);
        }

        .crack-2 {
          left: 45%;
          top: 35%;
          transform: rotate(-55deg);
        }

        .crack-3 {
          left: 20%;
          top: 65%;
          transform: rotate(-15deg);
        }

        .crack-4 {
          left: 55%;
          top: 72%;
          transform: rotate(35deg);
        }

        .miner {
          position: absolute;
          left: 17%;
          top: 36%;
          z-index: 15;
          width: 140px;
          height: 220px;
          transform-origin: 50% 85%;
        }

        .miner-mining {
          animation: minerHit .3s ease-in-out;
        }

        .miner-shadow {
          position: absolute;
          left: 5px;
          bottom: 0;
          width: 125px;
          height: 18px;
          border-radius: 50%;
          background: rgba(0,0,0,.65);
          filter: blur(5px);
        }

        .miner-legs {
          position: absolute;
          bottom: 18px;
          left: 43px;
          width: 55px;
          height: 65px;
        }

        .leg {
          position: absolute;
          bottom: 0;
          width: 22px;
          height: 65px;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            #29251e,
            #111
          );
        }

        .left-leg {
          left: 2px;
          transform: rotate(5deg);
        }

        .right-leg {
          right: 2px;
          transform: rotate(-5deg);
        }

        .miner-body {
          position: absolute;
          left: 36px;
          bottom: 68px;
          width: 70px;
          height: 92px;
        }

        .shirt {
          position: absolute;
          inset: 0;
          border-radius: 25px 25px 15px 15px;
          background: linear-gradient(
            90deg,
            #543d1d,
            #c28b35 45%,
            #61461e
          );
        }

        .belt {
          position: absolute;
          left: 4px;
          right: 4px;
          bottom: 18px;
          height: 9px;
          border-radius: 4px;
          background: #2c2117;
        }

        .miner-head {
          position: absolute;
          left: 47px;
          top: 46px;
          z-index: 5;
          width: 47px;
          height: 57px;
          border-radius: 45%;
          background: linear-gradient(
            120deg,
            #d28a58,
            #854a2c
          );
        }

        .hair {
          position: absolute;
          left: 6px;
          top: -3px;
          width: 35px;
          height: 16px;
          border-radius: 50%;
          background: #211711;
        }

        .eye {
          position: absolute;
          top: 25px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #111;
        }

        .eye-left {
          left: 11px;
        }

        .eye-right {
          right: 11px;
        }

        .beard {
          position: absolute;
          left: 7px;
          bottom: 0;
          width: 33px;
          height: 23px;
          border-radius: 35%;
          background: #321e16;
        }

        .helmet {
          position: absolute;
          left: 37px;
          top: 27px;
          z-index: 8;
          width: 70px;
          height: 38px;
          border-radius: 50px 50px 15px 15px;
          background: linear-gradient(
            #f3c64f,
            #956016
          );
          box-shadow: 0 4px 12px rgba(0,0,0,.5);
        }

        .helmet-light {
          position: absolute;
          left: 50%;
          top: 5px;
          width: 12px;
          height: 12px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #fff0a5;
          box-shadow: 0 
