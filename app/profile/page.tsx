"use client";

import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-[100dvh] bg-black p-4 text-white">

      <div className="mx-auto max-w-[480px]">

        <Link
          href="/game"
          className="text-sm text-yellow-400"
        >
          ← Volver
        </Link>

        <div className="mt-5 text-center">

          <div className="text-7xl">
            👷
          </div>

          <h1 className="mt-3 text-3xl font-black">
            PERFIL
          </h1>

        </div>

        <div className="mt-6 space-y-3">

          <Info
            label="ID de jugador"
            value="CM-000001"
          />

          <Info
            label="Usuario"
            value="@minero"
          />

          <Info
            label="Nivel"
            value="1"
          />

          <Info
            label="Miner Coins"
            value="0"
          />

          <Info
            label="Minerales"
            value="0"
          />

          <Info
            label="Ingresos"
            value="0.00 USDT"
          />

          <Info
            label="Retiros"
            value="0.00 USDT"
          />

          <Info
            label="Referidos"
            value="0"
          />

        </div>

      </div>

    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between rounded-2xl border border-white/10 bg-white/5 p-4">

      <span className="text-white/50">
        {label}
      </span>

      <span className="font-black">
        {value}
      </span>

    </div>
  );
}
