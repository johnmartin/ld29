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

EntityBattery.prototype.glow = function (shadowTexture, x,y) {
  // Draw circle of light with a soft edge around the battery
  var radius = 50;
  var gradient = shadowTexture.context.createRadialGradient(
      x,y, radius * 0.5,
      x,y, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  shadowTexture.context.beginPath();
  shadowTexture.context.fillStyle = gradient;
  shadowTexture.context.arc(x, y,
      radius, 0, Math.PI*2);
  shadowTexture.context.fill();

  return shadowTexture;
}
