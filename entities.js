!function (window, CONSTANT) {

  // SPIKES!
  function Spikes (i, object, game, player) {

    var sprite = game.add.sprite(object.x, object.y - 16, 'spike');
    sprite.name = i.toString();
    game.physics.enable(sprite);
    sprite.body.enableBody = true;
    sprite.body.immovable = true;

    function Hit () {
      player.dead();
      return false;
    }

    // Public instance functions
    Spikes.prototype.hit = Hit;

    // Public instance variables
    this.has_glow = false;
    this.alive = true;
    this.sprite = sprite;

  }

  // Setup the PIXI/Phaser inheritance...
  Spikes.prototype = Object.create(PIXI.Sprite.prototype);
  Spikes.prototype.constructor = Phaser.Sprite;

  // BATTERIES!
  function Batteries (i, object, game, player) {

    var alive = true;
    var sprite = game.add.sprite(object.x, object.y-16, 'battery');
    sprite.name = i.toString();
    game.physics.enable(sprite);
    sprite.body.enableBody = true;
    sprite.body.immovable = true;

    function Hit () {
      alive = false;
      sprite.kill();
      player.add_battery(1000);
      return false;
    }

    function Glow (shadowTexture, x, y) {
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
    }

    // Public instance functions
    Batteries.prototype.hit = Hit;
    Batteries.prototype.glow = Glow;

    // Public instance variables
    this.has_glow = true;
    this.alive = alive;
    this.sprite = sprite;

  }

  // Setup the PIXI/Phaser inheritance...
  Batteries.prototype = Object.create(PIXI.Sprite.prototype);
  Batteries.prototype.constructor = Phaser.Sprite;

  // Globals
  window.EntitySpike = Spikes;
  window.EntityBattery = Batteries;

}(window, window.CONSTANT);
