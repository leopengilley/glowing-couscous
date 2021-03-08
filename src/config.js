import Phaser from 'phaser';
import GameScene from './GameScene';
// ./ for same folder, and no .js

const config = {
    type: Phaser.AUTO, // Phaser is global without importing Phaser.
    parent: 'phaser-example',
    width: 800,
    height: 600,
    parent: "container",
    scene: GameScene,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: true
      }
    }
};

// why destructuring? why not default?
// you could do more objects with the config separated by a comma
export { config };
