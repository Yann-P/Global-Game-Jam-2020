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

export class LoaderScene extends Phaser.Scene {
  constructor() {
    super("loader");
  }

  preload() {
    for (const key of [
      "Ampoule",
      "Cable",
      "Camion",
      "Pomme",
      "Rayon",
      "Fond_etagere",
      "Papier",
      "Caddie",
      "Transition"
    ])
      this.load.image(key, "assets/" + key + ".png");
  }

  create() {
    this.scene.start("starter");
  }
}
