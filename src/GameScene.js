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

    this.load.spritesheet('dude',
      'assets/char/Sprites/Idle.png',
      { frameWidth: 103, frameHeight: 104 }
    );
    this.load.spritesheet('runRight',
      'assets/char/Sprites/Run.png',
      { frameWidth: 103, frameHeight: 104 }
    );
    this.load.spritesheet('runLeft',
      'assets/char/Sprites/runLeft.png',
      { frameWidth: 103, frameHeight: 104 }
    );
    this.load.spritesheet('jumpUp',
      'assets/char/Sprites/Jump.png',
      { frameWidth: 103, frameHeight: 104 }
    );
    this.load.spritesheet('death',
      'assets/char/Sprites/Death.png',
      { frameWidth: 103, frameHeight: 104 }
    );
    this.load.spritesheet('attack',
      'assets/char/Sprites/Attack1.png',
      { frameWidth: 103, frameHeight: 104 }
    );

    // enemy 1
    this.load.spritesheet('enemy',
      'assets/enemy/sprites/Idle.png',
      { frameWidth: 128, frameHeight: 123 }
    );

    this.load.spritesheet('enemyRunRight',
      'assets/enemy/sprites/Run.png',
      { frameWidth: 128, frameHeight: 123 }
    );

    this.load.spritesheet('enemyRunLeft',
      'assets/enemy/sprites/RunLeft.png',
      { frameWidth: 128, frameHeight: 123 }
    );

    // enemy 2
    // this.load.spritesheet('enemy2',
    //   'assets/enemy2/enemy2.png',
    //   { frameWidth: 200, frameHeight: 123 }
    // );
    //
    // this.load.spritesheet('enemy2RunRight',
    //   'assets/enemy2/enemy2RunRight.png',
    //   { frameWidth: 128, frameHeight: 123 }
    // );
    //
    // this.load.spritesheet('enemy2RunLeft',
    //   'assets/enemy2/enemy2RunLeft.png',
    //   { frameWidth: 128, frameHeight: 123 }
    // );
    //
    // shard
    this.load.spritesheet('shardSheet',
      'assets/CrystaFragments.png',
      { frameWidth: 200, frameHeight: 256 }
    );
  }

    create() {

      this.physics.world.setBounds(0, 0, 2288, 608)
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
      camera.setBounds(0, 0, 2288, config.height);

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

      // Set a delay before starting the enemy's movement (in milliseconds)
      const delayBeforeMovement = 1000; // 1 second delay

      // Delay before starting the enemy's movement
      this.time.delayedCall(delayBeforeMovement, () => {
        // Start the enemy's movement initially (change to true or false depending on the initial direction)
        this.setEnemyAnimation(true);
        this.moveEnemy();
      }, [], this);

      // this.createEnemy2();
      // this.physics.add.collider(this.enemy2, backgroundG);
      // this.physics.add.collider(this.enemy2, backgroundD);
      // this.physics.add.collider(this.enemy2, backgroundH);
      // this.physics.add.collider(this.enemy2, backgroundI);

      camera.startFollow(this.player);

      // const debugGraphics = this.add.graphics().setAlpha(0.75);
      // backgroundG.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });

      this.attackZone = this.add.zone(this.player.x, this.player.y, 40, 40);

      this.createAnimationUpdate();

      this.createShards();
      this.physics.add.collider(this.shard, backgroundG);
      this.physics.add.collider(this.shard, backgroundD);
      this.physics.add.collider(this.shard, backgroundH);
      this.physics.add.collider(this.shard, backgroundI);

      this.instructions = this.add.text(300, 450, 'You must find the crystal and destroy it!', {fontSize: '18px', fill: 'white'});

      this.gameOverText = this.add.text(120, 100, '     Game Over...\n Click to try again.', {fontSize: '42px', fill: 'red'}).setScrollFactor(0);
      this.gameOverText.visible = false;

      this.gameWinText = this.add.text(60, 100, 'You win! Click to play again.', {fontSize: '42px', fill: 'white'}).setScrollFactor(0);
      this.gameWinText.visible = false;

    }


    createPlayer() {
      this.player = this.physics.add.sprite(100, 0, 'dude');
      this.player.setScale(1.3);
      this.player.setBounce(0.2);
      this.player.setSize(10, 10, true);
      this.player.setOffset(45, 55);
      this.player.setCollideWorldBounds(true);
      this.player.body.onWorldBounds=true;

      this.physics.world.on('worldbounds', (body, up, down, left, right) => {
        if(down || up || left || right) {
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
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
      })

      this.anims.create({
          key: 'moveRight',
          frames: this.anims.generateFrameNumbers('runRight', { start: 0, end: 8 }),
          frameRate: 10,
          repeat: 0
      });

      this.anims.create({
          key: 'moveLeft',
          frames: this.anims.generateFrameNumbers('runLeft', { start: 0, end: 8 }),
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
      this.enemy = this.physics.add.sprite(600, 0, 'idleEnemy');
      this.enemy.setScale(1.3);
      this.enemy.setBounce(0.2);
      this.enemy.setSize(10, 10, true);
      this.enemy.setOffset(67, 80);

      this.anims.create({
        key: 'idleEnemy',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
      })

      this.enemy.anims.play('idleEnemy', true);


      // Create animation for moving forward
      this.anims.create({
        key: 'enemyRunRight',
        frames: this.anims.generateFrameNumbers('enemyRunRight', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1 // -1 means the animation will loop indefinitely
      })

      // Create animation for moving backward
      this.anims.create({
        key: 'enemyRunLeft',
        frames: this.anims.generateFrameNumbers('enemyRunLeft', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
      })
    }

    moveEnemy() {
      // Create a timeline tween for horizontal movement
      this.tweens.timeline({
        targets: this.enemy,
        loop: -1, // -1 means the tween will loop indefinitely
        tweens: [
          {
            x: 300, // Move to the right at x = 200
            duration: 3000, // Duration in milliseconds
            ease: 'Power1', // Easing function for smooth movement
            onStart: () => this.setEnemyAnimation(true), // Set animation to moveForward when starting the tween
            onComplete: () => this.setEnemyAnimation(false), // Set animation to moveBackward when completing the tween
          },
          {
            x: 600, // Move back to the starting position
            duration: 3000,
            ease: 'Power1',
            onStart: () => this.setEnemyAnimation(false), // Set animation to moveBackward when starting the tween
            onComplete: () => this.setEnemyAnimation(true), // Set animation to moveForward when completing the tween
          },
          {
            x: 600, // Pause at the starting position
            duration: 2000, // Duration of the pause in milliseconds
            ease: 'Power0', // Use Power0 easing for a linear pause (no acceleration)
            onStart: () => this.enemy.anims.play('idleEnemy'), // Set animation to moveBackward when starting the tween
            onComplete: () => this.setEnemyAnimation(true), // Set animation to idle when completing the tween
          },
        ],
      });
    }

      // Play the idleEnemy animation initially
      // this.enemy.anims.play('idleEnemy');

    setEnemyAnimation(isMovingForward) {
      if (isMovingForward) {
        console.log('Moving Forward');
        this.enemy.anims.play('enemyRunLeft');
      } else {
        console.log('Moving backward');
        this.enemy.anims.play('enemyRunRight');
      }
    }

    // createEnemy2() {
    //   this.enemy2 = this.physics.add.sprite(700, 0, 'enemy2');
    //   this.enemy2.setScale(1.3);
    //   this.enemy2.setBounce(0.2);
    //   this.enemy2.setSize(10, 10, true);
    //   this.enemy2.setOffset(67, 100);
    //   this.enemy2.enableBody = true;
    //   this.enemy2.body.velocity.x = 80;
    //
    //
    //   this.anims.create({
    //     key: 'idleEnemy2',
    //     frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: 0
    //   })
    //
    //   this.anims.create({
    //     key: 'enemy2Right',
    //     frames: this.anims.generateFrameNumbers('enemy2RunRight', { start: 0, end: 6 }),
    //     frameRate: 10,
    //     repeat: 0
    //   })
    //
    //   this.anims.create({
    //     key: 'enemy2RunLeft',
    //     frames: this.anims.generateFrameNumbers('enemy2RunLeft', { start: 6, end: 0 }),
    //     frameRate: 10,
    //     repeat: 0
    //   })
    // }

    createAnimationUpdate() {
      this.player.on('animationupdate', (anim, frame, sprite, frameKey) => {
        if(anim.key === 'attack1' && frame.index === 3) {
          // console.log("attack enabled on frame 3");
          this.physics.world.enable(this.attackZone);
          this.attackZone.x = this.player.x + 50;
          this.attackZone.y = this.player.y - 20;
          this.attackZone.body.height = 50;
        }
        if(anim.key === 'attack1' && frame.index === 4) {
          // console.log("attack disabling on frame 4");
          this.physics.world.disable(this.attackZone);
          this.attackZone.x = this.player.x;
          this.attackZone.y = this.player.y;
        }
      });
    }

    createShards() {

      this.shard = this.physics.add.sprite(2000, 0, 'shardSheet');
      this.shard.setScale(0.3);
      this.shard.setSize(30, 100, true);
      this.shard.setOffset(80, 100);

      this.anims.create({
        key: 'shardAnimIdle',
        frames: this.anims.generateFrameNumbers('shardSheet', { start: 9, end:12 }),
        frameRate: 5,
        repeat: 0,
        yoyo: true
      })

      // this.anims.create({
      //   key: 'shardAnimBreak',
      //   frames: this.anims.generateFrameNumbers('shardSheet', { start: 9, end: 0 }),
      //   frameRate: 10,
      //   repeat: 0
      // });

      this.physics.add.overlap(this.attackZone, this.shard, this.collectShard, null, this);
    }

    collectShard(player, star) {
      this.score += 1;
      star.disableBody(true, true);
      this.gameWinText.visible = true;
      this.gameOver = true;
      this.input.on('pointerdown', () => {
        this.scene.start('preload');
        this.gameOver = false;
      });
    }


    ////////////////////////////////////////////////////////////////// update
    update(time, delta) {
      this.controls.update(delta);
      // this.enemy.anims.play('idleEnemy', true);
      // this.enemy2.anims.play('idleEnemy2', true);
      this.shard.anims.play('shardAnimIdle', true);

      if (this.gameOver !== true) {
        if (this.cursors.right.isDown) {
          this.player.setVelocityX(160);
          this.player.anims.play('moveRight', true);
        } else if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.anims.play('moveLeft', true);
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
