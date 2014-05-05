!function (window, CONSTANT) {

  // OK define the main player
  function Player (game) {
    this.game = game;
    this.alive = true;
    this.health = CONSTANT.MAX_HEALTH;
    this.battery = CONSTANT.MAX_BATTERY;
    this.torchOn = true;
    this.facing = 'right';
  }

  // Setup the PIXI/Phaser inheritance...
  Player.prototype = Object.create(PIXI.Sprite.prototype);
  Player.prototype.constructor = Phaser.Sprite;

  Player.prototype.init = function (x, y) {

    this.sprite = game.add.sprite(x, y, 'dude');
    this.sprite.name = 'player';
    this.sprite.animations.add('idle-right', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 5);
    this.sprite.animations.add('idle-left', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6], 5);
    this.sprite.animations.add('move-right', [2, 3], 10);
    this.sprite.animations.add('move-left', [7, 8], 10);
    this.sprite.animations.add('jump-right', [4], 10);
    this.sprite.animations.add('jump-left', [9], 10);

    // Enable the physics on the sprite
    game.physics.enable(this.sprite);
    this.sprite.body.gravity.y = CONSTANT.GRAVITY;
    this.sprite.body.setSize(12, 24, 6, 0);
    this.sprite.body.linearDamping = 1;
    this.sprite.body.collideWorldBounds = true;

    // Setup the kill jibs
    this.gibs = game.add.emitter(0, 0, 4);
    this.gibs.makeParticles('gibs', [0, 1, 2, 3, 4], 10, true, true);
    this.gibs.gravity = CONSTANT.GRAVITY/4;

    // Public sprite re-definition
    this.body = this.sprite.body;

  };

  // 
  // Player.prototype.health = '';
  // Player.prototype.battery = '';
  // Player.prototype.torchOn = '';
  // Player.prototype.facing = '';

  // Handles animation
  Player.prototype.animation = function (what) {
    this.sprite.animations.play(what + '-' + this.facing);
  };

  // Get's called from phaser to update this
  Player.prototype.update = function (layer) {
    this.game.physics.arcade.collide(this.sprite, layer);
    this.game.physics.arcade.collide(this.gibs, layer);
    if (this.sprite.body.velocity.y > CONSTANT.TERMINAL_VELOCITY) {
      this.sprite.body.velocity.y = CONSTANT.TERMINAL_VELOCITY;
    }
  };

  // Hit the player for damage
  Player.prototype.hit = function (amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.dead();
    }
  };

  // Get's called whenever the player dies
  Player.prototype.dead = function () {
    this.health = 0;
    this.gibs.x = this.sprite.x+6;
    this.gibs.y = this.sprite.y+12;
    this.gibs.start(true, 0, null, 60);
    this.sprite.kill();
  };

  Player.prototype.add_battery = function (to_add) {
    this.battery += to_add;
    if (this.battery > CONSTANT.MAX_BATTERY) {
      this.battery = CONSTANT.MAX_BATTERY;
    }
    this.torchOn = true;
  };

    // // Public instance functions
    // this.init = Init;
    // this.animation = Animation;
    // this.update = Update;
    // this.dead = Dead;
    // this.hit = Hit;
    // this.direction = Direction;
    // this.add_battery = AddBattery;

    // // Public instance variables
    // this.sprite = sprite;
    // this.torchOn = torchOn;
    // this.battery = battery;
    // this.health = health;

  // }

  // Globals
  window.Player = Player;

}(window, window.CONSTANT);
