"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex justify-center overflow-hidden">
      <div className="relative w-full max-w-[430px] h-[100dvh]">

        <img
          src="/images/start-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* START MINING */}
        <button
          onClick={() => router.push("/game")}
          aria-label="Start Mining"
          className="absolute left-[15%] right-[15%] top-[58%] h-[15%] bg-transparent rounded-3xl active:scale-95"
        />

      </div>
    </main>
  );
}
