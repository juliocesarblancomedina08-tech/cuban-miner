"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, []);

  function startMining() {
    if (loading) return;

    setLoading(true);

    const registered =
      localStorage.getItem(
        "cuban_miner_registered"
      );

    const tutorial =
      localStorage.getItem(
        "cuban_miner_tutorial"
      );

    if (registered !== "true") {
      router.push("/register");
      return;
    }

    if (tutorial !== "true") {
      router.push("/tutorial");
      return;
    }

    router.push("/game");
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">

      <div className="relative mx-auto flex h-[100dvh] w-full max-w-[480px] items-center justify-center overflow-hidden">

        <img
          src="/images/game-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
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
            z-20
            h-[13%]
            w-[64%]
            rounded-full
            bg-transparent
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
