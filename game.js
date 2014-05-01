var game = new Phaser.Game(544, 544, Phaser.AUTO, 'game', { preload: preload, create: create, update: update }, false, false);

// death screen stuff
var deathScreen = new deathScreen(game);
game.state.add('DeathScreen',deathScreen);
game.retirementMessage = true;

var level = new level(game);
game.state.add('Level', level);

// console.log(game.state);

// var amIProcedural = true;

function preload () {
}



function create () {
  game.state.start('Level');
}

function update () {
}

