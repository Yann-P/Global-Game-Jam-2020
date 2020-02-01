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
import { State } from "../state";

export class StarterScene extends Phaser.Scene {
  constructor() {
    super("starter");
  }

  create() {
    console.log("starter");

    console.log(State.nGame);
    State.nGame++;

    const fond = this.add.image(0, 0, "Transition");
    fond.setOrigin(0, 0);

    const nGameString = String(State.nGame).padStart(2, "0");
    const nGameText = this.add.text(
      this.scale.width / 2,
      330,
      `${nGameString[0]}  ${nGameString[1]}`,
      {
        fontFamily: "Mechanoarc, serif",
        fontSize: "280px",
        color: "white",
        align: "center",
        fixedWidth: 800
      }
    );
    nGameText.setOrigin(0.5, 0);

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
