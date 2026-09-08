"use client";

import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  return (
    <main className="flex h-[100dvh] w-full items-center justify-center bg-black text-white">

      <div className="w-full max-w-[480px] px-6 text-center">

        <div className="text-7xl">
          ⛏️
        </div>

        <h1 className="mt-6 text-4xl font-black text-yellow-400">
          CUBAN-MINER
        </h1>

        <p className="mt-3 text-white/50">
          La mina está cargando...
        </p>

        <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

          <div className="text-5xl">
            👷
          </div>

          <div className="mt-4 font-black">
            MINERO NIVEL 1
          </div>

          <div className="mt-2 text-sm text-white/40">
            Preparando la primera mina
          </div>

        </div>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-8 rounded-2xl bg-yellow-500 px-8 py-4 font-black text-black"
        >
          ← VOLVER
        </button>

      </div>

    </main>
  );
}
