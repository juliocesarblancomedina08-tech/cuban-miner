"use client";

import { useEffect, useMemo, useState } from "react";

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
  durability: number;
  production: number;
  description: string;
};

const PICKAXES: Pickaxe[] = [
  {
    id: "wood",
    name: "Pico de madera",
    icon: "🪵",
    price: 0,
    durability: 21,
    production: 350,
    description: "Pico inicial para comenzar a minar.",
  },
  {
    id: "stone",
    name: "Pico de piedra",
    icon: "🪨",
    price: 500,
    durability: 17,
    production: 600,
    description: "Una mejora económica para nuevos mineros.",
  },
  {
    id: "iron",
    name: "Pico de hierro",
    icon: "⚙️",
    price: 1500,
    durability: 15,
    production: 1770,
    description: "Mayor producción y mejor rendimiento.",
  },
  {
    id: "gold",
    name: "Pico de oro",
    icon: "🥇",
    price: 3500,
    durability: 13,
    production: 4025,
    description: "Un pico avanzado para mineros activos.",
  },
  {
    id: "emerald",
    name: "Pico de esmeralda",
    icon: "💚",
    price: 7500,
    durability: 10,
    production: 8400,
    description: "Gran velocidad y producción.",
  },
  {
    id: "diamond",
    name: "Pico de diamante",
    icon: "💎",
    price: 15000,
    durability: 7,
    production: 16500,
    description: "El pico más poderoso de la mina.",
  },
];

export default function GamePage() {
  const [tab, setTab] = useState<Tab>("mine");

  const [menuOpen, setMenuOpen] = useState(false);

  const [username, setUsername] =
    useState("Nuevo Minero");

  const [coins, setCoins] = useState(0);

  const [minerals, setMinerals] = useState(0);

  const [energy, setEnergy] = useState(100);

  const [maxEnergy] = useState(100);

  const [selectedPickaxe, setSelectedPickaxe] =
    useState<string | null>(null);

  const [ownedPickaxe, setOwnedPickaxe] =
    useState<string | null>(null);

  const [miningCount, setMiningCount] =
    useState(0);

  const [missionReward, setMissionReward] =
    useState(false);

  const currentPickaxe = useMemo(
    () =>
      PICKAXES.find(
        (pickaxe) => pickaxe.id === ownedPickaxe
      ) ?? null,
    [ownedPickaxe]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const savedUsername =
      localStorage.getItem(
        "cuban_miner_username"
      );

    if (savedUsername) {
      setUsername(`@${savedUsername}`);
    }

    const savedCoins =
      localStorage.getItem(
        "cuban_miner_coins"
      );

    const savedMinerals =
      localStorage.getItem(
        "cuban_miner_minerals"
      );

    const savedEnergy =
      localStorage.getItem(
        "cuban_miner_energy"
      );

    const savedPickaxe =
      localStorage.getItem(
        "cuban_miner_pickaxe"
      );

    if (savedCoins) {
      setCoins(Number(savedCoins));
    }

    if (savedMinerals) {
      setMinerals(Number(savedMinerals));
    }

    if (savedEnergy) {
      setEnergy(Number(savedEnergy));
    }

    if (savedPickaxe) {
      setOwnedPickaxe(savedPickaxe);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cuban_miner_coins",
      String(coins)
    );

    localStorage.setItem(
      "cuban_miner_minerals",
      String(minerals)
    );

    localStorage.setItem(
      "cuban_miner_energy",
      String(energy)
    );

    if (ownedPickaxe) {
      localStorage.setItem(
        "cuban_miner_pickaxe",
        ownedPickaxe
      );
    }
  }, [
    coins,
    minerals,
    energy,
    ownedPickaxe,
  ]);

  function mine() {
    if (energy <= 0) {
      return;
    }

    setMinerals(
      (value) => value + 1
    );

    setCoins(
      (value) => value + 1
    );

    setEnergy(
      (value) =>
        Math.max(0, value - 1)
    );

    setMiningCount(
      (value) => value + 1
    );
  }

  function rechargeEnergy() {
    setEnergy(maxEnergy);
  }

  function selectPickaxe(
    pickaxe: Pickaxe
  ) {
    if (pickaxe.price === 0) {
      setOwnedPickaxe(pickaxe.id);
      setSelectedPickaxe(pickaxe.id);
      return;
    }

    if (coins < pickaxe.price) {
      setSelectedPickaxe(pickaxe.id);
      return;
    }

    setCoins(
      (value) =>
        value - pickaxe.price
    );

    setOwnedPickaxe(pickaxe.id);
    setSelectedPickaxe(pickaxe.id);
  }

  function openTab(nextTab: Tab) {
    setTab(nextTab);
    setMenuOpen(false);
  }

  function claimMission() {
    if (
      miningCount >= 10 &&
      !missionReward
    ) {
      setCoins(
        (value) => value + 10
      );

      setMissionReward(true);
    }
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">

      <div className="relative mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden">

        {/* FONDO */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#241508] via-[#0c0a07] to-black" />

        {/* CABECERA */}

        <header className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between">

          <button
            type="button"
            onClick={() =>
              openTab("profile")
            }
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/75 px-3 py-2 backdrop-blur"
          >

            <div className="text-2xl">
              👷
            </div>

            <div className="text-left">

              <div className="text-[10px] font-bold text-yellow-400">
                NIVEL 1
              </div>

              <div className="max-w-[120px] truncate text-sm font-black">
                {username}
              </div>

            </div>

          </button>

          <div className="flex items-center gap-2">

            <div className="rounded-2xl border border-yellow-500/20 bg-black/80 px-3 py-2 font-black">
              🪙 {coins.toLocaleString()}
            </div>

            <button
              type="button"
              onClick={() =>
                openTab("bank")
              }
              aria-label="Banco"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-2xl font-black text-black shadow-lg active:scale-90"
            >
              +
            </button>

          </div>

        </header>

        {/* MINAS */}

        {tab === "mine" && (
          <section className="absolute inset-0">

            {/* ESTADÍSTICAS */}

            <div className="absolute left-4 right-4 top-[15%] rounded-3xl border border-yellow-500/10 bg-black/60 p-4 backdrop-blur">

              <div className="flex justify-between">

                <div>
                  <div className="text-[10px] text-white/40">
                    MINERALES RECIBIDOS
                  </div>

                  <div className="mt-1 text-xl font-black">
                    ⛏️ {minerals}
                  </div>
                </div>

                <div className="text-right">

                  <div className="text-[10px] text-white/40">
                    ENERGÍA
                  </div>

                  <div className="mt-1 text-xl font-black">
                    ⚡ {energy}
                  </div>

                </div>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-black">

                <div
                  className="h-full bg-yellow-500 transition-all duration-300"
                  style={{
                    width: `${energy}%`,
                  }}
                />

              </div>

            </div>

            {/* ELEVADOR */}

            <div className="absolute left-[5%] top-[35%] text-center">

              <div className="text-7xl">
                🛗
              </div>

              <div className="mt-1 text-[10px] font-black text-white/50">
                ELEVADOR
              </div>

            </div>

            {/* MINERO */}

            <div className="absolute left-1/2 top-[37%] -translate-x-1/2 text-center">

              <div className="text-8xl transition-transform duration-150 active:scale-90">
                👷
              </div>

              <div className="mt-2 text-xs font-black text-yellow-400">
                {currentPickaxe
                  ? currentPickaxe.name
                  : "SIN PICO"}
              </div>

              <button
                type="button"
                onClick={mine}
                disabled={energy <= 0}
                className="mt-5 rounded-2xl bg-yellow-500 px-10 py-4 font-black text-black shadow-xl active:scale-95 disabled:opacity-40"
              >
                ⛏️ MINAR
              </button>

            </div>

            {/* ALMACÉN */}

            <div className="absolute bottom-[20%] right-[6%] text-center">

              <div className="text-7xl">
                🏭
              </div>

              <div className="text-xs font-black">
                ALMACÉN
              </div>

              <div className="text-xs text-yellow-400">
                {minerals} minerales
              </div>

            </div>

            {/* ENERGÍA */}

            <button
              type="button"
              onClick={rechargeEnergy}
              className="absolute bottom-[20%] left-[6%] rounded-2xl border border-yellow-500/20 bg-black/70 px-4 py-3 text-xs font-black"
            >
              ⚡ ENERGÍA
            </button>

            {/* PICO ACTUAL */}

            {currentPickaxe && (
              <div className="absolute bottom-[31%] left-1/2 -translate-x-1/2 rounded-2xl bg-black/70 px-4 py-2 text-center text-xs">

                <div className="text-white/50">
                  PICO ACTUAL
                </div>

                <div className="font-black text-yellow-400">
                  {currentPickaxe.icon}{" "}
                  {currentPickaxe.name}
                </div>

                <div className="text-white/40">
                  {currentPickaxe.durability} días
                </div>

              </div>
            )}

          </section>
        )}

        {/* TIENDA */}

        {tab === "shop" && (
          <section className="absolute inset-0 overflow-y-auto px-4 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              🛒 TIENDA
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Compra herramientas para mejorar tu mina.
            </p>

            <div className="mt-5 space-y-3">

              {PICKAXES.map(
                (pickaxe) => (
                  <div
                    key={pickaxe.id}
                    className={`rounded-3xl border p-4 ${
                      ownedPickaxe ===
                      pickaxe.id
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="text-5xl">
                        {pickaxe.icon}
                      </div>

                      <div className="flex-1">

                        <div className="font-black">
                          {pickaxe.name}
                        </div>

                        <div className="mt-1 text-xs text-white/50">
                          {pickaxe.description}
                        </div>

                        <div className="mt-2 flex gap-3 text-[11px] text-white/50">
                          <span>
                            ⏳ {pickaxe.durability} días
                          </span>

                          <span>
                            🪙 {pickaxe.production} MC
                          </span>
                        </div>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        selectPickaxe(
                          pickaxe
                        )
                      }
                      className="mt-4 w-full rounded-2xl bg-yellow-500 py-3 font-black text-black active:scale-95"
                    >
                      {pickaxe.price === 0
                        ? "EQUIPAR GRATIS"
                        : `COMPRAR · ${pickaxe.price.toLocaleString()} MC`}
                    </button>

                  </div>
                )
              )}

            </div>

          </section>
        )}

        {/* REFERIDOS */}

        {tab === "friends" && (
          <section className="absolute inset-0 overflow-y-auto px-5 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              👥 REFERIDOS
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Invita jugadores y consigue recompensas.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">

              <div className="text-center text-7xl">
                👥
              </div>

              <div className="mt-4 text-center">

                <div className="text-xl font-black">
                  TU ENLACE
                </div>

                <div className="mt-4 break-all rounded-2xl bg-black p-4 text-xs text-white/50">
                  https://t.me/CUBAN_MINER_BOT?start=ref_CM000001
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      "https://t.me/CUBAN_MINER_BOT?start=ref_CM000001"
                    );
                  }}
                  className="mt-4 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
                >
                  📋 COPIAR ENLACE
                </button>

              </div>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <Stat
                title="INVITADOS"
                value="0"
              />

              <Stat
                title="RECOMPENSAS"
                value="0 MC"
              />

            </div>

          </section>
        )}

        {/* BANCO */}

        {tab === "bank" && (
          <section className="absolute inset-0 overflow-y-auto px-5 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              🏦 BANCO
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Sistema financiero de CUBAN-MINER.
            </p>

            <div className="mt-6 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

              <div className="text-xs text-white/40">
                SALDO
              </div>

              <div className="mt-2 text-4xl font-black text-yellow-400">
                0.00 USDT
              </div>

              <div className="mt-4 text-xs text-white/40">
                Esta sección todavía funciona en modo demostración.
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

          </section>
        )}

        {/* MISIONES */}

        {tab === "missions" && (
          <section className="absolute inset-0 overflow-y-auto px-5 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              🎯 MISIONES
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Completa actividades para conseguir recompensas.
            </p>

            <div className="mt-6 space-y-3">

              <Mission
                title="⛏️ Primer minero"
                description="Realiza tu primera acción de minería."
                reward="+10 MC"
                completed={
                  miningCount >= 1
                }
              />

              <Mission
                title="⛏️ Minero activo"
                description="Realiza 10 acciones de minería."
                reward="+10 MC"
                completed={
                  miningCount >= 10
                }
              />

              <Mission
                title="📺 Publicidad"
                description="Mira un anuncio cuando el sistema esté conectado."
                reward="+25 MC"
                completed={false}
              />

              <Mission
                title="👥 Reclutador"
                description="Invita a tu primer jugador."
                reward="+100 MC"
                completed={false}
              />

            </div>

            {miningCount >= 10 &&
              !missionReward && (
                <button
                  type="button"
                  onClick={claimMission}
                  className="mt-5 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
                >
                  🏆 COBRAR RECOMPENSA
                </button>
              )}

          </section>
        )}

        {/* PERFIL */}

        {tab === "profile" && (
          <section className="absolute inset-0 overflow-y-auto px-5 pb-28 pt-24">

            <div className="text-center">

              <div className="text-8xl">
                👷
              </div>

              <h1 className="mt-3 text-3xl font-black">
                {username}
              </h1>

              <div className="mt-1 text-sm text-yellow-400">
                NIVEL 1
              </div>

            </div>

            <div className="mt-7 space-y-3">

              <Info
                label="ID DE JUGADOR"
                value="CM-000001"
              />

              <Info
                label="NOMBRE DE USUARIO"
                value={username}
              />

              <Info
                label="MINER COINS"
                value={coins.toLocaleString()}
              />

              <Info
                label="MINERALES"
                value={minerals.toLocaleString()}
              />

              <Info
                label="NIVEL"
                value="1"
              />

              <Info
                label="INGRESOS"
                value="0.00 USDT"
              />

              <Info
                label="RETIROS"
                value="0.00 USDT"
              />

            </div>

          </section>
        )}

        {/* MENÚ */}

        <div className="absolute bottom-3 left-3 right-3 z-40">

          {menuOpen && (
            <div className="mb-3 grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-black/95 p-3 shadow-2xl">

              <MenuButton
                icon="⛏️"
                text="MINAS"
                onClick={() =>
                  openTab("mine")
                }
              />

              <MenuButton
                icon="🛒"
                text="TIENDA"
                onClick={() =>
                  openTab("shop")
                }
              />

              <MenuButton
                icon="👥"
                text="REFERIDOS"
                onClick={() =>
                  openTab("friends")
                }
              />

              <MenuButton
                icon="🏦"
                text="BANCO"
                onClick={() =>
                  openTab("bank")
                }
              />

              <MenuButton
                icon="🎯"
                text="MISIONES"
                onClick={() =>
                  openTab("missions")
                }
              />

              <MenuButton
                icon="👤"
                text="PERFIL"
                onClick={() =>
                  openTab("profile"
