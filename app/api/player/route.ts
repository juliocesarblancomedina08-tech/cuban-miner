import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    player: {
      id: "DEMO-000001",
      username: "Jugador",
      level: 1,
      minerCoins: 0,
      minerals: 0,
      energy: 100,
      pickaxe: null,
      mineLevel: 1,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: "Jugador actualizado",
      player: body,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Datos inválidos",
      },
      { status: 400 }
    );
  }
}
