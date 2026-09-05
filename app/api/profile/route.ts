import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    profile: {
      playerId: "DEMO-000001",
      username: "Jugador",
      level: 1,
      minerCoins: 0,
      minerals: 0,
      energy: 100,
      totalDeposits: 0,
      totalWithdrawals: 0,
      referrals: 0,
      joinedAt: new Date().toISOString(),
    },
  });
}
