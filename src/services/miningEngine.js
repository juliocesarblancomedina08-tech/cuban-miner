import GameStore from "../store/GameStore";

class MiningEngine {
  constructor() {
    this.interval = null;
  }

  startMining() {
    const currentPickaxe =
      GameStore.currentPickaxe;

    if (!currentPickaxe) {
      return {
        success: false,
        message: "No pickaxe equipped"
      };
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

    GameStore.startMining();

    this.interval = setInterval(() => {
      GameStore.addCoins(
        currentPickaxe.miningRate
      );

      console.log(
        `Mining... +${currentPickaxe.miningRate}`
      );
    }, 60000);

    return {
      success: true,
      message: "Mining started"
    };
  }

  stopMining() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    GameStore.stopMining();

    return {
      success: true,
      message: "Mining stopped"
    };
  }

  calculateOfflineRewards(minutes) {
    const pickaxe =
      GameStore.currentPickaxe;

    if (!pickaxe) return 0;

    return (
      pickaxe.miningRate * minutes
    );
  }

  claimOfflineRewards(minutes) {
    const reward =
      this.calculateOfflineRewards(
        minutes
      );

    GameStore.addCoins(reward);

    return reward;
  }

  breakPickaxe() {
    GameStore.currentPickaxe = null;

    this.stopMining();

    return {
      success: true,
      message: "Pickaxe broken"
    };
  }
}

const miningEngine =
  new MiningEngine();

export default miningEngine;
