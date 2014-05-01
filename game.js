var game = new Phaser.Game(544, 544, Phaser.AUTO, 'game', { preload: preload, create: create, update: update }, false, false);

// death screen stuff
var deathScreen = new deathScreen(game);
game.state.add('DeathScreen',deathScreen);
game.retirementMessage = true;

var transitionScreen = new transitionScreen(game);
game.state.add('TransitionScreen', transitionScreen);

var level = new level(game);
game.state.add('Level', level);

game.batteryLife = 2000;
game.levelcount = 1;
// console.log(game.state);

// var amIProcedural = true;

function preload () {
}



function create () {
  game.state.start('Level');
}

function update () {
}

