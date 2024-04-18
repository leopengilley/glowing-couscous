import { Scene } from 'phaser';
import { config } from './config';
import Boss from './Boss.js';

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

    this.load.spritesheet('idleLeft',
      'assets/char/Sprites/IdleLeft.png',
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
    this.load.spritesheet('attackLeft',
      'assets/char/Sprites/Attack1Left.png',
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
    this.load.spritesheet('enemy2',
      'assets/enemy2/enemy2.png',
      { frameWidth: 200, frameHeight: 123 }
    );

    this.load.spritesheet('enemy2RunRight',
      'assets/enemy2/enemy2RunRight.png',
      { frameWidth: 200, frameHeight: 123 }
    );

    this.load.spritesheet('enemy2RunLeft',
      'assets/enemy2/enemy2RunLeft.png',
      { frameWidth: 200, frameHeight: 123 }
    );

    this.load.spritesheet('attack3',
      'assets/enemy2/attack3.png',
      { frameWidth: 200, frameHeight: 123 }
    );

    this.load.spritesheet('attack3Left',
      'assets/enemy2/attack3Left.png',
      { frameWidth: 200, frameHeight: 123 }
    );

    // shard
    this.load.spritesheet('shardSheet',
      'assets/CrystaFragments.png',
      { frameWidth: 200, frameHeight: 256 }
    );

    // // boss
    // this.load.spritesheet('bossIdle',
    //   'assets/boss/bossIdle.png',
    //   { frameWidth: 146, frameHeight: 256 }
    // );

    // boss
    this.load.spritesheet('bossIdle',
      'assets/boss2/boss2.png',
      { frameWidth: 80, frameHeight: 54 }
    );

    this.load.spritesheet('bossRunRight',
      'assets/boss2/bossRunRight.png',
      { frameWidth: 80, frameHeight: 54 }
    );

    this.load.spritesheet('bossRunLeft',
      'assets/boss2/bossRunLeft.png',
      { frameWidth: 80, frameHeight: 54 }
    );

    this.load.spritesheet('bossAttackLeft',
      'assets/boss2/bossAttackLeft.png',
      { frameWidth: 80, frameHeight: 73 }
    );

    this.load.spritesheet('bossAttackLeft',
      'assets/boss2/bossAttackLeft.png',
      { frameWidth: 80, frameHeight: 73 }
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

      // const debugGraphics = this.add.graphics().setAlpha(0.75);
      // backgroundG.renderDebug(debugGraphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });

      this.createEnemy();
      this.physics.add.collider(this.enemy, backgroundG);
      this.physics.add.collider(this.enemy, backgroundD);
      this.physics.add.collider(this.enemy, backgroundH);
      this.physics.add.collider(this.enemy, backgroundI);

      this.createEnemy2();
      this.physics.add.collider(this.enemy2, backgroundG);
      this.physics.add.collider(this.enemy2, backgroundD);
      this.physics.add.collider(this.enemy2, backgroundH);
      this.physics.add.collider(this.enemy2, backgroundI);

      this.createBoss(400, 300);

      this.createAnimationUpdate();

      this.createAnimationUpdate2();

      // Set a delay before starting the enemy's movement (in milliseconds)
      const delayBeforeMovement = 1000; // 1 second delay

      // Delay before starting the enemy's movement
      // this.time.delayedCall(delayBeforeMovement, () => {
      //   // Start the enemy's movement initially (change to true or false depending on the initial direction)
      //   this.setEnemyAnimation(true);
      //   // this.moveEnemy();
      // }, [], this);

      // // Delay before starting the enemy's movement
      // this.time.delayedCall(delayBeforeMovement, () => {
      //   // Start the enemy's movement initially (change to true or false depending on the initial direction)
      //   this.setEnemy2Animation(true);
      //   // this.moveEnemy();
      // }, [], this);

      this.isEnemy2Running = false;
      this.playerAttack = false;
      this.enemy2Attack = false;
      this.bossAttack = false;

      camera.startFollow(this.player);

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

      this.attackZone = this.add.zone(this.player.x, this.player.y, 40, 40);

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
        repeat: -1
      })

      this.anims.create({
        key: 'idleLeft',
        frames: this.anims.generateFrameNumbers('idleLeft', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
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
          frameRate: 10,
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
          frameRate: 15,
          yoyo: false,
          repeat: 0
      });
      this.anims.create({
          key: 'attack1Left',
          frames: this.anims.generateFrameNumbers('attackLeft', { start: 3, end: 0 }),
          frameRate: 15,
          yoyo: false,
          repeat: 0
      });

      this.player.anims.play('idle', true);
    }

    createEnemy2() {
      this.enemy2 = this.physics.add.sprite(1000, 0, 'enemy2');
      this.enemy2.setScale(1.3);
      this.enemy2.setBounce(0.2);
      this.enemy2.setSize(10, 10, true);
      this.enemy2.setOffset(100, 100);
      // this.enemy2.enableBody = true;
      // this.enemy2.body.velocity.x = 80;
      this.enemy2.setCollideWorldBounds(true);
      this.enemy2.body.onWorldBounds=true;

      this.attackZone2 = this.add.zone(this.enemy2.x, this.enemy2.y, 40, 40);


      this.anims.create({
        key: 'enemy2',
        frames: this.anims.generateFrameNumbers('enemy2', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
      })

      this.anims.create({
        key: 'enemy2RunRight',
        frames: this.anims.generateFrameNumbers('enemy2RunRight', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'enemy2RunLeft',
        frames: this.anims.generateFrameNumbers('enemy2RunLeft', { start: 7, end: 0 }),
        frameRate: 10,
        repeat: -1
      })

      this.anims.create({
        key: 'attack3',
        frames: this.anims.generateFrameNumbers('attack3', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
      })

      this.anims.create({
        key: 'attack3Left',
        frames: this.anims.generateFrameNumbers('attack3Left', { start: 3, end: 0 }),
        frameRate: 10,
        repeat: 0
      })

      this.physics.add.overlap(this.attackZone, this.enemy2, this.killEnemy2, null, this);
      this.enemy2.anims.play('enemy2', true);

      // // Function to move character back and forth
      // const moveCharacter = () => {
      //
      //   // console.log("Current texture key before tween starts:", this.enemy.texture.key);
      //   // Define your tween animation
      //   this.tweens.add({
      //       targets: this.enemy2,
      //       x: 500,
      //       // y: newY,
      //       duration: 3000, // Duration in milliseconds
      //       ease: 'Linear', // Easing function (e.g., Linear, Power1, etc.)
      //       onComplete: () => {
      //
      //           this.enemy2.anims.play('enemy2RunRight', true);
      //           // console.log("Current texture key after moving right:", this.enemy.texture.key);
      //           // Once the first tween completes, start the second tween to move the character back
      //           this.tweens.add({
      //               targets: this.enemy2,
      //               x: 700,
      //               duration: 3000,
      //               ease: 'Linear',
      //               onComplete: () => {
      //
      //
      //               // console.log("Current texture key after moving left:", this.enemy.texture.key);
      //
      //               this.enemy2.anims.play('enemy2RunLeft', true);
      //                 // Recursive call to move the character continuously
      //               moveCharacter();
      //             }
      //           });
      //       }
      //   });
      // };


    }

    createAnimationUpdate() {
      this.player.on('animationupdate', (anim, frame, sprite, frameKey) => {
        if(anim.key === 'attack1' && frame.index === 3) {
          console.log("attack enabled on frame 3");
          this.physics.world.enable(this.attackZone);
          this.attackZone.x = this.player.x + 50;
          this.attackZone.y = this.player.y - 20;
          this.attackZone.body.height = 50;
        }
        if(anim.key === 'attack1' && frame.index === 4) {
          console.log("attack disabling on frame 4");
          this.physics.world.disable(this.attackZone);
          this.attackZone.x = this.player.x;
          this.attackZone.y = this.player.y;
          this.player.anims.play('idle', true);
        }
        if(anim.key === 'attack1Left' && frame.index === 3) {
          console.log("attack left enabled on frame 3");
          this.physics.world.enable(this.attackZone);
          this.attackZone.x = this.player.x - 50;
          this.attackZone.y = this.player.y - 20;
          this.attackZone.body.height = 50;
        }
        if(anim.key === 'attack1Left' && frame.index === 4) {
          console.log("attack left disabling on frame 4");
          this.physics.world.disable(this.attackZone);
          this.attackZone.x = this.player.x;
          this.attackZone.y = this.player.y;
          this.player.anims.play('idleLeft', true);
        }
      });
    }

    createAnimationUpdate2() {
      this.enemy2.on('animationupdate', (anim, frame, sprite, frameKey) => {
        if(anim.key === 'attack3Left' && frame.index === 1) {
          console.log("attack enemy2 enabled on frame 3");
          this.physics.world.enable(this.attackZone2);
          this.attackZone2.x = this.enemy2.x - 50;
          this.attackZone2.y = this.enemy2.y + 30;
          this.attackZone2.body.height = 50;
        }
        if(anim.key === 'attack3Left' && frame.index === 4) {
          console.log("attack disabling on frame 4");
          this.physics.world.disable(this.attackZone2);
          this.attackZone2.x = this.enemy2.x;
          this.attackZone2.y = this.enemy2.y;
          this.enemy2.anims.play('enemy2', true);
        }
        if(anim.key === 'attack3' && frame.index === 3) {
          console.log("attack left enabled on frame 3");
          this.physics.world.enable(this.attackZone2);
          this.attackZone2.x = this.enemy2.x + 50;
          this.attackZone2.y = this.enemy2.y + 30;
          this.attackZone2.body.height = 50;
        }
        if(anim.key === 'attack3' && frame.index === 4) {
          console.log("attack left disabling on frame 4");
          this.physics.world.disable(this.attackZone2);
          this.attackZone2.x = this.enemy2.x;
          this.attackZone2.y = this.enemy2.y;
          this.enemy2.anims.play('enemy2', true);
        }
      });
    }

    createEnemy() {
      this.enemy = this.physics.add.sprite(600, 0, 'idleEnemy');
      this.enemy.setScale(1.3);
      this.enemy.setBounce(0.2);
      this.enemy.setSize(10, 10, true);
      this.enemy.setOffset(67, 80);
      // this.enemy.setCollideWorldBounds(true);
      // this.enemy.body.onWorldBounds=true;

      // // Create the attack zone for the enemy
      this.enemyAttackZone = this.add.zone(this.enemy.x, this.enemy.y, 40, 40);
      // // Set the attack zone's position relative to the enemy
      this.physics.world.enable(this.enemyAttackZone);
      this.enemyAttackZone.x = this.enemy.x + 50;
      this.enemyAttackZone.y = this.enemy.y - 20;
      this.enemyAttackZone.body.height = 50;

      this.anims.create({
        key: 'idleEnemy',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
      })

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

      // this.enemy.anims.play('idleEnemy', true);


      this.physics.add.overlap(this.attackZone, this.enemy, this.killEnemy, null, this);


      // // Function to move character back and forth
      // const moveCharacter = () => {
      //
      //   // console.log("Current texture key before tween starts:", this.enemy.texture.key);
      //   // Define your tween animation
      //   this.tweens.add({
      //       targets: this.enemy,
      //       x: 400,
      //       // y: newY,
      //       duration: 3000, // Duration in milliseconds
      //       ease: 'Linear', // Easing function (e.g., Linear, Power1, etc.)
      //       onComplete: () => {
      //
      //           this.enemy.anims.play('enemyRunRight', true);
      //           // console.log("Current texture key after moving right:", this.enemy.texture.key);
      //           // Once the first tween completes, start the second tween to move the character back
      //           this.tweens.add({
      //               targets: this.enemy,
      //               x: 600,
      //               duration: 3000,
      //               ease: 'Linear',
      //               onComplete: () => {
      //
      //
      //               // console.log("Current texture key after moving left:", this.enemy.texture.key);
      //
      //               this.enemy.anims.play('enemyRunLeft', true);
      //                 // Recursive call to move the character continuously
      //               moveCharacter();
      //             }
      //           });
      //       }
      //   });
      // };
      //
      // // Initial call to start moving the character
      // moveCharacter();

    }

    createBoss(x, y) {

      // const boss = new Boss(this, x, y, this.player, 'bossIdle'); // Assuming 'bossIdle' is the texture key
      // Add the boss to the scene
      // this.add.existing(boss);
      const boss = this.add.boss(x, y)
    //   const boss = this.add.boss(400, 300, this.player, 'bossIdle')
      // const boss = new Boss(this, x, y, this.player, 'bossIdle');
      // this.add.existing(boss)

      // this.boss = this.physics.add.sprite(400, 0, 'bossIdle');
      // 1900
      this.physics.add.existing(boss);
      this.physics.add.collider(boss, this.backgroundG);
      this.physics.add.collider(boss, this.backgroundD);
      this.physics.add.collider(boss, this.backgroundH);
      this.physics.add.collider(boss, this.backgroundI);
      //
      // boss.setScale(1.5);
      // boss.setBounce(0.2);
      // boss.setSize(10, 10, true);
      // boss.setOffset(25, 30);
      // boss.enableBody = true;
      // // // this.enemy2.body.velocity.x = 80;
      // boss.setCollideWorldBounds(true);
      // boss.body.onWorldBounds=true;
      //
      // // this.attackZone2 = this.add.zone(this.enemy2.x, this.enemy2.y, 40, 40);
      //
      //
      // // Define frames for both y-axis
      this.anims.create({
          key: 'bossIdle',
          frames: this.anims.generateFrameNumbers('bossIdle', { start: 0, end: 8 }),
          frameRate: 15,
          repeat: -1 // or the desired number of repeats
      });
      //
      // this.anims.create({
      //     key: 'bossRunRight',
      //     frames: this.anims.generateFrameNumbers('bossRunRight', { start: 0, end: 5 }),
      //     frameRate: 15,
      //     repeat: -1 // or the desired number of repeats
      // });
      //
      // this.anims.create({
      //     key: 'bossRunLeft',
      //     frames: this.anims.generateFrameNumbers('bossRunLeft', { start: 5, end: 0 }),
      //     frameRate: 15,
      //     repeat: -1 // or the desired number of repeats
      // });
      //
      // this.anims.create({
      //     key: 'bossAttackLeft',
      //     frames: this.anims.generateFrameNumbers('bossAttackLeft', { start: 0, end: 11 }),
      //     frameRate: 15,
      //     repeat: -1 // or the desired number of repeats
      // });
      //
      // this.anims.create({
      //     key: 'bossAttackRight',
      //     frames: this.anims.generateFrameNumbers('bossAttackRight', { start: 11, end: 0 }),
      //     frameRate: 15,
      //     repeat: -1 // or the desired number of repeats
      // });
      // // this.physics.add.overlap(this.attackZone, this.enemy2, this.killEnemy2, null, this);
      boss.anims.play('bossIdle', true);
    }


    // moveEnemy() {
    //   // Create a timeline tween for horizontal movement
    //   const timeline = this.tweens.createTimeline({
    //       targets: this.enemy,
    //       loop: -1, // -1 means the tween will loop indefinitely
    //       tweens: [
    //           {
    //               x: 400, // Move to the right at x = 200
    //               duration: 3000, // Duration in milliseconds
    //               ease: 'Power1', // Easing function for smooth movement
    //               onStart: () => this.setEnemyAnimation(true), // Set animation to moveForward when starting the tween
    //               onComplete: () => this.setEnemyAnimation(false), // Set animation to moveBackward when completing the tween
    //           },
    //           {
    //               x: 600, // Move back to the starting position
    //               duration: 3000,
    //               ease: 'Power1',
    //               onStart: () => this.setEnemyAnimation(false), // Set animation to moveBackward when starting the tween
    //               onComplete: () => this.setEnemyAnimation(true), // Set animation to moveForward when completing the tween
    //           },
    //       ],
    //   });
    //
    //   // Start the timeline tween
    //   timeline.play();
    // }
    //
    // setEnemyAnimation(isMovingForward) {
    //   if (isMovingForward) {
    //     console.log('Moving Forward');
    //     this.enemy.anims.play('enemyRunLeft');
    //   } else {
    //     console.log('Moving backward');
    //     this.enemy.anims.play('enemyRunRight');
    //   }
    // }

    setEnemy2Animation(isMovingForward) {
      if (isMovingForward) {
        console.log('Moving Forward');
        this.enemy2.anims.play('enemy2RunLeft');
      } else {
        console.log('Moving backward');
        this.enemy2.anims.play('enemy2RunRight');
      }
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

    killEnemy(player, enemy) {
      console.log(enemy);
      this.tweens.killTweensOf(this.enemy);
      this.enemy.anims.stop(); // Stop the animation
      this.enemy.destroy(); // Destroy the enemy
    }

    killEnemy2(player, enemy2) {
      console.log(enemy2);
      this.tweens.killTweensOf(this.enemy2);
      this.enemy2.anims.stop(); // Stop the animation
      this.enemy2.destroy(); // Destroy the enemy
    }

    killPlayer(player, enemy2) {
      console.log(player);
      this.tweens.killTweensOf(this.player);
      this.player.anims.stop(); // Stop the animation
      this.player.destroy(); // Destroy the enemy

      this.gameOver = true;
      this.gameOverText.visible = true;
      this.input.on('pointerdown', () => {
        this.scene.start('preload');
        this.gameOver = false;
      });
    }

    collectShard(player, star) {
      this.score += 1;
      star.disableBody(true, true);
      this.player.anims.play('idle', true);
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

      this.physics.add.overlap(this.attackZone2, this.player, this.killPlayer, null, this);

      if (this.enemy.anims) {
        this.enemy.anims.play('idleEnemy', true);
      }

      // if (this.isEnemy2Running) {
      //     this.enemy2.anims.play('enemy2RunLeft', true);
      // } else {
      //     this.enemy2.anims.play('enemy2', true);
      // }

      this.shard.anims.play('shardAnimIdle', true);

      if (this.gameOver !== true) {
        if (this.cursors.right.isDown && this.cursors.space.isDown) {
          this.player.setVelocityX(160);
          if (this.playerAttack === false) {
            this.player.anims.play('attack1', true);
            this.playerAttack = true;
          }
        } else if (this.cursors.left.isDown && this.cursors.space.isDown) {
          this.player.setVelocityX(-160);
          if (this.playerAttack === false) {
            this.player.anims.play('attack1Left', true);
            this.playerAttack = true;
          }
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(160);
          this.player.anims.play('moveRight', true);
        } else if (this.cursors.left.isDown) {
          this.player.setVelocityX(-160);
          this.player.anims.play('moveLeft', true);
        } else if (this.cursors.space.isDown && this.playerAttack === false) {

          if (this.player.anims.currentAnim.key === 'idle') {
            this.player.anims.play('attack1', true);
            this.playerAttack = true;
            // console.log("attacking");
          } if (this.player.anims.currentAnim.key === 'idleLeft') {
            this.player.anims.play('attack1Left', true);
            this.playerAttack = true;
            // console.log("attacking");
          }

        } else {
          // Play appropriate idle animation based on the previous movement
          if (this.player.body.velocity.x > 0) {
              // If previously moving right, play idle animation facing right
              this.player.anims.play('idle', true);
              console.log("idle");
          } else if (this.player.body.velocity.x < 0) {
              // If previously moving left, play idleLeft animation
              this.player.anims.play('idleLeft', true);
              console.log("idle left");
          }

          // If neither right nor left is pressed, stop horizontal movement
          this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
          this.player.setVelocityY(-180);
          this.player.anims.play('up', true);
        } if (this.cursors.space.isUp) {
          this.playerAttack = false;
        }
      }


      // Update first enemy movement to follow the player
      let speed = 100;
      let distanceX = this.player.x - this.enemy2.x;
      let distanceY = this.player.y - this.enemy2.y;
      let length = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (length < 200 && this.enemy2.anims) {
          let normalizedX = distanceX / length;
          let normalizedY = distanceY / length;
          this.enemy2.setVelocityX(normalizedX * speed);
          // this.enemy2.setVelocityY(normalizedY * speed);

          // Check if enemy too far

          if (length > 199) {
            this.enemy2.setVelocityX(0);
            this.enemy2.setVelocityY(0);
            this.enemy2.anims.play('enemy2', true);
          }

          if (length < 100 && normalizedX < 0 && !this.enemy2Attack) {
            this.enemy2.anims.play('attack3Left', true);

            const delayBeforeNextAttack1 = 700; // 1 second delay
            // Schedule a callback function after the delay
            this.time.delayedCall(delayBeforeNextAttack1, () => {
                // Code to execute after the delay
                this.enemy2Attack = true; // Resetting attack flag for next attack
                console.log(this.enemy2Attack);
            }, [], this);

            const delayBeforeNextAttack = 3000; // 1 second delay
            // Schedule a callback function after the delay
            this.time.delayedCall(delayBeforeNextAttack, () => {
                // Code to execute after the delay
                this.enemy2Attack = false; // Resetting attack flag for next attack
            }, [], this);

            // console.log('attacking');
          } else if (length < 100 && normalizedX > 0 && !this.enemy2Attack) {
            this.enemy2.anims.play('attack3', true);

            const delayBeforeNextAttack1 = 700; // 1 second delay
            // Schedule a callback function after the delay
            this.time.delayedCall(delayBeforeNextAttack1, () => {
                // Code to execute after the delay
                this.enemy2Attack = true; // Resetting attack flag for next attack
            }, [], this);

            const delayBeforeNextAttack = 3000; // 1 second delay
            // Schedule a callback function after the delay
            this.time.delayedCall(delayBeforeNextAttack, () => {
                // Code to execute after the delay
                this.enemy2Attack = false; // Resetting attack flag for next attack
            }, [], this);

            // console.log('attacking');
          } else if (normalizedX < 0) {
              // this.setEnemy2Animation(true)
              // console.log('Is animation playing:', this.enemy2.anims.isPlaying);
              this.enemy2.anims.play('enemy2RunLeft', true);
              // this.isEnemy2Running = true;
          } else {
              // Stop the animation or play another animation for other cases
              // Example: this.enemy2.anims.stop();
              // this.setEnemy2Animation(false)
              this.enemy2.anims.play('enemy2RunRight', true);
          }
      } else if (this.enemy2.anims) {
        this.enemy2.anims.play('enemy2', true);
      }
    }
}

export default GameScene;
