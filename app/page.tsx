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

  const startMining = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/game");
    }, 250);
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <div className="relative mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden">

        <img
          src="/images/game-screen.png"
          alt="CUBAN-MINER"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-contain"
        />

        <button
          type="button"
          onClick={startMining}
          disabled={loading}
          aria-label="Start Mining"
          className="
            absolute
            left-[18%]
            top-[68%]
            h-[13%]
            w-[64%]
            rounded-full
            bg-transparent
            border-0
            outline-none
            active:scale-95
            transition-transform
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
