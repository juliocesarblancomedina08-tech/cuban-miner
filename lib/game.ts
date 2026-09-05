export type PickaxeId =
  | "wood"
  | "stone"
  | "iron"
  | "gold"
  | "emerald"
  | "diamond";

export type Pickaxe = {
  id: PickaxeId;
  name: string;
  icon: string;
  price: number;
  durabilityDays: number;
  production: number;
};

export const PICKAXES: Record<
  PickaxeId,
  Pickaxe
> = {
  wood: {
    id: "wood",
    name: "Pico de madera",
    icon: "🪵",
    price: 0,
    durabilityDays: 21,
    production: 350,
  },

  stone: {
    id: "stone",
    name: "Pico de piedra",
    icon: "🪨",
    price: 500,
    durabilityDays: 17,
    production: 600,
  },

  iron: {
    id: "iron",
    name: "Pico de hierro",
    icon: "⚙️",
    price: 1500,
    durabilityDays: 15,
    production: 1770,
  },

  gold: {
    id: "gold",
    name: "Pico de oro",
    icon: "🥇",
    price: 3500,
    durabilityDays: 13,
    production: 4025,
  },

  emerald: {
    id: "emerald",
    name: "Pico de esmeralda",
    icon: "💚",
    price: 7500,
    durabilityDays: 10,
    production: 8400,
  },

  diamond: {
    id: "diamond",
    name: "Pico de diamante",
    icon: "💎",
    price: 15000,
    durabilityDays: 7,
    production: 16500,
  },
};

export function createPlayer(
  username: string
) {
  const random =
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  return {
    id: `CM-${random}`,
    username,
    minerCoins: 0,
    minerals: 0,
    energy: 100,
    level: 1,
    experience: 0,
    pickaxe: null as PickaxeId | null,
    createdAt:
      new Date().toISOString(),
  };
}

export function calculateMiningReward(
  pickaxe: PickaxeId | null
) {
  if (!pickaxe) {
    return {
      minerCoins: 1,
      minerals: 1,
      experience: 1,
    };
  }

  return {
    minerCoins: 1,
    minerals: 1,
    experience: 2,
  };
}
