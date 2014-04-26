console.log("Epic game times...");
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	console.log("preloading map...");
    game.load.spritesheet('dude', 'assets/dude.png', 12, 12);
    game.load.tilemap('Level0', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tiles.png', 16, 16);
    console.log("done...");
}

var map;
var tileset
var foreLayer;
var backLayer;



function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	map = game.add.tilemap('Level0');

	map.addTilesetImage('tiles');

	// tileset = game.add.tileset('tiles');
	// tileset.setCollision(1);
	// tileset.setCollision(2);

	   //  map.setCollisionBetween(15, 16);
     map.setCollisionBetween(1,3);
    // map.setCollisionBetween(27, 29);
    // map.setCollisionBetween(0,40)

    

    // backLayer = map.createLayer("Background");
    foreLayer = map.createLayer('Foreground');

     // foreLayer.debug = true;
     // foreLayer.resizeWorld();

    // The player and its settings
    player = game.add.sprite(400, 300, 'dude');
        //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    game.physics.arcade.gravity.y = 250;

    player.body.bounce.y = 0.2;
    player.body.linearDamping = 1;
    player.body.collideWorldBounds = true;


    // //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 500;
    // player.body.collideWorldBounds = true;


//  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {
	game.physics.arcade.collide(player, foreLayer);


	// game.physics.arcade.overlap(player, foreLayer, layerCollision, null, this);

 //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;

    // if (cursors.left.isDown)
    // {
    //     //  Move to the left
    //     player.body.velocity.x = -150;

    //     player.animations.play('left');
    // }
    // else if (cursors.right.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.x = 150;

    //     player.animations.play('right');
    // }
    // else
    // {
    //     //  Stand still
    //     player.animations.stop();

    //     player.frame = 4;
    // }
    
    // //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //     player.body.velocity.y = -200;
    // }
}

function layerCollision(player, foreLayer){

	console.log("collision dude");
}