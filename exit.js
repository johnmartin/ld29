!function (window, CONSTANT) {

  function Exit (game) {
    this.game = game;
  }

  Exit.prototype = Object.create(PIXI.Sprite.prototype);
  Exit.prototype.constructor = Phaser.Sprite;

  Exit.prototype.init = function (x, y) {
    this.sprite = this.game.add.sprite(x, y, 'exit');
    this.sprite.name = 'levelExit';
    this.game.physics.enable(this.sprite);
  };

  window.Exit = Exit;

}(window, window.CONSTANT);
