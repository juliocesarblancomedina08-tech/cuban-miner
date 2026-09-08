"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RockLevel = {
  name: string;
  mineral: string;
  emoji: string;
  hits: number;
};

const ROCK_LEVELS: RockLevel[] = [
  {
    name: "ROCA",
    mineral: "Piedra",
    emoji: "◆",
    hits: 10,
  },
  {
    name: "COBRE",
    mineral: "Cobre",
    emoji: "●",
    hits: 15,
  },
  {
    name: "HIERRO",
    mineral: "Hierro",
    emoji: "◆",
    hits: 20,
  },
];

export default function GamePage() {
  const router = useRouter();

  const [coins, setCoins] = useState(0);
  const [minerals, setMinerals] = useState(0);
  const [energy, setEnergy] = useState(100);

  const [rockIndex, setRockIndex] = useState(0);
  const [hits, setHits] = useState(0);

  const [isMining, setIsMining] = useState(false);
  const [hitNumber, setHitNumber] = useState(0);
  const [screenShake, setScreenShake] = useState(false);

  const rock = ROCK_LEVELS[rockIndex];

  /*
   * Animación automática:
   *
   * Después de cada golpe esperamos un poco
   * para que el minero vuelva a su posición.
   */
  useEffect(() => {
    if (!isMining) return;

    const timer = setTimeout(() => {
      setIsMining(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [isMining, hitNumber]);

  function mine() {
    if (isMining) return;
    if (energy <= 0) return;

    setIsMining(true);
    setHitNumber((value) => value + 1);

    setEnergy((value) => Math.max(0, value - 1));

    setHits((value) => {
      const newHits = value + 1;

      if (newHits >= rock.hits) {
        setMinerals((current) => current + 1);
        setCoins((current) => current + 5);

        setTimeout(() => {
          setHits(0);
          setRockIndex((current) => {
            if (current >= ROCK_LEVELS.length - 1) {
              return 0;
            }

            return current + 1;
          });
        }, 320);

        return rock.hits;
      }

      setCoins((current) => current + 1);

      return newHits;
    });

    setScreenShake(true);

    setTimeout(() => {
      setScreenShake(false);
    }, 160);
  }

  const progress = Math.min((hits / rock.hits) * 100, 100);

  return (
    <main className="min-h-[100dvh] w-full overflow-hidden bg-black text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col">

        {/* =========================
            CABECERA
        ========================== */}

        <header className="relative z-30 border-b border-yellow-500/10 bg-black px-4 pb-3 pt-4">

          <div className="flex items-center justify-between">

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-yellow-500/30 bg-gradient-to-b from-yellow-900/40 to-black">
                <div className="miner-head" />
                <div className="miner-helmet" />
              </div>

              <div className="text-left">
                <div className="text-[10px] font-bold text-white/40">
                  MINERO
                </div>

                <div className="text-sm font-black text-yellow-400">
                  NIVEL 1
                </div>
              </div>
            </button>

            <div className="text-right">

              <div className="text-[10px] font-bold tracking-widest text-white/40">
                MINER COINS
              </div>

              <div className="text-xl font-black text-yellow-400">
                🪙 {coins.toLocaleString()}
              </div>

            </div>

          </div>

          {/* ENERGÍA */}

          <div className="mt-4">

            <div className="mb-1 flex justify-between text-[10px] font-black">
              <span className="text-white/40">
                ENERGÍA
              </span>

              <span className="text-yellow-400">
                {energy}/100
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 transition-all duration-300"
                style={{
                  width: `${energy}%`,
                }}
              />
            </div>

          </div>

        </header>

        {/* =========================
            TÚNEL
        ========================== */}

        <section
          className={`mine-scene relative flex-1 overflow-hidden ${
            screenShake ? "screen-shake" : ""
          }`}
          onClick={mine}
        >

          {/* LUZ DE LA MINA */}

          <div className="mine-light" />

          {/* TECHO */}

          <div className="mine-ceiling" />

          {/* PARED TRASERA */}

          <div className="mine-back-wall">

            <div className="rock-pattern rock-pattern-one" />
            <div className="rock-pattern rock-pattern-two" />
            <div className="rock-pattern rock-pattern-three" />
            <div className="rock-pattern rock-pattern-four" />

          </div>

          {/* SUELO */}

          <div className="mine-floor">

            <div className="floor-line floor-line-one" />
            <div className="floor-line floor-line-two" />
            <div className="floor-line floor-line-three" />

          </div>

          {/* LÁMPARA */}

          <div className="mine-lamp">

            <div className="lamp-wire" />

            <div className="lamp-body">
              <div className="lamp-glow" />
            </div>

          </div>

          {/* =========================
              INFORMACIÓN DE LA ROCA
          ========================== */}

          <div className="absolute left-0 right-0 top-5 z-20 text-center">

            <div className="text-[10px] font-black tracking-[0.35em] text-yellow-500/60">
              MINA 01
            </div>

            <div className="mt-1 text-xl font-black text-white">
              {rock.name}
            </div>

            <div className="mt-1 text-xs text-white/40">
              {rock.mineral}
            </div>

          </div>

          {/* =========================
              PARED QUE SE PICA
          ========================== */}

          <div
            className="ore-wall"
            style={{
              transform: `translateX(${Math.min(hits * 1.2, 12)}px)`,
            }}
          >

            <div className="ore-wall-shadow" />

            <div className="ore-crack ore-crack-one" />
            <div className="ore-crack ore-crack-two" />
            <div className="ore-crack ore-crack-three" />
            <div className="ore-crack ore-crack-four" />
            <div className="ore-crack ore-crack-five" />

            <div
              className="ore-damage"
              style={{
                opacity: progress / 100,
              }}
            />

            <div className="ore-center">

              <div className="ore-symbol">
                {rock.emoji}
              </div>

              <div className="text-[9px] font-black tracking-widest text-white/40">
                {hits}/{rock.hits}
              </div>

            </div>

          </div>

          {/* =========================
              MINERO
          ========================== */}

          <div
            className={`miner-character ${
              isMining ? "miner-mining" : ""
            }`}
          >

            {/* SOMBRA */}

            <div className="miner-shadow" />

            {/* CUERPO */}

            <div className="miner-body">

              <div className="miner-shirt" />

              <div className="miner-belt" />

            </div>

            {/* CABEZA */}

            <div className="miner-face">

              <div className="miner-ear miner-ear-left" />
              <div className="miner-ear miner-ear-right" />

              <div className="miner-hair" />

              <div className="miner-eye miner-eye-left" />
              <div className="miner-eye miner-eye-right" />

              <div className="miner-beard" />

            </div>

            {/* CASCO */}

            <div className="miner-helmet-large">

              <div className="helmet-light" />

              <div className="helmet-band" />

            </div>

            {/* BRAZO TRASERO */}

            <div className="miner-arm miner-arm-back" />

            {/* BRAZO DELANTERO */}

            <div className="miner-arm miner-arm-front" />

            {/* PICO */}

            <div className="pickaxe">

              <div className="pickaxe-handle" />

              <div className="pickaxe-head">

                <div className="pickaxe-metal-left" />
                <div className="pickaxe-metal-right" />

              </div>

            </div>

          </div>

          {/* =========================
              CHISPAS DE IMPACTO
          ========================== */}

          {isMining && (
            <div className="impact-effects">

              <span className="impact-spark impact-one">
                ✦
              </span>

              <span className="impact-spark impact-two">
                ✦
              </span>

              <span className="impact-spark impact-three">
                ✧
              </span>

              <span className="impact-spark impact-four">
                ✦
              </span>

              <span className="dust dust-one" />
              <span className="dust dust-two" />
              <span className="dust dust-three" />
              <span className="dust dust-four" />

            </div>
          )}

          {/* =========================
              PROGRESO
          ========================== */}

          <div className="absolute bottom-5 left-5 right-5 z-20">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[10px] font-black text-white/40">
                DURABILIDAD DE LA ROCA
              </span>

              <span className="text-[10px] font-black text-yellow-400">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-black/70">

              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 transition-all duration-150"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-3 text-center text-[10px] font-black tracking-[0.25em] text-white/30">
              {energy > 0
                ? "TOCA LA PANTALLA PARA PICAR"
                : "SIN ENERGÍA"}
            </div>

          </div>

        </section>

        {/* =========================
            MENÚ
        ========================== */}

        <nav className="relative z-40 border-t border-yellow-500/10 bg-black px-3 pb-4 pt-3">

          <div className="grid grid-cols-3 gap-2">

            <button
              type="button"
              onClick={() => router.push("/game")}
              className="rounded-xl bg-yellow-500/15 py-2.5"
            >
              <div className="text-lg">
                ⛏️
              </div>

              <div className="text-[9px] font-black text-yellow-400">
                MINAS
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/shop")}
              className="rounded-xl bg-white/5 py-2.5"
            >
              <div className="text-lg">
                🛒
              </div>

              <div className="text-[9px] font-black text-white/40">
                TIENDA
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/friends")}
              className="rounded-xl bg-white/5 py-2.5"
            >
              <div className="text-lg">
                👥
              </div>

              <div className="text-[9px] font-black text-white/40">
                REFERIDOS
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/bank")}
              className="rounded-xl bg-white/5 py-2.5"
            >
              <div className="text-lg">
                🏦
              </div>

              <div className="text-[9px] font-black text-white/40">
                BANCO
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/missions")}
              className="rounded-xl bg-white/5 py-2.5"
            >
              <div className="text-lg">
                🎯
              </div>

              <div className="text-[9px] font-black text-white/40">
                MISIONES
              </div>
            </button>

            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="rounded-xl bg-white/5 py-2.5"
            >
              <div className="text-lg">
                👤
              </div>

              <div className="text-[9px] font-black text-white/40">
                PERFIL
              </div>
            </button>

          </div>

        </nav>

      </div>

      {/* =========================
          ESTILOS DE LA MINA
      ========================== */}

      <style jsx>{`

        .mine-scene {
          background:
            radial-gradient(
              ellipse at 50% 30%,
              rgba(150, 110, 45, 0.18),
              transparent 55%
            ),
            linear-gradient(
              180deg,
              #17130d 0%,
              #0b0907 48%,
              #030303 100%
            );
        }

        .mine-light {
          position: absolute;
          top: 25px;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(255, 190, 50, 0.08);
          filter: blur(45px);
          pointer-events: none;
        }

        .mine-ceiling {
          position: absolute;
          top: 0;
          left: -10%;
          width: 120%;
          height: 75px;
          background:
            linear-gradient(
              135deg,
              #292018 0%,
              #0d0b08 35%,
              #211a12 65%,
              #080706 100%
            );
          clip-path: polygon(
            0 0,
            100% 0,
            94% 70%,
            82% 58%,
            70% 78%,
            55% 55%,
            42% 74%,
            28% 55%,
            15% 72%,
            0 55%
          );
        }

        .mine-back-wall {
          position: absolute;
          inset: 65px 0 80px 0;
          background:
            radial-gradient(
              circle at 20% 30%,
              rgba(255,255,255,.05) 0 2px,
              transparent 3px
            ),
            radial-gradient(
              circle at 75% 65%,
              rgba(255,255,255,.04) 0 2px,
              transparent 3px
            ),
            linear-gradient(
              125deg,
              #17130e,
              #0b0907 40%,
              #15100b
            );
          background-size: 90px 90px, 120px 120px, auto;
        }

        .rock-pattern {
          position: absolute;
          border: 2px solid rgba(255,255,255,.035);
          border-radius: 45%;
          transform: rotate(25deg);
        }

        .rock-pattern-one {
          left: 5%;
          top: 20%;
          width: 90px;
          height: 45px;
        }

        .rock-pattern-two {
          right: 8%;
          top: 30%;
          width: 110px;
          height: 55px;
          transform: rotate(-20deg);
        }

        .rock-pattern-three {
          left: 12%;
          bottom: 25%;
          width: 120px;
          height: 60px;
          transform: rotate(-12deg);
        }

        .rock-pattern-four {
          right: 5%;
          bottom: 20%;
          width: 90px;
          height: 50px;
          transform: rotate(35deg);
        }

        .mine-floor {
          position: absolute;
          bottom: 0;
          left: -10%;
          width: 120%;
          height: 105px;
          background:
            linear-gradient(
              165deg,
              #17120c,
              #080706 55%,
              #030303
            );
          clip-path: polygon(
            0 35%,
            20% 15%,
            40% 30%,
            58% 10%,
            78% 28%,
            100% 8%,
            100% 100%,
            0 100%
          );
        }

        .floor-line {
          position: absolute;
          height: 2px;
          background: rgba(255,190,50,.08);
          transform-origin: left center;
        }

        .floor-line-one {
          width: 180px;
          left: 25%;
          top: 35px;
          transform: rotate(8deg);
        }

        .floor-line-two {
          width: 130px;
          left: 45%;
          top: 55px;
          transform: rotate(-8deg);
        }

        .floor-line-three {
          width: 100px;
          left: 5%;
          top: 55px;
          transform: rotate(12deg);
        }

        .mine-lamp {
          position: absolute;
          top: 10px;
          left: 50%;
          z-index: 10;
          transform: translateX(-50%);
        }

        .lamp-wire {
          width: 2px;
          height: 28px;
          margin: auto;
          background: #555;
        }

        .lamp-body {
          position: relative;
          width: 32px;
          height: 20px;
          border-radius: 7px 7px 12px 12px;
          background: linear-gradient(#777, #222);
          box-shadow: 0 0 25px rgba(255,190,50,.3);
        }

        .lamp-glow {
          position: absolute;
          left: 50%;
          bottom: -12px;
          width: 15px;
          height: 15px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #ffd35a;
          box-shadow:
            0 0 12px #ffd35a,
            0 0 30px rgba(255,190,50,.8);
        }

        .ore-wall {
          position: absolute;
          right: -8px;
          top: 27%;
          width: 46%;
          height: 42%;
          min-height: 180px;
          max-height: 270px;
          border-radius: 35px 0 0 35px;
          border: 3px solid rgba(255,255,255,.08);
          background:
            radial-gradient(
              circle at 20% 30%,
              rgba(255,255,255,.08) 0 4px,
              transparent 5px
            ),
            radial-gradient(
              circle at 65% 70%,
              rgba(255,255,255,.06) 0 3px,
              transparent 4px
            ),
            linear-gradient(
              135deg,
              #514438,
              #282019 45%,
              #120e0a
            );
          background-size: 55px 55px, 70px 70px, auto;
          box-shadow:
            inset 15px 0 30px rgba(0,0,0,.45),
            0 15px 35px rgba(0,0,0,.5);
          transition: transform .12s ease;
          overflow: hidden;
        }

        .ore-wall-shadow {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.4),
              transparent 50%
            );
        }

        .ore-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .ore-symb
