import { NextResponse } from "next/server";

import {
  createPlayer,
} from "../../../lib/game";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "Player API funcionando",
  });
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const username =
      String(
        body.username ?? ""
      )
        .trim()
        .replace(/^@/, "");

    if (!username) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Nombre obligatorio.",
        },
        {
          status: 400,
        }
      );
    }

    const player =
      createPlayer(username);

    return NextResponse.json({
      ok: true,
      player,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Error creando jugador.",
      },
      {
        status: 500,
      }
    );
  }
}
