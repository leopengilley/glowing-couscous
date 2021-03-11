import Phaser from 'phaser';
import GameScene from './GameScene';
import PreloadScreen from './PreloadScreen';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 608,
    parent: "container",
    scene: [PreloadScreen, GameScene],
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 600 },
          debug: false
      }
    }
};

export { config };
