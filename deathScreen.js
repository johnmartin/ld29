deathScreen = function(game){
   this.game = game;
}


deathScreen.prototype.preload = function(){

	// All preload data for current state goes here... for example:

 	deathScreen.load.spritesheet('dude', 'assets/dude.png', 24, 24);
}

deathScreen.prototype.create = function(){

	this.titleimage = this.add.sprite(this.game.world.centerX,0,'title');
	deadPlayer = deathScreen.add.sprite(250,250, 'dude');
 	deadPlayer.animations.add('move-right', [2, 3], 10);
	// console.log(deadPlayer);
 	// deadPlayer.animations.play('move-right');

 	var style = {font: "65px Arial", fill: "#cccccc", align: "center" };
  var text = this.add.text(game.width/2, 100, "DEAD", style);

  if(game.retirementMessage){
  	style = {font: "32px Arial", fill: "#cccccc", align: "center" };
    var retirementText = this.add.text(game.width/2 - 250, 150, "\"...I was one day from retirement...\"", style);
  }

  style = {font: "32px Arial", fill: "#cccccc", align: "center" };
  var lowerText = this.add.text(game.width/2 - 125, 400, "Press T to restart", style);

  text.anchor.set(0.5);


	restartKey = game.input.keyboard.addKey(Phaser.Keyboard.T);

}


deathScreen.prototype.update = function(){

		deadPlayer.animations.play('move-right');
	// The game loop for this particular state goes here... for example :
	if (restartKey.isDown) {
    game.levelCount = 1;
    game.batteryLife = 2000;
    game.state.start('Level');
 	}

}

