import { NextResponse } from "next/server";

const mines = [
  {
    id: 1,
    name: "Mina de inicio",
    level: 1,
    unlocked: true,
    workers: 1,
    elevatorLevel: 1,
    warehouseLevel: 1,
    minerals: 0,
  },
  {
    id: 2,
    name: "Mina de piedra",
    level: 2,
    unlocked: false,
    workers: 0,
    elevatorLevel: 0,
    warehouseLevel: 0,
    minerals: 0,
  },
  {
    id: 3,
    name: "Mina de hierro",
    level: 3,
    unlocked: false,
    workers: 0,
    elevatorLevel: 0,
    warehouseLevel: 0,
    minerals: 0,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    mines,
  });
}
