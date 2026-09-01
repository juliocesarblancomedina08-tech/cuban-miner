"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Bloquear gestos de zoom
    const preventGesture = (event: Event) => {
      event.preventDefault();
    };

    // Bloquear zoom con Ctrl + rueda
    const preventWheelZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    // Bloquear desplazamiento táctil
    const preventTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    document.addEventListener("wheel", preventWheelZoom, {
      passive: false,
    });

    document.addEventListener("touchmove", preventTouchMove, {
      passive: false,
    });

    // Telegram Mini App
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
      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, []);

  // =========================================
  // START MINING
  // =========================================

  const startMining = () => {
    router.push("/game");
  };

  return (
    <main
      className="fixed inset-0 w-screen h-[100dvh] overflow-hidden bg-black"
      style={{
        touchAction: "none",
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          touchAction: "none",
        }}
      >
        {/* =========================================
            IMAGEN COMPLETA DE INICIO
        ========================================= */}

        <img
          src="/images/start-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          draggable={false}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-fill
            pointer-events-none
            select-none
          "
        />

        {/* =========================================
            BOTÓN INVISIBLE START MINING
        ========================================= */}

        <button
          type="button"
          aria-label="Start Mining"
          onClick={startMining}
          className="
            absolute
            z-20
            bg-transparent
            border-0
            outline-none
            p-0
            m-0
            cursor-pointer
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
