import { NextResponse } from "next/server";

import {
  calculateMiningReward,
  type PickaxeId,
} from "../../../lib/game";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const energy =
      Number(body.energy ?? 0);

    const pickaxe =
      (body.pickaxe ??
        null) as PickaxeId | null;

    if (energy <= 0) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Sin energía.",
        },
        {
          status: 400,
        }
      );
    }

    const reward =
      calculateMiningReward(
        pickaxe
      );

    return NextResponse.json({
      ok: true,
      reward,
      energy: energy - 1,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Error de minería.",
      },
      {
        status: 500,
      }
    );
  }
}
