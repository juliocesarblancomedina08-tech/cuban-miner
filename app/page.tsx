"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

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
        flex
        items-center
        justify-center
        touch-none
        select-none
      "
    >
      {/* =====================================================
          CONTENEDOR DE LA IMAGEN

          La imagen original es 686 x 1536.
          Mantenemos exactamente esa proporción.
      ===================================================== */}

      <div
        className="
          relative
          h-full
          aspect-[686/1536]
          max-w-full
          overflow-hidden
        "
      >

        {/* ===================================================
            IMAGEN DE INICIO
        =================================================== */}

        <img
          src="/images/start-screen.png"
          alt="CUBAN-MINER"
          draggable={false}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-contain
            select-none
            pointer-events-none
          "
        />

        {/* ===================================================
            BOTÓN INVISIBLE — START MINING

            Esta zona está colocada encima del botón
            que aparece dentro de la imagen.
        =================================================== */}

        <button
          type="button"
          aria-label="START MINING"
          onClick={startMining}
          className="
            absolute
            left-[8%]
            top-[89%]
            w-[84%]
            h-[9%]
            bg-transparent
            border-0
            outline-none
            p-0
            m-0
            cursor-pointer
            touch-manipulation
            active:scale-[0.98]
          "
        />

      </div>
    </main>
  );
}
