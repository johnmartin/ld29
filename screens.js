!function (window, CONSTANT) {

  // Transition between levels screen
  function Transition (game) {
    this.game = game;
  }

  Transition.prototype.preload = function () {
    this.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  }

  Transition.prototype.create = function () {
    var bg = this.game.add.tileSprite(0, 0, 544, 544, 'bg');
    bg.fixedToCamera = true;

    this.add.sprite(this.game.world.centerX, 0, 'title');

    this.player = this.add.sprite(250, 250, 'dude');
    this.player.animations.add('move-right', [2, 3], 10);

    var textComplete = this.add.text(this.game.width/2, 100, "Level " + this.game.level + " Complete!", { font: "65px Arial", fill: "#cccccc", align: "center" });
    textComplete.anchor.set(0.5);
    var textGo = this.add.text(this.game.width/2, 400, "Press T to continue", { font: "32px Arial", fill: "#cccccc", align: "center" });
    textGo.anchor.set(0.5);

    this.continueKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);

  };

  Transition.prototype.update = function () {
    this.player.animations.play('move-right');
    if (this.continueKey.isDown) {
      this.game.level++;
      this.game.state.start('Level');
    }
  };

  //

  function Death (game) {
    this.game = game;
  }

  Death.prototype.preload = function () {
    this.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  };

  Death.prototype.create = function () {

    this.titleimage = this.add.sprite(this.game.world.centerX, 0, 'title');
    var player = this.add.sprite(250, 250, 'dude');
    player.animations.add('move-right', [2, 3], 10);

    var text = this.add.text(this.game.width/2, 100, "DEAD", { font: "65px Arial", fill: "#cccccc", align: "center" });
    text.anchor.set(0.5);

    var retirementText = this.add.text(this.game.width/2, 150, "\"...I was one day from retirement...\"", { font: "32px Arial", fill: "#cccccc", align: "center" });
    retirementText.anchor.set(0.5);

    if (game.level > 1){
      var scoreText = this.add.text(this.game.width/2, 350, "You got to level " + this.game.level + ".", { font: "32px Arial", fill: "#cccccc", align: "center" });
      scoreText.anchor.set(0.5);
    }
  
    var lowerText = this.add.text(this.game.width/2, 400, "Press T to restart", {font: "32px Arial", fill: "#cccccc", align: "center" });
    lowerText.anchor.set(0.5);

    this.restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
  };

  Death.prototype.update = function() {
    if (this.restartKey.isDown) {
      this.game.level = 1;
      this.game.state.start('Level');
    }
  };

  // Globals
  window.ScreenTransition = Transition;
  window.ScreenDeath = Death;

}(window, window.CONSTANT);
