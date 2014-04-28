// SLIME!
var EnemySlime = function (i, object, game, player) {
  this.game = game;
  this.player = player;
  this.health = 3;
  this.alive = true;
  this.movingRight = true;

  this.sprite = game.add.sprite(object.x, object.y, 'slime');
  this.sprite.name = i.toString();
  this.sprite.animations.add('move-left', [0, 1], 5);
  this.sprite.animations.add('move-right', [2, 3], 5);
  game.physics.enable(this.sprite);
  this.sprite.body.immovable = false;
  this.sprite.body.collideWorldBounds = true;
  this.sprite.body.linearDamping = 1;
  this.sprite.body.gravity.y = gravity;
  this.sprite.body.bounce.x = 0.5;

  this.gibs = game.add.emitter(0, 0, 4);
  this.gibs.makeParticles('slime-gibs', [0, 1, 2, 3, 4], 100, true, true);
  this.gibs.gravity = gravity/4;
}

EnemySlime.prototype = Object.create(PIXI.Sprite.prototype);
EnemySlime.prototype.constructor = Phaser.Sprite;

EnemySlime.prototype.hit = function() {
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

EnemySlime.prototype.update = function() {
  game.physics.arcade.collide(this.sprite, layer);
  game.physics.arcade.collide(this.gibs, layer);
  if(this.sprite.body.onWall()){
    this.movingRight = !this.movingRight;
  }
  if (this.movingRight){
    this.sprite.animations.play('move-right');
    this.sprite.body.velocity.x = 20;
  } else {
    this.sprite.animations.play('move-left');
    this.sprite.body.velocity.x = -20;
  }
}
