"use client";

export default function Home() {
  return (
    <main
      className="
      h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-b
      from-stone-900
      via-black
      to-stone-800
      text-white
      "
    >
      <h1
        className="
        text-5xl
        font-bold
        text-yellow-400
        mb-6
        "
      >
        ⛏️ CUBAN MINER
      </h1>

      <div
        className="
        text-9xl
        animate-bounce
        "
      >
        👷
      </div>

      <p className="mt-4 text-xl">
        Welcome Miner
      </p>

      <button
        className="
        mt-10
        bg-yellow-400
        text-black
        font-bold
        px-8
        py-4
        rounded-xl
        shadow-lg
        hover:scale-105
        transition
        "
      >
        START MINING
      </button>
    </main>
  );
}
