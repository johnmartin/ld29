!function (window, CONSTANT) {

  // var speed = 20;

  function Slime (i, object, game, player) {

    this.isMovingRight = true;
    this.alive = true;
    this.game = game;
    this.player = player;

    this.sprite = game.add.sprite(object.x, object.y, 'slime');
    this.sprite.name = i.toString();
    this.sprite.animations.add('move-left', [0, 1], 5);
    this.sprite.animations.add('move-right', [2, 3], 5);
    game.physics.enable(this.sprite);
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.linearDamping = 1;
    this.sprite.body.gravity.y = CONSTANT.GRAVITY;
    this.sprite.body.bounce.x = 0.5;

    this.gibs = game.add.emitter(0, 0, 4);
    this.gibs.makeParticles('slime-gibs', [0, 1, 2, 3, 4], 100, true, true);
    this.gibs.gravity = CONSTANT.GRAVITY/4;

  }

  // Setup the PIXI/Phaser inheritance...
  Slime.prototype = Object.create(PIXI.Sprite.prototype);
  Slime.prototype.constructor = Phaser.Sprite;

  Slime.prototype.update = function (layer) {
    this.game.physics.arcade.collide(this.sprite, layer);
    this.game.physics.arcade.collide(this.gibs, layer);
    this.game.physics.arcade.overlap(this.player.sprite, this.sprite, this.hit);
    if (this.sprite.body.onWall()) {
      this.isMovingRight = !this.isMovingRight;
    }
    if (this.isMovingRight) {
      this.sprite.animations.play('move-right');
      this.sprite.body.velocity.x = CONSTANT.SLIME_SPEED;
    } else {
      this.sprite.animations.play('move-left');
      this.sprite.body.velocity.x = 0-CONSTANT.SLIME_SPEED;
    }
  };

  Slime.prototype.hit = function () {
    this.gibs.x = this.sprite.x;
    this.gibs.y = this.sprite.y;
    this.gibs.start(true, 0, null, 60);
    this.sprite.kill();
  };

    // // Call the init
    // Init();

    // // Public instance functions
    // this.update = Update;
    // this.hit = Hit;

    // // Public instance variables
    // this.alive = alive;
    // this.sprite = sprite;

  // Globals
  window.EnemySlime = Slime;

}(window, window.CONSTANT);
