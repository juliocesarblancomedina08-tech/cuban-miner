import { NextResponse } from "next/server";

import { createPlayer } from "../../../lib/game";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const telegramId = String(body.telegramId || "").trim();
    const username = String(body.username || "").trim();

    if (!telegramId) {
      return NextResponse.json(
        {
          success: false,
          error: "telegramId requerido",
        },
        {
          status: 400,
        }
      );
    }

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          error: "username requerido",
        },
        {
          status: 400,
        }
      );
    }

    const player = createPlayer(
      telegramId,
      username
    );

    return NextResponse.json({
      success: true,
      player,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}
