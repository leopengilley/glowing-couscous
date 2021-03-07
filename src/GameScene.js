import { Scene } from 'phaser';

class GameScene extends Scene {

  constructor() {
    super();

    this.score = 0;
    this.gameOver = false;
  };

  //////////////////////////////////////// preloading sounds and images for game
  preload() {
    // logo is the name for reference
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
      'assets/char/Sprites/Idle.png',
      { frameWidth: 135, frameHeight: 87 }
    );
    this.load.spritesheet('runRight',
      'assets/char/Sprites/Run.png',
      { frameWidth: 135, frameHeight: 87 }
    );
    this.load.spritesheet('runLeft',
      'assets/char/Sprites/runLeft.png',
      { frameWidth: 135, frameHeight: 87 }
    );
    this.load.spritesheet('jumpUp',
      'assets/char/Sprites/Jump.png',
      { frameWidth: 135, frameHeight: 87 }
    );
    this.load.spritesheet('death',
      'assets/char/Sprites/Death.png',
      { frameWidth: 135, frameHeight: 87 }
    );
    this.load.spritesheet('attack',
      'assets/char/Sprites/Attack1.png',
      { frameWidth: 135, frameHeight: 87 }
    );
  }
  ////////////////////////////////////////////////////////////////////// update
  //initialize for the screen
    create() {
      const sky = this.add.image(0, 0, 'sky')
      sky.setOrigin(0, 0);

      this.createPlatforms();
      this.createPlayer();
      this.createCursor();
      this.createStars();
      this.createBombs();

      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    createPlatforms() {
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      this.platforms.create(600, 400, 'ground');
      this.platforms.create(50, 250, 'ground');
      this.platforms.create(750, 220, 'ground');
    }

    createPlayer() {
      this.player = this.physics.add.sprite(100, 450, 'dude');
      this.player.setBounce(0.2);

      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.platforms);

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
      })

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'moveRight',
          frames: this.anims.generateFrameNumbers('runRight', { start: 0, end: 5 }),
          frameRate: 10,
          repeat: 0
      });

      this.anims.create({
          key: 'moveLeft',
          frames: this.anims.generateFrameNumbers('runLeft', { start: 0, end: 5 }),
          frameRate: 10,
          repeat: 0
      });

      this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('jumpUp', { start: 0, end: 1 }),
          frameRate: 1,
          repeat: -1
      });
      this.anims.create({
          key: 'dead',
          frames: this.anims.generateFrameNumbers('death', { start: 0, end: 8 }),
          frameRate: 10
      });
      this.anims.create({
          key: 'attack1',
          frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 8 }),
          frameRate: 10,
          yoyo: false,
          repeat: -1
      });
    }

    createCursor() {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    createStars() {
      this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 } // 70px apart
      });

      this.stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      this.physics.add.collider(this.stars, this.platforms);
      this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    collectStar(player, star) {
      star.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate((child) => {
          child.enableBody(true, child.x, 0, true, true);
        });

        // uses the players position for bomb location: this is cool!!!
        const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); // random bomb direction bounce
      }
    }

    createBombs() {
      this.bombs = this.physics.add.group();
      this.physics.add.collider(this.bombs, this.platforms);
      this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    hitBomb(player, bomb) {
      this.physics.pause();
      player.setTint(0xff0000); // player turns red
      this.player.anims.play('dead', true); // player dies
      this.gameOver = true;
    }



    ////////////////////////////////////////////////////////////////// update
    update() {
      if (this.gameOver !== true) {
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.anims.play('moveLeft', true);
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(160);
          this.player.anims.play('moveRight', true);
        } else if (this.cursors.space.isDown) {
          this.player.anims.play('attack1', true);
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play('idle', true);
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
          this.player.setVelocityY(-400);
          this.player.anims.play('up', true);
        }
      }
    }
}

export default GameScene;
