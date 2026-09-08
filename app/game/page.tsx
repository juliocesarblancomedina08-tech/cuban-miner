"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  const [coins, setCoins] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [hits, setHits] = useState(0);
  const [hitting, setHitting] = useState(false);

  const maxHits = 10;
  const progress = Math.min((hits / maxHits) * 100, 100);

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
          return 0;
        }

        return next;
      });

      setHitting(false);
    }, 350);
  }

  return (
    <main className="game-page">
      <div className="game-container">

        {/* HEADER */}
        <header className="top-bar">
          <div className="profile">
            <div className="avatar">M</div>

            <div>
              <div className="player-name">MINERO</div>
              <div className="level">NIVEL 1</div>
            </div>
          </div>

          <div className="coins">
            <span>🪙</span>
            <strong>{coins}</strong>
          </div>
        </header>

        {/* ENERGY */}
        <div className="energy-area">
          <div className="energy-text">
            ENERGÍA <strong>{energy}/100</strong>
          </div>

          <div className="energy-bar">
            <div
              className="energy-fill"
              style={{ width: `${energy}%` }}
            />
          </div>
        </div>

        {/* MINE */}
        <section
          className="mine"
          onClick={mine}
        >

          <div className="ceiling" />

          <div className="lamp">
            <div className="lamp-light" />
          </div>

          {/* TUNNEL BACKGROUND */}
          <div className="tunnel-back">

            <div className="rock rock-1" />
            <div className="rock rock-2" />
            <div className="rock rock-3" />
            <div className="rock rock-4" />
            <div className="rock rock-5" />

          </div>

          {/* UNMINED ROCK */}
          <div className="ore-wall">

            <div className="ore ore-1" />
            <div className="ore ore-2" />
            <div className="ore ore-3" />
            <div className="ore ore-4" />
            <div className="ore ore-5" />

            <div className="crack crack-1" />
            <div className="crack crack-2" />
            <div className="crack crack-3" />

          </div>

          {/* MINER */}
          <div className={`miner ${hitting ? "miner-hit" : ""}`}>

            <div className="helmet">
              <div className="helmet-light" />
            </div>

            <div className="head">
              <div className="eye eye-left" />
              <div className="eye eye-right" />
              <div className="beard" />
            </div>

            <div className="body">
              <div className="shirt" />
              <div className="belt" />
            </div>

            <div className="arm arm-left" />
            <div className="arm arm-right" />

            <div className="leg leg-left" />
            <div className="leg leg-right" />

            {/* PICKAXE */}
            <div className={`pickaxe ${hitting ? "pickaxe-hit" : ""}`}>
              <div className="pickaxe-handle" />
              <div className="pickaxe-head" />
            </div>

          </div>

          {/* IMPACT */}
          {hitting && (
            <div className="impact">
              <span>✦</span>
              <span>✧</span>
              <span>•</span>
              <span>✦</span>
              <span>•</span>
            </div>
          )}

          {/* ROCK PROGRESS */}
          <div className="rock-progress">

            <div className="progress-title">
              MINANDO ROCA
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="progress-number">
              {hits}/{maxHits}
            </div>

          </div>

          <div className="tap-hint">
            TOCA PARA MINAR
          </div>

        </section>

        {/* STATS */}
        <div className="stats">

          <div className="stat">
            <div className="stat-icon">◆</div>
            <div>
              <small>MINERALES</small>
              <strong>{minerals}</strong>
            </div>
          </div>

          <div className="stat">
            <div className="stat-icon">⛏</div>
            <div>
              <small>FUERZA</small>
              <strong>1</strong>
            </div>
          </div>

        </div>

        {/* BOTTOM MENU */}
        <nav className="bottom-menu">

          <button onClick={() => router.push("/game")}>
            <span>⛏</span>
            <small>MINAS</small>
          </button>

          <button onClick={() => router.push("/shop")}>
            <span>🛒</span>
            <small>TIENDA</small>
          </button>

          <button onClick={() => router.push("/friends")}>
            <span>👥</span>
            <small>REFERIDOS</small>
          </button>

          <button onClick={() => router.push("/bank")}>
            <span>💰</span>
            <small>BANCO</small>
          </button>

          <button onClick={() => router.push("/missions")}>
            <span>🎯</span>
            <small>MISIONES</small>
          </button>

          <button onClick={() => router.push("/profile")}>
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
          min-height: 100dvh;
          width: 100%;
          background: #050505;
          color: white;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
        }

        .game-container {
          width: 100%;
          max-width: 600px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #090909;
          position: relative;
          overflow: hidden;
        }

        .top-bar {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #0b0b0b;
          border-bottom: 1px solid #242424;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #f5c542, #8d6500);
          color: #111;
          font-weight: 900;
          font-size: 19px;
          border: 2px solid #ffe08a;
        }

        .player-name {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .level {
          margin-top: 3px;
          font-size: 10px;
          color: #a5a5a5;
          font-weight: 700;
        }

        .coins {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 17px;
        }

        .coins span {
          font-size: 19px;
        }

        .coins strong {
          color: #f4c542;
        }

        .energy-area {
          padding: 10px 16px;
          background: #0c0c0c;
        }

        .energy-text {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #999;
          margin-bottom: 5px;
          font-weight: 800;
        }

        .energy-text strong {
          color: white;
        }

        .energy-bar {
          width: 100%;
          height: 7px;
          background: #222;
          border-radius: 20px;
          overflow: hidden;
        }

        .energy-fill {
          height: 100%;
          background: linear-gradient(90deg, #e5a900, #ffe27a);
          transition: width 0.25s ease;
        }

        .mine {
          height: calc(100dvh - 190px);
          min-height: 500px;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 45%, #343434 0%, #181818 38%, #080808 100%);
          cursor: pointer;
          user-select: none;
        }

        .ceiling {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 90px;
          background:
            linear-gradient(135deg, #1c1c1c 25%, #101010 25%, #101010 50%, #1c1c1c 50%, #1c1c1c 75%, #101010 75%);
          background-size: 35px 35px;
          opacity: 0.9;
          border-bottom: 2px solid #050505;
        }

        .tunnel-back {
          position: absolute;
          inset: 80px 0 0;
          background:
            radial-gradient(circle at 50% 40%, #3c3c3c, #171717 55%, #080808 100%);
        }

        .rock {
          position: absolute;
          background: #282828;
          border-radius: 45%;
          opacity: 0.7;
        }

        .rock-1 {
          width: 80px;
          height: 45px;
          left: 5%;
          top: 18%;
          transform: rotate(20deg);
        }

        .rock-2 {
          width: 100px;
          height: 55px;
          right: 5%;
          top: 28%;
          transform: rotate(-20deg);
        }

        .rock-3 {
          width: 70px;
          height: 40px;
          left: 8%;
          bottom: 30%;
        }

        .rock-4 {
          width: 100px;
          height: 50px;
          right: 3%;
          bottom: 20%;
        }

        .rock-5 {
          width: 60px;
          height: 35px;
          left: 30%;
          top: 12%;
        }

        .lamp {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: #f5d66b;
          box-shadow:
            0 0 20px #f5d66b,
            0 0 60px rgba(245, 214, 107, 0.5);
          z-index: 8;
        }

        .lamp-light {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 220px;
          background: radial-gradient(
            ellipse,
            rgba(255, 220, 100, 0.13),
            transparent 70%
          );
          pointer-events: none;
        }

        .ore-wall {
          position: absolute;
          right: -30px;
          top: 115px;
          width: 48%;
          height: 62%;
          background:
            radial-gradient(circle at 30% 30%, #555, #292929 60%, #151515);
          border-radius: 30% 0 0 35%;
          border-left: 7px solid #101010;
          box-shadow: inset 15px 0 30px rgba(0, 0, 0, 0.7);
          z-index: 3;
        }

        .ore {
          position: absolute;
          width: 18px;
          height: 18px;
          background: #5c5c5c;
          transform: rotate(45deg);
          box-shadow: 0 0 7px rgba(255, 210, 80, 0.25);
        }

        .ore-1 {
          left: 25%;
          top: 20%;
        }

        .ore-2 {
          left: 60%;
          top: 35%;
        }

        .ore-3 {
          left: 40%;
          top: 60%;
        }

        .ore-4 {
          left: 75%;
          top: 70%;
        }

        .ore-5 {
          left: 20%;
          top: 78%;
        }

        .crack {
          position: absolute;
          width: 70px;
          height: 3px;
          background: #111;
          transform-origin: left;
          opacity: 0.8;
        }

        .crack-1 {
          left: 15%;
          top: 42%;
          transform: rotate(25deg);
        }

        .crack-2 {
          left: 45%;
          top: 52%;
          transform: rotate(-35deg);
        }

        .crack-3 {
          left: 30%;
          top: 70%;
          transform: rotate(20deg);
        }

        .miner {
          position: absolute;
          left: 32%;
          bottom: 20%;
          width: 120px;
          height: 220px;
          z-index: 10;
          transition: transform 0.2s ease;
        }

        .miner-hit {
          animation: minerHit 0.35s ease;
        }

        .helmet {
          position: absolute;
          top: 0;
          left: 30px;
          width: 60px;
          height: 35px;
          border-radius: 35px 35px 10px 10px;
          background: linear-gradient(#e5b62e, #8d6500);
          border: 3px solid #f8d866;
        }

        .helmet-light {
          position: absolute;
          left: 22px;
          top: -8px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 18px white;
        }

        .head {
          position: absolute;
          top: 30px;
          left: 38px;
          width: 45px;
          height: 55px;
          border-radius: 45% 45% 40% 40%;
          background: #b87845;
          border: 3px solid #6f4026;
        }

        .eye {
          position: absolute;
          top: 20px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #111;
        }

        .eye-left {
          left: 10px;
        }

        .eye-right {
          right: 10px;
        }

        .beard {
          position: absolute;
          left: 7px;
          bottom: 4px;
          width: 31px;
          height: 19px;
          border-radius: 5px 5px 14px 14px;
          background: #33231b;
        }

        .body {
          position: absolute;
          top: 80px;
          left: 27px;
          width: 70px;
          height: 75px;
          border-radius: 15px 15px 8px 8px;
          background: linear-gradient(90deg, #31536c, #182b39);
          border: 3px solid #0c151b;
        }

        .shirt {
          position: absolute;
          inset: 10px;
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .belt {
          position: absolute;
          left: 0;
          bottom: 12px;
          width: 100%;
          height: 8px;
          background: #2d2018;
        }

        .arm {
          position: absolute;
          top: 90px;
          width: 18px;
          height: 65px;
          border-radius: 12px;
          background: #a96d3f;
          transform-origin: top center;
        }

        .arm-left {
          left: 15px;
          transform: rotate(35deg);
        }

        .arm-right {
          right: 8px;
          transform: rotate(-45deg);
        }

        .leg {
          position: absolute;
          top: 150px;
          width: 25px;
          height: 65px;
          border-radius: 8px;
          background: #1a2932;
        }

        .leg-left {
          left: 34px;
          transform: rotate(7deg);
        }

        .leg-right {
          right: 27px;
          transform: rotate(-7deg);
        }

        .pickaxe {
          position: absolute;
          top: 75px;
          right: -35px;
          width: 110px;
          height: 110px;
          transform: rotate(-45deg);
          transform-origin: center;
        }

        .pickaxe-hit {
          animation: pickaxeHit 0.35s ease;
        }

        .pickaxe-handle {
          position: absolute;
          width: 10px;
          height: 105px;
          left: 50px;
          top: 5px;
          border-radius: 10px;
          background: linear-gradient(90deg, #70451e, #bd7d39, #70451e);
        }

        .pickaxe-head {
          position: absolute;
          left: 20px;
          top: 0;
          width: 80px;
          height: 15px;
          border-radius: 10px;
          background: linear-gradient(#cfcfcf, #555);
        }

        .impact {
          position: absolute;
          right: 27%;
          top: 42%;
          width: 100px;
          height: 100px;
          z-index: 20;
          pointer-events: none;
        }

        .impact span {
          position: absolute;
          color: #f6d35f;
          font-size: 25px;
          animation: spark 0.35s ease-out forwards;
        }

        .impact span:nth-child(1) {
          left: 45px;
          top: 45px;
        }

        .impact span:nth-child(2) {
          left: 15px;
          top: 25px;
        }

        .impact span:nth-child(3) {
          left: 70px;
          top: 25px;
        }

        .impact span:nth-child(4) {
          left: 20px;
          top: 70px;
        }

        .impact span:nth-child(5) {
          left: 75px;
          top: 65px;
        }

        .rock-progress {
          position: absolute;
          left: 15%;
          bottom: 8%;
          width: 70%;
          z-index: 30;
          text-align: center;
        }

        .progress-title {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          color: #d5d5d5;
          margin-bottom: 7px;
        }

        .progress-bar {
          height: 9px;
          width: 100%;
          background: #202020;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #383838;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d09b18, #ffe27b);
          transition: width 0.25s ease;
        }

        .progress-number {
          margin-top: 5px;
          font-size: 10px;
          color: #888;
        }

        .tap-hint {
          position: absolute;
          top: 92px;
          left: 50%;
          transform: translateX(-50%);
          padding: 7px 14px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.55);
          color: #f2c84b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
          z-index: 40;
        }

        .stats {
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: #0b0b0b;
          border-top: 1px solid #242424;
          border-bottom: 1px solid #242424;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-icon {
          color: #f0c23e;
          font-size: 20px;
        }

        .stat small {
          display: block;
          color: #777;
          font-size: 8px;
          font-weight: 900;
        }

        .stat strong {
          display: block;
          font-size: 14px;
          margin-top: 2px;
        }

        .bottom-menu {
          min-height: 70px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          background: #080808;
          border-top: 1px solid #292929;
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
        }

        .bottom-menu button span {
          font-size: 19px;
        }

        .bottom-menu button small {
          font-size: 7px;
          font-weight: 900;
        }

        .bottom-menu button:first-child {
          color: #f3c33e;
        }

        @keyframes minerHit {
          0% {
            transform: translateX(0);
          }

          35% {
            transform: translateX(15px) rotate(2deg);
          }

          100% {
            transform: translateX(0);
          }
        }

        @keyframes pickaxe
