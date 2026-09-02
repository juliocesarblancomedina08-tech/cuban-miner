"use client";

import { useState } from "react";

type Tab =
  | "mine"
  | "shop"
  | "rewards"
  | "profile"
  | "friends"
  | "deposit";

export default function GamePage() {
  const [tab, setTab] = useState<Tab>("mine");

  // ==========================================
  // SALDO
  // ==========================================

  const [balance, setBalance] = useState(0);

  // ==========================================
  // MONEDAS DEL JUEGO
  // ==========================================

  const [coins, setCoins] = useState(0);

  // ==========================================
  // ENERGÍA
  // ==========================================

  const [energy, setEnergy] = useState(100);

  // ==========================================
  // MINAR
  // ==========================================

  const mine = () => {
    if (energy <= 0) return;

    setCoins((value) => value + 1);

    setEnergy((value) => Math.max(0, value - 1));
  };

  // ==========================================
  // INGRESAR
  // ==========================================

  const openDeposit = () => {
    setTab("deposit");
  };

  // ==========================================
  // VOLVER A MINAR
  // ==========================================

  const backToMine = () => {
    setTab("mine");
  };

  return (
    <main className="game-container">

      {/* ======================================
          PANTALLA PRINCIPAL
      ====================================== */}

      <div className="game-screen">

        {/* ====================================
            IMAGEN DE FONDO
        ==================================== */}

        <img
          src="/images/game-screen.png"
          alt="CUBAN-MINER"
          className="game-background"
          draggable={false}
        />

        {/* ====================================
            SALDO
        ==================================== */}

        <div className="balance-display">
          🪙 {balance.toFixed(2)}
        </div>

        {/* ====================================
            BOTÓN INVISIBLE DEL +
        ==================================== */}

        <button
          type="button"
          aria-label="Ingresar dinero"
          onClick={openDeposit}
          className="deposit-button"
        />

        {/* ====================================
            MONEDAS
        ==================================== */}

        <div className="coins-display">
          💎 {coins.toLocaleString()}
        </div>

        {/* ====================================
            ENERGÍA
        ==================================== */}

        <div className="energy-display">
          ⚡ {energy}
        </div>

        {/* ====================================
            ZONA DE MINERÍA
        ==================================== */}

        {tab === "mine" && (
          <>
            <button
              type="button"
              aria-label="Minar"
              onClick={mine}
              disabled={energy <= 0}
              className="mine-button"
            />

            {/* BARRA DE ENERGÍA */}

            <div className="energy-bar-container">

              <div className="energy-bar-background">

                <div
                  className="energy-bar-fill"
                  style={{
                    width: `${energy}%`,
                  }}
                />

              </div>

            </div>
          </>
        )}

        {/* ====================================
            DEPÓSITO
        ==================================== */}

        {tab === "deposit" && (
          <div className="modal-overlay">

            <div className="modal-box">

              <div className="modal-icon">
                🪙
              </div>

              <h2>
                INGRESAR
              </h2>

              <p>
                Añade fondos a tu cuenta.
              </p>

              <div className="deposit-grid">

                <button
                  type="button"
                  onClick={() =>
                    setBalance((value) => value + 1)
                  }
                >
                  +1 USDT
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setBalance((value) => value + 5)
                  }
                >
                  +5 USDT
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setBalance((value) => value + 10)
                  }
                >
                  +10 USDT
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setBalance((value) => value + 20)
                  }
                >
                  +20 USDT
                </button>

              </div>

              <button
                type="button"
                className="modal-back-button"
                onClick={backToMine}
              >
                VOLVER
              </button>

            </div>

          </div>
        )}

        {/* ====================================
            TIENDA
        ==================================== */}

        {tab === "shop" && (
          <div className="section-overlay">

            <div className="section-content">

              <div className="section-icon">
                🛒
              </div>

              <h2>
                TIENDA
              </h2>

              <p>
                Próximamente
              </p>

              <button
                type="button"
                onClick={backToMine}
              >
                VOLVER
              </button>

            </div>

          </div>
        )}

        {/* ====================================
            PREMIOS
        ==================================== */}

        {tab === "rewards" && (
          <div className="section-overlay">

            <div className="section-content">

              <div className="section-icon">
                🏆
              </div>

              <h2>
                PREMIOS
              </h2>

              <p>
                Próximamente
              </p>

              <button
                type="button"
                onClick={backToMine}
              >
                VOLVER
              </button>

            </div>

          </div>
        )}

        {/* ====================================
            PERFIL
        ==================================== */}

        {tab === "profile" && (
          <div className="section-overlay">

            <div className="section-content">

              <div className="section-icon">
                👤
              </div>

              <h2>
                PERFIL
              </h2>

              <p>
                Tu cuenta
              </p>

              <button
                type="button"
                onClick={backToMine}
              >
                VOLVER
              </button>

            </div>

          </div>
        )}

        {/* ====================================
            AMIGOS
        ==================================== */}

        {tab === "friends" && (
          <div className="section-overlay">

            <div className="section-content">

              <div className="section-icon">
                👥
              </div>

              <h2>
                AMIGOS
              </h2>

              <p>
                Invita amigos y gana recompensas.
              </p>

              <button
                type="button"
                onClick={backToMine}
              >
                VOLVER
              </button>

            </div>

          </div>
        )}

        {/* ====================================
            BARRA INFERIOR
        ==================================== */}

        <button
          type="button"
          aria-label="Tienda"
          className="bottom-button bottom-shop"
          onClick={() => setTab("shop")}
        />

        <button
          type="button"
          aria-label="Premios"
          className="bottom-button bottom-rewards"
          onClick={() => setTab("rewards")}
        />

        <button
          type="button"
          aria-label="Minar"
          className="bottom-button bottom-mine"
          onClick={() => setTab("mine")}
        />

        <button
          type="button"
          aria-label="Perfil"
          className="bottom-button bottom-profile"
          onClick={() => setTab("profile")}
        />

        <button
          type="button"
          aria-label="Amigos"
          className="bottom-button bottom-friends"
          onClick={() => setTab("friends")}
        />

      </div>

    </main>
  );
                  }
