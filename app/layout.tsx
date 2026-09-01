import "./globals.css";

export const metadata = {
  title: "Cuban Miner",
  description: "Mini App",
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
