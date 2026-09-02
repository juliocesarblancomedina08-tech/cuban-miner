import { ECONOMY } from "../config/economy";

const GameStore = {
  minerCoins: 0,

  usdtBalance: 0,

  currentPickaxe: null,

  miningActive: false,

  playerLevel: 1,

  inventory: [],

  buyPickaxe(pickaxeId) {
    const pickaxe = ECONOMY.PICKAXES.find(
      p => p.id === pickaxeId
    );

    if (!pickaxe) {
      return {
        success: false,
        message: "Pickaxe not found"
      };
    }

    if (this.minerCoins < pickaxe.cost) {
      return {
        success: false,
        message: "Not enough Miner Coins"
      };
    }

    this.minerCoins -= pickaxe.cost;

    this.inventory.push({
      ...pickaxe,
      purchaseDate: Date.now()
    });

    return {
      success: true,
      message: "Pickaxe purchased"
    };
  },

  addCoins(amount) {
    this.minerCoins += amount;
  },

  removeCoins(amount) {
    this.minerCoins -= amount;
  },

  equipPickaxe(pickaxe) {
    this.currentPickaxe = pickaxe;
  },

  startMining() {
    this.miningActive = true;
  },

  stopMining() {
    this.miningActive = false;
  }
};

export default GameStore;
      
