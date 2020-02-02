import { InitData } from "./main-scene";
import { State } from "../state";
import { MRT } from "../objects/mrt";

export class StarterScene extends Phaser.Scene {
  private lastLevelResult: boolean | null;

  constructor() {
    super("starter");
  }

  init({ lastLevelResult }) {
    this.lastLevelResult = lastLevelResult;
  }

  create() {
    if (this.lastLevelResult === false) {
      State.nLife--;
    }
    State.nGame++;

    let tv: Phaser.GameObjects.Image;
    let tvShader: Phaser.GameObjects.Shader;

    const [W, H] = [this.scale.width, this.scale.height];
    const mrt = new MRT({ scene: this, x: W / 2, y: H * (4 / 5) });

    const addTV = () => {
      tvShader = this.add.shader("tv", 0, 0, 365, 280);
      tvShader.setScale(2);
      tvShader.x = W / 2 - 80;
      tvShader.y = H / 3 - 10;

      tv = this.add.image(W / 2, H / 3, "TV");
      tv.setScale(2);

      tv.z += 2;
    };

    const addFond = () => {
      const fond = this.add.image(0, 0, "Titre");
      fond.setOrigin(0, 0);
    };

    const addCompteur = () => {
      const compteur = this.add.image(W / 2 - 70, H / 3 - 30, "Compteur");
    };

    const addPV = () => {
      const n = this.lastLevelResult === false ? State.nLife + 1 : State.nLife;
      for (let i = 0; i < n; i++) {
        const life = this.add.image((W * (i + 1)) / (n + 1), H / 15, "PV");
        life.setScale(200 / life.width);

        if (this.lastLevelResult === false && i === n - 1) {
          this.add.tween({
            duration: Math.random() * 1000 + 1000,
            props: {
              alpha: 0,
              y: H
            },
            targets: [life],
            ease: "Linear"
          });
        } else {
          this.add.tween({
            duration: Math.random() * 1000 + 1000,
            props: {
              angle: 360
            },
            loop: -1,
            targets: [life],
            ease: "Linear"
          });
        }
      }
    };

    const addNGameText = () => {
      const nGameString = String(State.nGame).padStart(2, "0");
      const nGameText = this.add.text(
        W / 2 - 70,
        H / 3 - 180,
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
    };

    let bgMusic = this.sound.add("MusiqueTransition");
    bgMusic.play({ volume: 0.3 });

    let tvMusic = this.sound.add("TV", { volume: 0.5 });
    tvMusic.play();

    console.log("starter");

    console.log(State.nGame);

    const nObj = ((State.nGame - 1) % 3) + 3;

    this.time.delayedCall(
      2000,
      () => {
        const keys = ["Camion", "Ampoule", "Pomme", "Cable", "Voiture"]
          .sort((a, b) => (Math.random() < 0.5 ? 1 : -1))
          .slice(0, nObj);
        bgMusic.destroy();
        tvMusic.destroy();
        if (State.nLife === 0) {
          this.scene.start("gameover");
        } else {
          this.scene.start("play", {
            keys,
            timeS: 8 - 0.5 * (State.nGame / 3)
          } as InitData);
        }
      },
      [],
      this
    );

    if (this.lastLevelResult === true) {
      mrt.flex(true);
    } else if (this.lastLevelResult === false) {
      mrt.cry(true);
    }

    addFond();
    addTV();
    addCompteur();
    addNGameText();
    addPV();
    this.add.existing(mrt);
  }
}
