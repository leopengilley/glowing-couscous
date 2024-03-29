import { Scene } from 'phaser';
import { config } from './config';

class PreloadScreen extends Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('background', "assets/preloadScreen.png");
  }

  create() {
    const back = this.add.image(400, 304, 'background');

    const play = this.add.text(200, 100, 'Click to Play').setScale(3).setOrigin(0);

    // this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));

    this.input.on('pointerdown', () => this.scene.start('game'))
  };
}

export default PreloadScreen;
