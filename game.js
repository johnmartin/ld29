var game = new Phaser.Game(544, 544, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render }, false, false);

var amIProcedural = true;

function preload () {
  if (!amIProcedural){
    game.load.tilemap('level', 'assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
  }
  game.load.spritesheet('dude', 'assets/dude.png', 24, 24);
  game.load.image('bg', 'assets/bg.png', 544, 544);
  game.load.image('tiles', 'assets/tiles.png', 112, 32);
  game.load.image('gui', 'assets/gui.png', 544, 36);
  game.load.image('spike', 'assets/spikes.png', 32, 16);
  game.load.image('battery', 'assets/battery.png', 16, 16);
  game.load.spritesheet('gibs', 'assets/gibs.png', 4, 4);
  game.load.spritesheet('slime-gibs', 'assets/slime-gibs.png', 4, 4);
  game.load.spritesheet('slime', 'assets/slime.png', 20, 8);

}

var GID = {
  SPIKE: 24,
  BATTERY: 16,
  SLIME: 21
};

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
var playerGibs;
var gravity = 1200;
var terminalVelocity = playerJumpStrength*1.5;
var shadowTexture;
var lightSprite;
var lightRadius = 200;
var mousePointer;
var spikes;
var batteries;
var guiGFX;
var upKey;
var leftKey;
var rightKey;
var downKey;
var jumpJustPressed;
var batteryLife;
var batteryMax = 2000;
var health = 100;
var healthMax = 100;
var torchOn;

var enemies = [];

// var floors; // group of stationary objects that can be stood on but don't count as an obstacle froor things moving from below or the side.

function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  if (amIProcedural){
    var jsonMap = createMap();
    game.cache.addTilemap('level', null, jsonMap, Phaser.Tilemap.TILED_JSON);
  }
    map = game.add.tilemap('level');
    map.addTilesetImage('tiles');

  bg = game.add.tileSprite(0, 0, 544, 544, 'bg');
  bg.fixedToCamera = true;

  // tileset = game.add.tileset('tiles');
  map.setCollisionBetween(1, 8);

  layer = map.createLayer('Tiles');
  // layer.debug = true;
  layer.resizeWorld();

  playerGibs = game.add.emitter(0, 0, 4);
  playerGibs.makeParticles('gibs', [0, 1, 2, 3, 4], 10, true, true);
  playerGibs.gravity = gravity/2;

  // Add the mouse pointer
  mousePointer = game.add.sprite(game.width/2, game.height/2);

  // Create Spikes!
  spikes = game.add.group();
  // spikes.debug = true;
  spikes.enableBody = true;
  spikes.immovable = true;
  //  And now we convert all of the Tiled objects with an ID of 7 into actual, dangerous sprites within the group spikes
  map.createFromObjects('Objects', GID.SPIKE, 'spike', 0, true, false, spikes);

  // Create Batteries!
  batteries = game.add.group();
  batteries.enableBody = true;
  batteries.immovable = true;
  //  And now we convert all of the Tiled objects with an ID of 7 into actual, dangerous sprites within the group spikes
  map.createFromObjects('Objects', GID.BATTERY, 'battery', 0, true, false, batteries);

  enemies = [];
  // Do the objects
  for (var i = 0; i < map.objects.Objects.length; i++) {
    var object = map.objects.Objects[i];
    if (object.gid == GID.SLIME) {
      // Create Slime!
      enemies.push(new EnemySlime(i, object, game, player));
    } else {
      enemies.push({ alive: false });
    }
  }

  // Create floors!
  // floors = game.add.group();
  // floors.enableBody = true;
  // map.createFromObjects('Objects', 13, 'crate', 0, true, false, floors);
  // map.createFromObjects('Objects', 14, 'crate', 0, true, false, floors);
  // map.createFromObjects('Objects', 15, 'crate', 0, true, false, floors);
  // console.log(floors);
  // // make the floors act like floors
  // for (var i = 0; i < floors.length; i++){
  //   // floors.getAt(i).body.immovable = true;
  //   // floors.getAt(i).body.checkCollision.up = false;
  //   floors.getAt(i).body.checkCollision.down = false;
  //   floors.getAt(i).body.checkCollision.left = false;
  //   floors.getAt(i).body.checkCollision.right = false;
  // }
  // floors.immovable = true;

  // Light and shadow stuff
  // Create the shadow texture
  shadowTexture = game.add.bitmapData(4*game.width, 4*game.height);
  // Create an object that will use the bitmap as a texture
  lightSprite = game.add.image(0, 0, shadowTexture);
  // Set the blend mode to MULTIPLY. This will darken the colors of
  // everything below this sprite.
  lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

  // The player and its settings
  player = game.add.sprite(700, 510, 'dude');
  player.animations.add('idle-right', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 5);
  player.animations.add('idle-left', [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6], 5);
  player.animations.add('move-right', [2, 3], 10);
  player.animations.add('move-left', [7, 8], 10);
  player.animations.add('jump-right', [4], 10);
  player.animations.add('jump-left', [9], 10);
  game.physics.enable(player);
  player.body.gravity.y = gravity;

  player.body.setSize(12, 24, 6, 0);
  player.body.bounce.y = 0.2;
  player.body.linearDamping = 1;
  player.body.collideWorldBounds = true;

  // torch stuff;
  batteryLife = 2000;
  torchOn = true;

  // Create the GUI
  gui = game.add.tileSprite(0, 0, 544, 36, 'gui');
  gui.fixedToCamera = true;
  guiGFX = game.add.graphics(0, 0);
  guiGFX.fixedToCamera = true;

  game.camera.follow(player);

  //  Our controls.
  upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
  restartKey = game.input.keyboard.addKey(Phaser.Keyboard.T);
  cursors = game.input.keyboard.createCursorKeys();
  jumpJustPressed = false;
}

function update () {
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(playerGibs, layer);

  //  Checks to see if the player overlaps with any of the spikes, if he does call the hitSpike function
  game.physics.arcade.overlap(player, spikes, hitSpike);
  game.physics.arcade.overlap(player, batteries, hitBattery);

  // Enemies?
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      // game.physics.arcade.collide(player, enemies[i].sprite);
      game.physics.arcade.overlap(player, enemies[i].sprite, hitEnemy);
      enemies[i].update();
    }
  }

  if (restartKey.isDown) {
    initialiseLevel();
  }

  var animation = 'idle';

  if (cursors.left.isDown || leftKey.isDown) {
    // Move to the left
    if (player.body.velocity.x > -playerTopSpeed) {
      player.body.velocity.x -= playerAccel;
    } else {
      player.body.velocity.x = -playerTopSpeed;
    }
    animation = 'move';
  } else if (cursors.right.isDown || rightKey.isDown) {
    // Move to the right
    if (player.body.velocity.x < playerTopSpeed) {
      player.body.velocity.x += playerAccel;
    } else {
      player.body.velocity.x = playerTopSpeed;
    }
    animation = 'move';
  } else {
    // Stand still
    if (player.body.velocity.x > playerDecel) {
      // slow down movement to right
      player.body.velocity.x -= playerDecel;
      animation = 'move';
    } else if (player.body.velocity.x < -playerDecel) {
      // slow down movement to left
      player.body.velocity.x += playerDecel;
      animation = 'move';
    } else {
      player.body.velocity.x = 0;
    }
  }

  //update vertical movement based on terminal velocty - don't fall too fast!
  if (player.body.velocity.y > terminalVelocity) {
    player.body.velocity.y = terminalVelocity;
  }
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown || upKey.isDown){
    if (player.body.touching.down || player.body.onFloor()){
      player.body.velocity.y = -playerJumpStrength;
    } else if (!jumpJustPressed && batteryLife > 0){
      // double jump!
      player.body.velocity.y = -playerJumpStrength;
      batteryLife -= 200;
    }
  }


  //update 'jumpJustPressed' flag;
  jumpJustPressed = (cursors.up.isDown || upKey.isDown);


  if (!player.body.onFloor()) {
    animation = 'jump';
  }

  player.animations.play(animation+'-'+playerDirection);

  // update torch battery
  if (batteryLife > 0) {
    batteryLife--;
  } else {
    batteryLife = 0;
    torchOn = false;
  }

  // Update mouse pointer location
  mousePointer.x = game.input.activePointer.worldX;
  mousePointer.y = game.input.activePointer.worldY;

  // Update the shadow texture each frame
  updateShadowTexture();

  // Update the GUI items
  updateGUI();

}

// everything that happens at the start of the game and every time you restart
// goes here
function initialiseLevel () {


}

// when the player hits a spike...
function hitSpike (player, spike) {
  // You die!!!
  player.kill();
  playerGibby();
  health = 0;
}

//when the player hits a battery...
function hitBattery (player, battery) {
  battery.kill();
  batteryLife += 1000;
  if (batteryLife > batteryMax) {
    batteryLife = batteryMax;
  }
  torchOn = true;
}

function hitEnemy (player, enemy) {
  enemies[enemy.name].hit();
}

function updateShadowTexture () {
  // This function updates the shadow texture (shadowTexture).
  // First, it fills the entire texture with a dark shadow color.
  // Then it draws a white circle centered on the pointer position.
  // Because the texture is drawn to the screen using the MULTIPLY
  // blend mode, the dark areas of the texture make all of the colors
  // underneath it darker, while the white area is unaffected.

  // Draw shadow
  shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
  shadowTexture.context.fillRect(game.width, game.height, 2*game.width, 2*game.height);

  // Draw circle of light with a soft edge (radius dependent on battery life)
  var radius = lightRadius * Math.max(Math.min(batteryLife, 1000)/1000, 0.4);
  var gradient = shadowTexture.context.createRadialGradient(
      2*game.width,2*game.height, radius * 0.5,
      2*game.width,2*game.height, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  shadowTexture.context.beginPath();
  shadowTexture.context.fillStyle = gradient;
  shadowTexture.context.arc(2*game.width, 2*game.height,
      radius, 0, Math.PI*2);
  shadowTexture.context.fill();

  //draw torch light, if torch is on
  var flicker = false;
  if (batteryLife <= 1000 && (batteryLife % 200 <  3)) {
    flicker = true;
  }
  if (batteryLife < 100 && (batteryLife % 10 < 5)) {
    flicker = true;
  }
  if (torchOn && !flicker) {
    var angleToMouse= Math.atan2(mousePointer.y - player.body.y, mousePointer.x - player.body.x);
    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    shadowTexture.context.arc(2*game.width, 2*game.height,
    game.width + game.height, angleToMouse-Math.PI/8, angleToMouse + Math.PI/8);
    shadowTexture.context.lineTo(2*game.width, 2*game.height);
    shadowTexture.context.fill();
  }

  lightSprite.x = player.body.x - 2*game.width + 6;
  lightSprite.y = player.body.y - 2*game.height + 18;

  // This just tells the engine it should update the texture cache
  shadowTexture.dirty = true;
  lightSprite.dirty = true;
  player.dirty = true;

}

function updateGUI () {
  guiGFX.clear();
  // Battery
  guiGFX.beginFill(0x5BB45D);
  guiGFX.drawRect(442, 14, (batteryLife/batteryMax)*88, 8);
  guiGFX.endFill();
  // Health
  guiGFX.beginFill(0xEA2C3F);
  guiGFX.drawRect(14, 14, (health/healthMax)*88, 8);
  guiGFX.endFill();
}

function playerGibby () {
  playerGibs.x = player.x+6;
  playerGibs.y = player.y+12;
  playerGibs.start(true, 0, null, 60);
}

function render () {
  // game.debug.bodyInfo(player, 32, 320);
}
