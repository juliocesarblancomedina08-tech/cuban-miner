"use client";

import Link from "next/link";

export default function FriendsPage() {
  const referralLink =
    "https://t.me/CUBAN_MINER_BOT?start=ref_CM000001";

  function copyLink() {
    navigator.clipboard?.writeText(
      referralLink
    );
  }

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
          👥 REFERIDOS
        </h1>

        <div className="mt-6 rounded-3xl border border-white/10 bg-[#17120a] p-6 text-center">

          <div className="text-7xl">
            👥
          </div>

          <h2 className="mt-4 text-2xl font-black">
            INVITA AMIGOS
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Invita nuevos mineros y consigue recompensas.
          </p>

          <div className="mt-6 rounded-2xl bg-black p-4 text-xs break-all text-white/60">
            {referralLink}
          </div>

          <button
            type="button"
            onClick={copyLink}
            className="mt-4 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
          >
            📋 COPIAR ENLACE
          </button>

        </div>

      </div>

    </main>
  );
}
