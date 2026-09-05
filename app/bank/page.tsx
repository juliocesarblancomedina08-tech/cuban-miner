"use client";

import Link from "next/link";

export default function BankPage() {
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
          🏦 BANCO
        </h1>

        <div className="mt-6 rounded-3xl border border-yellow-500/20 bg-[#17120a] p-6">

          <div className="text-sm text-white/50">
            Saldo
          </div>

          <div className="mt-2 text-4xl font-black text-yellow-400">
            0.00 USDT
          </div>

          <div className="mt-6 rounded-2xl bg-black p-4">

            <div className="text-sm text-white/50">
              Conversión actual
            </div>

            <div className="mt-2 font-black">
              1 USDT = 500 Miner Coins
            </div>

          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
          >
            💰 DEPOSITAR
          </button>

          <button
            type="button"
            className="mt-3 w-full rounded-2xl bg-white/10 py-4 font-black"
          >
            💸 RETIRAR
          </button>

        </div>

        <p className="mt-4 text-center text-xs text-white/30">
          Los pagos reales se conectarán después de
          completar y probar la economía del juego.
        </p>

      </div>

    </main>
  );
}
