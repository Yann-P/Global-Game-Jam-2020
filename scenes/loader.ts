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
      "Voiture",
      "Compteur",
      "Colle",
      "Papier",
      "Tuyau",
      "Tournevis",
      "Canette",
      "Marteau",
      "TV",
      "PV",
      "MRT",
      "MRT_cry_overlay",
      "MRT_door_overlay",
      "MRT_eat_overlay",
      "MRT_happy_overlay",
      "MRT_mad_overlay",
      "pointer",
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
      "Colle",
      "Papier",
      "Tuyau",
      "Tournevis",
      "Canette",
      "Marteau",
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
