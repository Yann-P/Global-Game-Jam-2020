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
      "Mute",
      "MRT",
      "MRT_cry_overlay",
      "MRT_door_overlay",
      "MRT_eat_overlay",
      "Tear",
      "Arm"
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
      "MusiqueMenu",
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
