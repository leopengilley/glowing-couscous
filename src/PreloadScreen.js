import { Scene } from 'phaser';
import { config } from './config';

class PreloadScene extends Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('space', 'assets/space2.jpg');
  }

  create() {
    const space = this.add.image(500, 250, 'space');

    const play = this.add.text(370, 250, 'Play').setScale(4).setOrigin(0);


    this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));

    this.input.on('pointerdown', () => this.scene.start('game'))
  }
}

export default PreloadScene;
