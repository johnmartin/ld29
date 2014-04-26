var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload () {
  game.load.tilemap('level', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  game.load.image('tiles', 'assets/tiles.png', 32, 32);
}

var map;
var layer;
var player;
var playerTopSpeed = 300;
var playerAccel = 60;
var playerDecel = 60;
var playerJumpStrength = 460;
var gravity = 1200;

function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  map = game.add.tilemap('level');
  map.addTilesetImage('tiles');

  // tileset = game.add.tileset('tiles');
  map.setCollisionBetween(2, 3);

  layer = map.createLayer('Tiles');
  // layer.debug = true;

  // The player and its settings
  player = game.add.sprite(400, 300, 'dude');
  game.physics.enable(player);

  game.physics.arcade.gravity.y = gravity;

  player.body.bounce.y = 0.2;
  player.body.linearDamping = 1;
  player.body.collideWorldBounds = true;

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

}

function update () {
  game.physics.arcade.collide(player, layer);

  //  Reset the players velocity (movement)
  // player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    // Move to the left
    if (player.body.velocity.x > -playerTopSpeed){
      player.body.velocity.x -= playerAccel;
    } else {
      player.body.velocity.x = -playerTopSpeed;
    }
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    // Move to the right
    if (player.body.velocity.x < playerTopSpeed){
      player.body.velocity.x += playerAccel;
    } else {
      player.body.velocity.x = playerTopSpeed;
    }
    player.animations.play('right');
  } else {
    // Stand still
    if (player.body.velocity.x > playerDecel ) {
      // slow down movement to right
      player.body.velocity.x -= playerDecel;
      player.animations.play('right');
    } else if (player.body.velocity.x < -playerDecel){
      // slow down movement to left
      player.body.velocity.x += playerDecel;
      player.animations.play('left');
    } else {
      player.body.velocity.x = 0;
      //  Stand still
      player.animations.stop();
      player.frame = 4;
    }
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -playerJumpStrength;
  }

}

function render() {
  // game.debug.bodyInfo(player, 32, 320);
}
