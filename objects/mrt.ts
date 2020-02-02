import { Scene } from "phaser";

interface MRTParams {
  x: number;
  y: number;
  scene: Scene;
}

interface MRTProps {
  scene?: Phaser.Scene;
  cryOverlay?: Phaser.GameObjects.Image;
  eatOverlay?: Phaser.GameObjects.Image;
  doorOverlay?: Phaser.GameObjects.Image;
  happyOverlay?: Phaser.GameObjects.Image;
  startTears?: any;
  stopTears?: any;
  startFlex?: any;
  stopFlex?: any;
}

export class MRT extends Phaser.GameObjects.Container {
  private props: MRTProps = {};

  constructor({ x, y, scene }: MRTParams) {
    super(scene, x, y);

    const base = new Phaser.GameObjects.Image(scene, 0, 0, "MRT");
    const gear = new Phaser.GameObjects.Image(scene, 300, -100, "PV");
    const gearTween = scene.add.tween({
      duration: 10000,
      props: {
        angle: 360
      },
      loop: -1,
      targets: [gear],
      ease: "Linear"
    });
    gear.setScale(200 / gear.width);

    this.props.doorOverlay = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "MRT_door_overlay"
    );
    this.props.happyOverlay = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "MRT_happy_overlay"
    );
    this.props.cryOverlay = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "MRT_cry_overlay"
    );
    this.props.eatOverlay = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "MRT_eat_overlay"
    );
    this.props.cryOverlay.alpha = 0;

    // const tear = new Phaser.GameObjects.Particles.ParticleEmitterManager(
    //   scene,
    //   "Tear"
    // );
    const tear = this.scene.add.particles("Tear");
    scene.children.bringToTop(tear);

    const mkEmitter = x => {
      const emitter = tear.createEmitter({
        x: x + 100,
        y: y + 315 - base.height / 2,
        active: true,
        speedX: { min: -50, max: 50 },
        speedY: { min: 200, max: 300 }
      });
      emitter.start();
      tear.setDepth(4);
      return emitter;
    };

    const e1 = mkEmitter(250);
    const e2 = mkEmitter(462);

    this.props.startTears = () => {
      e1.start();
      e2.start();
    };

    this.props.stopTears = () => {
      e1.stop();
      e2.stop();
    };

    const arm = new Phaser.GameObjects.Image(
      scene,
      base.width / 2 - 170,
      0,
      "Arm"
    );
    arm.setOrigin(0, 0.5);
    arm.angle = 50;
    arm.setScale(300 / gear.width);

    const armTween = scene.add.tween({
      yoyo: true,
      duration: 1000,
      props: {
        angle: -0
      },
      loop: -1,
      targets: [arm],
      ease: "Linear"
    });

    const arm2 = new Phaser.GameObjects.Image(
      scene,
      -base.width / 2 + 150,
      0,
      "Arm"
    );
    arm2.setOrigin(0, 0.5);
    arm2.angle = 0;
    arm2.setScale(-300 / gear.width, 300 / gear.width);

    const armTween2 = scene.add.tween({
      yoyo: true,
      duration: 1200,
      props: {
        angle: -50
      },
      loop: -1,
      targets: [arm2],
      ease: "Linear"
    });

    this.props.startFlex = () => {
      arm.alpha = arm2.alpha = 1;
    };

    this.props.stopFlex = () => {
      arm.alpha = arm2.alpha = 0;
    };

    this.add(gear);
    this.add(arm);
    this.add(arm2);

    this.add(base);
    this.add(this.props.doorOverlay);
    this.add(this.props.cryOverlay);
    this.add(this.props.eatOverlay);
    this.add(this.props.happyOverlay);

    this.cry(false);
    this.eat(false);
    this.flex(false);
    this.happy(false);
  }

  cry(crying: boolean) {
    if (!crying) {
      this.props.cryOverlay.alpha = 0;
      this.props.stopTears();
    } else {
      this.props.cryOverlay.alpha = 1;
      this.props.startTears();
    }
  }

  eat(eating: boolean) {
    if (!eating) {
      this.props.eatOverlay.alpha = 0;
    } else {
      this.props.eatOverlay.alpha = 1;
    }
  }

  flex(flexing: boolean) {
    if (!flexing) {
      this.props.stopFlex();
    } else {
      this.props.startFlex();
    }
  }

  happy(x: boolean) {
    if (!x) {
      this.props.happyOverlay.alpha = 0;
    } else {
      this.props.happyOverlay.alpha = 1;
    }
  }
}
