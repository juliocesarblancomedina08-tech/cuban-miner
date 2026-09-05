"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    miner: "👷",
    title: "¡BIENVENIDO, MINERO!",
    text: "Yo seré tu guía. Vamos a aprender rápidamente cómo funciona CUBAN-MINER.",
  },
  {
    miner: "👷⛏️",
    title: "EMPIEZA A MINAR",
    text: "Toca la zona de minería para que tu minero empiece a extraer minerales.",
  },
  {
    miner: "👷⚡",
    title: "CUIDA LA ENERGÍA",
    text: "Cada acción consume energía. Más adelante podrás utilizar diferentes sistemas para aumentar tu producción.",
  },
  {
    miner: "👷🪙",
    title: "CONSIGUE MINER COINS",
    text: "Los minerales y las recompensas del juego te permitirán conseguir Miner Coins.",
  },
  {
    miner: "👷⛏️",
    title: "MEJORA TU PICO",
    text: "En la tienda encontrarás diferentes picos. Los mejores permiten una producción mayor.",
  },
  {
    miner: "👷🏆",
    title: "¡TODO LISTO!",
    text: "Ahora ya conoces lo básico. Entra a la mina y comienza tu aventura.",
  },
];

export default function TutorialPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const current = STEPS[step];

  function next() {
    if (step >= STEPS.length - 1) {
      localStorage.setItem(
        "cuban_miner_tutorial",
        "true"
      );

      router.push("/game");

      return;
    }

    setStep((value) => value + 1);
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col">

        <div className="flex items-center justify-center px-5 pt-8">

          <div className="flex gap-2">

            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full ${
                  index <= step
                    ? "bg-yellow-500"
                    : "bg-white/10"
                }`}
              />
            ))}

          </div>

        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6">

          <div
            key={step}
            className="text-center animate-[fadeIn_.35s_ease-out]"
          >

            <div className="text-8xl">
              {current.miner}
            </div>

            <div className="mx-auto mt-8 max-w-[390px] rounded-3xl border border-yellow-500/20 bg-[#17120a] p-6 text-left shadow-2xl">

              <div className="mb-3 text-xs font-black tracking-widest text-yellow-400">
                MINERO
              </div>

              <h1 className="text-2xl font-black">
                {current.title}
              </h1>

              <p className="mt-4 leading-7 text-white/60">
                {current.text}
              </p>

            </div>

          </div>

        </div>

        <div className="px-6 pb-8">

          <button
            type="button"
            onClick={next}
            className="w-full rounded-2xl bg-yellow-500 py-5 text-lg font-black text-black active:scale-95"
          >
            {step === STEPS.length - 1
              ? "ENTRAR A LA MINA ⛏️"
              : "SIGUIENTE →"}
          </button>

        </div>

      </div>

    </main>
  );
                }
