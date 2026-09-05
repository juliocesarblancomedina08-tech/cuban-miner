import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const energy = Number(body.energy ?? 0);
    const coins = Number(body.minerCoins ?? 0);

    if (energy <= 0) {
      return NextResponse.json({
        success: false,
        message: "No tienes energía.",
        minerCoins: coins,
        energy: 0,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Mineral extraído.",
      minerCoins: coins + 1,
      energy: Math.max(0, energy - 1),
      minerals: Number(body.minerals ?? 0) + 1,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "No se pudo realizar la minería.",
      },
      { status: 400 }
    );
  }
}
