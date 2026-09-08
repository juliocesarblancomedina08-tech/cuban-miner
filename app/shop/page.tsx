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
  material: string;
  price: number;
  durability: number;
  power: number;
};

const PICKAXES: Record<PickaxeId, Pickaxe> = {
  wood: {
    id: "wood",
    name: "Pico de Madera",
    material: "MADERA",
    price: 0,
    durability: 50,
    power: 1,
  },

  stone: {
    id: "stone",
    name: "Pico de Piedra",
    material: "PIEDRA",
    price: 100,
    durability: 150,
    power: 2,
  },

  iron: {
    id: "iron",
    name: "Pico de Hierro",
    material: "HIERRO",
    price: 500,
    durability: 400,
    power: 4,
  },

  gold: {
    id: "gold",
    name: "Pico de Oro",
    material: "ORO",
    price: 1500,
    durability: 1000,
    power: 8,
  },

  emerald: {
    id: "emerald",
    name: "Pico de Esmeralda",
    material: "ESMERALDA",
    price: 5000,
    durability: 3000,
    power: 15,
  },

  diamond: {
    id: "diamond",
    name: "Pico de Diamante",
    material: "DIAMANTE",
    price: 15000,
    durability: 10000,
    power: 30,
  },
};

function PickaxeIcon({ type }: { type: PickaxeId }) {
  return (
    <div className={`pickaxe-icon pickaxe-${type}`}>
      <div className="pickaxe-head">
        <span className="pickaxe-point left" />
        <span className="pickaxe-center" />
        <span className="pickaxe-point right" />
      </div>

      <div className="pickaxe-handle" />

      <div className="pickaxe-shine" />
    </div>
  );
}

export default function ShopPage() {
  const router = useRouter();

  const [coins, setCoins] = useState(1000);
  const [message, setMessage] = useState("");

  const [section, setSection] = useState<"pickaxes" | "bosses">(
    "pickaxes"
  );

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
    <main className="shop-page">
      <div className="shop-container">

        {/* =========================
            ENCABEZADO
        ========================= */}

        <div className="shop-header">

          <button
            type="button"
            onClick={() => router.back()}
            className="back-button"
          >
            ←
          </button>

          <h1>🛒 TIENDA</h1>

          <div className="header-space" />
        </div>

        {/* =========================
            SALDO
        ========================= */}

        <div className="coin-card">

          <div className="coin-label">
            MINER COINS
          </div>

          <div className="coin-value">
            🪙 {coins.toLocaleString()}
          </div>

        </div>

        {/* =========================
            TABS
        ========================= */}

        <div className="shop-tabs">

          <button
            type="button"
            onClick={() => setSection("pickaxes")}
            className={
              section === "pickaxes"
                ? "shop-tab active"
                : "shop-tab"
            }
          >
            <span>⛏️</span>
            PICOS
          </button>

          <button
            type="button"
            onClick={() => setSection("bosses")}
            className={
              section === "bosses"
                ? "shop-tab active"
                : "shop-tab"
            }
          >
            <span>👷</span>
            JEFES MINEROS
          </button>

        </div>

        {/* =========================
            PICOS
        ========================= */}

        {section === "pickaxes" && (
          <section>

            <div className="section-title">

              <h2>
                ⛏️ PICOS
              </h2>

              <p>
                Mejora tu pico para conseguir más minerales.
              </p>

            </div>

            <div className="pickaxe-list">

              {Object.values(PICKAXES).map((pickaxe) => (

                <div
                  key={pickaxe.id}
                  className={`pickaxe-card card-${pickaxe.id}`}
                >

                  <div className="pickaxe-top">

                    {/* ICONO */}

                    <div className="pickaxe-display">
                      <PickaxeIcon type={pickaxe.id} />
                    </div>

                    {/* INFORMACIÓN */}

                    <div className="pickaxe-info">

                      <div className="pickaxe-material">
                        {pickaxe.material}
                      </div>

                      <h3>
                        {pickaxe.name}
                      </h3>

                      <div className="pickaxe-stats">

                        <span>
                          ⚡ Poder ×{pickaxe.power}
                        </span>

                        <span>
                          🛡️ {pickaxe.durability}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* PROPIEDADES */}

                  <div className="stat-bars">

                    <div className="stat-row">

                      <div>
                        PODER
                      </div>

                      <div className="bar">
                        <span
                          style={{
                            width: `${Math.min(
                              pickaxe.power * 3.33,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                    </div>

                    <div className="stat-row">

                      <div>
                        DURABILIDAD
                      </div>

                      <div className="bar">
                        <span
                          style={{
                            width: `${Math.min(
                              pickaxe.durability / 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                    </div>

                  </div>

                  {/* COMPRA */}

                  <div className="pickaxe-bottom">

                    <div className="price">

                      {pickaxe.price === 0 ? (
                        <span className="free">
                          GRATIS
                        </span>
                      ) : (
                        <>
                          🪙{" "}
                          {pickaxe.price.toLocaleString()}
                        </>
                      )}

                    </div>

                    <button
                      type="button"
                      onClick={() => buyPickaxe(pickaxe)}
                      className="buy-button"
                    >
                      {pickaxe.price === 0
                        ? "USAR"
                        : "COMPRAR"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* =========================
            JEFES MINEROS
        ========================= */}

        {section === "bosses" && (
          <section>

            <div className="section-title">

              <h2>
                👷 JEFES MINEROS
              </h2>

              <p>
                Contrata jefes para automatizar el trabajo
                de tus mineros.
              </p>

            </div>

            <div className="boss-list">

              <div className="boss-card">

                <div className="boss-icon">
                  👷
                </div>

                <div className="boss-info">

                  <div className="boss-rank">
                    NIVEL 1
                  </div>

                  <h3>
                    Jefe Novato
                  </h3>

                  <p>
                    Hace trabajar automáticamente
                    a 1 minero.
                  </p>

                  <div className="boss-production">
                    ⛏️ +1 mineral / ciclo
                  </div>

                </div>

                <button
                  type="button"
                  className="boss-buy"
                  onClick={() =>
                    setMessage(
                      "🚧 Jefe Novato próximamente."
                    )
                  }
                >
                  🪙 500
                </button>

              </div>

              <div className="boss-card">

                <div className="boss-icon boss-2">
                  👷‍♂️
                </div>

                <div className="boss-info">

                  <div className="boss-rank">
                    NIVEL 2
                  </div>

                  <h3>
                    Jefe Experto
                  </h3>

                  <p>
                    Aumenta la producción de
                    los mineros.
                  </p>

                  <div className="boss-production">
                    ⛏️ +3 minerales / ciclo
                  </div>

                </div>

                <button
                  type="button"
                  className="boss-buy"
                  onClick={() =>
                    setMessage(
                      "🔒 Desbloquea primero el Jefe Novato."
                    )
                  }
                >
                  🪙 2,000
                </button>

              </div>

              <div className="boss-card">

                <div className="boss-icon boss-3">
                  🧑‍🏭
                </div>

                <div className="boss-info">

                  <div className="boss-rank">
                    NIVEL 3
                  </div>

                  <h3>
                    Maestro Minero
                  </h3>

                  <p>
                    Controla varias minas
                    automáticamente.
                  </p>

                  <div className="boss-production">
                    ⛏️ +8 minerales / ciclo
                  </div>

                </div>

                <button
                  type="button"
                  className="boss-buy"
                  onClick={() =>
                    setMessage(
                      "🔒 Jefe bloqueado."
                    )
                  }
                >
                  🪙 7,500
                </button>

              </div>

            </div>

          </section>
        )}

        {/* =========================
            MENSAJE
        ========================= */}

        {message && (
          <div className="shop-message">
            {message}
          </div>
        )}

        {/* =========================
            VOLVER
        ========================= */}

        <button
          type="button"
          onClick={() => router.push("/game")}
          className="return-button"
        >
          ⛏️ VOLVER A LA MINA
        </button>

      </div>

      {/* =========================
          ESTILOS
      ========================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .shop-page {
          min-height: 100dvh;
          width: 100%;
          background:
            radial-gradient(
              circle at 50% -10%,
              #30220b 0%,
              #090909 38%,
              #000000 100%
            );
          color: white;
        }

        .shop-container {
          width: 100%;
          max-width: 480px;
          min-height: 100dvh;
          margin: 0 auto;
          padding: 20px 16px 35px;
        }

        /* =========================
           HEADER
        ========================= */

        .shop-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .shop-header h1 {
          margin: 0;
          font-size: 25px;
          font-weight: 1000;
          letter-spacing: -0.5px;
          color: #ffd21f;
          text-shadow:
            0 0 12px rgba(255, 210, 31, 0.25);
        }

        .back-button {
          width: 44px;
          height: 40px;
          border-radius: 13px;
          border: 1px solid rgba(255, 210, 31, 0.25);
          background: rgba(255, 210, 31, 0.08);
          color: #ffd21f;
          font-size: 25px;
          font-weight: 900;
        }

        .header-space {
          width: 44px;
        }

        /* =========================
           COINS
        ========================= */

        .coin-card {
          margin-top: 18px;
          padding: 15px;
          border-radius: 20px;
          border: 1px solid rgba(255, 210, 31, 0.25);
          background:
            linear-gradient(
              135deg,
              rgba(255, 200, 0, 0.13),
              rgba(255, 200, 0, 0.03)
            );
          text-align: center;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 10px 35px rgba(0,0,0,0.35);
        }

        .coin-label {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.42);
        }

        .coin-value {
          margin-top: 3px;
          font-size: 30px;
          font-weight: 1000;
          color: #ffd21f;
        }

        /* =========================
           TABS
        ========================= */

        .shop-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 22px;
          padding: 5px;
          border-radius: 17px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .shop-tab {
          min-height: 54px;
          border: 0;
          border-radius: 13px;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: 0.3px;
        }

        .shop-tab span {
          display: block;
          margin-bottom: 2px;
          font-size: 20px;
        }

        .shop-tab.active {
          color: #ffd21f;
          background:
            linear-gradient(
              180deg,
              rgba(255,210,31,0.18),
              rgba(255,210,31,0.06)
            );
          box-shadow:
            inset 0 0 0 1px rgba(255,210,31,0.22),
            0 5px 18px rgba(255,190,0,0.08);
        }

        /* =========================
           TITULO
        ========================= */

        .section-title {
          margin-top: 25px;
          margin-bottom: 15px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 1000;
        }

        .section-title p {
          margin: 5px 0 0;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255,255,255,0.38);
        }

        /* =========================
           PICKAXES
        ========================= */

        .pickaxe-list {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .pickaxe-card {
          position: relative;
          overflow: hidden;
          padding: 15px;
          border-radius: 21px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.07),
              rgba(255,255,255,0.025)
            );
          box-shadow:
            0 10px 30px rgba(0,0,0,0.28);
        }

        .pickaxe-card::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 100px;
          right: -45px;
          top: -45px;
          border-radius: 50%;
          opacity: 0.08;
          filter: blur(15px);
        }

        .card-wood::after {
          background: #a96c35;
        }

        .card-stone::after {
          background: #a9adb4;
        }

        .card-iron::after {
          background: #bfc7d1;
        }

        .card-gold::after {
          background: #ffd21f;
        }

        .card-emerald::after {
          background: #00ff9c;
        }

        .card-diamond::after {
          background: #00d9ff;
        }

        .pickaxe-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        /* =========================
           ICONO PICO
        ========================= */

        .pickaxe-display {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 78px;
          height: 78px;
          flex-shrink: 0;
          border-radius: 20px;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.015)
            );
          border: 1px solid rgba(255,255,255,0.07);
        }

        .pickaxe-icon {
          position: relative;
          width: 62px;
          height: 62px;
          transform: rotate(-32deg);
          filter:
            drop-shadow(0 5px 5px rgba(0,0,0,0.7));
        }

        .pickaxe-head {
          position: absolute;
          top: 8px;
          left: 4px;
          width: 54px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pickaxe-center {
          width: 28px;
          height: 12px;
          border-radius: 5px;
          position: relative;
          z-index: 2;
        }

        .pickaxe-point {
          position: absolute;
          top: 2px;
          width: 22px;
          height: 12px;
          clip-path: polygon(
            0 50%,
            100% 0,
            75% 50%,
            100% 100%
          );
        }

        .pickaxe-point.left {
          left: 0;
          transform: scaleX(-1);
        }

        .pickaxe-point.right {
          right: 0;
        }

        .pickaxe-handle {
          position: absolute;
          width: 10px;
          height: 49px;
          left: 27px;
          top: 13px;
          border-radius: 6px;
          transform: rotate(2deg);
          z-index: 1;
        }

        .pickaxe-shine {
          position: absolute;
          width: 5px;
          height: 26px;
          left: 31px;
          top: 16px;
          border-radius: 10px;
          background: rgba(255,255,255,0.35);
          opacity: 0.45;
          z-index: 4;
        }

        /* MADERA */

        .pickaxe-wood .pickaxe-center,
        .pickaxe-wood .pickaxe-point {
          background:
            linear-gradient(
              180deg,
              #d29a55,
              #7a4524
            );
        }

        .pickaxe-wood .pickaxe-handle {
          background:
            linear-gradient(
              90deg,
              #5b321b,
              #bd783d,
              #653719
            );
        }

        /* PIEDRA */

        .pickaxe-stone .pickaxe-center,
        .pickaxe-stone .pickaxe-point {
          background:
            linear-gradient(
              180deg,
              #c5c9cf,
              #686d75
            );
        }

        .pickaxe-stone .pickaxe-handle {
          background:
            linear-gradient(
              90deg,
              #633d24,
              #a76b3c,
              #4b2d1b
            );
        }

        /* HIERRO */

        .pickaxe-iron .pickaxe-center,
        .pickaxe-iron .pickaxe-point {
          background:
            linear-gradient(
              180deg,
              #f0f3f6,
              #69727d
            );
        }

        .pickaxe-iron .pickaxe-handle {
          background:
            linear-gradient(
              90deg,
              #282d34,
              #8e98a3,
              #30353c
            );
        }

        /* ORO */

        .pickaxe-gold .pickaxe-center,
        .pickaxe-gold .pickaxe-point {
          background:
            linear-gradient(
              180deg,
              #fff18a,
              #ffc400,
              #b86b00
            );
          box-shadow:
            0 0 8px rgba(255, 196, 0, 0.35);
        }

        .pickaxe-gold .pickaxe-handle {
          background:
            linear-gradient(
              90deg,
              #6e3d13,
              #d58a25,
              #714012
            );
        }

        /* ESMERALDA */

        .pickaxe-emerald .pickaxe-center,
        .pickaxe-emerald .pickaxe-point {
          background:
            linear-gradient(
              180deg,
              #b7ffe1,
              #00e88b,
              #007b4d
            );
          box-shadow:
            0 0 12px rgba(0, 255, 160, 0.55);
        }

        .pickaxe-emerald .pickaxe-handle {
          background:
            linear-gradient(
              90deg,
              #17382d,
              #3f8c72,
              #17382d
            );
        }

        /* DIAMANTE */

        .pickaxe-diamond .pickaxe-center,
        .pickaxe-diamond .pickaxe-point {
          background:
            linear-gradient(
              180deg,
              #ffffff,
              #63eaff,
              #008fc4
            );
          box-shadow:
            0 0 15px rgba(0, 220, 255, 0.75);
        }

        .pickaxe-diamond .pickaxe-handle {
          background:
            linear-gradient(
              90deg,
              #142a36,
              #4e8ca3,
              #142a36
            );
        }

        /* BRILLO DEL DIAMANTE */

        .pickaxe-diamond .pickaxe-shine {
          background: #ffffff;
          opacity: 0.8;
          box-shadow:
            0 0 8px #ffffff,
            0 0 14px #63eaff;
        }

        /* BRILLO DE ESMERALDA */

        .pickaxe-emerald .pickaxe-shine {
          background: #d9fff0;
          opacity: 0.75;
          box-shadow:
            0 0 8px #00ff9c;
        }

        /* =========================
           INFORMACIÓN DEL PICO
        ========================= */

        .pickaxe-info {
          min-width: 0;
          flex: 1;
        }

        .pickaxe-material {
          font-size: 9px;
          font-weight: 1000;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
        }

        .pickaxe-info h3 {
          margin: 2px 0 5px;
          font-size: 16px;
          font-weight: 1000;
        }

        .pickaxe-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 10px;
          color: rgba(255,255,255,0.48);
        }

        /* =========================
           BARRAS
        ========================= */

        .stat-bars {
          margin-top: 14px;
          display: grid;
          gap: 7px;
        }

        .stat-row {
          display: grid;
          grid-template-columns: 88px 1fr;
          align-items: center;
          gap: 8px;
          font-size: 8px;
          font-weight: 1000;
          letter-spacing: 0.7px;
          color: rgba(255,255,255,0.35);
        }

        .bar {
          height: 5px;
          overflow: hidden;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
        }

        .bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: #ffd21f;
        }

        .card-wood .bar span {
          background:
            linear-gradient(
              90deg,
              #70401f,
              #d2914e
            );
        }

        .card-stone .bar span {
          background:
            linear-gradient(
              90deg,
              #666b72,
              #c5c9cf
            );
        }

        .card-iron .bar span {
          background:
            linear-gradient(
              90deg,
              #59636e,
              #e2e7ec
            );
        }

        .card-gold .bar span {
          background:
            linear-gradient(
              90deg,
              #a96800,
              #ffe16a
            );
        }

        .card-emerald .bar span {
          background:
            linear-gradient(
              90deg,
              #007b4d,
              #00ff9c
            );
          box-shadow:
            0 0 8px rgba(0,255,150,0.4);
        }

        .card-diamond .bar span {
          background:
            linear-gradient(
              90deg,
              #008fc4,
              #63eaff,
              #ffffff
            );
          box-shadow:
            0 0 8px rgba(0,220,255,0.5);
        }

        /* =========================
           COMPRA
        ========================= */

        .pickaxe-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 15px;
          padding-top: 13px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .price {
          font-size: 15px;
          font-weight: 1000;
          color: #ffd21f;
        }

        .free {
          color: #53e6a1;
        }

        .buy-button {
          min-width: 105px;
          padding: 10px 15px;
          border: 0;
          border-radius: 12px;
          background:
            linear-gradient(
              180deg,
              #ffe45c,
              #ffc400
            );
          color: #151000;
          font-size: 11px;
          font-weight: 1000;
          box-shadow:
            0 5px 15px rgba(255,190,0,0.15);
        }

        .buy-button:active {
          transform: scale(0.95);
        }

        /* =========================
           JEFES MINEROS
        ========================= */

        .boss-list {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .boss-card {
          display: grid;
          grid-template-columns: 65px 1fr;
          position: relative;
          padding: 15px;
          padding-bottom: 63px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.065),
              rgba(255,255,255,0.02)
            );
          box-shadow:
            0 10px 30px rgba(0,0,0,0.28);
        }

        .boss-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55px;
          height: 55px;
          border-radius: 17px;
          background:
            linear-gradient(
              145deg,
              rgba(255,210,31,0.2),
              rgba(255,210,31,0.04)
            );
          border: 1px solid rgba(255,210,31,0.2);
          font-size: 30px;
        }

        .boss-2 {
          background:
            linear-gradient(
              145deg,
              rgba(100,170,255,0.2),
              rgba(100,170,255,0.04)
            );
          border-color: rgba(100,170,255,0.25);
        }

        .boss-3 {
          background:
            linear-gradient(
              145deg,
              rgba(170,100,255,0.2),
              rgba(170,100,255,0.04)
            );
          border-color: rgba(170,100,255,0.25);
        }

        .boss-info {
          padding-left: 5px;
        }

        .boss-rank {
          font-size: 8px;
          font-weight: 1000;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
        }

        .boss-info h3 {
          margin: 3px 0;
          font-size: 16px;
          font-weight: 1000;
        }

        .boss-info p {
          margin: 0;
          font-size: 10px;
          line-height: 1.45;
          color: rgba(255,255,255,0.42);
        }

        .boss-production {
          margin-top: 6px;
          font-size: 10px;
          font-weight: 900;
          color: #ffd21f;
        }

                .boss-buy {
          position: absolute;
          left: 15px;
          right: 15px;
          bottom: 13px;
          height: 37px;
          border: 1px solid rgba(255,210,31,0.2);
          border-radius: 11px;
          background:
            linear-gradient(
              180deg,
              rgba(255,210,31,0.18),
              rgba(255,210,31,0.08)
            );
          color: #ffd21f;
          font-size: 11px;
          font-weight: 1000;
        }

        .boss-buy:active {
          transform: scale(0.98);
        }

        /* =========================
           MENSAJE
        ========================= */

        .shop-message {
          margin-top: 17px;
          padding: 12px;
          border-radius: 13px;
          border: 1px solid rgba(255,210,31,0.2);
          background: rgba(255,210,31,0.08);
          text-align: center;
          font-size: 11px;
          font-weight: 900;
          color: #ffe477;
        }

        /* =========================
           VOLVER A LA MINA
        ========================= */

        .return-button {
          width: 100%;
          margin-top: 20px;
          padding: 15px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0.025)
            );
          color: rgba(255,255,255,0.55);
          font-size: 12px;
          font-weight: 1000;
        }

        .return-button:active {
          transform: scale(0.98);
        }

        /* =========================
           ANIMACIÓN PICO
        ========================= */

        .pickaxe-icon {
          animation: pickaxeFloat 2.8s ease-in-out infinite;
        }

        @keyframes pickaxeFloat {
          0%,
          100% {
            transform: rotate(-32deg) translateY(0);
          }

          50% {
            transform: rotate(-28deg) translateY(-3px);
          }
        }

        .card-gold .pickaxe-icon {
          filter:
            drop-shadow(0 5px 5px rgba(0,0,0,0.7))
            drop-shadow(0 0 7px rgba(255,196,0,0.35));
        }

        .card-emerald .pickaxe-icon {
          filter:
            drop-shadow(0 5px 5px rgba(0,0,0,0.7))
            drop-shadow(0 0 9px rgba(0,255,160,0.35));
        }

        .card-diamond .pickaxe-icon {
          filter:
            drop-shadow(0 5px 5px rgba(0,0,0,0.7))
            drop-shadow(0 0 11px rgba(0,220,255,0.45));
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 380px) {

          .shop-container {
            padding-left: 12px;
            padding-right: 12px;
          }

          .shop-header h1 {
            font-size: 22px;
          }

          .pickaxe-display {
            width: 68px;
            height: 68px;
          }

          .pickaxe-info h3 {
            font-size: 14px;
          }

          .pickaxe-stats {
            font-size: 9px;
          }

          .shop-tab {
            font-size: 10px;
          }

          .boss-info h3 {
            font-size: 14px;
          }
        }

        @media (min-width: 600px) {

          .shop-container {
            padding-top: 30px;
          }

          .pickaxe-list {
            gap: 16px;
          }

          .pickaxe-card {
            padding: 18px;
          }
        }

      `}</style>

    </main>
  );
}
