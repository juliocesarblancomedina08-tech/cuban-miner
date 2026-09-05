import { NextResponse } from "next/server";

type Mission = {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: "daily" | "special" | "ad";
  target: number;
};

const missions: Mission[] = [
  {
    id: "daily-mine",
    title: "⛏️ Minero activo",
    description: "Mina 10 veces.",
    reward: 25,
    type: "daily",
    target: 10,
  },
  {
    id: "daily-coins",
    title: "🪙 Recolector",
    description: "Consigue 100 Miner Coins.",
    reward: 50,
    type: "daily",
    target: 100,
  },
  {
    id: "watch-ad",
    title: "📺 Ver anuncio",
    description: "Mira un anuncio completo.",
    reward: 20,
    type: "ad",
    target: 1,
  },
  {
    id: "special",
    title: "🏆 Primer objetivo",
    description: "Consigue tu primer pico.",
    reward: 100,
    type: "special",
    target: 1,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    missions,
  });
    }
