export default class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'boss'); // 'enemy1' is the texture key
        scene.add.existing(this);
        this.player = player; // Store reference to the player object
        // Initialize any properties specific to Enemy1
    }

    update() {
        // Update logic specific to Enemy1

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
