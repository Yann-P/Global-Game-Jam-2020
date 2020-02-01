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
      "Voiture",
      "Transition"
    ])
      this.load.image(key, "assets/" + key + ".png");

    for (const key of ["GoodItem", "BadItem", "BrosseADents", "MusiqueLevel"])
      this.load.audio(key, "assets/" + key + ".ogg");
  }

  create() {
    this.scene.start("title");
  }
}
