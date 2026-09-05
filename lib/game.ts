export const GAME_NAME = "🇨🇺 CUBAN-MINER ⛏️";

export const MINER_COIN_PER_USDT = 500;

export const MINIMUM_WITHDRAWAL_USDT = 2;

export const PICKAXES = [
  {
    id: "wood",
    name: "Pico de madera",
    icon: "🪵",
    price: 0,
    priceUsdt: 0,
    durabilityDays: 21,
    production: 350,
    level: 1,
  },

  {
    id: "stone",
    name: "Pico de piedra",
    icon: "🪨",
    price: 500,
    priceUsdt: 1,
    durabilityDays: 17,
    production: 600,
    level: 2,
  },

  {
    id: "iron",
    name: "Pico de hierro",
    icon: "⚙️",
    price: 1500,
    priceUsdt: 3,
    durabilityDays: 15,
    production: 1770,
    level: 3,
  },

  {
    id: "gold",
    name: "Pico de oro",
    icon: "🥇",
    price: 3500,
    priceUsdt: 7,
    durabilityDays: 13,
    production: 4025,
    level: 4,
  },

  {
    id: "emerald",
    name: "Pico de esmeralda",
    icon: "💚",
    price: 7500,
    priceUsdt: 15,
    durabilityDays: 10,
    production: 8400,
    level: 5,
  },

  {
    id: "diamond",
    name: "Pico de diamante",
    icon: "💎",
    price: 15000,
    priceUsdt: 30,
    durabilityDays: 7,
    production: 16500,
    level: 6,
  },
] as const;

export type PickaxeId = (typeof PICKAXES)[number]["id"];

export type Player = {
  id: string;
  username: string;

  minerCoins: number;
  minerals: number;

  level: number;

  energy: number;
  maxEnergy: number;

  pickaxe: PickaxeId | null;

  createdAt: string;

  totalDepositsUsdt: number;
  totalWithdrawalsUsdt: number;

  referrals: number;
};

export function createPlayer(
  id: string,
  username: string
): Player {
  return {
    id,
    username,

    minerCoins: 0,
    minerals: 0,

    level: 1,

    energy: 100,
    maxEnergy: 100,

    pickaxe: null,

    createdAt: new Date().toISOString(),

    totalDepositsUsdt: 0,
    totalWithdrawalsUsdt: 0,

    referrals: 0,
  };
  }
