import Phaser from 'phaser';
import GameScene from './GameScene';
import PreloadScreen from './PreloadScreen';
// ./ for same folder, and no .js

const config = {
    type: Phaser.AUTO, // Phaser is global without importing Phaser.
    parent: 'phaser-example',
    width: 800,
    height: 608,
    parent: "container",
    scene: [PreloadScreen, GameScene],
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 600 },
          debug: true
      }
    }
};

// why destructuring? why not default?
// you could do more objects with the config separated by a comma
export { config };
