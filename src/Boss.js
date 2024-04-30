import Phaser from 'phaser'

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player, texture, textRunRight, textureRunLeft,
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

        this.time = time;
    }
  // }

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
