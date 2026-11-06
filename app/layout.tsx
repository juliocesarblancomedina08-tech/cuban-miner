import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SG INVEST",
  description:
    "SG INVEST - Plataforma digital de educación financiera.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
