"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Evitar gestos de zoom del navegador
    const preventGesture = (event: Event) => {
      event.preventDefault();
    };

    // Evitar zoom con Ctrl + rueda
    const preventWheelZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    document.addEventListener("wheel", preventWheelZoom, {
      passive: false,
    });

    // Intentar expandir la Mini App de Telegram
    const telegram = (
      window as typeof window & {
        Telegram?: {
          WebApp?: {
            expand?: () => void;
            disableVerticalSwipes?: () => void;
          };
        };
      }
    ).Telegram?.WebApp;

    if (telegram) {
      telegram.expand?.();
      telegram.disableVerticalSwipes?.();
    }

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);

      document.removeEventListener("wheel", preventWheelZoom);
    };
  }, []);

  const startMining = () => {
    router.push("/game");
  };

  return (
    <main
      className="
        fixed
        inset-0
        w-screen
        h-[100dvh]
        overflow-hidden
        bg-black
        overscroll-none
        select-none
      "
      style={{
        touchAction: "none",
      }}
    >
      <div
        className="
          relative
          w-full
          h-full
          overflow-hidden
        "
        style={{
          touchAction: "none",
        }}
      >

        {/* =====================================
            IMAGEN DE INICIO
        ===================================== */}

        <img
          src="/images/start-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          draggable={false}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            pointer-events-none
            select-none
          "
        />

        {/* =====================================
            BOTÓN INVISIBLE START MINING
        ===================================== */}

        <button
          type="button"
          aria-label="Start Mining"
          onClick={startMining}
          className="
            absolute
            z-10
            bg-transparent
            border-0
            outline-none
            p-0
            m-0
            cursor-pointer
            active:scale-[0.97]
          "
          style={{
            left: "17%",
            top: "57%",
            width: "66%",
            height: "18%",
            touchAction: "manipulation",
          }}
        />

      </div>
    </main>
  );
}
