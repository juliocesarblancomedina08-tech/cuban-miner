"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Tab =
  | "mine"
  | "shop"
  | "friends"
  | "bank"
  | "missions"
  | "profile";

type Pickaxe = {
  id: string;
  name: string;
  icon: string;
  price: number;
  days: number;
  production: number;
};

const PICKAXES: Pickaxe[] = [
  {
    id: "wood",
    name: "Pico de madera",
    icon: "🪵",
    price: 0,
    days: 21,
    production: 350,
  },
  {
    id: "stone",
    name: "Pico de piedra",
    icon: "🪨",
    price: 500,
    days: 17,
    production: 600,
  },
  {
    id: "iron",
    name: "Pico de hierro",
    icon: "⚙️",
    price: 1500,
    days: 15,
    production: 1770,
  },
  {
    id: "gold",
    name: "Pico de oro",
    icon: "🥇",
    price: 3500,
    days: 13,
    production: 4025,
  },
  {
    id: "emerald",
    name: "Pico de esmeralda",
    icon: "💚",
    price: 7500,
    days: 10,
    production: 8400,
  },
  {
    id: "diamond",
    name: "Pico de diamante",
    icon: "💎",
    price: 15000,
    days: 7,
    production: 16500,
  },
];

export default function GamePage() {
  const [tab, setTab] = useState<Tab>("mine");

  const [coins, setCoins] = useState(0);
  const [minerals, setMinerals] = useState(0);

  const [energy, setEnergy] = useState(100);
  const [maxEnergy] = useState(100);

  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedPickaxe, setSelectedPickaxe] =
    useState<string | null>(null);

  const [playerName] = useState("Nuevo Minero");

  const mine = () => {
    if (energy <= 0) return;

    setCoins((value) => value + 1);

    setMinerals((value) => value + 1);

    setEnergy((value) =>
      Math.max(0, value - 1)
    );
  };

  const rechargeDemo = () => {
    setEnergy(maxEnergy);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">

      <div className="relative mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden">

        {/* FONDO */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#181008] via-[#090909] to-black" />

        {/* CABECERA */}

        <div className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between">

          <button
            type="button"
            onClick={() => setTab("profile")}
            className="flex items-center gap-2 rounded-2xl bg-black/60 px-3 py-2 backdrop-blur"
          >
            <span className="text-2xl">
              👷
            </span>

            <div className="text-left">

              <div className="text-xs text-white/50">
                NIVEL 1
              </div>

              <div className="text-sm font-black">
                {playerName}
              </div>

            </div>
          </button>

          <div className="flex gap-2">

            <div className="rounded-2xl bg-black/70 px-3 py-2 text-sm font-black">
              🪙 {coins.toLocaleString()}
            </div>

            <button
              type="button"
              onClick={() => setTab("bank")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-xl font-black text-black"
            >
              +
            </button>

          </div>

        </div>

        {/* MINA */}

        {tab === "mine" && (
          <section className="absolute inset-0">

            <div className="absolute left-[8%] right-[8%] top-[17%] rounded-3xl border border-yellow-500/10 bg-[#120e09] p-4">

              <div className="flex justify-between text-xs">

                <span className="text-white/50">
                  MINERALES
                </span>

                <span className="font-black">
                  ⛏️ {minerals}
                </span>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-black">

                <div
                  className="h-full bg-yellow-500 transition-all"
                  style={{
                    width: `${energy}%`,
                  }}
                />

              </div>

              <div className="mt-1 text-right text-[10px] text-white/40">
                Energía {energy}/{maxEnergy}
              </div>

            </div>

            {/* ELEVADOR */}

            <div className="absolute left-[7%] top-[32%] text-7xl">
              🛗
            </div>

            {/* MINERO */}

            <div className="absolute left-1/2 top-[40%] -translate-x-1/2 text-center">

              <div className="text-8xl">
                👷
              </div>

              <div className="mt-2 text-xs font-black text-yellow-400">
                MINERO NIVEL 1
              </div>

              <button
                type="button"
                onClick={mine}
                disabled={energy <= 0}
                className="
                  mt-5
                  rounded-2xl
                  bg-yellow-500
                  px-10
                  py-4
                  font-black
                  text-black
                  shadow-lg
                  active:scale-95
                "
              >
                ⛏️ MINAR
              </button>

            </div>

            {/* ALMACÉN */}

            <div className="absolute bottom-[18%] right-[7%] text-center">

              <div className="text-7xl">
                🏭
              </div>

              <div className="text-xs font-black">
                ALMACÉN
              </div>

              <div className="text-xs text-yellow-400">
                {minerals} mineral
              </div>

            </div>

            <button
              type="button"
              onClick={rechargeDemo}
              className="absolute bottom-[17%] left-[7%] rounded-2xl bg-white/10 px-4 py-3 text-xs font-black"
            >
              ⚡ ENERGÍA
            </button>

          </section>
        )}

        {/* CONTENIDO DE TIENDA */}

        {tab === "shop" && (
          <section className="absolute inset-0 overflow-y-auto px-4 pb-32 pt-24">

            <h1 className="text-3xl font-black">
              🛒 TIENDA
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Picos de minería
            </p>

            <div className="mt-5 space-y-3">

              {PICKAXES.map((pickaxe) => (

                <button
                  key={pickaxe.id}
                  type="button"
                  onClick={() =>
                    setSelectedPickaxe(pickaxe.id)
                  }
                  className={`w-full rounded-3xl border p-4 text-left ${
                    selectedPickaxe === pickaxe.id
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="text-5xl">
                      {pickaxe.icon}
                    </div>

                    <div className="flex-1">

                      <div className="font-black">
                        {pickaxe.name}
                      </div>

                      <div className="mt-1 text-xs text-white/50">
                        Duración: {pickaxe.days} días
                      </div>

                      <div className="text-xs text-white/50">
                        Producción: {pickaxe.production} MC
                      </div>

                    </div>

                    <div className="text-right">

                      <div className="font-black text-yellow-400">
                        {pickaxe.price === 0
                          ? "GRATIS"
                          : `${pickaxe.price} MC`}
                      </div>

                    </div>

                  </div>

                </button>

              ))}

            </div>

          </section>
        )}

        {/* REFERIDOS */}

        {tab === "friends" && (
          <section className="absolute inset-0 px-5 pt-24">

            <h1 className="text-3xl font-black">
              👥 REFERIDOS
            </h1>

            <div className="mt-6 rounded-3xl bg-white/5 p-6 text-center">

              <div className="text-7xl">
                👥
              </div>

              <h2 className="mt-4 text-xl font-black">
                INVITA AMIGOS
              </h2>

              <p className="mt-2 text-sm text-white/50">
                Invita jugadores para conseguir recompensas.
              </p>

              <div className="mt-5 rounded-2xl bg-black p-4 text-xs text-white/50">
                https://t.me/CUBAN_MINER_BOT?start=ref_CM000001
              </div>

              <button
                type="button"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    "https://t.me/CUBAN_MINER_BOT?start=ref_CM000001"
                  )
                }
                className="mt-4 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
              >
                📋 COPIAR ENLACE
              </button>

            </div>

          </section>
        )}

        {/* BANCO */}

        {tab === "bank" && (
          <section className="absolute inset-0 px-5 pt-24">

            <h1 className="text-3xl font-black">
              🏦 BANCO
            </h1>

            <div className="mt-6 rounded-3xl bg-white/5 p-6">

              <div className="text-sm text-white/50">
                Saldo disponible
              </div>

              <div className="mt-2 text-4xl font-black text-yellow-400">
                0.00 USDT
              </div>

              <div className="mt-6 rounded-2xl bg-black p-4">

                <div className="text-xs text-white/50">
                  SISTEMA DEMO
                </div>

                <div className="mt-2 font-black">
                  1 USDT = 500 Miner Coins
                </div>

              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
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

          </section>
        )}

        {/* MISIONES */}

        {tab === "missions" && (
          <section className="absolute inset-0 px-5 pt-24">

            <h1 className="text-3xl font-black">
              🎯 MISIONES
            </h1>

            <div className="mt-5 space-y-3">

              <Mission
                title="⛏️ Primer minero"
                description="Realiza tu primera acción."
                reward="+10 MC"
              />

              <Mission
                title="⛏️ Minero activo"
                description="Mina 100 veces."
                reward="+50 MC"
              />

              <Mission
                title="👥 Reclutador"
                description="Invita un jugador."
                reward="+100 MC"
              />

              <Mission
                title="📺 Publicidad"
                description="Mira un anuncio."
                reward="+25 MC"
              />

            </div>

          </section>
        )}

        {/* PERFIL */}

        {tab === "profile" && (
          <section className="absolute inset-0 px-5 pt-24">

            <div className="text-center">

              <div className="text-7xl">
                👷
              </div>

              <h1 className="mt-3 text-3xl font-black">
                PERFIL
              </h1>

            </div>

            <div className="mt-6 space-y-3">

              <Info label="ID de jugador" value="CM-000001" />
              <Info label="Usuario" value="@minero" />
              <Info label="Nivel" value="1" />
              <Info label="Miner Coins" value={coins.toString()} />
              <Info label="Minerales" value={minerals.toString()} />
              <Info label="Ingresos" value="0.00 USDT" />
              <Info label="Retiros" value="0.00 USDT" />

            </div>

          </section>
        )}

        {/* MENÚ INFERIOR */}

        <div className="absolute bottom-3 left-3 right-3 z-30">

          {menuOpen && (
            <div className="mb-3 grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-black/95 p-3 shadow-2xl">

              <MenuButton
                icon="⛏️"
                text="Minas"
                onClick={() => {
                  setTab("mine");
                  setMenuOpen(false);
                }}
              />

              <MenuButton
                icon="🛒"
                text="Tienda"
                onClick={() => {
                  setTab("shop");
                  setMenuOpen(false);
                }}
              />

              <MenuButton
                icon="👥"
                text="Referidos"
                onClick={() => {
                  setTab("friends");
                  setMenuOpen(false);
                }}
              />

              <MenuButton
                icon="🏦"
                text="Banco"
                onClick={() => {
                  setTab("bank");
                  setMenuOpen(false);
                }}
              />

              <MenuButton
                icon="🎯"
                text="Misiones"
                onClick={() => {
                  setTab("missions");
                  setMenuOpen(false);
                }}
              />

              <MenuButton
                icon="👤"
                text="Perfil"
                onClick={() => {
                  setTab("profile");
                  setMenuOpen(false);
                }}
              />

            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/90 py-4 font-black backdrop-blur"
          >
            <span className="text-2xl">
              ☰
            </span>

            <span>
              MENÚ
            </span>

          </button>

        </div>

      </div>

    </main>
  );
}

function MenuButton({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-white/5 p-4 text-center active:scale-95"
    >
      <div className="text-2xl">
        {icon}
      </div>

      <div className="mt-1 text-xs font-black">
        {text}
      </div>
    </button>
  );
}

function Mission({
  title,
  description,
  reward,
}: {
  title: string;
  description: string;
  reward: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex items-center justify-between gap-3">

        <div>

          <div className="font-black">
            {title}
          </div>

          <div className="mt-1 text-xs text-white/50">
            {description}
          </div>

        </div>

        <div className="text-sm font-black text-yellow-400">
          {reward}
        </div>

      </div>

    </div>
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
    <div className="flex justify-between rounded-2xl bg-white/5 p-4">

      <span className="text-white/50">
        {label}
      </span>

      <span className="font-black">
        {value}
      </span>

    </div>
  );
                      }
