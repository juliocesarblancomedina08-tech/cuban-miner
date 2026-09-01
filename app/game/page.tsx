"use client";

import { useState } from "react";

export default function GamePage() {
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(100);

  const mine = () => {
    if (energy <= 0) return;

    setCoins((current) => current + 1);
    setEnergy((current) => current - 1);
  };

  return (
    <main className="min-h-screen bg-[#07110b] text-white flex flex-col">

      {/* ========================= */}
      {/* BARRA SUPERIOR */}
      {/* ========================= */}

      <header className="flex items-center justify-between px-4 py-4 border-b border-white/10 bg-black/30">

        <div>
          <p className="text-xs text-white/50">
            CUBAN-MINER
          </p>

          <h1 className="text-xl font-black">
            🇨🇺 CUBAN-MINER ⛏️
          </h1>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/50">
            NIVEL
          </p>

          <p className="font-black text-lg">
            1
          </p>
        </div>

      </header>


      {/* ========================= */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ========================= */}

      <section className="flex-1 px-4 py-6 pb-28">

        {/* SALDO */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 mb-5">

          <p className="text-sm text-white/50">
            🪙 MONEDAS
          </p>

          <div className="flex items-center justify-between mt-2">

            <p className="text-4xl font-black">
              {coins.toLocaleString()}
            </p>

            <span className="text-4xl">
              🪙
            </span>

          </div>

        </div>


        {/* MINERO */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 text-center">

          <p className="text-sm text-white/50 mb-4">
            MINA CUBANA
          </p>

          <div className="text-8xl mb-6">
            ⛏️
          </div>

          <h2 className="text-2xl font-black mb-2">
            ¡A MINAR!
          </h2>

          <p className="text-sm text-white/50 mb-6">
            Toca el botón para extraer monedas.
          </p>


          {/* BOTÓN MINAR */}

          <button
            onClick={mine}
            disabled={energy <= 0}
            className={`w-full rounded-2xl py-5 text-xl font-black transition-all active:scale-95 ${
              energy > 0
                ? "bg-green-500 text-black"
                : "bg-white/10 text-white/30"
            }`}
          >
            {energy > 0 ? "⛏️ MINAR +1" : "⚡ SIN ENERGÍA"}
          </button>

        </div>


        {/* ENERGÍA */}

        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">

          <div className="flex justify-between mb-3">

            <span className="font-bold">
              ⚡ Energía
            </span>

            <span className="text-white/60">
              {energy}/100
            </span>

          </div>

          <div className="h-3 rounded-full bg-black/50 overflow-hidden">

            <div
              className="h-full bg-green-500 transition-all"
              style={{
                width: `${energy}%`,
              }}
            />

          </div>

        </div>

      </section>


      {/* ========================= */}
      {/* MENÚ INFERIOR */}
      {/* ========================= */}

      <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 backdrop-blur-md">

        <div className="mx-auto max-w-md grid grid-cols-5">

          <button className="flex flex-col items-center py-3 text-green-400">
            <span className="text-xl">⛏️</span>
            <span className="text-[10px] mt-1 font-bold">
              MINAR
            </span>
          </button>

          <button className="flex flex-col items-center py-3 text-white/50">
            <span className="text-xl">🛒</span>
            <span className="text-[10px] mt-1">
              TIENDA
            </span>
          </button>

          <button className="flex flex-col items-center py-3 text-white/50">
            <span className="text-xl">🏆</span>
            <span className="text-[10px] mt-1">
              PREMIOS
            </span>
          </button>

          <button className="flex flex-col items-center py-3 text-white/50">
            <span className="text-xl">👤</span>
            <span className="text-[10px] mt-1">
              PERFIL
            </span>
          </button>

          <button className="flex flex-col items-center py-3 text-white/50">
            <span className="text-xl">👥</span>
            <span className="text-[10px] mt-1">
              AMIGOS
            </span>
          </button>

        </div>

      </nav>

    </main>
  );
      }
