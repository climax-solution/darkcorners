import Phaser from 'phaser';
import { getScores } from '../helpers/api';

export default class statsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StatsScene' })
    }
    preload() {
        this.load.image('buttonbackb', 'assets/menu/buttonback.png');
    }
    create() {
        //emitter = new Phaser.Events.EventEmitter();
        //controller = new Controller();
        this.add.text(400, 100, 'LeaderBoard', {
          color: 'black',
          fontSize: '32px ',
        }).setOrigin(0.5, 0.5);

        this.loading = this.add.text(400, 150, 'Loading...', {
          color: 'black',
          fontSize: '16px ',
        }).setOrigin(0.5, 0.5);

        getScores().then((scores) => {
          //this.enterDisplay();
          const scoreStyle = {
            color: 'black',
            fontSize: '38px ',
          };
          const { result } = scores;
          const resultsCount = 5;
          result.sort((x, y) => y.score - x.score);
          result.slice(0, resultsCount).forEach((topscore, index) => {
            if (topscore) {
              this.add.text(60, 200 + (40 * index),
                `${index + 1}. Name: ${topscore.user} -- Score: ${topscore.score}`,
                scoreStyle);
            }
          });
        });

        //this.endKeys = this.input.keyboard.addKeys('enter');

    
        var buttonz = this.add.image(1050,680, 'buttonbackb').setInteractive();

        buttonz.on('pointerdown', function () {

            this.scene.start('MainScene')

        }, this);  
    }
    update() {
        
    }
    enterDisplay() {
        this.loading.destroy();
        this.add.image(400, 500, 'enter').setScale(3);
    }
}