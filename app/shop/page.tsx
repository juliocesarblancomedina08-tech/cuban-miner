"use client";

import Link from "next/link";

import {
  PICKAXES,
} from "../../lib/game";

export default function ShopPage() {
  return (
    <main className="min-h-[100dvh] bg-black p-4 text-white">

      <div className="mx-auto max-w-[480px]">

        <Link
          href="/game"
          className="text-sm text-yellow-400"
        >
          ← Volver
        </Link>

        <h1 className="mt-5 text-3xl font-black">
          🛒 TIENDA
        </h1>

        <p className="mt-1 text-sm text-white/50">
          Picos y herramientas de minería
        </p>

        <div className="mt-5 space-y-4">

          {PICKAXES.map((pickaxe) => (

            <div
              key={pickaxe.id}
              className="rounded-3xl border border-white/10 bg-[#17120a] p-5"
            >

              <div className="flex items-center gap-4">

                <div className="text-5xl">
                  {pickaxe.icon}
                </div>

                <div className="flex-1">

                  <h2 className="font-black">
                    {pickaxe.name}
                  </h2>

                  <p className="mt-1 text-xs text-white/50">
                    Durabilidad:{" "}
                    {pickaxe.durabilityDays} días
                  </p>

                  <p className="text-xs text-white/50">
                    Producción:{" "}
                    {pickaxe.production} MC
                  </p>

                </div>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <div className="font-black text-yellow-400">

                  {pickaxe.price === 0
                    ? "GRATIS"
                    : `${pickaxe.price.toLocaleString()} MC`}

                </div>

                <button
                  type="button"
                  className="rounded-xl bg-yellow-500 px-5 py-3 font-black text-black"
                >
                  COMPRAR
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}
