import Phaser from 'phaser'

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player, playerAttackZone, texture, textRunRight, textureRunLeft,
      textureAttackLeft, textureAttackRight, bg1, bg2, bg3, bg4, time) {
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTexture(texture)
        this.player = player; // Store reference to the player object
        // Initialize any properties specific to Enemy1
        this.setCollideWorldBounds(true);
        scene.physics.add.collider(this, bg1);
        scene.physics.add.collider(this, bg2);
        scene.physics.add.collider(this, bg3);
        scene.physics.add.collider(this, bg4);

        this.attackZoneBoss = scene.add.zone(this, x, y, this.x, this.y);
        // scene.physics.world.enable(this.attackZoneBoss);
        // this.attackZoneBoss.x = this.x + 50;
        // this.attackZoneBoss.y = this.y;
        // this.attackZoneBoss.body.height = 50;
        // this.attackZoneBoss.body.width = 50;

        this.time = time;
        this.scene = scene


        scene.physics.add.overlap(playerAttackZone, this, this.killBoss, null, this);

        // this.createAnimationUpdateBoss(this.scene);

    }
  // }


  createAnimationUpdateBoss(scene) {
    this.on('animationupdate', (anim, frame, sprite, frameKey) => {
      if(anim.key === 'bossAttackLeft' && frame.index === 2) {
        console.log("attack boss enabled on frame 3");
        scene.physics.world.enable(this.attackZoneBoss);
        this.attackZoneBoss.x = this.x + 50;
        this.attackZoneBoss.y = this.y + 200;
        this.attackZoneBoss.body.height = 50;
        this.attackZoneBoss.body.width = 50;
      }
      if(anim.key === 'bossAttackLeft' && frame.index === 10) {
        console.log("attack disabling on frame 4");
        scene.physics.world.disable(this.attackZoneBoss);
        this.attackZoneBoss.x = this.x;
        this.attackZoneBoss.y = this.y;
        this.anims.play('bossIdle', true);
      }
      if(anim.key === 'bossAttackRight' && frame.index === 2) {
        console.log("attack right enabled on frame 3");
        scene.physics.world.enable(this.attackZoneBoss);
        this.attackZoneBoss.x = this.x + 200;
        this.attackZoneBoss.y = this.y + 200;
        this.attackZoneBoss.body.height = 50;
        this.attackZoneBoss.body.width = 50;
      }
      if(anim.key === 'bossAttackRight' && frame.index === 10) {
        console.log("attack right disabling on frame 4");
        scene.physics.world.disable(this.attackZoneBoss);
        this.attackZoneBoss.x = this.x;
        this.attackZoneBoss.y = this.y;
        this.anims.play('bossIdle', true);
      }
    });
  }

  killBoss(scene) {
    // scene.tweens.killTweensOf(this);
    this.anims.stop(); // Stop the animation
    this.destroy(); // Destroy the enemy
  }

  killPlayer(player, scene) {
    console.log(this.player);
    // this.tweens.killTweensOf(this.player);
    this.player.anims.stop(); // Stop the animation
    this.player.destroy(); // Destroy the enemy

    this.scene.gameOver = true;
    this.scene.gameOverText.visible = true;
    this.scene.input.on('pointerdown', () => {
      this.scene.start('preload');
      this.scene.gameOver = false;
    });
  }


// Phaser.GameObjects.GameObjectFactory.register('boss', function (x, y, player, texture) {
//     const boss = new Boss(this.scene, x, y, player, 'bossIdle')
//
//     this.displayList.add(boss)
//     this.updateList.add(boss)
//
//     return boss
//   })



    preUpdate(time, delta) {
        super.preUpdate(time, delta);


        this.scene.physics.add.overlap(this.attackZoneBoss, this.player, this.killPlayer, null, this);

        // console.log("hello");
        // Update logic specific to Enemy1
    //     console.log("sheet 2");
        if (this.player) {
          // Update boss movement to follow the player

          let speed = 100;
          let distanceX = this.player.x - this.x;
          let distanceY = this.player.y - this.y;
          let length = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (length < 200 && this.anims) {
              let normalizedX = distanceX / length;
              let normalizedY = distanceY / length;
              this.setVelocityX(normalizedX * speed);
              // this.enemy2.setVelocityY(normalizedY * speed);

              // Check if enemy too far

              if (length > 199) {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('bossIdle', true);
              }

              if (length < 100 && normalizedX < 0 && !this.bossAttack) {
                this.anims.play('bossAttackLeft', true);
                console.log('attacking left');

                const delayBeforeNextAttack1 = 700; // 1 second delay
                // Schedule a callback function after the delay
                this.time.delayedCall(delayBeforeNextAttack1, () => {
                    // Code to execute after the delay
                    this.bossAttack = true; // Resetting attack flag for next attack
                    console.log(this.bossAttack);
                }, [], this);

                const delayBeforeNextAttack = 3000; // 1 second delay
                // Schedule a callback function after the delay
                this.time.delayedCall(delayBeforeNextAttack, () => {
                    // Code to execute after the delay
                    this.bossAttack = false; // Resetting attack flag for next attack
                }, [], this);

                // console.log('attacking');
              } else if (length < 100 && normalizedX > 0 && !this.bossAttack) {
                this.anims.play('bossAttackRight', true);
                console.log('attacking right');

                const delayBeforeNextAttack1 = 700; // 1 second delay
                // Schedule a callback function after the delay
                this.time.delayedCall(delayBeforeNextAttack1, () => {
                    // Code to execute after the delay
                    this.bossAttack = true; // Resetting attack flag for next attack
                }, [], this);

                const delayBeforeNextAttack = 3000; // 1 second delay
                // Schedule a callback function after the delay
                this.time.delayedCall(delayBeforeNextAttack, () => {
                    // Code to execute after the delay
                    this.bossAttack = false; // Resetting attack flag for next attack
                }, [], this);

                // console.log('attacking');
              } else if (normalizedX < 0) {
                  // this.setEnemy2Animation(true)
                  // console.log('Is animation playing:', this.enemy2.anims.isPlaying);
                  this.anims.play('bossRunLeft', true);
                  // this.isEnemy2Running = true;
              } else {
                  // Stop the animation or play another animation for other cases
                  // Example: this.enemy2.anims.stop();
                  // this.setEnemy2Animation(false)
                  this.anims.play('bossRunRight', true);
              }
          } else if (this.anims) {
            this.anims.play('bossIdle', true);
          }
      }
    }
}
