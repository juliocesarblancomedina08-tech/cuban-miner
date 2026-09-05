"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  PICKAXES,
  type PickaxeId,
} from "../../lib/game";

type Tab =
  | "mine"
  | "shop"
  | "friends"
  | "bank"
  | "missions"
  | "profile";

export default function GamePage() {
  const [tab, setTab] =
    useState<Tab>("mine");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [username, setUsername] =
    useState("Nuevo Minero");

  const [playerId, setPlayerId] =
    useState("CM-000000");

  const [coins, setCoins] =
    useState(0);

  const [minerals, setMinerals] =
    useState(0);

  const [energy, setEnergy] =
    useState(100);

  const [miningCount, setMiningCount] =
    useState(0);

  const [pickaxe, setPickaxe] =
    useState<PickaxeId | null>(null);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const savedUsername =
      localStorage.getItem(
        "cuban_miner_username"
      );

    const savedPlayerId =
      localStorage.getItem(
        "cuban_miner_player_id"
      );

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

    if (savedUsername) {
      setUsername(
        `@${savedUsername}`
      );
    }

    if (savedPlayerId) {
      setPlayerId(savedPlayerId);
    }

    if (savedCoins) {
      setCoins(
        Number(savedCoins)
      );
    }

    if (savedMinerals) {
      setMinerals(
        Number(savedMinerals)
      );
    }

    if (savedEnergy) {
      setEnergy(
        Number(savedEnergy)
      );
    }

    if (savedPickaxe) {
      setPickaxe(
        savedPickaxe as PickaxeId
      );
    }
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

    if (pickaxe) {
      localStorage.setItem(
        "cuban_miner_pickaxe",
        pickaxe
      );
    }
  }, [
    coins,
    minerals,
    energy,
    pickaxe,
  ]);

  const currentPickaxe =
    useMemo(() => {
      if (!pickaxe) return null;

      return PICKAXES[pickaxe];
    }, [pickaxe]);

  function mine() {
    if (energy <= 0) {
      setMessage(
        "⚡ No tienes energía."
      );

      return;
    }

    setCoins(
      (value) => value + 1
    );

    setMinerals(
      (value) => value + 1
    );

    setEnergy(
      (value) =>
        Math.max(0, value - 1)
    );

    setMiningCount(
      (value) => value + 1
    );

    setMessage(
      "⛏️ ¡Mineral extraído!"
    );

    setTimeout(
      () => setMessage(""),
      1000
    );
  }

  function rechargeDemo() {
    setEnergy(100);

    setMessage(
      "⚡ Energía restaurada."
    );

    setTimeout(
      () => setMessage(""),
      1000
    );
  }

  function buyPickaxe(
    id: PickaxeId
  ) {
    const selected =
      PICKAXES[id];

    if (selected.price === 0) {
      setPickaxe(id);
      return;
    }

    if (coins < selected.price) {
      setMessage(
        "🪙 No tienes suficientes Miner Coins."
      );

      setTimeout(
        () => setMessage(""),
        1500
      );

      return;
    }

    setCoins(
      (value) =>
        value - selected.price
    );

    setPickaxe(id);

    setMessage(
      `⛏️ ${selected.name} equipado.`
    );

    setTimeout(
      () => setMessage(""),
      1200
    );
  }

  function openTab(next: Tab) {
    setTab(next);
    setMenuOpen(false);
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#050403] text-white">

      <div className="mx-auto h-[100dvh] w-full max-w-[480px] overflow-hidden">

        {/* CABECERA */}

        <header className="absolute left-3 right-3 top-3 z-50 flex items-center justify-between">

          <button
            type="button"
            onClick={() =>
              openTab("profile")
            }
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/80 px-3 py-2 backdrop-blur"
          >

            <div className="text-2xl">
              👷
            </div>

            <div className="text-left">

              <div className="text-[9px] font-black text-yellow-400">
                NIVEL 1
              </div>

              <div className="max-w-[100px] truncate text-xs font-black">
                {username}
              </div>

            </div>

          </button>

          <div className="flex items-center gap-2">

            <div className="rounded-2xl border border-yellow-500/20 bg-black/80 px-3 py-2 text-sm font-black">
              🪙 {coins.toLocaleString()}
            </div>

            <button
              type="button"
              onClick={() =>
                openTab("bank")
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-2xl font-black text-black shadow-lg active:scale-90"
              aria-label="Banco"
            >
              +
            </button>

          </div>

        </header>

        {/* MINA */}

        {tab === "mine" && (
          <section className="relative h-full">

            <div className="absolute inset-0 bg-gradient-to-b from-[#281707] via-[#0d0b08] to-black" />

            {/* MINERALES */}

            <div className="absolute left-4 right-4 top-[14%] z-20 flex justify-between rounded-3xl border border-white/10 bg-black/60 p-4 backdrop-blur">

              <div>
                <div className="text-[9px] text-white/40">
                  MINERALES
                </div>

                <div className="mt-1 font-black">
                  ⛏️ {minerals}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[9px] text-white/40">
                  ENERGÍA
                </div>

                <div className="mt-1 font-black">
                  ⚡ {energy}/100
                </div>
              </div>

            </div>

            {/* ELEVADOR */}

            <div className="absolute left-[5%] top-[37%] z-10 text-center">

              <div className="text-7xl">
                🛗
              </div>

              <div className="text-[9px] font-black text-white/40">
                ELEVADOR
              </div>

            </div>

            {/* MINERO */}

            <div className="absolute left-1/2 top-[36%] z-20 -translate-x-1/2 text-center">

              <div className="miner-talk text-8xl">
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
                className="mt-5 rounded-2xl bg-yellow-500 px-10 py-4 font-black text-black shadow-xl active:scale-95"
              >
                ⛏️ MINAR
              </button>

            </div>

            {/* ALMACÉN */}

            <div className="absolute bottom-[22%] right-[5%] z-10 text-center">

              <div className="text-7xl">
                🏭
              </div>

              <div className="text-xs font-black">
                ALMACÉN
              </div>

              <div className="text-[10px] text-yellow-400">
                {minerals} minerales
              </div>

            </div>

            {/* ENERGÍA */}

            <button
              type="button"
              onClick={rechargeDemo}
              className="absolute bottom-[22%] left-[5%] z-30 rounded-2xl border border-yellow-500/20 bg-black/80 px-4 py-3 text-xs font-black"
            >
              ⚡ ENERGÍA
            </button>

            {/* MENSAJE */}

            {message && (
              <div className="absolute left-1/2 top-[27%] z-40 -translate-x-1/2 rounded-2xl bg-yellow-500 px-4 py-2 text-xs font-black text-black shadow-xl">
                {message}
              </div>
            )}

          </section>
        )}

        {/* TIENDA */}

        {tab === "shop" && (
          <section className="absolute inset-0 overflow-y-auto bg-[#090704] px-4 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              🛒 TIENDA
            </h1>

            <p className="mt-1 text-sm text-white/50">
              Mejora tus herramientas.
            </p>

            <div className="mt-5 space-y-3">

              {(
                Object.keys(
                  PICKAXES
                ) as PickaxeId[]
              ).map((id) => {
                const item =
                  PICKAXES[id];

                const equipped =
                  pickaxe === id;

                return (
                  <div
                    key={id}
                    className={`rounded-3xl border p-4 ${
                      equipped
                        ? "border-yellow-500 bg-yellow-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="text-5xl">
                        {item.icon}
                      </div>

                      <div className="flex-1">

                        <div className="font-black">
                          {item.name}
                        </div>

                        <div className="mt-1 text-xs text-white/50">
                          Durabilidad:{" "}
                          {item.durabilityDays} días
                        </div>

                        <div className="mt-1 text-xs text-yellow-400">
                          Producción:{" "}
                          {item.production} MC
                        </div>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        buyPickaxe(id)
                      }
                      disabled={equipped}
                      className="mt-4 w-full rounded-2xl bg-yellow-500 py-3 font-black text-black disabled:opacity-40"
                    >
                      {equipped
                        ? "EQUIPADO ✓"
                        : item.price === 0
                        ? "GRATIS"
                        : `COMPRAR · ${item.price.toLocaleString()} MC`}
                    </button>

                  </div>
                );
              })}

            </div>

          </section>
        )}

        {/* REFERIDOS */}

        {tab === "friends" && (
          <section className="absolute inset-0 overflow-y-auto bg-[#090704] px-5 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              👥 REFERIDOS
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Invita amigos y gana recompensas.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">

              <div className="text-center text-7xl">
                👥
              </div>

              <div className="mt-5 text-center">

                <div className="text-xs text-white/40">
                  TU ENLACE
                </div>

                <div className="mt-3 break-all rounded-2xl bg-black p-4 text-xs text-yellow-400">
                  https://t.me/CUBAN_MINER_BOT?start=ref_{playerId}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard?.writeText(
                      `https://t.me/CUBAN_MINER_BOT?start=ref_${playerId}`
                    )
                  }
                  className="mt-4 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
                >
                  📋 COPIAR ENLACE
                </button>

              </div>

            </div>

          </section>
        )}

        {/* BANCO */}

        {tab === "bank" && (
          <section className="absolute inset-0 overflow-y-auto bg-[#090704] px-5 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              🏦 BANCO
            </h1>

            <div className="mt-6 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

              <div className="text-xs text-white/40">
                SALDO
              </div>

              <div className="mt-2 text-4xl font-black text-yellow-400">
                0.00 USDT
              </div>

              <p className="mt-4 text-xs leading-5 text-white/40">
                Sistema de pagos en preparación.
                Los depósitos y retiros reales se
                conectarán posteriormente.
              </p>

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
          <section className="absolute inset-0 overflow-y-auto bg-[#090704] px-5 pb-28 pt-24">

            <h1 className="text-3xl font-black">
              🎯 MISIONES
            </h1>

            <div className="mt-6 space-y-3">

              <Mission
                title="Primer golpe"
                description="Mina una vez."
                reward="+10 MC"
                complete={
                  miningCount >= 1
                }
              />

              <Mission
                title="Minero activo"
                description="Mina 10 veces."
                reward="+25 MC"
                complete={
                  miningCount >= 10
                }
              />

              <Mission
                title="Publicidad"
                description="Mira un anuncio."
                reward="+25 MC"
                complete={false}
              />

              <Mission
                title="Reclutador"
                description="Invita un jugador."
                reward="+100 MC"
                complete={false}
              />

            </div>

          </section>
        )}

        {/* PERFIL */}

        {tab === "profile" && (
          <section className="absolute inset-0 overflow-y-auto bg-[#090704] px-5 pb-28 pt-24">

            <div className="text-center">

              <div className="text-8xl">
                👷
              </div>

              <h1 className="mt-3 text-3xl font-black">
                {username}
              </h1>

              <div className="mt-1 text-sm font-black text-yellow-400">
                NIVEL 1
              </div>

            </div>

            <div className="mt-7 space-y-3">

              <Info
                label="ID DE JUGADOR"
                value={playerId}
              />

              <Info
                label="USUARIO"
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
                label="ENERGÍA"
                value={`${energy}/100`}
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

        <div className="absolute bottom-3 left-3 right-3 z-50">

          {menuOpen && (
            <div className="mb-3 grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-black/95 p-3 shadow-2xl">

              <Menu
                icon="⛏️"
                title="MINAS"
                onClick={() =>
                  openTab("mine")
                }
              />

              <Menu
                icon="🛒"
                title="TIENDA"
                onClick={() =>
                  openTab("shop")
                }
              />

              <Menu
                icon="👥"
                title="REFERIDOS"
                onClick={() =>
                  openTab("friends")
                }
              />

              <Menu
                icon="🏦"
                title="BANCO"
                onClick={() =>
                  openTab("bank")
                }
              />

              <Menu
                icon="🎯"
                title="MISIONES"
                onClick={() =>
                  openTab("missions")
                }
              />

              <Menu
                icon="👤"
                title="PERFIL"
                onClick={() =>
                  openTab("profile")
                }
              />

            </div>
          )}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (value) => !value
              )
            }
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/95 py-4 font-black shadow-2xl"
          >
            <span className="text-2xl">
              ☰
            </span>

            MENÚ
          </button>

        </div>

      </div>

    </main>
  );
}

function Menu({
  icon,
  title,
  onClick,
}: {
  icon: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-white/5 p-4 active:scale-95"
    >
      <div className="text-2xl">
        {icon}
      </div>

      <div className="mt-1 text-[10px] font-black">
        {title}
      </div>
    </button>
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
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">

      <span className="text-xs text-white/40">
        {label}
      </span>

      <span className="max-w-[55%] truncate text-right text-sm font-black">
        {value}
      </span>

    </div>
  );
}

function Mission({
  title,
  description,
  reward,
  complete,
}: {
  title: string;
  description: string;
  reward: string;
  complete: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex justify-between gap-3">

        <div>

          <div className="font-black">
            {title}
          </div>

          <div className="mt-1 text-xs text-white/40">
            {description}
          </div>

        </div>

        <div
          className={
            complete
              ? "text-xs font-black text-green-400"
              : "text-xs font-black text-yellow-400"
          }
        >
          {complete
            ? "✓ LISTO"
            : reward}
        </div>

      </div>

    </div>
  );
    }
