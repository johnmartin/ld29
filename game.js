var game = new Phaser.Game(544, 544, Phaser.AUTO, 'game', { preload: preload, create: create, update: update }, false, false);

var amIProcedural = false;

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

var gravity = 1200;
var playerTopSpeed = 300;
var playerAccel = 100;
var playerDecel = 200;
var playerJumpStrength = 460;
var terminalVelocity = playerJumpStrength*1.5;
var lightRadius = 200;
var batteryMax = 2000;
var healthMax = 100;

var shadowTexture;
var lightSprite;
var mousePointer;
var guiGFX;

var upKey;
var leftKey;
var rightKey;
var downKey;
var jumpJustPressed;

var blankObject = { alive: false };
var enemies = [];
var entities = [];

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
  layer.resizeWorld();

  // Add the mouse pointer
  mousePointer = game.add.sprite(game.width/2, game.height/2);

  // The player and its settings
  player = new Player(game);

  // Do the enemies
  if (map.objects.Enemies !== undefined) {
    for (var i = 0; i < map.objects.Enemies.length; i++) {
      var object = map.objects.Enemies[i];
      if (object.gid == GID.SLIME) {
        enemies.push(new EnemySlime(i, object, game, player));
      } else {
        enemies.push(blankObject);
      }
    }
  }

  // Do the entities
  if (map.objects.Entities !== undefined) {
    for (var i = 0; i < map.objects.Entities.length; i++) {
      var object = map.objects.Entities[i];
      if (object.gid == GID.SPIKE) {
        entities.push(new EntitySpike(i, object, game, player));
      } else if (object.gid == GID.BATTERY) {
        entities.push(new EntityBattery(i, object, game, player));
      } else {
        entities.push(blankObject);
      }
    }
  }

  // Light and shadow stuff
  // Create the shadow texture
  shadowTexture = game.add.bitmapData(4*game.width, 4*game.height);
  // Create an object that will use the bitmap as a texture
  lightSprite = game.add.image(0, 0, shadowTexture);
  // Set the blend mode to MULTIPLY. This will darken the colors of
  // everything below this sprite.
  lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

  player.init(700, 510);
  game.camera.follow(player.sprite);

  // Create the GUI
  gui = game.add.tileSprite(0, 0, 544, 36, 'gui');
  gui.fixedToCamera = true;
  guiGFX = game.add.graphics(0, 0);
  guiGFX.fixedToCamera = true;

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
  // Player
  player.update(layer);

  // Enemies?
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      game.physics.arcade.overlap(player.sprite, enemies[i].sprite, hitEnemy);
      enemies[i].update();
    }
  }

  // Entities?
  for (var i = 0; i < entities.length; i++) {
    if (entities[i].alive) {
      game.physics.arcade.overlap(player.sprite, entities[i].sprite, hitEntity);
      entities[i].update();
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
    } else if (!jumpJustPressed && player.battery > 0){
      // double jump!
      player.body.velocity.y = -playerJumpStrength;
      player.battery -= 200;
    }
  }

  // Update 'jumpJustPressed' flag;
  jumpJustPressed = ( cursors.up.isDown || upKey.isDown );

  if (!player.body.onFloor()) {
    animation = 'jump';
  }

  player.animation(animation);

  // update torch battery
  if (player.battery > 0) {
    player.battery--;
  } else {
    player.battery = 0;
    player.torchOn = false;
  }

  // Update mouse pointer location
  mousePointer.x = game.input.activePointer.worldX;
  mousePointer.y = game.input.activePointer.worldY;

  // Update the shadow texture each frame
  updateShadowTexture();

  // Update the GUI items
  updateGUI();

}


function restartLevel(){
  initialiseLevel();
}

function nextLevel(){
  initiaiseLevel();
}

// everything that happens at the start of the game and every time you restart
// goes here
function initialiseLevel () {

}

// get rid of map, enemies etc when we are leaving / restarting the level
function destroyCurrentLevel(){

}

function hitEntity (player, entity) {
  entities[entity.name].hit();
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

  // the centre point of the shadow texture (relative to shdaow texture). This point is always focused on the player
  var textureCentreX = 2*game.width;
  var textureCentreY = 2*game.height;

  // Draw shadow
  shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
  shadowTexture.context.fillRect(game.width, game.height, 2*game.width, 2*game.height);

  // Draw circle of light with a soft edge (radius dependent on battery life)
  var radius = lightRadius * Math.max(Math.min(player.battery, 1000)/1000, 0.4);
  var gradient = shadowTexture.context.createRadialGradient(
      textureCentreX,textureCentreY, radius * 0.5,
      textureCentreX,textureCentreY, radius);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

  shadowTexture.context.beginPath();
  shadowTexture.context.fillStyle = gradient;
  shadowTexture.context.arc(textureCentreX, textureCentreY,
      radius, 0, Math.PI*2);
  shadowTexture.context.fill();

  //draw torch light, if torch is on
  var flicker = false;
  if (player.battery <= 1000 && (player.battery % 200 <  3)) {
    flicker = true;
  }
  if (player.battery < 100 && (player.battery % 10 < 5)) {
    flicker = true;
  }

  var angleToMouse = Math.atan2(mousePointer.y - player.body.y, mousePointer.x - player.body.x);
  if ( angleToMouse > 0-(Math.PI/2) && angleToMouse < Math.PI/2 ) {
    player.direction = 'right';
  } else {
    player.direction = 'left';
  }

  if (player.torchOn && !flicker) {
    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
    shadowTexture.context.arc(textureCentreX, textureCentreY,
    game.width + game.height, angleToMouse-Math.PI/8, angleToMouse + Math.PI/8);
    shadowTexture.context.lineTo(textureCentreX, textureCentreY);
    shadowTexture.context.fill();
  }

  for (var i = 0; i < entities.length; i++) {
    if (typeof entities[i].glow != 'undefined' && entities[i].alive) {
      var horizDistance = entities[i].sprite.x - player.body.x;
      var vertDistance = entities[i].sprite.y - player.body.y;
      shadowTexture = entities[i].glow(shadowTexture, textureCentreX + horizDistance, textureCentreY + vertDistance);
    }
  }

  lightSprite.x = player.body.x - textureCentreX+ 6;
  lightSprite.y = player.body.y - textureCentreY + 18;

  // This just tells the engine it should update the texture cache
  shadowTexture.dirty = true;
  lightSprite.dirty = true;
  player.sprite.dirty = true;

}

function updateGUI () {
  guiGFX.clear();
  // Battery
  guiGFX.beginFill(0x5BB45D);
  guiGFX.drawRect(442, 14, (player.battery/batteryMax)*88, 8);
  guiGFX.endFill();
  // Health
  guiGFX.beginFill(0xEA2C3F);
  guiGFX.drawRect(14, 14, (player.health/healthMax)*88, 8);
  guiGFX.endFill();
}
