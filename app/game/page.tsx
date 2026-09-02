"use client";

import { useEffect, useState } from "react";

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
  const [mining, setMining] = useState(false);
  const [floatingCoin, setFloatingCoin] = useState(false);

  /*
   * RECARGA AUTOMÁTICA DE ENERGÍA
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnergy((value) => Math.min(100, value + 1));
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  /*
   * MINAR
   */
  const mine = () => {
    if (energy <= 0 || mining) return;

    setMining(true);
    setFloatingCoin(true);

    setCoins((value) => value + 1);
    setEnergy((value) => Math.max(0, value - 1));

    window.setTimeout(() => {
      setMining(false);
    }, 350);

    window.setTimeout(() => {
      setFloatingCoin(false);
    }, 700);
  };

  /*
   * DEPÓSITO
   */
  const openDeposit = () => {
    setTab("deposit");
  };

  /*
   * VOLVER A LA MINA
   */
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
        bg-[#090b0f]
        text-white
        select-none
      "
    >

      {/* =====================================================
          FONDO 3D DE LA MINA
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        <img
          src="/images/game-screen.png"
          alt="CUBAN MINER"
          draggable={false}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
            pointer-events-none
            select-none
            scale-[1.02]
          "
        />

        {/* OSCURECIMIENTO */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/40
            via-transparent
            to-black/70
            pointer-events-none
          "
        />

        {/* BRILLO AMBIENTAL */}

        <div
          className="
            absolute
            left-1/2
            top-[48%]
            -translate-x-1/2
            w-[70vw]
            h-[35vw]
            rounded-full
            bg-yellow-500/10
            blur-[70px]
            pointer-events-none
          "
        />

      </div>


      {/* =====================================================
          INTERFAZ
      ===================================================== */}

      <div className="absolute inset-0">


        {/* =================================================
            BARRA SUPERIOR
        ================================================= */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            z-20
            px-3
            pt-3
          "
        >

          <div className="flex items-center justify-between gap-2">


            {/* =================================================
                MINER COINS
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-black/65
                px-3
                py-2
                shadow-lg
                backdrop-blur-md
              "
            >

              <span className="text-xl">
                💎
              </span>

              <div>

                <p className="text-[9px] font-bold text-white/50">
                  MINER COINS
                </p>

                <p className="text-sm font-black">
                  {coins.toLocaleString()}
                </p>

              </div>

            </div>


            {/* =================================================
                BALANCE
            ================================================= */}

            <button
              type="button"
              onClick={openDeposit}
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-yellow-400/30
                bg-black/65
                px-3
                py-2
                shadow-lg
                backdrop-blur-md
                active:scale-95
                transition-transform
              "
            >

              <span className="text-xl">
                🪙
              </span>

              <div className="text-left">

                <p className="text-[9px] font-bold text-yellow-300/70">
                  BALANCE
                </p>

                <p className="text-sm font-black text-yellow-300">
                  {balance.toFixed(2)}
                </p>

              </div>

              <span className="text-lg text-yellow-300">
                +
              </span>

            </button>

          </div>


          {/* =================================================
              ENERGY
          ================================================= */}

          <div
            className="
              mt-2
              ml-auto
              w-[145px]
              rounded-xl
              border
              border-white/10
              bg-black/55
              p-2
              backdrop-blur-md
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-[10px] font-black">
                ⚡ ENERGY
              </span>

              <span className="text-[10px] font-black text-yellow-300">
                {energy}/100
              </span>

            </div>


            <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/70">

              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-yellow-600
                  via-yellow-400
                  to-yellow-200
                  transition-all
                  duration-300
                "
                style={{
                  width: `${energy}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            ZONA DE MINERÍA
        ===================================================== */}

        {tab === "mine" && (
          <>


            {/* =================================================
                TÍTULO
            ================================================= */}

            <div
              className="
                absolute
                top-[20%]
                left-1/2
                -translate-x-1/2
                z-10
                text-center
                pointer-events-none
              "
            >

              <p
                className="
                  text-[10px]
                  font-black
                  tracking-[4px]
                  text-yellow-300
                  drop-shadow-lg
                "
              >
                CUBAN MINER
              </p>

              <h1
                className="
                  mt-1
                  font-black
                  text-2xl
                  tracking-wide
                  drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]
                "
              >
                MINA NIVEL 1
              </h1>

              <p className="mt-1 text-xs font-bold text-white/65">
                Mina de piedra
              </p>

            </div>


            {/* =================================================
                PERSONAJE 3D
            ================================================= */}

            <div
              className="
                absolute
                left-1/2
                top-[27%]
                z-10
                h-[48%]
                w-[72%]
                -translate-x-1/2
                pointer-events-none
              "
            >

              {/* MINERO */}

              <img
                src="/images/miner.png"
                alt="Minero"
                draggable={false}
                className={`
                  absolute
                  bottom-0
                  left-1/2
                  h-full
                  w-auto
                  -translate-x-1/2
                  object-contain
                  drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]
                  transition-all
                  duration-200

                  ${
                    mining
                      ? "scale-[0.96] rotate-[-2deg]"
                      : "scale-100 animate-[minerIdle_2.5s_ease-in-out_infinite]"
                  }
                `}
              />


              {/* =================================================
                  BRILLO DEBAJO DEL MINERO
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-5
                  w-40
                  -translate-x-1/2
                  rounded-full
                  bg-yellow-400/20
                  blur-xl
                "
              />

            </div>


            {/* =================================================
                START MINING
            ================================================= */}

            <button
              type="button"
              onClick={mine}
              disabled={energy <= 0 || mining}
              className={`
                absolute
                left-1/2
                bottom-[17%]
                z-30
                -translate-x-1/2
                rounded-2xl
                border
                border-yellow-200/40
                bg-gradient-to-b
                from-yellow-300
                via-yellow-400
                to-yellow-600
                px-8
                py-4
                text-black
                shadow-[0_0_25px_rgba(250,204,21,0.35)]
                transition-all
                duration-150

                ${
                  mining
                    ? "scale-90 brightness-125"
                    : "scale-100 active:scale-90"
                }

                ${
                  energy <= 0
                    ? "cursor-not-allowed opacity-40 grayscale"
                    : ""
                }
              `}
            >

              <span className="flex items-center gap-2">

                <span className="text-2xl">
                  ⛏️
                </span>

                <span className="text-base font-black tracking-wide">
                  {mining
                    ? "MINING..."
                    : "START MINING"}
                </span>

              </span>

            </button>


            {/* =================================================
                EFECTO AL MINAR
            ================================================= */}

            {mining && (
              <div
                className="
                  absolute
                  left-1/2
                  top-[47%]
                  z-40
                  -translate-x-1/2
                  -translate-y-1/2
                  pointer-events-none
                "
              >

                <div className="animate-ping text-5xl">
                  ✨
                </div>

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    whitespace-nowrap
                    text-2xl
                    font-black
                    text-yellow-300
                    drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]
                    animate-bounce
                  "
                >
                  +1 💎
                </div>

              </div>
            )}


            {/* =================================================
                INFORMACIÓN DE PRODUCCIÓN
            ================================================= */}

            <div
              className="
                absolute
                left-1/2
                bottom-[17%]
                -translate-x-1/2
                z-20
                rounded-2xl
                border
                border-white/10
                bg-black/60
                px-5
                py-3
                text-center
                backdrop-blur-md
              "
            >

              <p className="text-[9px] font-bold text-white/50">
                PRODUCCIÓN
              </p>

              <p className="text-lg font-black text-yellow-300">
                +1 MC

                <span className="text-xs text-white/50">
                  {" "}
                  / golpe
                </span>
              </p>

            </div>

          </>
        )}


        {/* =====================================================
            DEPÓSITO
        ===================================================== */}

        {tab === "deposit" && (
          <div
            className="
              absolute
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/80
              p-4
              backdrop-blur-sm
            "
          >

            <div
              className="
                w-full
                max-w-[390px]
                rounded-[28px]
                border
                border-yellow-400/30
                bg-[#15120c]
                p-6
                shadow-2xl
              "
            >

              <div className="text-center">

                <div className="text-5xl">
                  🪙
                </div>

                <h2 className="mt-2 text-2xl font-black">
                  BALANCE
                </h2>

                <p className="mt-1 text-sm text-white/50">
                  Saldo actual
                </p>

                <p className="mt-3 text-3xl font-black text-yellow-300">
                  {balance.toFixed(2)}
                </p>

              </div>


              {/* CANTIDADES */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                {[1, 5, 10, 20].map((amount) => (

                  <button
                    key={amount}
                    type="button"
                    onClick={() =>
                      setBalance(
                        (value) => value + amount
                      )
                    }
                    className="
                      rounded-2xl
                      border
                      border-yellow-300/30
                      bg-yellow-400
                      py-4
                      font-black
                      text-black
                      shadow-lg
                      active:scale-95
                      transition-transform
                    "
                  >
                    +{amount}
                  </button>

                ))}

              </div>


              {/* VOLVER */}

              <button
                type="button"
                onClick={backToMine}
                className="
                  mt-4
                  w-full
                  rounded-2xl
                  bg-white/10
                  py-4
                  font-black
                  text-white
                  active:scale-95
                "
              >
                VOLVER A LA MINA
              </button>

            </div>

          </div>
        )}


        {/* =====================================================
            SHOP
        ===================================================== */}

        {tab === "shop" && (
          <Modal
            icon="🛒"
            title="TIENDA"
            description="Compra picos, mejoras y objetos para tu mina."
            onClose={backToMine}
          />
        )}


        {/* =====================================================
            REWARDS
        ===================================================== */}

        {tab === "rewards" && (
          <Modal
            icon="🏆"
            title="PREMIOS"
            description="Completa misiones y consigue recompensas."
            onClose={backToMine}
          />
        )}


        {/* =====================================================
            PROFILE
        ===================================================== */}

        {tab === "profile" && (
          <Modal
            icon="👤"
            title="PERFIL"
            description="Aquí aparecerán tus estadísticas."
            onClose={backToMine}
          />
        )}


        {/* =====================================================
            FRIENDS
        ===================================================== */}

        {tab === "friends" && (
          <Modal
            icon="👥"
            title="AMIGOS"
            description="Invita amigos y consigue recompensas."
            onClose={backToMine}
          />
        )}


        {/* =====================================================
            BARRA INFERIOR
        ===================================================== */}

        <nav
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-40
            flex
            h-[78px]
            border-t
            border-white/10
            bg-black/80
            backdrop-blur-xl
          "
        >

          <NavButton
            icon="🛒"
            label="Tienda"
            active={tab === "shop"}
            onClick={() => setTab("shop")}
          />

          <NavButton
            icon="🏆"
            label="Premios"
            active={tab === "rewards"}
            onClick={() => setTab("rewards")}
          />

          <NavButton
            icon="⛏️"
            label="Mina"
            active={tab === "mine"}
            onClick={() => setTab("mine")}
            main
          />

          <NavButton
            icon="👤"
            label="Perfil"
            active={tab === "profile"}
            onClick={() => setTab("profile")}
          />

          <NavButton
            icon="👥"
            label="Amigos"
            active={tab === "friends"}
            onClick={() => setTab("friends")}
          />

        </nav>

      </div>

    </main>
  );
}


/* ==========================================================
   BOTÓN DE NAVEGACIÓN
========================================================== */

function NavButton({
  icon,
  label,
  active,
  onClick,
  main = false,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  main?: boolean;
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        flex
        flex-1
        flex-col
        items-center
        justify-center
        gap-1
        transition-all
        duration-200
        active:scale-90

        ${
          active
            ? "text-yellow-300"
            : "text-white/45"
        }
      `}
    >

      {/* INDICADOR */}

      {active && (
        <span
          className="
            absolute
            top-0
            h-1
            w-10
            rounded-full
            bg-yellow-400
            shadow-[0_0_12px_rgba(250,204,2
