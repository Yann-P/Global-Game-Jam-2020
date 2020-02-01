import { Objet } from "../objects/objet";

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
      loop: true
    });

    let pickOrder = [];
    for (let i = 0; i < this.initData.keys.length; i++) {
      pickOrder.push(i);
    }
    pickOrder = pickOrder.sort((a, b) => (Math.random() < 0.5 ? 1 : -1));

    console.log(pickOrder);

    bgMusic.play();

    console.log("Scene::play");

    const [W, H] = [this.scale.width, this.scale.height];

    const gameOver = (win: boolean) => {
      console.log("win", win);
      this.scene.start("starter");
      bgMusic.destroy();
    };

    const addBg = () => {
      const fond = this.add.image(0, 0, "Fond_etagere");
      fond.setOrigin(0, 0);

      const caddie = this.add.image(W / 2, H, "Caddie");
      caddie.setOrigin(0.5, 1);
    };

    const addTimer = () => {
      timerText = this.add.text(W / 2, 20, "20", {
        fontFamily: "Mechanoarc, serif",
        fontSize: "100px",
        color: "black",
        align: "center",
        fixedWidth: 200
      });
      timerText.setOrigin(0.5, 0);
    };

    const addModele = () => {
      modele = this.add.image(W / 2, W / 7, "");
    };

    const setModeleToCurrentKey = () => {
      modele.setTexture(this.initData.keys[pickOrder[step]]);
    };

    const nextItem = () => {
      step++;
      if (step === this.initData.keys.length) {
        levelIsOver = true;
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
          this.sound.play("BrosseADents");
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

          const win = key === this.initData.keys[pickOrder[step]];
          if (pointer.y < H * (2 / 3)) {
            o.x = o.props.initialX;
            o.y = o.props.initialY;
          } else {
            this.feedback(win);
            if (win) {
              this.sound.play("GoodItem");
              o.destroy();
              nextItem();
            } else {
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
    addModele();
    setModeleToCurrentKey();
    addObjects([900, 1200]);

    timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining--;
        timerText.setText(String(this.timeRemaining));
        if (this.timeRemaining === 0) {
          console.log("TIME OUT");
          gameOver(false);
        }
      },
      callbackScope: this,
      loop: true
    });

    timerText.setText(String(this.timeRemaining));
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
