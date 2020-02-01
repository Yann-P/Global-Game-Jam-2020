import { Scene } from "phaser";

interface ObjetParams {
  x: number;
  y: number;
  key: string;
  scene: Scene;
  winning: boolean;
}

interface ObjetProps {
  initialX: number;
  initialY: number;
  winning: boolean;
}

export class Objet extends Phaser.GameObjects.Image {
  public props: ObjetProps;

  constructor({ scene, x, y, key, winning }: ObjetParams) {
    super(scene, x, y, key);

    this.props = {
      winning,
      initialX: x,
      initialY: y
    };

    this.setScale(250 / this.width);
    this.setInteractive();
    scene.input.setDraggable(this);
  }
}
