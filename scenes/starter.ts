/*
"Ampoule",
      "Cable",
      "Camion",
      "Pomme",
      "Rayon",
      "Fond_etagere",
      "Papier",
      "Caddie"

*/

import { InitData } from "./main-scene";

export class StarterScene extends Phaser.Scene {
  constructor() {
    super("starter");
  }

  create() {
    console.log("starter");

    const fond = this.add.image(0, 0, "Transition");
    fond.setOrigin(0, 0);

    this.time.delayedCall(
      1000,
      () => {
        const keys = ["Camion", "Ampoule", "Pomme", "Cable"];
        this.scene.start("play", {
          winningKey: keys[~~(Math.random() * keys.length)],
          keys: keys.sort((a, b) => (Math.random() < 0.5 ? 1 : -1)),
          timeS: 5
        } as InitData);
      },
      [],
      this
    );
  }
}
