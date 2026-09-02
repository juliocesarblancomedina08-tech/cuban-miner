"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // =========================================
    // BLOQUEAR ZOOM Y MOVIMIENTO
    // =========================================

    const preventGesture = (event: Event) => {
      event.preventDefault();
    };

    const preventWheelZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    const preventTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    document.addEventListener(
      "gesturestart",
      preventGesture
    );

    document.addEventListener(
      "gesturechange",
      preventGesture
    );

    document.addEventListener(
      "gestureend",
      preventGesture
    );

    document.addEventListener(
      "wheel",
      preventWheelZoom,
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      preventTouchMove,
      { passive: false }
    );

    // =========================================
    // TELEGRAM MINI APP
    // =========================================

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
      document.removeEventListener(
        "gesturestart",
        preventGesture
      );

      document.removeEventListener(
        "gesturechange",
        preventGesture
      );

      document.removeEventListener(
        "gestureend",
        preventGesture
      );

      document.removeEventListener(
        "wheel",
        preventWheelZoom
      );

      document.removeEventListener(
        "touchmove",
        preventTouchMove
      );
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

      {/* =========================================
          MARCO DE LA IMAGEN
          
          Mantiene exactamente la proporción
          de nuestra imagen vertical.
      ========================================= */}

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-full
        "
        style={{
          aspectRatio: "832 / 1792",
        }}
      >

        {/* =========================================
            IMAGEN COMPLETA
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
            object-contain
            pointer-events-none
            select-none
          "
        />

        {/* =========================================
            BOTÓN INVISIBLE
            START MINING
        ========================================= */}

        <button
          type="button"
          aria-label="Start Mining"
          onClick={startMining}
          className="
            absolute
            z-20
            border-0
            bg-transparent
            outline-none
            p-0
            m-0
            cursor-pointer
          "
          style={{
            left: "9%",
            top: "57.5%",
            width: "82%",
            height: "12%",
            touchAction: "manipulation",
          }}
        />

      </div>

    </main>
  );
}
