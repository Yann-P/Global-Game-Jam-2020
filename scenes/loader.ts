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
      "Voiture",
      "Compteur",
      "TV",
      "PV",
      "Mute"
    ])
      this.load.image(key, "assets/" + key + ".png");

    this.load.image("Fond_etagere", "assets/Fond_etagere.jpg");

    for (const key of [
      "GoodItem",
      "BadItem",
      "Pomme",
      "Camion",
      "Voiture",
      "Ampoule",
      "Cable",
      "MusiqueLevel",
      "MusiqueTransition",
      "Bouton",
      "TV"
    ])
      this.load.audio(key, "assets/" + key + ".ogg");

    this.load.glsl("tv", "assets/tv.glsl");
  }

  create() {
    this.scene.start("title");
  }
}
