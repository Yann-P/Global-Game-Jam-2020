import { Objet } from "../objects/objet";
import { Texte } from "../objects/text";

export interface InitData {
  winningKey: string;
  keys: string[];
  timeS: number;
}

export class MainScene extends Phaser.Scene {
  private initData: InitData;
  private timer: Phaser.Time.TimerEvent;
  private timeRemaining: number;

  constructor() {
    super("play");
  }

  init(data) {
    this.initData = data;
    this.timeRemaining = this.initData.timeS;
  }

  private gameOver() {
    this.scene.start("starter");
  }

  create() {
    console.log("Scene::play");

    const [W, H] = [this.scale.width, this.scale.height];

    const addBg = () => {
      const fond = this.add.image(0, 0, "Fond_etagere");
      fond.setOrigin(0, 0);

      const caddie = this.add.image(W / 2, H, "Caddie");
      caddie.setOrigin(0.5, 1);
    };

    const addTimer = () => {
      const timer = this.add.text(W / 2, 20, "20", {
        fontFamily: "Mechanoarc, serif",
        fontSize: "100px",
        color: "black",
        align: "center",
        fixedWidth: 200
      });
      timer.setOrigin(0.5, 0);
      return timer;
    };

    const addTexte = () => {
      const text = new Texte({ scene: this, x: W / 2, y: H * (3 / 10) });
      text.setText(this.initData.winningKey);
      this.add.existing(text);
    };

    const addObjects = (rowYs: number[]) => {
      const keys = this.initData.keys;
      const n = keys.length;
      keys.forEach((key, i) => {
        const iRow = ~~(i / 3);
        const nRow = Math.min(3, n - iRow * 3);
        this.add.existing(
          new Objet({
            scene: this,
            x: W * (((i % 3) + 1) / (nRow + 1)),
            y: rowYs[iRow],
            key,
            winning: key == this.initData.winningKey
          })
        );
      });
    };

    this.add
      .zone(0, 0, 0, 0)
      .setDropZone(
        new Phaser.Geom.Rectangle(0, 0, W, H),
        Phaser.Geom.Rectangle.Contains
      );

    this.input.on("drag", (pointer, el: Objet, x, y) => {
      if (el instanceof Objet) {
        el.x = x;
        el.y = y;
      }
    });

    this.input.on("drop", (pointer: Phaser.Input.Pointer, el: Objet) => {
      if (el instanceof Objet) {
        if (pointer.y < H * (2 / 3)) {
          el.x = el.props.initialX;
          el.y = el.props.initialY;
        } else {
          console.log(el.props.winning ? "WIN" : "LOSE");
          this.gameOver();
        }
      }
    });

    addBg();

    const timerText = addTimer();

    addTexte();

    addObjects([900, 1200]);

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining--;
        timerText.setText(String(this.timeRemaining));
        if (this.timeRemaining === 0) {
          console.log("TIME OUT");
          this.gameOver();
        }
      },
      callbackScope: this,
      loop: true
    });

    timerText.setText(String(this.timeRemaining));
  }
}
