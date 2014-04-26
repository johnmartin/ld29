var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload () {
  game.load.tilemap('level', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  game.load.image('tiles', 'assets/tiles.png', 32, 32);
}

var map;
var layer;
var player;

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

  game.physics.arcade.gravity.y = 600;

  player.body.bounce.y = 0.2;
  player.body.linearDamping = 1;
  player.body.collideWorldBounds = true;

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

}

function update () {
  game.physics.arcade.collide(player, layer);

  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    // Move to the left
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    // Move to the right
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    // Stand still
    player.animations.stop();
    player.frame = 4;
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.onFloor()) {
    player.body.velocity.y = -230;
  }

}

function render() {
  // game.debug.bodyInfo(player, 32, 320);
}
