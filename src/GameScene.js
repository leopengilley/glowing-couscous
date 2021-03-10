import { Scene } from 'phaser';
import { config } from './config';

class GameScene extends Scene {

  constructor() {
    super('game');

    this.score = 0;
    this.gameOver = false;
    this.controls;
  };

  preload() {
    this.load.image("tiles", "assets/map/tileset.png");
    this.load.image("cloudsImage", "assets/bg/clouds.png");
    this.load.image("farGroundsImage", "assets/bg/far-grounds.png");
    this.load.image("seaImage", "assets/bg/sea.png");
    this.load.image("skyImage", "assets/bg/sky.png");
    this.load.tilemapTiledJSON("map", "assets/map/phaserGameMap.json");

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

    // enemy
    this.load.spritesheet('enemy',
      'assets/enemy/sprites/Idle.png',
      { frameWidth: 128, frameHeight: 123 }
    );

    this.load.spritesheet('shardSheet',
      'assets/CrystaFragments.png',
      { frameWidth: 200, frameHeight: 256 }
    );
  }

    create() {
      // this.createMap();
      const map = this.make.tilemap({ key: "map"});

      const tileset = map.addTilesetImage("tileset", "tiles", 16, 16);
      const cloudTile = map.addTilesetImage("clouds", "cloudsImage", 16, 16);
      const farGroundsTile = map.addTilesetImage("far-grounds", "farGroundsImage", 16, 16);
      const seaTile = map.addTilesetImage("sea", "seaImage", 16, 16);
      const skyTile = map.addTilesetImage("sky", "skyImage", 16, 16);

      const backgroundA = map.createLayer("background1", [seaTile, skyTile]);
      const backgroundB = map.createLayer("background2", cloudTile);
      const backgroundC = map.createLayer("background3", farGroundsTile);
      const backgroundD = map.createLayer("background4", tileset);
      const backgroundE = map.createLayer("background5", tileset);
      const backgroundF = map.createLayer("background6", tileset);
      const backgroundG = map.createLayer("background7", tileset);
      const backgroundH = map.createLayer("background8", tileset);
      const backgroundI = map.createLayer("background9", tileset);



      backgroundG.setCollisionBetween(0, 475, true, 'backgroundG');
      backgroundD.setCollisionBetween(0, 475, true, 'backgroundD');
      backgroundH.setCollisionBetween(0, 475, true, 'backgroundH');
      backgroundI.setCollisionBetween(0, 475, true, 'backgroundI');
      backgroundG.setCollisionByProperty({ collides: true });
      backgroundD.setCollisionByProperty({ collides: true });
      backgroundH.setCollisionByProperty({ collides: true });
      backgroundI.setCollisionByProperty({ collides: true });

      const camera = this.cameras.main;
      camera.setBounds(0, 0, backgroundA.widthInPixels, config.height);

      // Set up the arrows to control the camera
      this.cursors = this.input.keyboard.createCursorKeys();
      this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: this.cursors.left,
        right: this.cursors.right,
        up: this.cursors.up,
        down: this.cursors.down,
        speed: 0.5
      });

      this.createPlayer();
      this.physics.add.collider(this.player, backgroundG);
      this.physics.add.collider(this.player, backgroundD);
      this.physics.add.collider(this.player, backgroundH);
      this.physics.add.collider(this.player, backgroundI);

      this.createEnemy();
      this.physics.add.collider(this.enemy, backgroundG);
      this.physics.add.collider(this.enemy, backgroundD);
      this.physics.add.collider(this.enemy, backgroundH);
      this.physics.add.collider(this.enemy, backgroundI);

      camera.startFollow(this.player);

      // const debugGraphics = this.add.graphics().setAlpha(0.75);
      // backgroundG.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });

      // this.createAttack();
      this.attackZone = this.add.zone(this.player.x, this.player.y, 40, 40);

      this.createAnimationUpdate();

      this.createStars();
      this.physics.add.collider(this.shard, backgroundG);
      this.physics.add.collider(this.shard, backgroundD);
      this.physics.add.collider(this.shard, backgroundH);
      this.physics.add.collider(this.shard, backgroundI);
      // this.createBombs();

      this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

      this.gameOverText = this.add.text(215, 300, 'Game Over Click to play again', {fontSize: '42px', fill: 'red'}).setOrigin(.25);
      this.gameOverText.visible = false;
    }


    createPlayer() {
      this.player = this.physics.add.sprite(100, 0, 'dude');
      this.player.setBounce(0.2);
      this.player.setSize(10, 10, true);
      this.player.setOffset(67, 68);
      this.player.setCollideWorldBounds(true);
      this.player.body.onWorldBounds=true;

      this.physics.world.on('worldbounds', (body, up, down, left, right) => {//if the body collided at the bottom, execute gameover
        if(down || left || right || up) {
          this.gameOverText.visible = true;
          this.player.anims.play('dead', true);
          this.gameOver = true;
          this.input.on('pointerdown', () => {
            this.scene.start('preload');
            this.gameOver = false;
          });
        };
      });

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: 0
      })

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
          frameRate: 10,
          hideOnComplete: true
      });
      this.anims.create({
          key: 'attack1',
          frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 3 }),
          frameRate: 10,
          yoyo: false,
          repeat: -1
      });
    }

    createEnemy() {
      this.enemy = this.physics.add.sprite(400, 0, 'enemy');
      this.enemy.setBounce(0.2);
      this.enemy.setSize(10, 10, true);
      this.enemy.setOffset(67, 80);

      this.anims.create({
        key: 'idleEnemy',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
      })
    }

    // How do I reference the attack animation in this code?
    createAnimationUpdate() {
      this.player.on('animationupdate', (anim, frame, sprite, frameKey) => {
        // it works with 3, 4, 2 frames
        if(anim.key === 'attack1' && frame.index === 3) {
          // console.log("attacking frame 3");
          this.physics.world.enable(this.attackZone);
          this.attackZone.x = this.player.x + 50;
          this.attackZone.y = this.player.y - 20;
          this.attackZone.body.height = 50;
        }
        if(anim.key === 'attack1' && frame.index === 4) {
          // console.log("attacking frame 4");
          this.physics.world.disable(this.attackZone);
          this.attackZone.x = this.player.x;
          this.attackZone.y = this.player.y;
        }
      });
    }

    createStars() {

      this.shard = this.physics.add.sprite(600, 0, 'shardSheet');
      this.shard.setScale(0.3);
      this.shard.setSize(30, 100, true);
      this.shard.setOffset(80, 100);
      //
      this.anims.create({
        key: 'shardAnimIdle',
        frames: this.anims.generateFrameNumbers('shardSheet', { start: 9, end:12 }),
        frameRate: 5,
        repeat: 0,
        yoyo: true
      })

      this.anims.create({
        key: 'shardAnimBreak',
        frames: this.anims.generateFrameNumbers('shardSheet', { start: 9, end: 0 }),
        frameRate: 10,
        repeat: 0
      });

      // this.shard.children.iterate((child) => {
      //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      // });

      this.physics.add.overlap(this.attackZone, this.shard, this.collectStar, null, this);
    }

    collectStar(player, star) {
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      star.disableBody(true, true);


      // if (this.shard.countActive(true) === 0) {
      //   this.stars.children.iterate((child) => {
      //     child.enableBody(true, child.x, 0, true, true);
      //   });
      //
      //   // uses the players position for bomb location: this is cool!!!
      //   const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      //   const bomb = this.bombs.create(x, 16, 'bomb');
      //   bomb.setBounce(1);
      //   bomb.setCollideWorldBounds(true);
      //   bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); // random bomb direction bounce
      // }
    }

    // createBombs() {
    //   this.bombs = this.physics.add.group();
    //   this.physics.add.collider(this.bombs, this.seaTiled);
    //   this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    // }
    //
    // hitBomb(player, bomb) {
    //   this.physics.pause();
    //   player.setTint(0xff0000); // player turns red
    //   this.player.anims.play('dead', true); // player dies
    //   this.gameOver = true;
    // }



    ////////////////////////////////////////////////////////////////// update
    update(time, delta) {
      this.controls.update(delta);
      this.enemy.anims.play('idleEnemy', true);
      this.shard.anims.play('shardAnimIdle', true);

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
        if (this.cursors.up.isDown) { 
          this.player.setVelocityY(-180);
          this.player.anims.play('up', true);
        }
      }
    }
}

export default GameScene;
