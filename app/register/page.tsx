
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirm) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: name.trim(),
        },
        emailRedirectTo:
          `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setMessage(
        "Cuenta creada. Revisa tu correo para confirmar tu dirección antes de iniciar sesión."
      );
    }
  }

  return (
    <main
      className="sg-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div className="sg-card">
        <h1
          style={{
            textAlign: "center",
            color: "#48a5ff",
          }}
        >
          SG INVEST
        </h1>

        <h2 style={{ textAlign: "center" }}>
          Crear cuenta
        </h2>

        <p
          className="sg-muted"
          style={{ textAlign: "center" }}
        >
          Regístrate para acceder a tu plataforma.
        </p>

        <form
          onSubmit={handleRegister}
          style={{
            display: "grid",
            gap: 16,
            marginTop: 25,
          }}
        >
          <input
            className="sg-input"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />

          <input
            className="sg-input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="sg-input"
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <input
            className="sg-input"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {message && (
            <p
              style={{
                color: "#75baff",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {message}
            </p>
          )}

          <button
            className="sg-button"
            disabled={loading}
          >
            {loading
              ? "CREANDO CUENTA..."
              : "CREAR CUENTA"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 25,
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="sg-link">
            Iniciar sesión
          </Link>
        </p>

        <p
          className="sg-muted"
          style={{
            fontSize: 12,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          SG INVEST es una plataforma de
          demostración y educación financiera.
        </p>
      </div>
    </main>
  );
}
