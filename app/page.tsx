"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[430px] h-[100dvh]">

        {/* IMAGEN DE INICIO */}
        <img
          src="/images/start-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* BOTÓN INVISIBLE SOBRE START MINING */}
        <button
          onClick={() => router.push("/game")}
          aria-label="Start Mining"
          className="absolute left-[15%] right-[15%] top-[63%] h-[17%] rounded-3xl bg-transparent active:scale-95 transition-transform"
        />

      </div>
    </main>
  );
}
