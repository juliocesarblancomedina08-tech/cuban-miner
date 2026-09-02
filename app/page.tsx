"use client";

import { useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <main className="h-screen bg-black flex items-center justify-center text-white text-4xl">
        GAME STARTED
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-stone-900 via-black to-stone-800 relative">

      {/* partículas */}
      <div className="absolute w-3 h-3 bg-yellow-400 rounded-full top-20 left-10 animate-ping" />
      <div className="absolute w-2 h-2 bg-yellow-300 rounded-full top-40 right-20 animate-pulse" />
      <div className="absolute w-4 h-4 bg-yellow-500 rounded-full bottom-40 left-32 animate-bounce" />

      {/* titulo */}
      <h1
        className="
        absolute
        top-16
        w-full
        text-center
        text-5xl
        font-bold
        text-yellow-400
        drop-shadow-lg
        "
      >
        CUBAN MINER
      </h1>

      {/* mina */}
      <div
        className="
        absolute
        bottom-0
        w-full
        h-56
        bg-stone-900
        border-t-8
        border-stone-700
        "
      />

      {/* minero */}
      <div
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        "
      >
        {/* casco */}
        <div
          className="
          w-24
          h-10
          bg-yellow-500
          rounded-t-full
          mx-auto
          "
        />

        {/* cabeza */}
        <div
          className="
          w-20
          h-20
          bg-orange-200
          rounded-full
          mx-auto
          "
        />

        {/* cuerpo */}
        <div
          className="
          w-24
          h-32
          bg-blue-600
          rounded-lg
          mx-auto
          mt-1
          "
        />

        {/* brazo sosteniendo pico */}
        <div
          className="
          absolute
          left-[-30px]
          top-[95px]
          w-16
          h-4
          bg-orange-200
          rotate-[-30deg]
          "
        />

        {/* pico */}
        <div
          className="
          absolute
          left-[-70px]
          top-[55px]
          text-5xl
          "
        >
          ⛏
        </div>

        {/* brazo saludando */}
        <div
          className="
          absolute
          right-[-20px]
          top-[90px]
          w-16
          h-4
          bg-orange-200
          origin-left
          animate-[wave_1s_ease-in-out_infinite]
          "
        />
      </div>

      {/* boton */}
      <div className="absolute bottom-24 w-full flex justify-center">
        <button
          onClick={() => setStarted(true)}
          className="
          bg-yellow-400
          text-black
          text-2xl
          font-bold
          px-12
          py-5
          rounded-2xl
          shadow-yellow-500
          shadow-lg
          hover:scale-110
          transition
          "
        >
          START MINING
        </button>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: rotate(20deg);
          }

          50% {
            transform: rotate(-30deg);
          }

          100% {
            transform: rotate(20deg);
          }
        }
      `}</style>
    </main>
  );
          }
