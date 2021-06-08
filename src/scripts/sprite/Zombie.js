import Phaser from 'phaser';

export default class Zombie extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, 'zombie');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    this.body.bounce.x = 1;
    this.body.bounce.y = 1;
    const speed = 240;
  }
}
