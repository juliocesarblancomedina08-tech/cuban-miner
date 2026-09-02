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
  // SALDO DEL JUGADOR
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
  // ABRIR INGRESO
  // ==========================================

  const openDeposit = () => {
    setTab("deposit");
  };

  // ==========================================
  // VOLVER A MINERÍA
  // ==========================================

  const backToMine = () => {
    setTab("mine");
  };

  return (
    <main
      className="
        fixed
        inset-0
        w-screen
        h-[100dvh]
        overflow-hidden
        bg-black
        select-none
        touch-none
      "
    >
      {/* ========================================
          CONTENEDOR PRINCIPAL
      ======================================== */}

      <div
        className="
          relative
          w-full
          h-full
          overflow-hidden
          bg-black
          flex
          items-center
          justify-center
        "
      >

        {/* ========================================
            IMAGEN COMPLETA DEL JUEGO

            object-contain evita que se recorte.
            La imagen siempre se mantiene completa.
        ======================================== */}

        <img
          src="/images/game-screen.png"
          alt="CUBAN-MINER"
          draggable={false}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-contain
            object-center
            select-none
            pointer-events-none
          "
        />

        {/* ========================================
            CAPA DE CONTROLES
        ======================================== */}

        <div
          className="
            absolute
            inset-0
            w-full
            h-full
          "
        >

          {/* ======================================
              SALDO DINÁMICO
          ====================================== */}

          <div
            className="
              absolute
              top-[6%]
              right-[15%]
              text-white
              font-black
              text-xl
              pointer-events-none
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
              whitespace-nowrap
            "
          >
            🪙 {balance.toFixed(2)}
          </div>

          {/* ======================================
              BOTÓN INVISIBLE DEL +
              ====================================== */}

          <button
            type="button"
            aria-label="Ingresar dinero"
            onClick={openDeposit}
            className="
              absolute
              top-[4%]
              right-[2%]
              w-[12%]
              h-[9%]
              bg-transparent
              border-0
              outline-none
              cursor-pointer
              active:scale-90
              transition-transform
            "
          />

          {/* ======================================
              MONEDAS DEL JUEGO
          ====================================== */}

          <div
            className="
              absolute
              top-[12%]
              left-[8%]
              text-white
              font-black
              text-lg
              pointer-events-none
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
              whitespace-nowrap
            "
          >
            💎 {coins.toLocaleString()}
          </div>

          {/* ======================================
              ENERGÍA
          ====================================== */}

          <div
            className="
              absolute
              top-[12%]
              right-[8%]
              text-white
              font-black
              text-lg
              pointer-events-none
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
              whitespace-nowrap
            "
          >
            ⚡ {energy}
          </div>

          {/* ======================================
              ZONA PRINCIPAL PARA MINAR
          ====================================== */}

          {tab === "mine" && (
            <>
              <button
                type="button"
                aria-label="Minar"
                onClick={mine}
                disabled={energy <= 0}
                className="
                  absolute
                  left-[22%]
                  top-[30%]
                  w-[56%]
                  h-[38%]
                  bg-transparent
                  border-0
                  outline-none
                  cursor-pointer
                  active:scale-95
                  transition-transform
                  disabled:cursor-default
                "
              />

              {/* ==================================
                  BARRA DE ENERGÍA
              ================================== */}

              <div
                className="
                  absolute
                  left-[12%]
                  right-[12%]
                  bottom-[14%]
                  pointer-events-none
                "
              >
                <div
                  className="
                    h-2
                    rounded-full
                    bg-black/60
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      bg-yellow-400
                      transition-all
                      duration-200
                    "
                    style={{
                      width: `${energy}%`,
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* ======================================
              INGRESAR DINERO
          ====================================== */}

          {tab === "deposit" && (
            <div
              className="
                absolute
                inset-0
                bg-black/80
                flex
                items-center
                justify-center
                p-4
              "
            >
              <div
                className="
                  w-[86%]
                  max-w-[380px]
                  rounded-3xl
                  bg-[#17120a]
                  border
                  border-yellow-500/40
                  p-6
                  text-white
                  shadow-2xl
                "
              >

                <div className="text-center">

                  <div className="text-5xl mb-3">
                    🪙
                  </div>

                  <h2 className="text-2xl font-black">
                    INGRESAR
                  </h2>

                  <p className="text-sm text-white/60 mt-2">
                    Añade fondos a tu cuenta.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <button
                    type="button"
                    onClick={() =>
                      setBalance((value) => value + 1)
                    }
                    className="
                      rounded-2xl
                      bg-yellow-500
                      text-black
                      py-4
                      font-black
                      active:scale-95
                    "
                  >
                    +1
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setBalance((value) => value + 5)
                    }
                    className="
                      rounded-2xl
                      bg-yellow-500
                      text-black
                      py-4
                      font-black
                      active:scale-95
                    "
                  >
                    +5
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setBalance((value) => value + 10)
                    }
                    className="
                      rounded-2xl
                      bg-yellow-500
                      text-black
                      py-4
                      font-black
                      active:scale-95
                    "
                  >
                    +10
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setBalance((value) => value + 20)
                    }
                    className="
                      rounded-2xl
                      bg-yellow-500
                      text-black
                      py-4
                      font-black
                      active:scale-95
                    "
                  >
                    +20
                  </button>

                </div>

                <button
                  type="button"
                  onClick={backToMine}
                  className="
                    w-full
                    mt-4
                    rounded-2xl
                    bg-white/10
                    py-4
                    font-bold
                    active:scale-95
                  "
                >
                  VOLVER
                </button>

              </div>
            </div>
          )}

          {/* ======================================
              TIENDA
          ====================================== */}

          {tab === "shop" && (
            <div
              className="
                absolute
                inset-0
                bg-black/75
                flex
                items-center
                justify-center
                pointer-events-none
              "
            >
              <div className="text-center text-white">

                <div className="text-6xl">
                  🛒
                </div>

                <h2 className="text-3xl font-black mt-3">
                  TIENDA
                </h2>

                <p className="text-white/60 mt-2">
                  Próximamente
                </p>

              </div>
            </div>
          )}

          {/* ======================================
              PREMIOS
          ====================================== */}

          {tab === "rewards" && (
            <div
              className="
                absolute
                inset-0
                bg-black/75
                flex
                items-center
                justify-center
                pointer-events-none
              "
            >
              <div className="text-center text-white">

                <div className="text-6xl">
                  🏆
                </div>

                <h2 className="text-3xl font-black mt-3">
                  PREMIOS
                </h2>

                <p className="text-white/60 mt-2">
                  Próximamente
                </p>

              </div>
            </div>
          )}

          {/* ======================================
              PERFIL
          ====================================== */}

          {tab === "profile" && (
            <div
              className="
                absolute
                inset-0
                bg-black/75
                flex
                items-center
                justify-center
                pointer-events-none
              "
            >
              <div className="text-center text-white">

                <div className="text-6xl">
                  👤
                </div>

                <h2 className="text-3xl font-black mt-3">
                  PERFIL
                </h2>

                <p className="text-white/60 mt-2">
                  Tu cuenta
                </p>

              </div>
            </div>
          )}

          {/* ======================================
              AMIGOS
          ====================================== */}

          {tab === "friends" && (
            <div
              className="
                absolute
                inset-0
                bg-black/75
                flex
                items-center
                justify-center
                pointer-events-none
              "
            >
              <div className="text-center text-white">

                <div className="text-6xl">
                  👥
                </div>

                <h2 className="text-3xl font-black mt-3">
                  AMIGOS
                </h2>

                <p className="text-white/60 mt-2">
                  Invita amigos y gana recompensas.
                </p>

              </div>
            </div>
          )}

          {/* ======================================
              BOTÓN INVISIBLE — TIENDA
          ====================================== */}

          <button
            type="button"
            aria-label="Tienda"
            onClick={() => setTab("shop")}
            className="
              absolute
              bottom-0
              left-0
              w-[20%]
              h-[12%]
              bg-transparent
              border-0
              outline-none
            "
          />

          {/* ======================================
              BOTÓN INVISIBLE — PREMIOS
          ====================================== */}

          <button
            type="button"
            aria-label="Premios"
            onClick={() => setTab("rewards")}
            className="
              absolute
              bottom-0
              left-[20%]
              w-[20%]
              h-[12%]
              bg-transparent
              border-0
              outline-none
            "
          />

          {/* ======================================
              BOTÓN INVISIBLE — MINAR
          ====================================== */}

          <button
            type="button"
            aria-label="Minar"
            onClick={() => setTab("mine")}
            className="
              absolute
              bottom-0
              left-[40%]
              w-[20%]
              h-[12%]
              bg-transparent
              border-0
              outline-none
            "
          />

          {/* ======================================
              BOTÓN INVISIBLE — PERFIL
          ====================================== */}

          <button
            type="button"
            aria-label="Perfil"
            onClick={() => setTab("profile")}
            className="
              absolute
              bottom-0
              left-[60%]
              w-[20%]
              h-[12%]
              bg-transparent
              border-0
              outline-none
            "
          />

          {/* ======================================
              BOTÓN INVISIBLE — AMIGOS
          ====================================== */}

          <button
            type="button"
            aria-label="Amigos"
            onClick={() => setTab("friends")}
            className="
              absolute
              bottom-0
              left-[80%]
              w-[20%]
              h-[12%]
              bg-transparent
              border-0
              outline-none
            "
          />

        </div>
      </div>
    </main>
  );
            }
