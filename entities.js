!function (window, CONSTANT) {

  // SPIKES!
  function Spikes (i, object, game, player) {
    this.has_glow = false;
    this.alive = true;
    this.player = player;

    this.sprite = game.add.sprite(object.x, object.y - 16, 'spike');
    this.sprite.name = i.toString();
    game.physics.enable(this.sprite);
    this.sprite.body.enableBody = true;
    this.sprite.body.immovable = true;
  }

  // Setup the PIXI/Phaser inheritance...
  Spikes.prototype = Object.create(PIXI.Sprite.prototype);
  Spikes.prototype.constructor = Phaser.Sprite;

  Spikes.prototype.hit = function () {
    this.player.dead();
  };

  // BATTERIES!
  function Batteries (i, object, game, player) {
    this.has_glow = true;
    this.alive = true;
    this.player = player;

    this.sprite = game.add.sprite(object.x, object.y-16, 'battery');
    this.sprite.name = i.toString();
    game.physics.enable(this.sprite);
    this.sprite.body.enableBody = true;
    this.sprite.body.immovable = true;
  }

  // Setup the PIXI/Phaser inheritance...
  Batteries.prototype = Object.create(PIXI.Sprite.prototype);
  Batteries.prototype.constructor = Phaser.Sprite;

  Batteries.prototype.hit = function () {
    this.alive = false;
    this.sprite.kill();
    this.player.add_battery(1000);
  };

  Batteries.prototype.glow = function (shadowTexture, x, y) {
    var radius = 20;
    var gradient = shadowTexture.context.createRadialGradient(
        x,y, radius * 0.5,
        x,y, radius);
    gradient.addColorStop(0, 'rgba(43, 135, 71, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = gradient;
    shadowTexture.context.arc(x, y,
        radius, 0, Math.PI*2);
    shadowTexture.context.fill();
    return shadowTexture;
  };

  // Globals
  window.EntitySpike = Spikes;
  window.EntityBattery = Batteries;

}(window, window.CONSTANT);
