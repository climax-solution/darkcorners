import PhaserLogo from '../objects/phaserLogo';
import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  

  constructor() {
    super({ key: 'MainScene' })
  }
  preload() {
    this.load.image('background', 'assets/menu/bgnew.png');
    this.load.image('tittle', 'assets/menu/darkcorners1.png');
    this.load.image('buttonBG', 'assets/menu/button1.png');
    this.load.image('buttonBH', 'assets/menu/button2.png');
    this.load.image('buttonBI', 'assets/menu/button3.png');
    this.load.image('buttonBJ', 'assets/menu/button4.png');
    this.load.image('buttonBL', 'assets/menu/button5.png');
    this.load.image('buttonBK', 'assets/menu/buttonon.png');
  }
  create() {
    var bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);

    var tittle1 = this.add.image(620,70, 'tittle');
    //var titlemenu = this.add.text(600,130, 'MAIN MENU', {fontFamily:'Anton'}, {fontSize:'1200px'});
    var button1 = this.add.image(650,190, 'buttonBG').setInteractive();
    var button2 = this.add.image(650,260, 'buttonBH').setInteractive();
    var button3 = this.add.image(650,330, 'buttonBI').setInteractive();
    var button4 = this.add.image(650,400, 'buttonBJ').setInteractive();
    var button5 = this.add.image(900,650, 'buttonBK').setInteractive();
    var button6 = this.add.image(650,470, 'buttonBL').setInteractive();


    button1.on('pointerdown', function () {

        this.scene.start('GameScene');

    }, this);

    button2.on('pointerdown', function () {

        this.scene.start('GameOver');

    }, this);

    button3.on('pointerdown', function () {

        this.scene.start('StatsScene')

    }, this);

    button4.on('pointerdown', function () {

        this.scene.start('HelpScene')

    }, this);

    button5.on('pointerdown', function () {

        //this.scene.start('MainMenu');
        //var sb = new SoundButtons({
        //    scene: this
        //});

    }, this);

    /**
     * Delete all the code below to start a fresh scene
     */
    //new PhaserLogo(this, this.cameras.main.width / 2, 0)
    //this.fpsText = new FpsText(this)

    // async/await example
    //const pause = ms => {
    //  return new Promise(resolve => {
    //    window.setTimeout(() => {
    //      resolve()
    //    }, ms)
    //  })
    //}
    //const asyncFunction = async () => {
    //  console.log('Before Pause')
    //  await pause(4000) // 4 seconds pause
    //  console.log('After Pause')
    //}
    //asyncFunction()

    // Spread operator test
    //const numbers = [0, 1, 2, 3]
    //const moreNumbers = [...numbers, 4, 5]
    //console.log(`All numbers: ` + moreNumbers)

    // display the Phaser.VERSION
    //this.add
    //  .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
    //    color: '#000000',
    //    fontSize: 24
    //  })
    //  .setOrigin(1, 0)
  }

  update() {
    //this.fpsText.update()
  }
}
