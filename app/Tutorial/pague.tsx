"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    miner: "👷",
    title: "¡BIENVENIDO, MINERO!",
    text: "Yo seré tu guía. Vamos a aprender cómo funciona CUBAN-MINER.",
  },
  {
    miner: "👷⛏️",
    title: "COMIENZA A MINAR",
    text: "Toca MINAR para que tu minero extraiga minerales.",
  },
  {
    miner: "👷⚡",
    title: "CUIDA TU ENERGÍA",
    text: "Cada acción de minería consume energía. Más adelante podrás conseguir nuevas formas de aumentar tu producción.",
  },
  {
    miner: "👷🪙",
    title: "CONSIGUE MINER COINS",
    text: "Las Miner Coins serán la moneda principal de tu progreso dentro del juego.",
  },
  {
    miner: "👷🛒",
    title: "MEJORA TU PICO",
    text: "Visita la tienda para conseguir mejores picos y aumentar tu producción.",
  },
  {
    miner: "👷🏆",
    title: "¡ESTÁS LISTO!",
    text: "Ya conoces lo básico. Entra a la mina y comienza tu aventura.",
  },
];

export default function TutorialPage() {
  const router = useRouter();

  const [step, setStep] =
    useState(0);

  const current =
    STEPS[step];

  function next() {
    if (
      step >=
      STEPS.length - 1
    ) {
      localStorage.setItem(
        "cuban_miner_tutorial",
        "true"
      );

      router.push("/game");

      return;
    }

    setStep(
      (value) => value + 1
    );
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col">

        <div className="flex justify-center gap-2 px-5 pt-8">

          {STEPS.map(
            (_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all ${
                  index <= step
                    ? "bg-yellow-500"
                    : "bg-white/10"
                }`}
              />
            )
          )}

        </div>

        <div className="flex flex-1 items-center justify-center px-5">

          <div
            key={step}
            className="w-full text-center"
          >

            <div className="text-8xl">
              {current.miner}
            </div>

            <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-[#17120a] p-6 text-left shadow-2xl">

              <div className="text-xs font-black tracking-widest text-yellow-400">
                CUBAN-MINER
              </div>

              <h1 className="mt-3 text-2xl font-black">
                {current.title}
              </h1>

              <p className="mt-4 leading-7 text-white/60">
                {current.text}
              </p>

            </div>

          </div>

        </div>

        <div className="px-5 pb-8">

          <button
            type="button"
            onClick={next}
            className="w-full rounded-2xl bg-yellow-500 py-5 text-lg font-black text-black active:scale-95"
          >
            {step ===
            STEPS.length - 1
              ? "ENTRAR A LA MINA ⛏️"
              : "SIGUIENTE →"}
          </button>

        </div>

      </div>

    </main>
  );
}
