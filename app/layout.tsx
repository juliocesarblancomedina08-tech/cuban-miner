import "./globals.css";

export const metadata = {
  title: "🇨🇺 CUBAN-MINER ⛏️",
  description: "CUBAN-MINER — Mine, build and grow.",
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
