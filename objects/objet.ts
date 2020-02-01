import { Scene } from "phaser";

interface ObjetParams {
  x: number;
  y: number;
  key: string;
  scene: Scene;
}

interface ObjetProps {
  initialX: number;
  initialY: number;
}

export class Objet extends Phaser.GameObjects.Image {
  public props: ObjetProps;

  constructor({ scene, x, y, key }: ObjetParams) {
    super(scene, x, y, key);

    this.props = {
      initialX: x,
      initialY: y
    };

    this.setScale(250 / this.width);

    this.setInteractive({ draggable: true });
    //scene.input.setDraggable(this);
  }
}
