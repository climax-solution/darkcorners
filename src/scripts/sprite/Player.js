import Phaser from 'phaser';
import PlayerModel from './PlayerModel';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    this.playerModel = new PlayerModel();
  }
}
