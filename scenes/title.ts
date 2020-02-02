export class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }

  preload() {
    for (const key of ["Bouton_Jouer", "Bouton_Option", "Bouton_Quitter"])
      this.load.image(key, "assets/" + key + ".png");

    this.load.image("Titre", "assets/Titre.jpg");
  }

  create() {
    const [W, H] = [this.scale.width, this.scale.height];

    const bgMusic = this.sound.add("MusiqueMenu");
    bgMusic.play();

    const fond = this.add.image(0, 0, "Titre");
    fond.setOrigin(0, 0);

    const titleText = this.add.text(W / 2, 100, "REPAIRCEPTION", {
      fontFamily: "Mechanoarc, serif",
      fontSize: "100px",
      color: "white",
      align: "center",
      fixedWidth: W
    });
    titleText.setOrigin(0.5, 0);

    const addBouton = (y, key, cb) => {
      const bouton = this.add.image(W / 2, y, key);
      bouton.setInteractive();
      bouton.on("pointerup", cb);
    };

    addBouton(H / 4, "Bouton_Jouer", () => {
      bgMusic.destroy();
      this.scene.start("starter", { lastLevelResult: null });
    });
  }
}
