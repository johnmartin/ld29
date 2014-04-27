// The Player...
var Player = function (game) {
  this.game = game;
  this.inited = false;
  this.alive = true;
  this.health = 100;
  this.battery = 2000;
  this.torchOn = true;
  this.facing = 'right';
}

Player.prototype = Object.create(PIXI.Sprite.prototype);
Player.prototype.constructor = Phaser.Sprite;

Player.prototype.init = function(x, y) {
  this.sprite = game.add.sprite(x, y, 'dude');
  this.sprite.name = 'player';
  this.sprite.animations.add('idle-right', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 5);
  this.sprite.animations.add('idle-left', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6], 5);
  this.sprite.animations.add('move-right', [2, 3], 10);
  this.sprite.animations.add('move-left', [7, 8], 10);
  this.sprite.animations.add('jump-right', [4], 10);
  this.sprite.animations.add('jump-left', [9], 10);

  game.physics.enable(this.sprite);
  this.sprite.body.gravity.y = gravity;
  this.sprite.body.setSize(12, 24, 6, 0);
  // this.sprite.body.bounce.y = 0.2;
  this.sprite.body.linearDamping = 1;
  this.sprite.body.collideWorldBounds = true;

  this.gibs = game.add.emitter(0, 0, 4);
  this.gibs.makeParticles('gibs', [0, 1, 2, 3, 4], 10, true, true);
  this.gibs.gravity = gravity/4;

  this.body = this.sprite.body;
}

Player.prototype.animation = function(what) {
  this.sprite.animations.play(what + '-' + this.direction);
}

Player.prototype.hit = function() {
  this.health -= 1;
  if (this.health <= 0) {
    this.alive = false;
    this.sprite.kill();
    this.gibs.x = this.sprite.x;
    this.gibs.y = this.sprite.y;
    this.gibs.start(true, 0, null, 60);
    return true;
  }
  return false;
}

Player.prototype.update = function(layer) {
  game.physics.arcade.collide(this.sprite, layer);
  game.physics.arcade.collide(this.gibs, layer);
}

Player.prototype.dead = function() {
  this.sprite.kill();
  this.health = 0;
  this.gibs.x = this.sprite.x+6;
  this.gibs.y = this.sprite.y+12;
  this.gibs.start(true, 0, null, 60);
}
