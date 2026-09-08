"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [minerals, setMinerals] = useState(0);
  const [mining, setMining] = useState(false);

  function mine() {
    if (energy <= 0) return;

    setMining(true);
    setEnergy((value) => Math.max(0, value - 1));
    setMinerals((value) => value + 1);
    setCoins((value) => value + 1);

    setTimeout(() => {
      setMining(false);
    }, 350);
  }

  return (
    <main className="min-h-[100dvh] w-full overflow-hidden bg-black text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col">

        {/* PARTE SUPERIOR */}

        <header className="border-b border-yellow-500/10 bg-black/80 px-4 pb-3 pt-4">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <span className="text-2xl">👷</span>

              <div className="text-left">
                <div className="text-xs font-bold text-white/50">
                  MINERO
                </div>

                <div className="font-black text-yellow-400">
                  NIVEL 1
                </div>
              </div>
            </button>

            <div className="text-right">
              <div className="text-xs font-bold text-white/40">
                MINER COINS
              </div>

              <div className="font-black text-yellow-400">
                🪙 {coins.toLocaleString()}
              </div>
            </div>

          </div>

          {/* ENERGÍA */}

          <div className="mt-4">

            <div className="mb-1 flex justify-between text-xs font-bold">
              <span className="text-white/50">
                ⚡ ENERGÍA
              </span>

              <span className="text-yellow-400">
                {energy}/100
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${energy}%` }}
              />
            </div>

          </div>

        </header>

        {/* ZONA DE LA MINA */}

        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5">

          {/* LUZ DE LA MINA */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

          {/* NOMBRE DE LA MINA */}

          <div className="relative z-10 mb-5 text-center">

            <div className="text-xs font-black tracking-[0.35em] text-yellow-500/60">
              MINA
            </div>

            <h1 className="mt-1 text-3xl font-black">
              ⛏️ PRIMERA MINA
            </h1>

            <p className="mt-1 text-sm text-white/40">
              Extrae minerales y consigue Miner Coins
            </p>

          </div>

          {/* MINA */}

          <button
            type="button"
            onClick={mine}
            disabled={energy <= 0}
            className={`relative z-10 flex h-72 w-full max-w-[380px] flex-col items-center justify-center rounded-[40px] border border-yellow-500/20 bg-gradient-to-b from-yellow-500/10 via-black to-black shadow-[inset_0_0_60px_rgba(234,179,8,0.08)] transition-all duration-200 ${
              mining
                ? "scale-95 shadow-[0_0_50px_rgba(234,179,8,0.35)]"
                : "active:scale-95"
            }`}
          >

            {/* MONTAÑA */}

            <div className="text-[100px] leading-none">
              🪨
            </div>

            {/* MINERO */}

            <div
              className={`mt-[-25px] text-7xl transition-transform duration-200 ${
                mining ? "-rotate-12 translate-x-3" : ""
              }`}
            >
              👷
            </div>

            {/* PICO */}

            <div
              className={`absolute right-[22%] top-[42%] text-5xl transition-transform duration-200 ${
                mining ? "-rotate-45 scale-110" : "rotate-12"
              }`}
            >
              ⛏️
            </div>

            {/* CHISPAS */}

            {mining && (
              <>
                <span className="absolute left-[30%] top-[42%] animate-ping text-2xl">
                  ✨
                </span>

                <span className="absolute right-[30%] top-[48%] animate-ping text-xl">
                  ✦
                </span>

                <span className="absolute left-[42%] top-[35%] animate-ping text-lg">
                  ✨
                </span>
              </>
            )}

          </button>

          {/* MINERALES */}

          <div className="relative z-10 mt-6 flex w-full max-w-[380px] items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">

            <div>
              <div className="text-xs font-bold text-white/40">
                MINERALES
              </div>

              <div className="mt-1 text-2xl font-black">
                💎 {minerals}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-white/40">
                PRODUCCIÓN
              </div>

              <div className="mt-1 font-black text-yellow-400">
                +1 🪙 / golpe
              </div>
            </div>

          </div>

          {/* INDICACIÓN */}

          <div className="relative z-10 mt-4 text-center text-xs font-bold text-white/30">
            {energy > 0
              ? "👆 TOCA LA MINA PARA EXTRAER"
              : "⚡ SIN ENERGÍA"}
          </div>

        </section>

        {/* MENÚ INFERIOR */}

        <nav className="border-t border-yellow-500/10 bg-black/95 px-3 pb-4 pt-3">

          <div className="grid grid-cols-3 gap-2">

            <button
              type="button"
              onClick={() => router.push("/game")}
              className="rounded-xl bg-yellow-500/15 py-3 text-center"
            >
              <div className="text-xl">⛏️</div>
              <div className="mt-1 text-[10px] font-black text-yellow-400">
                MINAS
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="rounded-xl bg-white/5 py-3 text-center"
            >
              <div className="text-xl">🛒</div>
              <div className="mt-1 text-[10px] font-black text-white/50">
                TIENDA
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/friends")}
              className="rounded-xl bg-white/5 py-3 text-center"
            >
              <div className="text-xl">👥</div>
              <div className="mt-1 text-[10px] font-black text-white/50">
                REFERIDOS
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/bank")}
              className="rounded-xl bg-white/5 py-3 text-center"
            >
              <div className="text-xl">🏦</div>
              <div className="mt-1 text-[10px] font-black text-white/50">
                BANCO
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/missions")}
              className="rounded-xl bg-white/5 py-3 text-center"
            >
              <div className="text-xl">🎯</div>
              <div className="mt-1 text-[10px] font-black text-white/50">
                MISIONES
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="rounded-xl bg-white/5 py-3 text-center"
            >
              <div className="text-xl">👤</div>
              <div className="mt-1 text-[10px] font-black text-white/50">
                PERFIL
              </div>
            </button>

          </div>

        </nav>

      </div>
    </main>
  );
              }
