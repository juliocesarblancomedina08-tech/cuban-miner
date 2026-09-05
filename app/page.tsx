"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function startMining() {
    if (loading) return;

    setLoading(true);

    router.push("/game");
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <div className="relative mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden">

        <img
          src="/images/game-screen.png"
          alt="CUBAN-MINER"
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-contain
            select-none
            pointer-events-none
          "
        />

        <button
          type="button"
          aria-label="START MINING"
          onClick={startMining}
          disabled={loading}
          className="
            absolute
            left-[18%]
            top-[68%]
            h-[13%]
            w-[64%]
            rounded-full
            border-0
            bg-transparent
            outline-none
            active:scale-95
          "
        >
          <span className="sr-only">
            START MINING
          </span>
        </button>

      </div>
    </main>
  );
}
