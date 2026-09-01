import "./globals.css";

export const metadata = {
  title: "Cuban Miner",
  description: "Mining Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
