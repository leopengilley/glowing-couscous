import { Scene } from 'phaser';
import { config } from './config';

class GameScene extends Scene {

  constructor() {
    super();

    this.score = 0;
    this.gameOver = false;
  };

  //////////////////////////////////////// preloading sounds and images for game
  preload() {
    this.load.image("tiles", "../assets/map/tileset.png");
    this.load.image("cloudsImage", "../assets/bg/clouds.png");
    this.load.image("farGroundsImage", "../assets/bg/far-grounds.png");
    this.load.image("seaImage", "../assets/bg/sea.png");
    this.load.image("skyImage", "../assets/bg/sky.png");
    this.load.tilemapTiledJSON("map", "../assets/map/phaserGameMap.json");


    // this.load.image('floatingTiles', 'assets/bg/tileset.png');
    // this.load.image('sky', 'assets/bg/sky.png');
    // this.load.image('sea', 'assets/bg/sea.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');

    this.load.spritesheet('dude',
      'assets/char/Sprites/Idle.png',
      { frameWidth: 135, frameHeight: 87 }
    );
    // this.load.spritesheet('runRight',
    //   'assets/char/Sprites/Run.png',
    //   { frameWidth: 135, frameHeight: 87 }
    // );
    // this.load.spritesheet('runLeft',
    //   'assets/char/Sprites/runLeft.png',
    //   { frameWidth: 135, frameHeight: 87 }
    // );
    // this.load.spritesheet('jumpUp',
    //   'assets/char/Sprites/Jump.png',
    //   { frameWidth: 135, frameHeight: 87 }
    // );
    // this.load.spritesheet('death',
    //   'assets/char/Sprites/Death.png',
    //   { frameWidth: 135, frameHeight: 87 }
    // );
    // this.load.spritesheet('attack',
    //   'assets/char/Sprites/Attack1.png',
    //   { frameWidth: 135, frameHeight: 87 }
    // );
  }
  ////////////////////////////////////////////////////////////////////// update
  //initialize for the screen
    create() {
      let controls;
      // this.createMap();
      const map = this.make.tilemap({ key: "map"});

      // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
      // Phaser's cache (i.e. the name you used in preload)
      const tileset = map.addTilesetImage("tileset", "tiles", 16, 16, 0, 0);
      const cloudTile = map.addTilesetImage("clouds", "cloudsImage", 16, 16, 0, 0);
      const farGroundsTile = map.addTilesetImage("far-grounds", "farGroundsImage", 16, 16, 0, 0);
      const seaTile = map.addTilesetImage("sea", "seaImage", 16, 16, 0, 0);
      const skyTile = map.addTilesetImage("sky", "skyImage", 16, 16, 0, 0);


      // Parameters: layer name (or index) from Tiled, tileset, x, y
      const backgroundA = map.createLayer("background1", [seaTile, skyTile], 0, 0);
      const backgroundB = map.createLayer("background2", cloudTile, 0, 0);
      const backgroundC = map.createLayer("background3", farGroundsTile, 0, 0);
      const backgroundD = map.createLayer("background4", tileset, 0, 0);
      const backgroundE = map.createLayer("background5", tileset, 0, 0);
      const backgroundF = map.createLayer("background6", tileset, 0, 0);
      const backgroundG = map.createLayer("background7", tileset, 0, 0);
      const objectLayer1 = map.getObjectLayer(['Platforms']);

      // let objects = this.physics.add.staticGroup()
      // map.setCollisionBetween(0, 923, true, 'objectLayer1');
      // player.setCollideWorldBounds(true);
      // this.physics.add.collider(player, GroundLayer);

      // Camera
      // this.cameras.main.startFollow(this.player);
      const camera = this.cameras.main;

      const cursors = this.input.keyboard.createCursorKeys();
      this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
      });
      camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

      // this.createPlayer();

      // this.createAttack();
      // this.createAnimationUpdate();
      //
      // this.createCursor();
      // this.createStars();
      // this.createBombs();

      // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    }

    // createMap() {
    //   const map = this.make.tilemap({ key: "map"});
    //
    //   // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    //   // Phaser's cache (i.e. the name you used in preload)
    //   const tileset = map.addTilesetImage("tileset", "tiles");
    //   const cloudTile = map.addTilesetImage("clouds", "cloudsImage");
    //   const farGroundsTile = map.addTilesetImage("far-grounds", "farGroundsImage");
    //   const seaTile = map.addTilesetImage("sea", "seaImage");
    //   const skyTile = map.addTilesetImage("sky", "skyImage");
    //
    //
    //   // Parameters: layer name (or index) from Tiled, tileset, x, y
    //   const backgroundA = map.createLayer("background1", [seaTile, skyTile], 0, 0);
    //   const backgroundB = map.createLayer("background2", cloudTile, 0, 0);
    //   const backgroundC = map.createLayer("background3", farGroundsTile, 0, 0);
    //   const backgroundD = map.createLayer("background4", tileset, 0, 0);
    //   const backgroundE = map.createLayer("background5", tileset, 0, 0);
    //   const backgroundF = map.createLayer("background6", tileset, 0, 0);
    //   const backgroundG = map.createLayer("background7", tileset, 0, 0);
    //
    //   // Camera
    //   // this.cameras.main.startFollow(this.player);
    //   const camera = this.cameras.main;
    //
    //   this.cursors = this.input.keyboard.createCursorKeys();
    //   this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
    //     camera: this.camera,
    //     left: this.cursors.left,
    //     right: this.cursors.right,
    //     up: this.cursors.up,
    //     down: this.cursors.down,
    //     speed: 0.5
    //   });
    //   camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //
    //   // this.skyTiled = this.add.tileSprite(0, 0, this.scale.width, 304, 'sky').setOrigin(0);
    // }

    // createSea() {
    //   this.seaTiled = this.add.tileSprite(0, 304, this.scale.width, 96, 'sea').setOrigin(0);
    //   // this.seaTiled = this.physics.add.staticGroup();
    //   // this.seaTiled.create(400, 568, 'sea').setScale(2).refreshBody();
    //   // this.seaTiled.create(600, 400, 'sea');
    //   // this.seaTiled.create(50, 250, 'sea');
    //   // this.seaTiled.create(750, 220, 'sea');
    //
    //   this.seaTiled.setOrigin(0, 0);
    //   // this.seaTiled.setScrollFactor(0);
    // }

    // createPlayer() {
    //   this.player = this.physics.add.sprite(450, 400, 'dude');
    //   this.player.setBounce(0.2);
    //
    //   this.player.setCollideWorldBounds(true);
    //   this.physics.add.collider(this.player, this.seaTiled);
    //
    //   this.anims.create({
    //     key: 'idle',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
    //     frameRate: 10,
    //     repeat: 0
    //   })

      // this.anims.create({
      //     key: 'turn',
      //     frames: [ { key: 'dude', frame: 4 } ],
      //     frameRate: 20
      // });
      //
      // this.anims.create({
      //     key: 'moveRight',
      //     frames: this.anims.generateFrameNumbers('runRight', { start: 0, end: 5 }),
      //     frameRate: 10,
      //     repeat: 0
      // });
      //
      // this.anims.create({
      //     key: 'moveLeft',
      //     frames: this.anims.generateFrameNumbers('runLeft', { start: 0, end: 5 }),
      //     frameRate: 10,
      //     repeat: 0
      // });
      //
      // this.anims.create({
      //     key: 'up',
      //     frames: this.anims.generateFrameNumbers('jumpUp', { start: 0, end: 1 }),
      //     frameRate: 1,
      //     repeat: -1
      // });
      // this.anims.create({
      //     key: 'dead',
      //     frames: this.anims.generateFrameNumbers('death', { start: 0, end: 8 }),
      //     frameRate: 10
      // });
      // this.anims.create({
      //     key: 'attack1',
      //     frames: this.anims.generateFrameNumbers('attack', { prefix: 'attack_a/frame', start: 0, end: 8 }),
      //     frameRate: 10,
      //     yoyo: false,
      //     repeat: -1
      // });
    // }

    // createAttack() {
    //    this.attackZone = this.add.zone(this.player.x, this.player.y, 40, 40);
    // }


    // How do I reference the attack animation in this code?
    // createAnimationUpdate() {
    //   this.player.on('animationupdate', (anim, frame, sprite, frameKey) => {
    //     if(frame.index == 1) {
    //       console.log("frame 1");
    //       this.physics.world.disable(this.attackZone);
    //       this.attackZone.x = this.player.x;
    //       this.attackZone.y = this.player.y;
    //     }
    //     if(frame.index == 2) {
    //       // console.log("frame 3");
    //       this.physics.world.enable(this.attackZone);
    //       this.attackZone.x = this.player.x + 50;
    //       this.attackZone.y = this.player.y - 20;
    //       this.attackZone.body.height = 50;
    //     }
    //     if(frame.index == 3) {
    //       // console.log("frame 3");
    //       // this.physics.world.enable(this.attackZone);
    //       this.attackZone.x = this.player.x + 50;
    //       this.attackZone.y = this.player.y - 20;
    //       this.attackZone.body.height = 50;
    //     }
    //     if(frame.index == 4) {
    //       // console.log("frame 4");
    //       this.physics.world.disable(this.attackZone);
    //       this.attackZone.x = this.player.x;
    //       this.attackZone.y = this.player.y;
    //     }
    //   });
    //
    //   this.physics.add.overlap(this.attackZone, this.stars, () => {
    //     this.collectStar;
    //   });
    // }

    // createStars() {
    //   this.stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 0, stepX: 70 } // 70px apart
    //   });
    //
    //   this.stars.children.iterate((child) => {
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   });
    //
    //   this.physics.add.collider(this.stars, this.seaTiled);
    //   // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    // }

    // collectStar(player, star) {
    //   star.disableBody(true, true);
    //   this.score += 10;
    //   this.scoreText.setText('Score: ' + this.score);
    //
    //   if (this.stars.countActive(true) === 0) {
    //     this.stars.children.iterate((child) => {
    //       child.enableBody(true, child.x, 0, true, true);
    //     });
    //
    //     // uses the players position for bomb location: this is cool!!!
    //     const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    //     const bomb = this.bombs.create(x, 16, 'bomb');
    //     bomb.setBounce(1);
    //     bomb.setCollideWorldBounds(true);
    //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); // random bomb direction bounce
    //   }
    // }

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

      // if (this.gameOver !== true) {
      //   if (this.cursors.left.isDown) {
      //     this.player.setVelocityX(-160);
      //     this.player.anims.play('moveLeft', true);
      //   } else if (this.cursors.right.isDown) {
      //     this.player.setVelocityX(160);
      //     this.player.anims.play('moveRight', true);
      //   } else if (this.cursors.space.isDown) {
      //     this.player.anims.play('attack1', true);
      //   } else {
      //     this.player.setVelocityX(0);
      //     this.player.anims.play('idle', true);
      //   }
      //   if (this.cursors.up.isDown && this.player.body.touching.down) {
      //     this.player.setVelocityY(-400);
      //     this.player.anims.play('up', true);
      //   }
      // }
    }
}

export default GameScene;
