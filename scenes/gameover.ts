export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  preload() {
    for (const key of ["Bouton_Jouer", "Bouton_Option", "Bouton_Quitter"])
      this.load.image(key, "assets/" + key + ".png");

    this.load.image("Titre", "assets/Titre.jpg");
  }

  create() {
    
  }
}
