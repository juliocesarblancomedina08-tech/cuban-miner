"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    icon: "👷",
    title: "¡BIENVENIDO!",
    text: "Soy tu guía. Te enseñaré cómo convertirte en un gran minero.",
  },
  {
    icon: "👷⛏️",
    title: "MINA",
    text: "Toca el área de minería para que tu trabajador comience a extraer minerales.",
  },
  {
    icon: "⚡",
    title: "ENERGÍA",
    text: "Cada acción consume energía. Tendrás que administrarla correctamente.",
  },
  {
    icon: "🪙",
    title: "MINER COINS",
    text: "Las Miner Coins serán la moneda utilizada para progresar dentro del juego.",
  },
  {
    icon: "🛒",
    title: "TIENDA",
    text: "En la tienda podrás conseguir nuevos picos y herramientas.",
  },
  {
    icon: "🚀",
    title: "¡LISTO!",
    text: "Ya conoces lo básico. Ahora entra en la mina y comienza.",
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
      step ===
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
    <main className="fixed inset-0 bg-black text-white">

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col">

        <div className="flex justify-center gap-2 px-5 pt-7">

          {STEPS.map(
            (_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index <= step
                    ? "bg-yellow-500"
                    : "bg-white/10"
                }`}
              />
            )
          )}

        </div>

        <div className="flex flex-1 items-center px-5">

          <div
            key={step}
            className="w-full text-center"
          >

            <div className="miner-talk text-8xl">
              {current.icon}
            </div>

            <div className="mt-10 rounded-[28px] border border-yellow-500/20 bg-[#17120a] p-6 text-left">

              <div className="text-xs font-black text-yellow-400">
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

        <div className="px-5 pb-7">

          <button
            type="button"
            onClick={next}
            className="w-full rounded-2xl bg-yellow-500 py-5 font-black text-black active:scale-95"
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
