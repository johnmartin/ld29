!function (window, CONSTANT) {

  function Level (game) {

    var map;
    var bg;
    var layer;
    var player;
    var gui;
    var enemies = [];
    var entities = [];
    var keyUp;
    var keyLeft;
    var keyDown;
    var keyRight;
    var keyRestart;
    var keyCursor;
    var shadowTexture;
    var lightSprite;
    var jumpJustPressed = false;
    var exit;
    var batteryLife;
    var startX = 490;
    var startY = 100;
    var doubleJumping = false;

    function Preload () {
      this.load.spritesheet('dude', 'assets/dude.png', 24, 24);
      this.load.image('bg', 'assets/bg.png', 544, 544);
      this.load.image('tiles', 'assets/tiles.png', 112, 32);
      this.load.image('gui', 'assets/gui.png', 544, 36);
      this.load.image('spike', 'assets/spikes.png', 32, 16);
      this.load.image('battery', 'assets/battery.png', 16, 16);
      this.load.spritesheet('gibs', 'assets/gibs.png', 4, 4);
      this.load.spritesheet('slime-gibs', 'assets/slime-gibs.png', 4, 4);
      this.load.spritesheet('slime', 'assets/slime.png', 20, 8);
      this.load.spritesheet('exit', 'assets/dude.png', 24, 24);
    }

    function Create () {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      var jsonMap = createMap();
      game.cache.addTilemap('level', null, jsonMap, Phaser.Tilemap.TILED_JSON);

      map = game.add.tilemap('level');
      map.addTilesetImage('tiles');

      bg = game.add.tileSprite(0, 0, 544, 544, 'bg');
      bg.fixedToCamera = true;

      map.setCollisionBetween(1, 8);

      layer = map.createLayer('Tiles');
      layer.resizeWorld();

      // The player and its settings
      player = new Player(game);
      exit = new Exit(game);

      // Do the enemies
      if (map.objects.Enemies !== undefined) {
        for (var i = 0; i < map.objects.Enemies.length; i++) {
          var object = map.objects.Enemies[i];
          if (object.gid == CONSTANT.GID.SLIME) {
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
          if (object.gid == CONSTANT.GID.SPIKE) {
            entities.push(new EntitySpike(i, object, game, player));
          } else if (object.gid == CONSTANT.GID.BATTERY) {
            entities.push(new EntityBattery(i, object, game, player));
          } else {
            entities.push(blankObject);
          }
        }
      }

      if (map.objects.TerminalPoints !== undefined) { 
        for (var i = 0; i < map.objects.TerminalPoints.length; i++) {
          var object = map.objects.TerminalPoints[i];
          if (object.gid == CONSTANT.GID.STARTPOINT) {
            startX = object.x;
            startY = object.y;
          } else if (object.gid == CONSTANT.GID.EXITPOINT){
            exit.init(object.x, object.y);
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

      batteryLife = game.batteryLife;
      player.init(startX, startY, batteryLife);

      game.camera.follow(player.sprite);

      // Create the GUI
      var guiTile = game.add.tileSprite(0, 0, 544, 36, 'gui');
      guiTile.fixedToCamera = true;
      gui = game.add.graphics(0, 0);
      gui.fixedToCamera = true;

      //  Our controls.
      keyUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
      keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
      keyDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
      keyRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
      keyRestart = game.input.keyboard.addKey(Phaser.Keyboard.T);
      keyCursor = game.input.keyboard.createCursorKeys();

      jumpJustPressed = false;

    }

    function Update() {
      player.update(layer);

      // Enemies?
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].alive) {
          game.physics.arcade.overlap(player.sprite, enemies[i].sprite, HitEnemy);
          enemies[i].update(layer);
        }
      }

      // Entities?
      for (var i = 0; i < entities.length; i++) {
        if (entities[i].alive) {
          game.physics.arcade.overlap(player.sprite, entities[i].sprite, HitEntity);
          // entities[i].update(layer);
        }
      }

      game.physics.arcade.overlap(player.sprite, exit.sprite, HitExit);

      // if (restartKey.isDown) {
      //   initialiseLevel();
      // }
 
      var animation = 'idle';

      if (keyCursor.left.isDown || keyLeft.isDown) {
        // Move to the left
        if (player.body.velocity.x > -CONSTANT.PLAYER_TOP_SPEED) {
          player.body.velocity.x -= CONSTANT.PLAYER_ACCELERATION;
        } else {
          player.body.velocity.x = -CONSTANT.PLAYER_TOP_SPEED;
        }
        animation = 'move';
      } else if (keyCursor.right.isDown || keyRight.isDown) {
        // Move to the right
        if (player.body.velocity.x < CONSTANT.PLAYER_TOP_SPEED) {
          player.body.velocity.x += CONSTANT.PLAYER_ACCELERATION;
        } else {
          player.body.velocity.x = CONSTANT.PLAYER_TOP_SPEED;
        }
        animation = 'move';
      } else {
        // Stand still
        if (player.body.velocity.x > CONSTANT.PLAYER_DECELERATION) {
          // slow down movement to right
          player.body.velocity.x -= CONSTANT.PLAYER_DECELERATION;
          animation = 'move';
        } else if (player.body.velocity.x < -CONSTANT.PLAYER_DECELERATION) {
          // slow down movement to left
          player.body.velocity.x += CONSTANT.PLAYER_DECELERATION;
          animation = 'move';
        } else {
          player.body.velocity.x = 0;
        }
      }

      // update vertical movement based on terminal velocty - don't fall too fast!
      if (player.body.velocity.y > CONSTANT.TERMINAL_VELOCITY) {
        player.body.velocity.y = CONSTANT.TERMINAL_VELOCITY;
      }
      if (player.body.onFloor()) {
        doubleJumping = false;
      }
      //  Allow the player to jump if they are touching the ground.
      if (keyCursor.up.isDown || keyUp.isDown){
        if (player.body.touching.down || player.body.onFloor()){
          player.body.velocity.y -= CONSTANT.PLAYER_JUMP_STRENGTH;
        } else if (!jumpJustPressed && !doubleJumping) {
          // double jump!
          player.body.velocity.y = -CONSTANT.PLAYER_JUMP_STRENGTH;
          doubleJumping = true;
        }
      }

      // Update 'jumpJustPressed' flag;
      jumpJustPressed = ( keyCursor.up.isDown || keyUp.isDown );

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

      // Update the shadow texture each frame
      UpdateShadowTexture();

      // Update the GUI
      UpdateGUI();

      if (player.body.x > CONSTANT.PLAYER_END_OF_LEVEL) {
        game.state.start('ScreenTransition');
      }

    }

    //update vertical movement based on terminal velocty - don't fall too fast!
    // if (player.body.velocity.y > terminalVelocity) {
    //   player.body.velocity.y = terminalVelocity;
    // }
    // // refresh the double jump ability
    // if (player.body.onFloor()){
    //   doubleJumping = false;
    // }
    // // double jump!
    // player.body.velocity.y = -playerJumpStrength;
    // doubleJumping = true;

    function HitEntity (player, entity) {
      entities[entity.name].hit();
    }

    function HitEnemy (player, enemy) {
      enemies[enemy.name].hit();
    }

    function HitExit (player, exit) {
      NextLevel();
    }

    function UpdateShadowTexture () {
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
      var radius = CONSTANT.PLAYER_LIGHT_RADIUS * Math.max(Math.min(player.battery, 1000)/1000, 0.4);
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

      var angleToMouse = Math.atan2(game.input.activePointer.worldY - player.body.y, game.input.activePointer.worldX - player.body.x);
      if ( angleToMouse > 0-(Math.PI/2) && angleToMouse < Math.PI/2 ) {
        player.facing = 'right';
      } else {
        player.facing = 'left';
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
        if (entities[i].has_glow && entities[i].alive) {
          var horizDistance = entities[i].sprite.x - player.body.x;
          var vertDistance = entities[i].sprite.y - player.body.y;
          // only change th shadow texture if the glowing object would actually appear within the shadow range
          if (horizDistance <= textureCentreX && horizDistance >= -textureCentreX 
          && vertDistance <= textureCentreY && vertDistance >= -textureCentreY){
            shadowTexture = entities[i].glow(shadowTexture, textureCentreX + horizDistance, textureCentreY + vertDistance);
          }
        }
      }

      lightSprite.x = player.body.x - textureCentreX+ 6;
      lightSprite.y = player.body.y - textureCentreY + 18;

      // This just tells the engine it should update the texture cache
      shadowTexture.dirty = true;
      lightSprite.dirty = true;
      player.sprite.dirty = true;
    }

    function UpdateGUI () {
      gui.clear();
      // Battery
      gui.beginFill(0x5BB45D);
      gui.drawRect(442, 14, (player.battery/CONSTANT.MAX_BATTERY)*88, 8);
      gui.endFill();
      // Health
      gui.beginFill(0xEA2C3F);
      gui.drawRect(14, 14, (player.health/CONSTANT.MAX_HEALTH)*88, 8);
      gui.endFill();
    }

    function Shutdown () {
      if (player != null){
        player.sprite.kill();
      }
      entities = [];
      enemies = [];
    }

    function NextLevel () {
      game.batteryLife = player.battery;
      game.state.start('ScreenTransition');
    }

    this.preload = Preload;
    this.create = Create;
    this.update = Update;
    this.shutdown = Shutdown;

  }

  window.Level = Level;

}(window, window.CONSTANT);
