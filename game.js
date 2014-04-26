var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload () {
  game.load.tilemap('level', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  game.load.image('bg', 'assets/bg.png', 800, 600);
  game.load.image('tiles', 'assets/tiles.png', 32, 32);
  game.load.image('gui', 'assets/gui.png', 800, 24);
}

var map;
var layer;
var player;
var bg;
var gui;
var playerDirection = 'right';
var playerTopSpeed = 300;
var playerAccel = 60;
var playerDecel = 60;
var playerJumpStrength = 460;
var gravity = 1200;
var terminalVelocity = 2000;
var shadowTexture;
var lightSprite;
var lightRadius = 200;
var mousePointer;

function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('level');
  map.addTilesetImage('tiles');

  bg = game.add.tileSprite(0, 0, 800, 600, 'bg');
  bg.fixedToCamera = true;

  // tileset = game.add.tileset('tiles');
  map.setCollisionBetween(1, 6);

  layer = map.createLayer('Tiles');
  // layer.debug = true;
  layer.resizeWorld();

  // The player and its settings
  player = game.add.sprite(100, 100, 'dude');
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

  // Add the mouse pointer
  mousePointer = this.game.add.sprite(this.game.width/2, this.game.height/2);

  // Create the shadow texture
  shadowTexture = game.add.bitmapData(4*game.width, 4*game.height);

  // Create an object that will use the bitmap as a texture
  lightSprite = game.add.image(0, 0, shadowTexture);

  // Set the blend mode to MULTIPLY. This will darken the colors of
  // everything below this sprite.
  lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

  gui = game.add.tileSprite(10, 10, 776, 24, 'gui');
  gui.fixedToCamera = true;

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

  // Update mouse pointer location
  mousePointer.x = this.game.input.activePointer.worldX;
  mousePointer.y = this.game.input.activePointer.worldY;


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
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(2*this.game.width, 2*this.game.height,
        lightRadius, 0, Math.PI*2);
    this.shadowTexture.context.fill();


    var angleToMouse= Math.atan2(mousePointer.y - player.body.y, mousePointer.x - player.body.x);
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    this.shadowTexture.context.arc(2*this.game.width, 2*this.game.height,
       this.game.width + this.game.height, angleToMouse-Math.PI/8, angleToMouse + Math.PI/8);
    this.shadowTexture.context.lineTo(2*this.game.width, 2*this.game.height);
    this.shadowTexture.context.fill();



    lightSprite.x = player.body.x - 2*this.game.width + 6;
    lightSprite.y = player.body.y - 2*this.game.height + 12;

    // This just tells the engine it should update the texture cache
    shadowTexture.dirty = true;
    lightSprite.dirty = true;
    player.dirty = true;
}

function render() {
  // game.debug.bodyInfo(player, 32, 320);
}
