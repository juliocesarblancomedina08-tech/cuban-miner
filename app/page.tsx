
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="sg-container">
      <nav
        style={{
          padding: "22px 7%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 15,
          borderBottom: "1px solid rgba(72,165,255,0.12)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#48a5ff",
            textDecoration: "none",
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          SG INVEST
        </Link>

        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/login" className="sg-link">
            Iniciar sesión
          </Link>

          <Link href="/register" className="sg-link">
            Registrarse
          </Link>
        </div>
      </nav>

      <section
        style={{
          minHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "60px 22px",
          background:
            "radial-gradient(circle at center, rgba(22,133,248,0.15), transparent 65%)",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(72,165,255,0.35)",
            borderRadius: 30,
            padding: "9px 20px",
            marginBottom: 20,
            background: "rgba(22,133,248,0.08)",
          }}
        >
          <span
            style={{
              color: "#48a5ff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            BIENVENIDO A SG INVEST
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(38px, 7vw, 68px)",
            maxWidth: 850,
            lineHeight: 1.12,
            margin: "10px 0 22px",
            fontWeight: 800,
          }}
        >
          Construye tu conocimiento{" "}
          <span style={{ color: "#48a5ff" }}>
            financiero.
          </span>
        </h1>

        <p
          className="sg-muted"
          style={{
            maxWidth: 620,
            fontSize: 17,
            lineHeight: 1.9,
          }}
        >
          Descubre herramientas digitales,
          aprende conceptos financieros y
          administra tu cuenta desde una
          plataforma moderna, sencilla y segura.
        </p>

        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 35,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Link
            href="/register"
            className="sg-button"
            style={{
              width: "auto",
              minWidth: 170,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Crear cuenta →
          </Link>

          <Link
            href="/login"
            style={{
              padding: 15,
              border: "1px solid #1685f8",
              borderRadius: 10,
              color: "#ffffff",
              textDecoration: "none",
              minWidth: 170,
            }}
          >
            Iniciar sesión
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 35,
            flexWrap: "wrap",
            marginTop: 65,
          }}
        >
          <div>
            <h3 style={{ color: "#48a5ff", fontSize: 19 }}>
              Educación
            </h3>
            <p className="sg-muted">
              Aprende a tu ritmo
            </p>
          </div>

          <div>
            <h3 style={{ color: "#48a5ff", fontSize: 19 }}>
              Tecnología
            </h3>
            <p className="sg-muted">
              Herramientas digitales
            </p>
          </div>

          <div>
            <h3 style={{ color: "#48a5ff", fontSize: 19 }}>
              Control
            </h3>
            <p className="sg-muted">
              Administra tu cuenta
            </p>
          </div>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: 25,
          color: "#91a9c2",
          borderTop: "1px solid rgba(72,165,255,0.12)",
          fontSize: 13,
        }}
      >
        © 2026 SG INVEST. Todos los derechos reservados.
        <p style={{ marginTop: 10 }}>
          Plataforma de demostración y educación financiera.
          No ofrece inversiones ni garantiza rendimientos.
        </p>
      </footer>
    </main>
  );
}
