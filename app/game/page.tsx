"use client";

import { useState } from "react";

type Menu =
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
  durability: number;
  production: number;
};

const PICKAXES: Pickaxe[] = [
  {
    id: "wood",
    name: "Pico de madera",
    icon: "🪵",
    price: 0,
    durability: 21,
    production: 350,
  },
  {
    id: "stone",
    name: "Pico de piedra",
    icon: "🪨",
    price: 500,
    durability: 17,
    production: 600,
  },
  {
    id: "iron",
    name: "Pico de hierro",
    icon: "⚙️",
    price: 1500,
    durability: 15,
    production: 1770,
  },
  {
    id: "gold",
    name: "Pico de oro",
    icon: "🥇",
    price: 3500,
    durability: 13,
    production: 4025,
  },
  {
    id: "emerald",
    name: "Pico de esmeralda",
    icon: "💚",
    price: 7500,
    durability: 10,
    production: 8400,
  },
  {
    id: "diamond",
    name: "Pico de diamante",
    icon: "💎",
    price: 15000,
    durability: 7,
    production: 16500,
  },
];

export default function GamePage() {
  const [menu, setMenu] = useState<Menu>("mine");

  const [minerCoins, setMinerCoins] = useState(0);

  const [minerals, setMinerals] = useState(0);

  const [energy, setEnergy] = useState(100);

  const [level, setLevel] = useState(1);

  const [pickaxe, setPickaxe] = useState<Pickaxe | null>(null);

  const mine = () => {
    if (energy <= 0) return;

    setMinerals((value) => value + 1);

    setMinerCoins((value) => value + 1);

    setEnergy((value) => Math.max(0, value - 1));

    if (minerals > 0 && minerals % 100 === 0) {
      setLevel((value) => value + 1);
    }
  };

  const buyPickaxe = (item: Pickaxe) => {
    if (item.price > minerCoins) {
      alert("No tienes suficientes Miner Coins.");
      return;
    }

    setMinerCoins((value) => value - item.price);

    setPickaxe(item);
  };

  return (
    <main className="fixed inset-0 bg-black text-white">

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden">

        {/* ================================
            CABECERA
        ================================= */}

        <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0b0b] px-4 py-3">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-xl">
              👤
            </div>

            <div>
              <div className="text-xs text-white/50">
                NIVEL
              </div>

              <div className="font-black">
                {level}
              </div>
            </div>

          </div>

          <div className="text-right">

            <div className="text-xs text-white/50">
              MINER COINS
            </div>

            <div className="font-black text-yellow-400">
              🪙 {minerCoins}
            </div>

          </div>

        </header>

        {/* ================================
            CONTENIDO
        ================================= */}

        <section className="flex-1 overflow-y-auto px-4 py-4">

          {menu === "mine" && (
            <MineScreen
              minerCoins={minerCoins}
              minerals={minerals}
              energy={energy}
              pickaxe={pickaxe}
              mine={mine}
              setEnergy={setEnergy}
            />
          )}

          {menu === "shop" && (
            <ShopScreen
              minerCoins={minerCoins}
              buyPickaxe={buyPickaxe}
            />
          )}

          {menu === "friends" && <FriendsScreen />}

          {menu === "bank" && (
            <BankScreen
              minerCoins={minerCoins}
              setMinerCoins={setMinerCoins}
            />
          )}

          {menu === "missions" && (
            <MissionsScreen
              setMinerCoins={setMinerCoins}
            />
          )}

          {menu === "profile" && (
            <ProfileScreen
              minerCoins={minerCoins}
              minerals={minerals}
              level={level}
            />
          )}

        </section>

        {/* ================================
            MENÚ
        ================================= */}

        <nav className="border-t border-white/10 bg-[#0b0b0b] px-2 py-2">

          <div className="grid grid-cols-6 gap-1">

            <NavButton
              active={menu === "mine"}
              icon="⛏️"
              text="Minas"
              onClick={() => setMenu("mine")}
            />

            <NavButton
              active={menu === "shop"}
              icon="🛒"
              text="Tienda"
              onClick={() => setMenu("shop")}
            />

            <NavButton
              active={menu === "friends"}
              icon="👥"
              text="Referidos"
              onClick={() => setMenu("friends")}
            />

            <NavButton
              active={menu === "bank"}
              icon="🏦"
              text="Banco"
              onClick={() => setMenu("bank")}
            />

            <NavButton
              active={menu === "missions"}
              icon="🎯"
              text="Misiones"
              onClick={() => setMenu("missions")}
            />

            <NavButton
              active={menu === "profile"}
              icon="👤"
              text="Perfil"
              onClick={() => setMenu("profile")}
            />

          </div>

        </nav>

      </div>

    </main>
  );
}

/* ==========================================
   BOTÓN MENÚ
========================================== */

function NavButton({
  active,
  icon,
  text,
  onClick,
}: {
  active: boolean;
  icon: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-1 py-2 text-center transition ${
        active
          ? "bg-yellow-500 text-black"
          : "bg-white/5 text-white/60"
      }`}
    >
      <div className="text-lg">
        {icon}
      </div>

      <div className="mt-1 text-[9px] font-bold">
        {text}
      </div>
    </button>
  );
}

/* ==========================================
   MINA
========================================== */

function MineScreen({
  minerCoins,
  minerals,
  energy,
  pickaxe,
  mine,
  setEnergy,
}: {
  minerCoins: number;
  minerals: number;
  energy: number;
  pickaxe: Pickaxe | null;
  mine: () => void;
  setEnergy: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="space-y-4">

      <div className="grid grid-cols-3 gap-2">

        <Stat
          icon="🪙"
          label="Coins"
          value={minerCoins}
        />

        <Stat
          icon="⛏️"
          label="Mineral"
          value={minerals}
        />

        <Stat
          icon="⚡"
          label="Energía"
          value={energy}
        />

      </div>

      <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-b from-[#3b260b] via-[#171008] to-[#080604]">

        <div className="absolute left-0 right-0 top-5 text-center">

          <div className="text-xs font-black tracking-[0.3em] text-yellow-400">
            MINA 1
          </div>

          <div className="mt-1 text-[10px] text-white/40">
            MINA INICIAL
          </div>

        </div>

        <div className="absolute left-0 right-0 top-[30%] text-center">

          <div className="text-8xl">
            👷
          </div>

          <div className="mt-2 text-4xl">
            {pickaxe ? pickaxe.icon : "❌"}
          </div>

          <div className="mt-3 text-sm font-bold text-white/60">
            {pickaxe
              ? pickaxe.name
              : "Necesitas comprar un pico"}
          </div>

        </div>

        <div className="absolute bottom-20 left-0 right-0 text-center text-5xl">
          🪨 🪨 🪨
        </div>

        <button
          type="button"
          onClick={mine}
          className="absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2 rounded-2xl bg-yellow-500 py-4 font-black text-black shadow-lg active:scale-95"
        >
          ⛏️ TOCAR PARA MINAR
        </button>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

        <div className="mb-2 flex justify-between">

          <span className="text-sm font-bold">
            ⚡ Energía
          </span>

          <span className="text-sm font-bold text-yellow-400">
            {energy}/100
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-black">

          <div
            className="h-full bg-yellow-500 transition-all"
            style={{
              width: `${energy}%`,
            }}
          />

        </div>

        <button
          type="button"
          onClick={() =>
            setEnergy((value) => Math.min(100, value + 25))
          }
          className="mt-3 w-full rounded-xl bg-white/10 py-3 text-sm font-bold"
        >
          ⚡ RECARGAR ENERGÍA — DEMO
        </button>

      </div>

    </div>
  );
}

/* ==========================================
   ESTADÍSTICA
========================================== */

function Stat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">

      <div className="text-xl">
        {icon}
      </div>

      <div className="mt-1 text-[10px] text-white/40">
        {label}
      </div>

      <div className="font-black">
        {value.toLocaleString()}
      </div>

    </div>
  );
}

/* ==========================================
   TIENDA
========================================== */

function ShopScreen({
  minerCoins,
  buyPickaxe,
}: {
  minerCoins: number;
  buyPickaxe: (item: Pickaxe) => void;
}) {
  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-2xl font-black">
          🛒 TIENDA
        </h2>

        <p className="text-sm text-white/50">
          Herramientas y mejoras
        </p>
      </div>

      {PICKAXES.map((item) => (

        <div
          key={item.id}
          className="rounded-3xl border border-white/10 bg-[#17120a] p-5"
        >

          <div className="flex items-center gap-4">

            <div className="text-5xl">
              {item.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-black">
                {item.name}
              </h3>

              <p className="mt-1 text-xs text-white/50">
                Durabilidad: {item.durability} días
              </p>

              <p className="text-xs text-white/50">
                Producción: {item.production} MC
              </p>

            </div>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <div className="font-black text-yellow-400">
              {item.price === 0
                ? "GRATIS"
                : `${item.price.toLocaleString()} MC`}
            </div>

            <button
              type="button"
              onClick={() => buyPickaxe(item)}
              className="rounded-xl bg-yellow-500 px-4 py-3 text-sm font-black text-black"
            >
              {item.price === 0
                ? "EQUIPAR"
                : "COMPRAR"}
            </button>

          </div>

        </div>

      ))}

      <div className="rounded-2xl bg-white/5 p-4 text-center text-xs text-white/40">
        Saldo disponible: 🪙 {minerCoins.toLocaleString()} MC
      </div>

    </div>
  );
}

/* ==========================================
   REFERIDOS
========================================== */

function FriendsScreen() {
  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-black">
        👥 REFERIDOS
      </h2>

      <div className="rounded-3xl border border-white/10 bg-[#17120a] p-6 text-center">

        <div className="text-6xl">
          👥
        </div>

        <h3 className="mt-4 text-xl font-black">
          INVITA AMIGOS
        </h3>

        <p className="mt-2 text-sm text-white/50">
          Comparte tu enlace y consigue recompensas.
        </p>

        <div className="mt-5 rounded-xl bg-black p-3 text-xs text-white/60">
          t.me/CUBAN_MINER_BOT?start=ref_CM000001
        </div>

        <button
          type="button"
          className="mt-3 w-full rounded-xl bg-yellow-500 py-3 font-black text-black"
        >
          📋 COPIAR ENLACE
        </button>

      </div>

    </div>
  );
}

/* ==========================================
   BANCO
========================================== */

function BankScreen({
  minerCoins,
  setMinerCoins,
}: {
  minerCoins: number;
  setMinerCoins: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-black">
        🏦 BANCO
      </h2>

      <div className="rounded-3xl border border-yellow-500/20 bg-[#17120a] p-6">

        <div className="text-sm text-white/50">
          Miner Coins
        </div>

        <div className="mt-1 text-4xl font-black text-yellow-400">
          🪙 {minerCoins.toLocaleString()}
        </div>

        <div className="mt-6 rounded-2xl bg-black/50 p-4 text-sm">
          <div className="text-white/50">
            1 USDT
          </div>

          <div className="mt-1 font-black">
            = 500 Miner Coins
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setMinerCoins((value) => value + 500);
            alert("Demo: +500 Miner Coins");
          }}
          className="mt-4 w-full rounded-xl bg-yellow-500 py-4 font-black text-black"
        >
          +1 USDT — DEMO
        </button>

        <button
          type="button"
          className="mt-3 w-full rounded-xl bg-white/10 py-4 font-bold"
        >
          RETIRAR — PRÓXIMAMENTE
        </button>

      </div>

      <p className="text-center text-xs text-white/30">
        Esta versión es una demostración. No procesa USDT reales.
      </p>

    </div>
  );
}

/* ==========================================
   MISIONES
========================================== */

function MissionsScreen({
  setMinerCoins,
}: {
  setMinerCoins: React.Dispatch<React.SetStateAction<number>>;
}) {
  const missions = [
    "📺 Ver anuncio",
    "⛏️ Minar 100 veces",
    "👥 Invitar un jugador",
    "🎁 Recompensa diaria",
  ];

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-black">
        🎯 MISIONES
      </h2>

      {missions.map((mission) => (

        <div
          key={mission}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >

          <div className="flex items-center justify-between">

            <span className="font-bold">
              {mission}
            </span>

            <button
              type="button"
              onClick={() => {
                setMinerCoins((value) => value + 25);
              }}
              className="rounded-xl bg-yellow-500 px-4 py-2 text-xs font-black text-black"
            >
              +25 MC
            </button>

          </div>

        </div>

      ))}

      <p className="text-xs text-center text-white/30">
        Las recompensas de publicidad serán conectadas
        cuando integremos el proveedor de anuncios.
      </p>

    </div>
  );
}

/* ==========================================
   PERFIL
========================================== */

function ProfileScreen({
  minerCoins,
  minerals,
  level,
}: {
  minerCoins: number;
  minerals: number;
  level: number;
}) {
  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-black">
        👤 MI PERFIL
      </h2>

      <div className="rounded-3xl border border-white/10 bg-[#17120a] p-6">

        <div className="text-center">

          <div className="text-7xl">
            👷
          </div>

          <h3 className="mt-3 text-2xl font-black">
            Minero
          </h3>

        </div>

        <div className="mt-6 space-y-3">

          <Info
            label="ID de jugador"
            value="CM-000001"
          />

          <Info
            label="Nivel"
            value={level.toString()}
          />

          <Info
            label="Miner Coins"
            value={minerCoins.toLocaleString()}
          />

          <Info
            label="Minerales"
            value={minerals.toLocaleString()}
          />

          <Info
            label="Ingresos"
            value="0.00 USDT"
          />

          <Info
            label="Retiros"
            value="0.00 USDT"
          />

        </div>

      </div>

    </div>
  );
}

/* ==========================================
   INFO
========================================== */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between rounded-xl bg-black/40 p-3">

      <span className="text-sm text-white/50">
        {label}
      </span>

      <span className="font-bold">
        {value}
      </span>

    </div>
  );
        }
