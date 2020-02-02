/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { MainScene } from "./scenes/main-scene";
import { StarterScene } from "./scenes/starter";
import { LoaderScene } from "./scenes/loader";
import { TitleScene } from "./scenes/title";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 1080,
  height: 1920,
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: "game",
  scene: [
    new LoaderScene(),
    new StarterScene(),
    new MainScene(),
    new TitleScene()
  ],

  backgroundColor: "#fff"
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.scene.start("load");
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});
