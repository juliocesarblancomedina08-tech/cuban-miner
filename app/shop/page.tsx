"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PickaxeId =
  | "wood"
  | "stone"
  | "iron"
  | "gold"
  | "emerald"
  | "diamond";

type Pickaxe = {
  id: PickaxeId;
  name: string;
  emoji: string;
  price: number;
  durability: number;
  power: number;
};

const PICKAXES: Record<PickaxeId, Pickaxe> = {
  wood: {
    id: "wood",
    name: "Pico de Madera",
    emoji: "🪵",
    price: 0,
    durability: 50,
    power: 1,
  },
  stone: {
    id: "stone",
    name: "Pico de Piedra",
    emoji: "🪨",
    price: 100,
    durability: 150,
    power: 2,
  },
  iron: {
    id: "iron",
    name: "Pico de Hierro",
    emoji: "⛏️",
    price: 500,
    durability: 400,
    power: 4,
  },
  gold: {
    id: "gold",
    name: "Pico de Oro",
    emoji: "🥇",
    price: 1500,
    durability: 1000,
    power: 8,
  },
  emerald: {
    id: "emerald",
    name: "Pico de Esmeralda",
    emoji: "💚",
    price: 5000,
    durability: 3000,
    power: 15,
  },
  diamond: {
    id: "diamond",
    name: "Pico de Diamante",
    emoji: "💎",
    price: 15000,
    durability: 10000,
    power: 30,
  },
};

export default function ShopPage() {
  const router = useRouter();

  const [coins, setCoins] = useState(1000);
  const [message, setMessage] = useState("");

  function buyPickaxe(pickaxe: Pickaxe) {
    if (pickaxe.price === 0) {
      setMessage("✅ Este pico ya está disponible.");
      return;
    }

    if (coins < pickaxe.price) {
      setMessage("❌ No tienes suficientes Miner Coins.");
      return;
    }

    setCoins((current) => current - pickaxe.price);
    setMessage(`✅ Has comprado ${pickaxe.name}.`);
  }

  return (
    <main className="min-h-[100dvh] w-full bg-black text-white">
      <div className="mx-auto min-h-[100dvh] w-full max-w-[480px] px-4 py-5">
        {/* ENCABEZADO */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400"
          >
            ← Atrás
          </button>

          <h1 className="text-2xl font-black text-yellow-400">
            🛒 TIENDA
          </h1>

          <div className="w-[70px]" />
        </div>

        {/* SALDO */}

        <div className="mt-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
          <div className="text-xs font-bold tracking-widest text-white/50">
            MINER COINS
          </div>

          <div className="mt-1 text-3xl font-black text-yellow-400">
            🪙 {coins.toLocaleString()}
          </div>
        </div>

        {/* TÍTULO */}

        <div className="mt-7">
          <h2 className="text-xl font-black">
            ⛏️ PICOS
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Mejora tu pico para conseguir más minerales.
          </p>
        </div>

        {/* PICOS */}

        <div className="mt-5 space-y-4">
          {Object.values(PICKAXES).map((pickaxe) => (
            <div
              key={pickaxe.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10 text-4xl">
                  {pickaxe.emoji}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-black">
                    {pickaxe.name}
                  </div>

                  <div className="mt-1 text-xs text-white/40">
                    Poder: ×{pickaxe.power}
                  </div>

                  <div className="text-xs text-white/40">
                    Durabilidad: {pickaxe.durability}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="font-black text-yellow-400">
                  {pickaxe.price === 0
                    ? "GRATIS"
                    : `🪙 ${pickaxe.price.toLocaleString()}`}
                </div>

                <button
                  type="button"
                  onClick={() => buyPickaxe(pickaxe)}
                  className="rounded-xl bg-yellow-500 px-5 py-2.5 font-black text-black active:scale-95"
                >
                  {pickaxe.price === 0 ? "USAR" : "COMPRAR"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MENSAJE */}

        {message && (
          <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-center text-sm font-bold text-yellow-300">
            {message}
          </div>
        )}

        {/* VOLVER */}

        <button
          type="button"
          onClick={() => router.push("/game")}
          className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 py-4 font-black text-white/70 active:scale-[0.98]"
        >
          ⛏️ VOLVER A LA MINA
        </button>
      </div>
    </main>
  );
        }
