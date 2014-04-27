// SPIKES!
var EntitySpike = function (i, object, game, player) {
  this.game = game;
  this.player = player;
  this.alive = true;

  this.sprite = game.add.sprite(object.x, object.y-16, 'spike');
  this.sprite.name = i.toString();
  game.physics.enable(this.sprite);
  this.sprite.body.enableBody = true;
  this.sprite.body.immovable = true;
}

EntitySpike.prototype = Object.create(PIXI.Sprite.prototype);
EntitySpike.prototype.constructor = Phaser.Sprite;

EntitySpike.prototype.hit = function () {
  this.player.dead();
  return false;
}

EntitySpike.prototype.update = function () {
}

// BATTERIES!
var EntityBattery = function (i, object, game, player) {
  this.game = game;
  this.player = player;
  this.alive = true;

  this.sprite = game.add.sprite(object.x, object.y-16, 'battery');
  this.sprite.name = i.toString();
  game.physics.enable(this.sprite);
  this.sprite.body.enableBody = true;
  this.sprite.body.immovable = true;
}

EntityBattery.prototype = Object.create(PIXI.Sprite.prototype);
EntityBattery.prototype.constructor = Phaser.Sprite;

EntityBattery.prototype.hit = function () {
  this.alive = false;
  this.sprite.kill();
  this.player.battery += 1000;
  if (this.player.battery > batteryMax) {
    this.player.battery = batteryMax;
  }
  this.player.torchOn = true;
  return false;
}

EntityBattery.prototype.update = function () {
}

EntityBattery.prototype.glow = function (shadowTexture) {
  return shadowTexture;
}
