import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const currentEnergy = Number(body.energy ?? 0);
    const amount = Number(body.amount ?? 0);

    const newEnergy = Math.min(100, currentEnergy + amount);

    return NextResponse.json({
      success: true,
      energy: newEnergy,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "No se pudo actualizar la energía.",
      },
      { status: 400 }
    );
  }
}
