import { Scene } from "phaser";

interface TexteParams {
  x: number;
  y: number;
  scene: Scene;
}

interface TexteProps {
  papierText?: Phaser.GameObjects.Text;
}

export class Texte extends Phaser.GameObjects.Container {
  public props: TexteProps = {};

  constructor({ scene, x, y }: TexteParams) {
    super(scene, x, y);

    const papier = new Phaser.GameObjects.Image(scene, 0, 0, "Papier");
    papier.setScale(2);

    this.props.papierText = new Phaser.GameObjects.Text(
      scene,
      -papier.width / 2,
      -papier.height / 2,
      "",
      {
        fontFamily: "Inkfree, serif",
        fontSize: "100px",
        color: "black",
        align: "center",
        fixedWidth: papier.width
      }
    );
    this.add(papier);
    this.add(this.props.papierText);
  }

  setText(text: string) {
    this.props.papierText.setText(text);
  }
}
