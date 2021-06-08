import Phaser from 'phaser';

export default class Bullet extends Phaser.GameObjects.Image {
	
	constructor(scene, x, y, textureKey) 
	{
		super(scene, 0, 0, 'bullet')
		this.speed = 1
		this.born = 0
		this.direction = 0
		this.xSpeed = 0
		this.ySpeed = 0
		this.setSize(5, 5, true)
	}

	// Fires a bullet from the player to the reticle
	fire (shooter, target)
	{
	    this.setPosition(shooter.x, shooter.y); // Initial position
	    this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

	    // Calculate X and y velocity of bullet to moves it from shooter to target
	    if (target.y >= this.y)
	    {
	        this.xSpeed = this.speed*Math.sin(this.direction);
	        this.ySpeed = this.speed*Math.cos(this.direction);
	    }
	    else
	    {
	        this.xSpeed = -this.speed*Math.sin(this.direction);
	        this.ySpeed = -this.speed*Math.cos(this.direction);
	    }

	    this.rotation = shooter.rotation; // angle bullet with shooters rotation
	    this.born = 0; // Time since new bullet spawned
	}

	// Updates the position of the bullet each cycle
    update (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
