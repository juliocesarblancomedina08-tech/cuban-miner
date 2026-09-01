"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="fixed inset-0 bg-black overflow-hidden">
      <div className="relative w-full h-[100dvh]">

        {/* =========================================
            PANTALLA DE INICIO
        ========================================= */}

        <img
          src="/images/start-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* =========================================
            BOTÓN INVISIBLE START MINING
        ========================================= */}

        <button
          type="button"
          aria-label="Start Mining"
          onClick={() => router.push("/game")}
          className="
            absolute
            left-[20%]
            top-[77%]
            w-[60%]
            h-[14%]
            bg-transparent
            border-0
            outline-none
            cursor-pointer
            active:scale-95
            transition-transform
          "
        />

      </div>
    </main>
  );
}
