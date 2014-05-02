// The Exit! Or maybe... AN exit???
var Exit = function (game) {
  this.game = game;
  this.inited = false;
}

Exit.prototype = Object.create(PIXI.Sprite.prototype);
Exit.prototype.constructor = Phaser.Sprite;

Exit.prototype.init = function(x, y) {
  this.sprite = game.add.sprite(x, y, 'exit');
  this.sprite.name = 'levelExit';

  game.physics.enable(this.sprite);
}
