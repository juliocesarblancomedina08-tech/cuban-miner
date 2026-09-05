"use client";

import Link from "next/link";

const missions = [
  {
    id: 1,
    title: "⛏️ Primer minero",
    description: "Realiza tu primera acción de minería.",
    reward: 10,
  },
  {
    id: 2,
    title: "⛏️ Minero activo",
    description: "Mina 100 veces.",
    reward: 50,
  },
  {
    id: 3,
    title: "👥 Reclutador",
    description: "Invita a un nuevo jugador.",
    reward: 100,
  },
  {
    id: 4,
    title: "📺 Anuncio",
    description: "Mira un anuncio disponible.",
    reward: 25,
  },
];

export default function MissionsPage() {
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
          🎯 MISIONES
        </h1>

        <div className="mt-6 space-y-3">

          {missions.map((mission) => (

            <div
              key={mission.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="font-black">
                    {mission.title}
                  </h2>

                  <p className="mt-1 text-xs text-white/50">
                    {mission.description}
                  </p>

                </div>

                <div className="whitespace-nowrap text-sm font-black text-yellow-400">
                  +{mission.reward} MC
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
              }
