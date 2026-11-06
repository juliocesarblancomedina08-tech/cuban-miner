import Link from "next/link";

export default function HomePage() {
  return (
    <main className="sg-container">
      <nav
        style={{
          padding: "25px 7%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#48a5ff" }}>
          SG INVEST
        </h2>

        <Link href="/login" className="sg-link">
          Iniciar sesión
        </Link>
      </nav>

      <section
        style={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 25,
        }}
      >
        <p className="sg-link">
          BIENVENIDO A SG INVEST
        </p>

        <h1
          style={{
            fontSize: "clamp(38px, 7vw, 65px)",
            maxWidth: 750,
            margin: "15px 0",
          }}
        >
          Construye tu conocimiento financiero.
        </h1>

        <p
          className="sg-muted"
          style={{
            maxWidth: 550,
            lineHeight: 1.8,
          }}
        >
          Explora herramientas digitales,
          administra tu cuenta y conoce el mundo
          financiero desde una plataforma moderna.
        </p>

        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 30,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/register"
            className="sg-button"
            style={{ width: "auto" }}
          >
            Crear cuenta
          </Link>

          <Link
            href="/login"
            style={{
              padding: 15,
              border: "1px solid #1685f8",
              borderRadius: 10,
            }}
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: 25,
          color: "#91a9c2",
        }}
      >
        © 2026 SG INVEST
      </footer>
    </main>
  );
}
