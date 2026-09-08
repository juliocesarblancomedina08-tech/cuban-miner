"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function startMining() {
    if (loading) return;

    setLoading(true);

    router.push("/game");
  }

  return (
    <main className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black text-white">

      {/* BRILLO CENTRAL */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      {/* TÍTULO */}

      <div className="pointer-events-none absolute left-0 right-0 top-[15%] text-center">

        <div className="text-4xl font-black tracking-tight">
          🇨🇺 CUBAN-MINER
        </div>

        <div className="mt-2 text-sm font-bold tracking-[0.35em] text-yellow-500/70">
          MINING GAME
        </div>

      </div>

      {/* CHISPAS */}

      <Spark className="left-[18%] top-[31%]" delay="0s" />
      <Spark className="left-[27%] top-[43%]" delay="0.5s" />
      <Spark className="left-[72%] top-[34%]" delay="0.8s" />
      <Spark className="left-[80%] top-[46%]" delay="0.2s" />
      <Spark className="left-[22%] top-[58%]" delay="1s" />
      <Spark className="left-[77%] top-[60%]" delay="0.4s" />
      <Spark className="left-[35%] top-[28%]" delay="0.7s" />
      <Spark className="left-[65%] top-[27%]" delay="0.3s" />

      {/* BOTÓN */}

      <button
        type="button"
        onClick={startMining}
        disabled={loading}
        className="start-mining-button relative z-20 flex h-56 w-56 items-center justify-center rounded-full border-4 border-yellow-300/80 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 shadow-[0_0_35px_rgba(234,179,8,0.8),0_0_90px_rgba(234,179,8,0.3)] active:scale-95"
      >

        {/* ANILLO */}

        <div className="pointer-events-none absolute inset-3 rounded-full border border-yellow-100/50" />

        {/* BRILLO */}

        <div className="pointer-events-none absolute inset-0 rounded-full bg-yellow-100/20 blur-md" />

        {/* TEXTO */}

        <div className="relative z-10 text-center">

          <div className="text-3xl font-black tracking-wide text-black">
            {loading ? "LOADING..." : "START"}
          </div>

          <div className="mt-1 text-2xl font-black tracking-[0.12em] text-black">
            {loading ? "" : "MINING"}
          </div>

          <div className="mt-2 text-3xl">
            ⛏️
          </div>

        </div>

      </button>

      {/* TEXTO INFERIOR */}

      <div className="pointer-events-none absolute bottom-[12%] text-center">

        <div className="text-xs font-bold tracking-[0.3em] text-white/30">
          ENTER THE MINE
        </div>

        <div className="mt-2 text-xs text-white/20">
          Toca START MINING para comenzar
        </div>

      </div>

    </main>
  );
}

function Spark({
  className,
  delay,
}: {
  className: string;
  delay: string;
}) {
  return (
    <span
      className={`gold-spark absolute z-10 ${className}`}
      style={{
        animationDelay: delay,
      }}
    >
      ✦
    </span>
  );
    }
