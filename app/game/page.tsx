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

  const [balance, setBalance] = useState(0);
  const [coins, setCoins] = useState(0);
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
  // VOLVER
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
      "
    >
      {/* ======================================
          CONTENEDOR PANTALLA COMPLETA
      ====================================== */}

      <div
        className="
          relative
          w-screen
          h-[100dvh]
          overflow-hidden
        "
      >

        {/* ======================================
            IMAGEN COMPLETA
        ====================================== */}

        <img
          src="/images/game-screen.png"
          alt="CUBAN-MINER"
          draggable={false}
          className="
            absolute
            inset-0
            block
            w-full
            h-full
            object-fill
            pointer-events-none
            select-none
          "
        />

        {/* ======================================
            SALDO
        ====================================== */}

        <div
          className="
            absolute
            top-[5%]
            right-[15%]
            text-white
            font-black
            text-xl
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            pointer-events-none
            z-20
          "
        >
          🪙 {balance.toFixed(2)}
        </div>

        {/* ======================================
            BOTÓN INVISIBLE +
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
            z-30
            active:scale-90
          "
        />

        {/* ======================================
            MONEDAS
        ====================================== */}

        <div
          className="
            absolute
            top-[12%]
            left-[8%]
            text-white
            font-black
            text-lg
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            pointer-events-none
            z-20
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
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            pointer-events-none
            z-20
          "
        >
          ⚡ {energy}
        </div>

        {/* ======================================
            BOTÓN INVISIBLE DE MINERÍA
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
                left-[20%]
                top-[28%]
                w-[60%]
                h-[40%]
                bg-transparent
                border-0
                outline-none
                z-30
                active:scale-95
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
                z-20
                pointer-events-none
              "
            >
              <div className="h-2 rounded-full bg-black/60 overflow-hidden">
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
            INGRESAR
        ====================================== */}

        {tab === "deposit" && (
          <div
            className="
              absolute
              inset-0
              z-50
              bg-black/80
              flex
              items-center
              justify-center
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
                  "
                >
                  +1 USDT
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
                  "
                >
                  +5 USDT
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
                  "
                >
                  +10 USDT
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
                  "
                >
                  +20 USDT
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
              z-40
              bg-black/75
              flex
              items-center
              justify-center
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

              <button
                type="button"
                onClick={backToMine}
                className="
                  mt-6
                  px-8
                  py-3
                  rounded-2xl
                  bg-yellow-500
                  text-black
                  font-black
                "
              >
                VOLVER
              </button>
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
              z-40
              bg-black/75
              flex
              items-center
              justify-center
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

              <button
                type="button"
                onClick={backToMine}
                className="
                  mt-6
                  px-8
                  py-3
                  rounded-2xl
                  bg-yellow-500
                  text-black
                  font-black
                "
              >
                VOLVER
              </button>
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
              z-40
              bg-black/75
              flex
              items-center
              justify-center
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

              <button
                type="button"
                onClick={backToMine}
                className="
                  mt-6
                  px-8
                  py-3
                  rounded-2xl
                  bg-yellow-500
                  text-black
                  font-black
                "
              >
                VOLVER
              </button>
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
              z-40
              bg-black/75
              flex
              items-center
              justify-center
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

              <button
                type="button"
                onClick={backToMine}
                className="
                  mt-6
                  px-8
                  py-3
                  rounded-2xl
                  bg-yellow-500
                  text-black
                  font-black
                "
              >
                VOLVER
              </button>
            </div>
          </div>
        )}

        {/* ======================================
            BARRA INFERIOR — TIENDA
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
            z-30
          "
        />

        {/* ======================================
            PREMIOS
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
            z-30
          "
        />

        {/* ======================================
            MINAR
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
            z-30
          "
        />

        {/* ======================================
            PERFIL
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
            z-30
          "
        />

        {/* ======================================
            AMIGOS
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
            z-30
          "
        />

      </div>
    </main>
  );
            }
