"use client";

import { useState } from "react";

type Section = "mine" | "shop" | "rewards" | "profile" | "friends";

export default function GamePage() {
  const [section, setSection] = useState<Section>("mine");
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(100);

  const mine = () => {
    if (energy <= 0) return;

    setCoins((value) => value + 1);
    setEnergy((value) => value - 1);
  };

  const renderSection = () => {
    switch (section) {
      case "shop":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🛒</div>
              <h2 className="text-2xl font-black">TIENDA</h2>
              <p className="mt-2 text-sm text-white/60">
                Próximamente
              </p>
            </div>
          </div>
        );

      case "rewards":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🏆</div>
              <h2 className="text-2xl font-black">PREMIOS</h2>
              <p className="mt-2 text-sm text-white/60">
                Próximamente
              </p>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-black">PERFIL</h2>
              <p className="mt-2 text-sm text-white/60">
                Jugador
              </p>
            </div>
          </div>
        );

      case "friends":
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">👥</div>
              <h2 className="text-2xl font-black">AMIGOS</h2>
              <p className="mt-2 text-sm text-white/60">
                Invita amigos y consigue recompensas.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-black flex justify-center overflow-hidden">

      <div className="relative w-full max-w-[430px] h-[100dvh] overflow-hidden">

        {/* ================================================== */}
        {/* IMAGEN COMPLETA DEL JUEGO */}
        {/* ================================================== */}

        <img
          src="/images/game-screen.png"
          alt="🇨🇺 CUBAN-MINER ⛏️"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />

        {/* ================================================== */}
        {/* INFORMACIÓN DINÁMICA */}
        {/* ================================================== */}

        {section === "mine" && (
          <>
            {/* MONEDAS */}
            <div className="absolute top-[10%] left-[8%] text-white font-black text-xl pointer-events-none">
              🪙 {coins.toLocaleString()}
            </div>

            {/* ENERGÍA */}
            <div className="absolute top-[10%] right-[8%] text-white font-black text-xl pointer-events-none">
              ⚡ {energy}
            </div>

            {/* CONTADOR DE ENERGÍA */}
            <div className="absolute bottom-[12%] left-[10%] right-[10%] pointer-events-none">
              <div className="h-2 rounded-full bg-black/50 overflow-hidden">
                <div
                  className="h-full bg-green-400 transition-all duration-200"
                  style={{
                    width: `${energy}%`,
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* ================================================== */}
        {/* CONTENIDO DE SECCIONES */}
        {/* ================================================== */}

        {section !== "mine" && renderSection()}

        {/* ================================================== */}
        {/* ZONA TÁCTIL — MINAR */}
        {/* ================================================== */}

        {section === "mine" && (
          <button
            type="button"
            aria-label="Minar"
            onClick={mine}
            disabled={energy <= 0}
            className="absolute left-[25%] top-[36%] w-[50%] h-[30%] rounded-full bg-transparent active:scale-95 transition-transform disabled:pointer-events-none"
          />
        )}

        {/* ================================================== */}
        {/* ZONA TÁCTIL — TIENDA */}
        {/* ================================================== */}

        <button
          type="button"
          aria-label="Tienda"
          onClick={() => setSection("shop")}
          className="absolute bottom-0 left-0 w-[20%] h-[11%] bg-transparent"
        />

        {/* ================================================== */}
        {/* ZONA TÁCTIL — PREMIOS */}
        {/* ================================================== */}

        <button
          type="button"
          aria-label="Premios"
          onClick={() => setSection("rewards")}
          className="absolute bottom-0 left-[20%] w-[20%] h-[11%] bg-transparent"
        />

        {/* ================================================== */}
        {/* ZONA TÁCTIL — MINAR */}
        {/* ================================================== */}

        <button
          type="button"
          aria-label="Minería"
          onClick={() => setSection("mine")}
          className="absolute bottom-0 left-[40%] w-[20%] h-[11%] bg-transparent"
        />

        {/* ================================================== */}
        {/* ZONA TÁCTIL — PERFIL */}
        {/* ================================================== */}

        <button
          type="button"
          aria-label="Perfil"
          onClick={() => setSection("profile")}
          className="absolute bottom-0 left-[60%] w-[20%] h-[11%] bg-transparent"
        />

        {/* ================================================== */}
        {/* ZONA TÁCTIL — AMIGOS */}
        {/* ================================================== */}

        <button
          type="button"
          aria-label="Amigos"
          onClick={() => setSection("friends")}
          className="absolute bottom-0 left-[80%] w-[20%] h-[11%] bg-transparent"
        />

      </div>

    </main>
  );
        }
