import { NextResponse } from "next/server";

type Pickaxe = {
  id: string;
  name: string;
  level: number;
  price: number;
  durabilityDays: number;
  production: number;
  description: string;
  unlocked: boolean;
};

const pickaxes: Pickaxe[] = [
  {
    id: "wood",
    name: "Pico de madera",
    level: 1,
    price: 100,
    durabilityDays: 21,
    production: 350,
    description: "Pico básico para comenzar a minar.",
    unlocked: true,
  },
  {
    id: "stone",
    name: "Pico de piedra",
    level: 2,
    price: 500,
    durabilityDays: 17,
    production: 900,
    description: "Mejor velocidad y producción.",
    unlocked: true,
  },
  {
    id: "iron",
    name: "Pico de hierro",
    level: 3,
    price: 1500,
    durabilityDays: 15,
    production: 3000,
    description: "Un pico resistente para mineros avanzados.",
    unlocked: false,
  },
  {
    id: "gold",
    name: "Pico de oro",
    level: 4,
    price: 3500,
    durabilityDays: 13,
    production: 8000,
    description: "Gran producción durante su duración.",
    unlocked: false,
  },
  {
    id: "emerald",
    name: "Pico de esmeralda",
    level: 5,
    price: 7500,
    durabilityDays: 10,
    production: 20000,
    description: "Pico de alto nivel.",
    unlocked: false,
  },
  {
    id: "diamond",
    name: "Pico de diamante",
    level: 6,
    price: 15000,
    durabilityDays: 7,
    production: 50000,
    description: "El pico más poderoso de la mina.",
    unlocked: false,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    pickaxes,
  });
}
