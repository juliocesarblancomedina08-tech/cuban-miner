import { NextResponse } from "next/server";

const tutorial = [
  {
    id: 1,
    character: "⛏️",
    title: "¡Bienvenido a CUBAN-MINER!",
    message:
      "Soy tu guía. Te enseñaré cómo comenzar a trabajar en la mina.",
  },
  {
    id: 2,
    character: "⛏️",
    title: "Tu primera mina",
    message:
      "Aquí encontrarás tus trabajadores, el elevador y el almacén.",
  },
  {
    id: 3,
    character: "⛏️",
    title: "Comienza a minar",
    message:
      "Al principio puedes tocar la zona de minería para hacer trabajar al minero.",
  },
  {
    id: 4,
    character: "⛏️",
    title: "Consigue un pico",
    message:
      "Visita la tienda para conseguir herramientas que mejoren tu minería.",
  },
  {
    id: 5,
    character: "⛏️",
    title: "Mejora tu mina",
    message:
      "A medida que progreses podrás desbloquear mejores herramientas y nuevas zonas.",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    tutorial,
  });
}
