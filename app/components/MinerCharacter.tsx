"use client";

export default function MinerCharacter() {
  return (
    <div className="relative">

      {/* Casco */}
      <div
        className="
        w-28
        h-10
        bg-yellow-500
        rounded-t-full
        mx-auto
        shadow-lg
        "
      />

      {/* Cabeza */}
      <div
        className="
        w-24
        h-24
        bg-orange-200
        rounded-full
        mx-auto
        "
      />

      {/* Cuerpo */}
      <div
        className="
        w-28
        h-36
        bg-blue-600
        rounded-xl
        mx-auto
        "
      />

      {/* Brazo del pico */}
      <div
        className="
        absolute
        left-[-25px]
        top-[95px]
        w-20
        h-4
        bg-orange-200
        rotate-[-35deg]
        "
      />

      {/* Pico */}
      <div
        className="
        absolute
        left-[-75px]
        top-[45px]
        text-6xl
        animate-bounce
        "
      >
        ⛏
      </div>

      {/* Brazo saludando */}
      <div
        className="
        absolute
        right-[-10px]
        top-[95px]
        w-20
        h-4
        bg-orange-200
        origin-left
        animate-wave
        "
      />

      {/* Pierna izquierda */}
      <div
        className="
        w-4
        h-16
        bg-stone-700
        absolute
        left-10
        bottom-[-60px]
        "
      />

      {/* Pierna derecha */}
      <div
        className="
        w-4
        h-16
        bg-stone-700
        absolute
        right-10
        bottom-[-60px]
        "
      />
    </div>
  );
}
