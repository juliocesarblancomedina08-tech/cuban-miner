"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [error, setError] =
    useState("");

  function register() {
    const clean =
      username
        .trim()
        .replace(/^@/, "");

    if (clean.length < 3) {
      setError(
        "El nombre debe tener al menos 3 caracteres."
      );
      return;
    }

    if (clean.length > 20) {
      setError(
        "El nombre no puede superar 20 caracteres."
      );
      return;
    }

    if (
      !/^[a-zA-Z0-9_]+$/.test(clean)
    ) {
      setError(
        "Solo puedes utilizar letras, números y _."
      );
      return;
    }

    localStorage.setItem(
      "cuban_miner_registered",
      "true"
    );

    localStorage.setItem(
      "cuban_miner_username",
      clean
    );

    localStorage.setItem(
      "cuban_miner_tutorial",
      "false"
    );

    localStorage.setItem(
      "cuban_miner_coins",
      "0"
    );

    localStorage.setItem(
      "cuban_miner_minerals",
      "0"
    );

    localStorage.setItem(
      "cuban_miner_energy",
      "100"
    );

    router.push("/tutorial");
  }

  return (
    <main className="fixed inset-0 overflow-hidden bg-black text-white">

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col justify-center px-6">

        <div className="text-center">

          <div className="text-7xl">
            👷
          </div>

          <h1 className="mt-5 text-3xl font-black">
            🇨🇺 CUBAN-MINER ⛏️
          </h1>

          <p className="mt-2 text-white/50">
            Crea tu identidad de minero
          </p>

        </div>

        <div className="mt-8">

          <label className="text-sm font-bold text-white/60">
            NOMBRE DE USUARIO
          </label>

          <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-white/5 px-4">

            <span className="text-white/40">
              @
            </span>

            <input
              value={username}
              onChange={(event) => {
                setUsername(
                  event.target.value
                );

                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  register();
                }
              }}
              placeholder="tu_nombre"
              maxLength={20}
              autoComplete="off"
              className="w-full bg-transparent px-2 py-4 outline-none"
            />

          </div>

          {error && (
            <p className="mt-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={register}
            className="mt-5 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black active:scale-95"
          >
            CONTINUAR ⛏️
          </button>

        </div>

      </div>

    </main>
  );
      }
