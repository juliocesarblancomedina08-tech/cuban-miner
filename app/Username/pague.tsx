"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernamePage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(
      "cuban_miner_username"
    );

    if (saved) {
      setUsername(saved);
    }
  }, []);

  function save() {
    const clean = username.trim().replace(/^@/, "");

    if (clean.length < 3) {
      setMessage(
        "El nombre debe tener al menos 3 caracteres."
      );
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(clean)) {
      setMessage(
        "Solo letras, números y _."
      );
      return;
    }

    localStorage.setItem(
      "cuban_miner_username",
      clean
    );

    router.push("/game");
  }

  return (
    <main className="min-h-[100dvh] bg-black p-5 text-white">

      <div className="mx-auto max-w-[480px]">

        <button
          type="button"
          onClick={() => router.push("/game")}
          className="text-sm text-yellow-400"
        >
          ← Volver
        </button>

        <h1 className="mt-8 text-3xl font-black">
          CAMBIAR USUARIO
        </h1>

        <div className="mt-6 flex items-center rounded-2xl bg-white/5 px-4">

          <span className="text-white/40">
            @
          </span>

          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setMessage("");
            }}
            className="w-full bg-transparent px-2 py-4 outline-none"
            maxLength={20}
          />

        </div>

        {message && (
          <p className="mt-3 text-sm text-red-400">
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={save}
          className="mt-5 w-full rounded-2xl bg-yellow-500 py-4 font-black text-black"
        >
          GUARDAR
        </button>

      </div>

    </main>
  );
                          }
