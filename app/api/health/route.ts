import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    game: "CUBAN-MINER",
    version: "0.1.0",
    status: "online",
  });
}
