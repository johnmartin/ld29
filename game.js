var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload () {
  game.load.tilemap('level', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  game.load.image('tiles', 'assets/tiles.png', 32, 32);
}

var map;
var layer;
var player;
var playerDirection = 'right';
var playerTopSpeed = 300;
var playerAccel = 60;
var playerDecel = 60;
var playerJumpStrength = 460;
var gravity = 1200;
var terminalVelocity = 2000;
var shadowTexture;
var lightSprite;
var lightRadius = 300;

function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('level');
  map.addTilesetImage('tiles');

  // tileset = game.add.tileset('tiles');
  map.setCollisionBetween(2, 3);

  layer = map.createLayer('Tiles');
  // layer.debug = true;
  layer.resizeWorld();

  // The player and its settings
  player = game.add.sprite(700, 400, 'dude');
  player.name = 'dude';
  player.debug = true;
  player.animations.add('idle-right', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 5);
  player.animations.add('idle-left', [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5], 5);
  player.animations.add('move-right', [2, 3], 10);
  player.animations.add('move-left', [6, 7], 10);
  game.physics.enable(player);

  game.physics.arcade.gravity.y = gravity;

  player.body.setSize(12, 24, 6, 0);
  player.body.bounce.y = 0.2;
  player.body.linearDamping = 1;
  player.body.collideWorldBounds = true;

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

  game.camera.follow(player);



  // Create the shadow texture
  shadowTexture = this.game.add.bitmapData(4*this.game.width, 4*this.game.height);

  // Create an object that will use the bitmap as a texture
  lightSprite = this.game.add.image(0, 0, shadowTexture);

  // Set the blend mode to MULTIPLY. This will darken the colors of
  // everything below this sprite.
  lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

}

function update () {
  game.physics.arcade.collide(player, layer);

  if (cursors.left.isDown) {
    // Move to the left
    if (player.body.velocity.x > -playerTopSpeed) {
      player.body.velocity.x -= playerAccel;
    } else {
      player.body.velocity.x = -playerTopSpeed;
    }
    player.animations.play('move-left');
    playerDirection = 'left';
  } else if (cursors.right.isDown) {
    // Move to the right
    if (player.body.velocity.x < playerTopSpeed) {
      player.body.velocity.x += playerAccel;
    } else {
      player.body.velocity.x = playerTopSpeed;
    }
    player.animations.play('move-right');
    playerDirection = 'right';
  } else {
    // Stand still
    if (player.body.velocity.x > playerDecel) {
      // slow down movement to right
      player.body.velocity.x -= playerDecel;
      player.animations.play('move-right');
      playerDirection = 'right';
    } else if (player.body.velocity.x < -playerDecel) {
      // slow down movement to left
      player.body.velocity.x += playerDecel;
      player.animations.play('move-left');
      playerDirection = 'left';
    } else {
      player.body.velocity.x = 0;
      //  Stand still
      player.animations.play('idle-'+playerDirection);
    }
  }

  //update vertical movement based on terminal velocty - don't fall too fast!
  if (player.body.velocity.y > terminalVelocity) {
    player.body.velocity.y = terminalVelocity;
  }
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -playerJumpStrength;
  }

    // Update the shadow texture each frame
    updateShadowTexture();


}

function updateShadowTexture() {
    // This function updates the shadow texture (this.shadowTexture).
    // First, it fills the entire texture with a dark shadow color.
    // Then it draws a white circle centered on the pointer position.
    // Because the texture is drawn to the screen using the MULTIPLY
    // blend mode, the dark areas of the texture make all of the colors
    // underneath it darker, while the white area is unaffected.

    // Draw shadow
    shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    shadowTexture.context.fillRect(0, 0, 4*this.game.width, 4*this.game.height);

    // Draw circle of light with a soft edge
    var gradient = this.shadowTexture.context.createRadialGradient(
        2*this.game.width,2*this.game.height, lightRadius * 0.5,
        2*this.game.width,2*this.game.height, lightRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(2*this.game.width, 2*this.game.height,
        lightRadius, 0, Math.PI*2);
    this.shadowTexture.context.fill();

    lightSprite.x = player.body.x - 2*this.game.width;
    lightSprite.y = player.body.y - 2*this.game.height;

    // This just tells the engine it should update the texture cache
    shadowTexture.dirty = true;
    lightSprite.dirty = true;
}

function render() {
  // game.debug.bodyInfo(player, 32, 320);
}
