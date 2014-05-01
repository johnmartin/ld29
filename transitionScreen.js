transitionScreen = function(game){
   this.game = game;
}


transitionScreen.prototype.preload = function(){

	// All preload data for current state goes here... for example:

 	transitionScreen.load.spritesheet('dude', 'assets/dude.png', 24, 24);
}

transitionScreen.prototype.create = function(){

  bg = game.add.tileSprite(0, 0, 544, 544, 'bg');
  bg.fixedToCamera = true;


  // Light and shadow stuff
  // Create the shadow texture
  shadowTexture = game.add.bitmapData(4*game.width, 4*game.height);
  // Create an object that will use the bitmap as a texture
  lightSprite = game.add.image(0, 0, shadowTexture);
  // Set the blend mode to MULTIPLY. This will darken the colors of
  // everything below this sprite.
  lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

	this.titleimage = this.add.sprite(this.game.world.centerX,0,'title');
	player = transitionScreen.add.sprite(250,250, 'dude');
 	player.animations.add('move-right', [2, 3], 10);
	// console.log(deadPlayer);
 	// deadPlayer.animations.play('move-right');

 	var style = {font: "65px Arial", fill: "#cccccc", align: "center" };
  var text = this.add.text(game.width/2, 100, "Level " + game.levelCount + " Complete!", style);

  style = {font: "32px Arial", fill: "#cccccc", align: "center" };
  var lowerText = this.add.text(game.width/2 - 125, 400, "Press T to continue", style);

  text.anchor.set(0.5);



	continueKey = game.input.keyboard.addKey(Phaser.Keyboard.T);

}


transitionScreen.prototype.update = function(){

	player.animations.play('move-right');
	if (continueKey.isDown) {
    game.levelCount++;
    game.state.start('Level');
 	}

  transitionScreen.drawShadowTexture();

}


transitionScreen.prototype.drawShadowTexture = function() {
  // This function updates the shadow texture (shadowTexture).
  // First, it fills the entire texture with a dark shadow color.
  // Then it draws a white circle centered on the pointer position.
  // Because the texture is drawn to the screen using the MULTIPLY
  // blend mode, the dark areas of the texture make all of the colors
  // underneath it darker, while the white area is unaffected.

  // the centre point of the shadow texture (relative to shdaow texture). This point is always focused on the player
  var textureCentreX = 2*game.width;
  var textureCentreY = 2*game.height;

  // Draw shadow
  shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
  shadowTexture.context.fillRect(game.width, game.height, 2*game.width, 2*game.height);

  // Draw circle of light with a soft edge (radius dependent on battery life)
  // var radius = lightRadius * Math.max(Math.min(player.battery, 1000)/1000, 0.4);
  // var gradient = shadowTexture.context.createRadialGradient(
  //     textureCentreX,textureCentreY, radius * 0.5,
  //     textureCentreX,textureCentreY, radius);
  // gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  // gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  // shadowTexture.context.beginPath();
  // shadowTexture.context.fillStyle = gradient;
  // shadowTexture.context.arc(textureCentreX, textureCentreY,
  //     radius, 0, Math.PI*2);
  // shadowTexture.context.fill();

  // //draw torch light, if torch is on
  // var flicker = false;
  // if (player.battery <= 1000 && (player.battery % 200 <  3)) {
  //   flicker = true;
  // }
  // // if (player.battery < 100 && (player.battery % 10 < 5)) {
  // //   flicker = true;
  // // }

  // var angleToMouse = Math.atan2(mousePointer.y - player.body.y, mousePointer.x - player.body.x);
  // if ( angleToMouse > 0-(Math.PI/2) && angleToMouse < Math.PI/2 ) {
  //   player.direction = 'right';
  // } else {
  //   player.direction = 'left';
  
  var textureCentreX = 2*game.width;
  var textureCentreY = 2*game.height;

  shadowTexture.context.beginPath();
  shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
  shadowTexture.context.arc(textureCentreX, textureCentreY,
  game.width + game.height,  - Math.PI/8,  Math.PI/8);
  shadowTexture.context.lineTo(textureCentreX, textureCentreY);
  shadowTexture.context.fill();
  

  lightSprite.x = player.x - textureCentreX+ 6;
  lightSprite.y = player.y - textureCentreY + 18;

  // This just tells the engine it should update the texture cache
  shadowTexture.dirty = true;
  lightSprite.dirty = true;
  player.dirty = true;

}