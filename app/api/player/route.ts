import { NextResponse } from "next/server";

import {
  createPlayer,
} from "../../../../lib/game";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const telegramId = String(body.telegramId || "");
    const username = String(body.username || "");

    if (!telegramId) {
      return NextResponse.json(
        {
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
          error: "username requerido",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * DEMO
     *
     * Todavía no guardamos jugadores
     * en una base de datos.
     *
     * Eso lo conectaremos posteriormente
     * con PostgreSQL.
     */

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
        error: "Solicitud inválida",
      },
      {
        status: 400,
      }
    );
  }
}
