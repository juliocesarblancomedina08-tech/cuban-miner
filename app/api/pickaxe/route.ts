import { NextResponse } from "next/server";

import {
  PICKAXES,
  type PickaxeId,
} from "../../../lib/game";

export async function GET() {
  return NextResponse.json({
    ok: true,
    pickaxes: Object.values(
      PICKAXES
    ),
  });
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const id =
      body.pickaxe as PickaxeId;

    if (!id || !PICKAXES[id]) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Pico no encontrado.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      ok: true,
      pickaxe: PICKAXES[id],
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Error seleccionando pico.",
      },
      {
        status: 500,
      }
    );
  }
}
