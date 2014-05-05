!function (window, CONSTANT) {

  var game = new Phaser.Game(544, 544, Phaser.AUTO, 'game', { create: create }, false, false);

  game.level = 1;

  // add the game states
  game.state.add('ScreenDeath', new ScreenDeath(game));
  game.state.add('ScreenTransition', new ScreenTransition(game));
  game.state.add('Level', new Level(game));

  function create () {
    game.state.start('Level');
  }

}(window, window.CONSTANT);
