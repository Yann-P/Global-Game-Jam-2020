import { Objet } from "../objects/objet";
import { MRT } from "../objects/mrt";

export interface InitData {
  keys: string[];
  timeS: number;
}

export class MainScene extends Phaser.Scene {
  private initData: InitData;
  private timeRemaining: number;

  constructor() {
    super("play");
  }

  init(data: InitData) {
    this.initData = data;
    this.timeRemaining = this.initData.timeS;
  }

  create() {
    let levelIsOver = false;
    let modele: Phaser.GameObjects.Image;
    let objets = this.add.group();
    let timerText: Phaser.GameObjects.Text;
    let step = 0;
    let timer: Phaser.Time.TimerEvent;
    let bgMusic = this.sound.add("MusiqueLevel", {
      rate: 10 / this.initData.timeS
    });
    let tv: Phaser.GameObjects.Image;
    let tvBg: Phaser.GameObjects.Graphics;
    let mrt: MRT;
    let tutoPtr: Phaser.GameObjects.Image;

    let pickOrder = [];
    for (let i = 0; i < this.initData.keys.length; i++) {
      pickOrder.push(i);
    }
    pickOrder = pickOrder.sort((a, b) => (Math.random() < 0.5 ? 1 : -1));
    bgMusic.play();

    console.log("Scene::play");

    const [W, H] = [this.scale.width, this.scale.height];

    const gameOver = () => {
      const win = step === this.initData.keys.length;
      this.feedback(win);

      setTimeout(() => {
        this.scene.start("starter", { lastLevelResult: win });
      }, 200);
      bgMusic.destroy();
    };

    const addBg = () => {
      const fond = this.add.image(0, 0, "Fond_etagere");
      fond.setOrigin(0, 0);
    };

    const addTimer = () => {
      timerText = this.add.text(159, 450, "20", {
        fontFamily: "Mechanoarc, serif",
        fontSize: "100px",
        color: "white",
        align: "center",
        fixedWidth: 200
      });
      timerText.setOrigin(0.5, 0.5);
    };

    const addModele = () => {
      modele = this.add.image(tv.x + tv.width / 2, tv.y + tv.height / 2, "");
    };

    const addTV = () => {
      tv = this.add.image(430, 120, "TV");
      tv.setOrigin(0, 0);
      tvBg = this.add.graphics({ fillStyle: { color: 0x000000 } });
      tvBg.fillRect(38 + tv.x, 38 + tv.y, 365, 280);
      tv.z += 2;
    };

    const setModeleToCurrentKey = () => {
      modele.setTexture(this.initData.keys[pickOrder[step]]);
      modele.setScale(200 / modele.width);
    };

    const nextItem = () => {
      step++;
      if (step === this.initData.keys.length) {
        this.timeRemaining = 2;
        levelIsOver = true;
        //        mrt.flex(true);
        modele.destroy();
        return;
      }
      setModeleToCurrentKey();
    };

    const addObjects = (rowYs: number[]) => {
      const n = this.initData.keys.length;
      this.initData.keys.forEach((key, i) => {
        const iRow = ~~(i / 3);
        const nRow = Math.min(3, n - iRow * 3);
        const o = new Objet({
          scene: this,
          x: W * (((i % 3) + 1) / (nRow + 1)),
          y: rowYs[iRow],
          key
        });

        o.setInteractive({ draggable: true });

        o.on("dragstart", (pointer, el: Objet, x, y) => {
          if (levelIsOver) return;

          const key = o.texture.key;
          const volume = key === "Pomme" ? 0.7 : 0.4;
          this.sound.play(key, { volume });
          mrt.eat(true);
          mrt.happy(false);
          mrt.mad(false);
        });

        o.on("drag", (pointer, el: Objet, x, y) => {
          if (levelIsOver) return;
          if (o.x > 0 && o.y > 0 && o.x <= W && o.y <= H) {
            o.x = pointer.x;
            o.y = pointer.y;
          } else {
            o.x = o.props.initialX;
            o.y = o.props.initialY;
          }
        });

        o.on("drop", (pointer: Phaser.Input.Pointer) => {
          if (levelIsOver) return;

          mrt.eat(false);

          const win = key === this.initData.keys[pickOrder[step]];
          if (pointer.y < H * (2 / 3)) {
            o.x = o.props.initialX;
            o.y = o.props.initialY;
          } else {
            if (win) {
              this.sound.play("GoodItem");
              mrt.happy(true);
              o.destroy();
              nextItem();
            } else {
              this.feedback(false);
              mrt.mad(true);

              this.sound.play("BadItem");
              o.x = o.props.initialX;
              o.y = o.props.initialY;
            }
          }
        });

        this.add.existing(o);
      });
    };

    this.add
      .zone(0, 0, 0, 0)
      .setDropZone(
        new Phaser.Geom.Rectangle(0, 0, W, H),
        Phaser.Geom.Rectangle.Contains
      );

    addBg();
    addTimer();
    addTV();
    addModele();
    setModeleToCurrentKey();
    mrt = new MRT({ scene: this, x: W / 2, y: H * (4 / 5) });
    this.add.existing(mrt);

    addObjects([900, 1200]);

    timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining--;
        timerText.setText(String(~~this.timeRemaining));
        timerText.setScale(3);

        this.add.tween({
          targets: [timerText],
          props: {
            scale: 1
          },
          duration: 200
        });

        if (this.timeRemaining <= 3) {
          timerText.setColor("red");
        }

        if (this.timeRemaining <= 0) {
          console.log("TIME OUT");
          gameOver();
        }
      },
      callbackScope: this,
      loop: true
    });

    timerText.setText(String(~~this.timeRemaining));
  }

  private feedback(positive: boolean) {
    const g = this.add.graphics({
      fillStyle: { color: positive ? 0x00ff00 : 0xff0000, alpha: 1 },
      x: 0,
      y: 0
    });
    g.alpha = 0.5;
    g.fillRect(0, 0, this.scale.width, this.scale.height);
    const t = this.add.tween({
      targets: [g],
      props: { alpha: 0 },
      duration: 1000,
      onComplete: () => {
        t.remove();
      }
    });
  }
}
