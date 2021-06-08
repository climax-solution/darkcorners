import Phaser from 'phaser';
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.enemy = this.scene.physics.add.sprite(x, y, key);
}