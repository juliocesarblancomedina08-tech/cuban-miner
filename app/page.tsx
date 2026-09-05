"use client";

import { useEffect, useState } from "react";

type Screen = "home" | "register" | "tutorial";

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");
  const [tutorialStep, setTutorialStep] = useState(0);

  // ==========================================
  // TELEGRAM MINI APP
  // ==========================================

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();

      // Oculta elementos innecesarios del navegador
      tg.setHeaderColor("#080808");
      tg.setBackgroundColor("#080808");
    }
  }, []);

  // ==========================================
  // START MINING
  // ==========================================

  const startMining = () => {
    setScreen("register");
  };

  // ==========================================
  // REGISTRAR JUGADOR
  // ==========================================

  const registerPlayer = () => {
    const name = playerName.trim();

    if (!name) {
      return;
    }

    setTutorialStep(0);
    setScreen("tutorial");
  };

  // ==========================================
  // TUTORIAL
  // ==========================================

  const nextTutorial = () => {
    if (tutorialStep < 2) {
      setTutorialStep((value) => value + 1);
    } else {
      // Cuando terminemos el tutorial,
      // enviaremos al jugador al juego.
      window.location.href = "/game";
    }
  };

  // ==========================================
  // PANTALLA PRINCIPAL
  // ==========================================

  if (screen === "home") {
    return (
      <main className="fixed inset-0 overflow-hidden bg-black select-none">

        <div className="relative h-[100dvh] w-full overflow-hidden">

          {/* FONDO */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3a2508_0%,#120d05_45%,#000_100%)]" />

          {/* LUZ CENTRAL */}

          <div className="absolute left-1/2 top-[38%] h-[45vh] w-[100vw] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[90px]" />

          {/* LOGO */}

          <div className="absolute left-0 right-0 top-[13%] text-center">

            <div className="text-6xl drop-shadow-[0_0_25px_rgba(255,190,40,0.35)]">
              🇨🇺
            </div>

            <h1 className="mt-3 text-[38px] font-black tracking-tight text-white">
              CUBAN-MINER
            </h1>

            <div className="mt-1 text-4xl">
              ⛏️
            </div>

            <p className="mt-4 text-xs font-bold tracking-[0.35em] text-yellow-400/80">
              MINE • BUILD • GROW
            </p>

          </div>

          {/* MINERO */}

          <div className="absolute bottom-[27%] left-0 right-0 flex justify-center">

            <div className="relative">

              {/* BRILLO */}

              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-3xl" />

              {/* PERSONAJE */}

              <div className="relative text-[105px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                👷
              </div>

              <div className="mt-[-15px] text-center text-4xl">
                ⛏️
              </div>

            </div>

          </div>

          {/* START MINING */}

          <div className="absolute bottom-[8%] left-0 right-0 flex justify-center px-8">

            <button
              type="button"
              onClick={startMining}
              className="
                relative
                w-full
                max-w-[360px]
                overflow-hidden
                rounded-2xl
                border
                border-yellow-300/60
                bg-gradient-to-b
                from-yellow-300
                via-yellow-500
                to-yellow-700
                py-5
                text-xl
                font-black
                tracking-wide
                text-black
                shadow-[0_8px_35px_rgba(255,190,40,0.3)]
                transition
                active:scale-[0.97]
              "
            >

              <span className="relative z-10">
                ⛏️ START MINING
              </span>

            </button>

          </div>

        </div>

      </main>
    );
  }

  // ==========================================
  // REGISTRO
  // ==========================================

  if (screen === "register") {
    return (
      <main className="fixed inset-0 overflow-hidden bg-black text-white">

        <div className="flex h-[100dvh] items-center justify-center px-6">

          <div className="w-full max-w-[390px]">

            {/* MINERO */}

            <div className="mb-5 text-center text-7xl">
              👷
            </div>

            <div className="rounded-3xl border border-yellow-500/20 bg-[#17120a] p-6 shadow-2xl">

              <div className="text-center">

                <div className="mb-2 text-3xl">
                  🇨🇺
                </div>

                <h2 className="text-2xl font-black">
                  BIENVENIDO, MINERO
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  Antes de entrar a la mina necesitamos
                  crear tu nombre de minero.
                </p>

              </div>

              <div className="mt-7">

                <label className="mb-2 block text-sm font-bold text-yellow-400">
                  NOMBRE DEL MINERO
                </label>

                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      registerPlayer();
                    }
                  }}
                  maxLength={20}
                  placeholder="Ejemplo: JulioMiner"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/50
                    px-4
                    py-4
                    text-white
                    outline-none
                    placeholder:text-white/30
                    focus:border-yellow-500/60
                  "
                />

              </div>

              <button
                type="button"
                onClick={registerPlayer}
                disabled={!playerName.trim()}
                className="
                  mt-5
                  w-full
                  rounded-2xl
                  bg-yellow-500
                  py-4
                  font-black
                  text-black
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  active:scale-[0.98]
                "
              >
                CONTINUAR ⛏️
              </button>

            </div>

          </div>

        </div>

      </main>
    );
  }

  // ==========================================
  // TUTORIAL
  // ==========================================

  const tutorial = [
    {
      character: "👷",
      title: "¡Hola, minero!",
      text:
        "Bienvenido a CUBAN-MINER 🇨🇺⛏️. Aquí construirás tu propia operación minera y aprenderás a convertir tu trabajo en Miner Coins.",
    },
    {
      character: "👷",
      title: "COMIENZA A MINAR",
      text:
        "Al principio tendrás una mina básica. Puedes tocar para trabajar manualmente y conseguir tus primeros recursos.",
    },
    {
      character: "👷",
      title: "MEJORA TU MINA",
      text:
        "Después podrás conseguir picos, energía y mejoras para aumentar la producción de tus mineros.",
    },
  ];

  const currentTutorial = tutorial[tutorialStep];

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">

      <div className="flex h-[100dvh] flex-col">

        {/* PARTE SUPERIOR */}

        <div className="flex flex-1 flex-col items-center justify-center px-6">

          {/* MINERO */}

          <div className="mb-8 animate-pulse text-[105px] drop-shadow-[0_10px_30px_rgba(255,190,40,0.2)]">
            {currentTutorial.character}
          </div>

          {/* DIÁLOGO */}

          <div className="relative w-full max-w-[390px]">

            <div className="absolute -top-3 left-8 h-6 w-6 rotate-45 border-l border-t border-yellow-500/20 bg-[#17120a]" />

            <div className="relative rounded-3xl border border-yellow-500/20 bg-[#17120a] p-6 shadow-2xl">

              <div className="mb-3 text-xs font-black tracking-[0.25em] text-yellow-400">
                {currentTutorial.title}
              </div>

              <p className="text-base leading-7 text-white/85">
                {currentTutorial.text}
              </p>

            </div>

          </div>

          {/* INDICADORES */}

          <div className="mt-7 flex gap-2">

            {tutorial.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === tutorialStep
                    ? "w-7 bg-yellow-400"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}

          </div>

        </div>

        {/* BOTÓN */}

        <div className="px-6 pb-8">

          <button
            type="button"
            onClick={nextTutorial}
            className="
              w-full
              rounded-2xl
              bg-yellow-500
              py-5
              font-black
              text-black
              shadow-[0_8px_30px_rgba(255,190,40,0.2)]
              active:scale-[0.98]
            "
          >
            {tutorialStep < 2
              ? "CONTINUAR →"
              : "ENTRAR A LA MINA ⛏️"}
          </button>

        </div>

      </div>

    </main>
  );
                  }
