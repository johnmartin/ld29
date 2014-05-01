var game = new Phaser.Game(544, 544, Phaser.AUTO, 'game', { create: create }, false, false);

// death screen stuff
// var deathScreen = new deathScreen(game);
// game.state.add('DeathScreen', deathScreen);
// game.retirementMessage = true;

// var transitionScreen = new transitionScreen(game);
// game.state.add('TransitionScreen', transitionScreen);

game.state.add('Level', new Level(game));

// game.batteryLife = 2000;
// game.levelcount = 1;

function create () {
  game.state.start('Level');
}
