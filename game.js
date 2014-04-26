var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });

function preload () {
  game.load.tilemap('level', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('dude', 'assets/dude.png', 12, 12);
  game.load.image('tiles', 'assets/tiles.png', 16, 16);
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

  game.physics.arcade.gravity.y = 250;

  player.body.bounce.y = 0.2;
  player.body.linearDamping = 1;
  player.body.collideWorldBounds = true;

}

function update () {
  game.physics.arcade.collide(player, layer);
}

function render() {
  // game.debug.bodyInfo(player, 32, 320);
}
