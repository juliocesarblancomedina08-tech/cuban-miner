"use client";

import { useState } from "react";

type Tab =
  | "mine"
  | "shop"
  | "rewards"
  | "profile"
  | "friends";

export default function GamePage() {
  const [tab, setTab] = useState<Tab>("mine");

  const [coins, setCoins] = useState(0);

  const [energy, setEnergy] = useState(100);

  const mine = () => {
    if (energy <= 0) return;

    setCoins((value) => value + 1);

    setEnergy((value) => Math.max(0, value - 1));
  };

  return (
    <main className="fixed inset-0 bg-black overflow-hidden">

      <div className="relative w-full h-[100dvh]">

        {/* =========================================
            IMAGEN PRINCIPAL DEL JUEGO
        ========================================= */}

        <img
          src="/images/game-screen.png"
          alt="🇨🇺 CUBAN-MINER"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* =========================================
            DATOS DEL JUGADOR
        ========================================= */}

        <div className="absolute top-[7%] left-[8%] text-white font-black text-lg pointer-events-none">
          🪙 {coins.toLocaleString()}
        </div>

        <div className="absolute top-[7%] right-[8%] text-white font-black text-lg pointer-events-none">
          ⚡ {energy}
        </div>

        {/* =========================================
            ÁREA CENTRAL DE MINERÍA
        ========================================= */}

        {tab === "mine" && (
          <button
            type="button"
            aria-label="Minar"
            onClick={mine}
            disabled={energy <= 0}
            className="
              absolute
              left-[22%]
              top-[31%]
              w-[56%]
              h-[38%]
              bg-transparent
              border-0
              outline-none
              active:scale-95
              transition-transform
              disabled:pointer-events-none
            "
          />
        )}

        {/* =========================================
            CONTADOR DE ENERGÍA
        ========================================= */}

        {tab === "mine" && (
          <div className="absolute left-[12%] right-[12%] bottom-[14%] pointer-events-none">

            <div className="h-2 rounded-full bg-black/60 overflow-hidden">

              <div
                className="h-full bg-yellow-400 transition-all duration-200"
                style={{
                  width: `${energy}%`,
                }}
              />

            </div>

          </div>
        )}

        {/* =========================================
            PANEL TIENDA
        ========================================= */}

        {tab === "shop" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <div className="rounded-3xl bg-black/75 border border-yellow-400/30 px-8 py-7 text-center text-white">

              <div className="text-5xl mb-3">
                🛒
              </div>

              <h2 className="text-2xl font-black">
                TIENDA
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Próximamente
              </p>

            </div>

          </div>
        )}

        {/* =========================================
            PANEL PREMIOS
        ========================================= */}

        {tab === "rewards" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <div className="rounded-3xl bg-black/75 border border-yellow-400/30 px-8 py-7 text-center text-white">

              <div className="text-5xl mb-3">
                🏆
              </div>

              <h2 className="text-2xl font-black">
                PREMIOS
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Próximamente
              </p>

            </div>

          </div>
        )}

        {/* =========================================
            PANEL PERFIL
        ========================================= */}

        {tab === "profile" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <div className="rounded-3xl bg-black/75 border border-yellow-400/30 px-8 py-7 text-center text-white">

              <div className="text-5xl mb-3">
                👤
              </div>

              <h2 className="text-2xl font-black">
                PERFIL
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Tu cuenta de jugador
              </p>

            </div>

          </div>
        )}

        {/* =========================================
            PANEL AMIGOS / REFERIDOS
        ========================================= */}

        {tab === "friends" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <div className="rounded-3xl bg-black/75 border border-yellow-400/30 px-8 py-7 text-center text-white">

              <div className="text-5xl mb-3">
                👥
              </div>

              <h2 className="text-2xl font-black">
                AMIGOS
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Invita amigos y consigue recompensas.
              </p>

            </div>

          </div>
        )}

        {/* =========================================
            MENÚ INFERIOR — TIENDA
        ========================================= */}

        <button
          type="button"
          aria-label="Tienda"
          onClick={() => setTab("shop")}
          className="
            absolute
            left-0
            bottom-0
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
          "
        />

        {/* =========================================
            MENÚ INFERIOR — PREMIOS
        ========================================= */}

        <button
          type="button"
          aria-label="Premios"
          onClick={() => setTab("rewards")}
          className="
            absolute
            left-[20%]
            bottom-0
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
          "
        />

        {/* =========================================
            MENÚ INFERIOR — MINAR
        ========================================= */}

        <button
          type="button"
          aria-label="Minar"
          onClick={() => setTab("mine")}
          className="
            absolute
            left-[40%]
            bottom-0
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
          "
        />

        {/* =========================================
            MENÚ INFERIOR — PERFIL
        ========================================= */}

        <button
          type="button"
          aria-label="Perfil"
          onClick={() => setTab("profile")}
          className="
            absolute
            left-[60%]
            bottom-0
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
          "
        />

        {/* =========================================
            MENÚ INFERIOR — AMIGOS
        ========================================= */}

        <button
          type="button"
          aria-label="Amigos"
          onClick={() => setTab("friends")}
          className="
            absolute
            left-[80%]
            bottom-0
            w-[20%]
            h-[12%]
            bg-transparent
            border-0
          "
        />

      </div>

    </main>
  );
}
