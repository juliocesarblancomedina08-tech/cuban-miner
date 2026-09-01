"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">

        {/* LOGO / NOMBRE */}
        <div className="mb-16">
          <div className="text-5xl mb-5">🇨🇺</div>

          <h1 className="text-4xl font-black tracking-tight">
            CUBAN-MINER
          </h1>

          <div className="text-4xl mt-2">
            ⛏️
          </div>
        </div>

        {/* BOTÓN START */}
        <button
          onClick={() => router.push("/game")}
          className="w-full rounded-2xl bg-green-500 px-8 py-5 text-xl font-black tracking-wide text-black shadow-lg active:scale-95 transition-transform"
        >
          START MINING ⛏️
        </button>

      </div>
    </main>
  );
}
