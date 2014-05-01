!function (window, CONSTANT) {

  // OK define the main player
  function Player (game) {

    var inited = false;
    var alive = true;
    var health = 10;
    var gibs;
    var battery = 2000;
    var torchOn = true;
    var facing = 'right';
    var sprite;

    // Initializes
    function Init (x, y) {
      // Setup the player sprite
      sprite = game.add.sprite(x, y, 'dude');
      sprite.name = 'player';
      sprite.animations.add('idle-right', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 5);
      sprite.animations.add('idle-left', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6], 5);
      sprite.animations.add('move-right', [2, 3], 10);
      sprite.animations.add('move-left', [7, 8], 10);
      sprite.animations.add('jump-right', [4], 10);
      sprite.animations.add('jump-left', [9], 10);

      // Enable the physics on the sprite
      game.physics.enable(sprite);
      sprite.body.gravity.y = gravity;
      sprite.body.setSize(12, 24, 6, 0);
      sprite.body.linearDamping = 1;
      sprite.body.collideWorldBounds = true;

      // Setup the kill jibs
      gibs = game.add.emitter(0, 0, 4);
      gibs.makeParticles('gibs', [0, 1, 2, 3, 4], 10, true, true);
      gibs.gravity = gravity/4;

      // Public sprite re-definition
      this.sprite = sprite;
      this.body = sprite.body;

    }

    // Handles animation
    function Animation (what) {
      sprite.animations.play(what + '-' + facing);
    }

    // Get's called from phaser to update this
    function Update (layer) {
      game.physics.arcade.collide(sprite, layer);
      // game.physics.arcade.collide(gibs, layer);
      if (sprite.body.velocity.y > CONSTANT.TERMINAL_VELOCITY) {
        sprite.body.velocity.y = CONSTANT.TERMINAL_VELOCITY;
      }
    }

    // Change the direction of the player
    function Direction (direction) {
      facing = direction;
    }

    // Hit the player for damage
    function Hit (amount) {
      health -= amount;
      if (health <= 0) {
        Dead();
      }
    }

    // Get's called whenever the player dies
    function Dead () {
      sprite.kill();
      health = 0;
      gibs.x = this.sprite.x+6;
      gibs.y = this.sprite.y+12;
      gibs.start(true, 0, null, 60);
    }

    // Public instance functions
    Player.prototype.init = Init;
    Player.prototype.animation = Animation;
    Player.prototype.update = Update;
    Player.prototype.dead = Dead;
    Player.prototype.hit = Hit;
    Player.prototype.direction = Direction;

    // Public instance variables
    this.sprite = sprite;
    this.torchOn = torchOn;
    this.battery = battery;
    this.health = health;

  }

  // Setup the PIXI/Phaser inheritance...
  Player.prototype = Object.create(PIXI.Sprite.prototype);
  Player.prototype.constructor = Phaser.Sprite;

  // Globals
  window.Player = Player;

}(window, window.CONSTANT);
