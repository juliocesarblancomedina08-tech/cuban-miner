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
      "
      style={{
        touchAction: "none",
      }}
    >

      {/* ========================================
          CONTENEDOR PRINCIPAL
          
          La imagen y TODOS los botones están
          dentro del mismo espacio.
      ======================================== */}

      <div
        className="
          absolute
          inset-0
          w-full
          h-full
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >

        {/* ======================================
            IMAGEN DEL JUEGO

            IMPORTANTE:
            object-contain = imagen COMPLETA
            object-cover   = imagen RECORTADA

            Aquí usamos contain.
        ====================================== */}

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
            select-none
            pointer-events-none
          "
          style={{
            objectPosition: "center center",
          }}
        />

        {/* ======================================
            SALDO DEL JUGADOR
        ====================================== */}

        <div
          className="
            absolute
            z-10
            top-[6%]
            right-[15%]
            text-white
            font-black
            text-xl
            pointer-events-none
            select-none
            drop-shadow-lg
          "
        >
          🪙 {balance.toFixed(2)}
        </div>

        {/* ======================================
            BOTÓN INVISIBLE DEL +

            Esta zona abre INGRESAR.
        ====================================== */}

        <button
          type="button"
          aria-label="Ingresar dinero"
          onClick={openDeposit}
          className="
            absolute
            z-30
            top-[5%]
            right-[3%]
            w-[10%]
            h-[8%]
            bg-transparent
            border-0
            p-0
            m-0
            rounded-full
            active:scale-90
            transition-transform
          "
          style={{
            touchAction: "manipulation",
          }}
        />

        {/* ======================================
            MONEDAS DEL JUEGO
        ====================================== */}

        <div
          className="
            absolute
            z-10
            top-[12%]
            left-[8%]
            text-white
            font-black
            text-lg
            pointer-events-none
            select-none
            drop-shadow-lg
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
            z-10
            top-[12%]
            right-[8%]
            text-white
            font-black
            text-lg
            pointer-events-none
            select-none
            drop-shadow-lg
          "
        >
          ⚡ {energy}
        </div>

        {/* ======================================
            ZONA DE MINERÍA
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
                z-20
                left-[22%]
                top-[30%]
                w-[56%]
                h-[38%]
                bg-transparent
                border-0
                p-0
                m-0
                active:scale-95
                transition-transform
              "
              style={{
                touchAction: "manipulation",
              }}
            />

            {/* ==================================
                BARRA DE ENERGÍA
            ================================== */}

            <div
              className="
                absolute
                z-10
                left-[12%]
                right-[12%]
                bottom-[14%]
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
            VENTANA DE INGRESAR
        ====================================== */}

        {tab === "deposit" && (
          <div
            className="
              absolute
              z-50
              inset-0
              bg-black/80
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                w-[86%]
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

              {/* ==================================
                  CANTIDADES DE PRUEBA

                  Esto es solamente para probar
                  visualmente el sistema.
              ================================== */}

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
                  "
                >
                  +20
                </button>

              </div>

              {/* ==================================
                  VOLVER
              ================================== */}

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
              z-40
              inset-0
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
              z-40
              inset-0
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
              z-40
              inset-0
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
              z-40
              inset-0
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
            BOTÓN INVISIBLE — TIENDA
        ====================================== */}

        <button
          type="button"
          aria-label="Tienda"
          onClick={() => setTab("shop")}
          className="
            absolute
            z-30
            bottom-0
            left-0
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
            p-0
            m-0
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
            z-30
            bottom-0
            left-[20%]
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
            p-0
            m-0
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
            z-30
            bottom-0
            left-[40%]
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
            p-0
            m-0
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
            z-30
            bottom-0
            left-[60%]
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
            p-0
            m-0
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
            z-30
            bottom-0
            left-[80%]
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
            p-0
            m-0
          "
        />

      </div>

    </main>
  );
            }
