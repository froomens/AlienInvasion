// 4/27/16 CSC230 ALIEN INVASION FINAL!!!!!!!!!!!!111!1!1!!!!

var sprites = {
 ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
 // JASON'S ADDITION: SHIELD AND BOMB SPRITES
 shield: { sx: 14, sy: 51, w: 41, h: 8, frames: 1},
 pew: { sx: 14, sy: 42, w: 3, h: 8, frames: 1 },
 // JASON'S ADDITION: SHIELD AND BOMB SPRITES
 missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
 enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
 enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_circle: { sx: 158, sy: 0, w: 33, h: 33, frames: 1 },
 //powerup: { sx: 191, sy: 0, w: 33, h: 33, frames: 1 },
 powerup: {sx: 19, sy: 42, w: 7, h: 7, frames: 1 },
 explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
 enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frames: 1 },
 boss: { sx: 0, sy: 145, w: 81, h: 257-145, frames: 1 },
 fireblast: { sx: 56, sy: 43, w: 10, h: 16, frames: 1}
};

var enemies = {
  straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 15, 
              E: 100 },
  ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 20, 
              B: 75, C: 1, E: 100, missiles: 2  },
  circle:   { x: 250,   y: -50, sprite: 'enemy_circle', health: 10, 
              A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2 },
  wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20, 
              B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2 },
  step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
              B: 150, C: 1.2, E: 75 },
  // JASON'S ADDITION: POWERUP and BOSS
  powerup: { x: 0,   y: -50, sprite: 'powerup', health: 10, 
              E: 100 },
  boss: { x: 250,   y: 50, sprite: 'boss', health: 10000, fireRate: 0.10, reloadTime: 0.10, missiles: 3,
              A: 0,  B: -100, C: 1, E: 0, F: 20, G: 1, H: Math.PI/2 }
  // END JASON'S ADDITION: POWERUP and BOSS
};

var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16,
	// JASON'S ADDITION: BOMB AND SHIELD OBJECTS
	OBJECT_PLAYER_BOMB = 32,
	OBJECT_PLAYER_SHIELD = 64;
	// END JASON'S ADDITIONS: BOMB AND SHIELD OBJECTS

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();
  
    var audio = new Audio('sounds/UFO_Takeoff.mp3');
	audio.play();	

  // Only 1 row of stars
  if(ua.match(/android/)) {
    Game.setBoard(0,new Starfield(50,0.6,100,true));
  } else {
    Game.setBoard(0,new Starfield(20,0.4,100,true));
    Game.setBoard(1,new Starfield(50,0.6,100));
    Game.setBoard(2,new Starfield(100,1.0,50));
  }  
  Game.setBoard(3,new TitleScreen("Alien Invasion", 
                                  "Press fire to start playing",
                                  playGame));
};

// var level1 = [
 // // start,   end, gap,  type,   override
  // [ 0,      4000,  500, 'step' ],
  // [ 6000,   13000, 800, 'ltr' ],
  // [ 10000,  16000, 400, 'circle' ],
  // [ 17800,  20000, 500, 'straight', { x: 50 } ],
  // [ 18200,  20000, 500, 'straight', { x: 90 } ],
  // [ 18200,  20000, 500, 'straight', { x: 10 } ],
  // [ 22000,  25000, 400, 'wiggle', { x: 150 }],
  // [ 22000,  25000, 400, 'wiggle', { x: 100 }]
// ];

// JASON'S ADDITION: LEVEL ARRAY
var levels = [
[ // LEVEL 1
 // start,   end, gap,  type,   override
  //[ 0,      1000,  1000, 'powerup', {x: 150, E: 200}],
  // [ 0,			4000, 4000, 'boss'],
  // [0,		60000, 500, 'straight', { x: 150, fireRate: 0, sprite: 'enemy_circle'}],
  [ 0,      4000,  500, 'step'],
  // [0,			25000, 100, 'powerup', {x: 150}],
  [ 6000,   13000, 800, 'ltr' ],
  [ 10000,  16000, 400, 'circle' ],
  [ 17800,  20000, 500, 'straight', { x: 50 } ],
  [ 18200,  20000, 500, 'straight', { x: 90 } ],
  [ 18200,  20000, 500, 'straight', { x: 10 } ],
  [ 22000,  25000, 400, 'wiggle', { x: 150 }],
  [ 22000,  25000, 400, 'wiggle', { x: 100 }]
],
[ // LEVEL 2
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500, 'straight', { x: 50 }],
  [ 2000,   6000, 500, 'straight', { x: 100} ],
  [ 4000,  8000, 500, 'straight', { x: 150} ],
  [ 6000,  10000, 500, 'straight', { x: 200 } ]
],
[  // LEVEL 3
 // Start,   End, Gap,  Type,   Override
  [ 0,      1000,  500, 'step' ]
],
[ // LEVEL 4
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500/2, 'step' ],
  [ 6000,   13000, 800/2, 'ltr' ],
  [ 10000,  16000, 400/2, 'circle' ],
  [ 17800,  20000, 500/2, 'straight', { x: 50 } ],
  [ 18200,  20000, 500/2, 'straight', { x: 90 } ],
  [ 18200,  20000, 500/2, 'straight', { x: 10 } ],
  [ 22000,  25000, 400/2, 'wiggle', { x: 150 }],
  [ 22000,  25000, 400/2, 'wiggle', { x: 100 }]
],
[ // LEVEL 5 BOSS
 // Start,   End, Gap,  Type,   Override
  [ 0,			4000, 4000, 'boss'],
  // [4000,		60000, 1000, 'straight', { x: 200*Math.random(), sprite: 'enemy_circle'}]
]
];
// END JASON'S ADDITION: LEVEL ARRAY

// JASON'S ADDITION: CURLEVEL, MAXLEVEL
var curlevel = 1;
var maxlevel = levels.length;
// END JASON'S ADDITION: CURLEVEL, MAXLEVEL

var playGame = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  // JASON'S ADDITION: LEVEL CONDITIONALS
  if (curlevel < levels.length ) {
	board.add(new Level(levels[curlevel - 1],checkGame));
	} else {
	board.add(new Level(levels[curlevel - 1],winGame));
	}
  Game.setBoard(3,board);
  if (curlevel == 1) {
	Game.setBoard(5,new GamePoints(0));
	Game.setBoard(12,new PowerLevel(1));
	} else {
	Game.setBoard(5,new GamePoints(Game.points));
	Game.setBoard(12,new PowerLevel(powerlevel));
	}
	// END JASON'S ADDITION: LEVEL CONDITIONALS
};

// JASON'S ADDITION: checkGame
var checkGame = function() {
	curlevel++;
	Game.setBoard(3,
		new TitleScreen("Level " + curlevel,
		"Press fire to continue",
		playGame));
}
// END JASON'S ADDITION: checkGame

var winGame = function() {
	curlevel = 1;
	powerlevel = 1;
  Game.setBoard(3,new TitleScreen("You win!", 
                                  "Press fire to make America great again!",
                                  playGame));
							
	var audio2 = new Audio('sounds/Applause.mp3');
	audio2.play();
};

var loseGame = function() {
	powerlevel = 1;
	curlevel = 1;
  Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press fire to play again",
                                  playGame));
	var audio3 = new Audio('sounds/Price-is-right-losing-horn.mp3');
	audio3.play();
};

var Starfield = function(speed,opacity,numStars,clear) {

  // Set up the offscreen canvas
  var stars = document.createElement("canvas");
  stars.width = Game.width; 
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  // If the clear option is set, 
  // make the background black instead of transparent
  if(clear) {
    starCtx.fillStyle = "#000";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = "#FFF";
  starCtx.globalAlpha = opacity;
  for(var i=0;i<numStars;i++) {
    starCtx.fillRect(Math.floor(Math.random()*stars.width),
                     Math.floor(Math.random()*stars.height),
                     2,
                     2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if(intOffset > 0) {
      ctx.drawImage(stars,
                0, remaining,
                stars.width, intOffset,
                0, 0,
                stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    }
  };

  // This method is called to update
  // the starfield
  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % stars.height;
  };
};

// JASON'S ADDITION: POWERLEVEL AND SHIELDSTATE
var powerlevel = 1;
var shieldstate = 0;
// END JASON'S ADDITION: POWERLEVEL AND SHIELDSTATE

var PlayerShip = function() { 
  this.setup('ship', { vx: 0, reloadTime: 0.10, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - Game.playerOffset - this.h;

  this.step = function(dt) {
    if(Game.keys['left']) { this.vx = -this.maxVel; }
    else if(Game.keys['right']) { this.vx = this.maxVel; }
    else { this.vx = 0; }

    this.x += this.vx * dt;

    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) { 
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      //Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      //this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
	  if (powerlevel < 10)
	  {
		this.board.add(new PlayerMissile(this.x+this.w/2,this.y,0,-700,'pew',5+powerlevel/100));
	  }
	  if (powerlevel >= 10 && powerlevel < 20)
	  {
		this.board.add(new PlayerMissile(this.x,this.y+this.h/2,0,-700,'missile',10+powerlevel/100));
		this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2,0,-700,'missile',10+powerlevel/100));
	  }
	  if (powerlevel >= 20)
	  {
		this.board.add(new PlayerMissile(this.x+this.w/2,this.y+this.h/2, -100,-700,'pew',5+powerlevel/100));
		this.board.add(new PlayerMissile(this.x+this.w/2,this.y+this.h/2, 0,-700,'pew',5+powerlevel/100));
		this.board.add(new PlayerMissile(this.x+this.w/2,this.y+this.h/2, 100,-700,'pew',5+powerlevel/100));
	  }
	  if (powerlevel >= 40)
	  {
		this.board.add(new PlayerMissile(this.x,this.y+this.h/2, 0,-700,'missile',10+powerlevel/100));
		this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2, 0,-700,'missile',10+powerlevel/100));
	  }
	  
    }
	
	// JASON'S ADDITION: SHOOT A BOMB
	if(Game.keys['bomb'] && this.reload < 0) {
		//Game.keys['bomb'] = false;
		this.reload = this.reloadTime;
		
		// this.board.add(new PlayerBomb(this.x+this.w/2,this.y+this.h/2, -200));
		if (shieldstate == 0 && powerlevel > 0) {
			this.board.add(new PlayerShield(this.x+this.w/2,this.y+this.h/2));
			shieldstate = 1;
		}
		// this.board.add(new PlayerBomb(this.x+this.w/2,this.y+this.h/2, 200));
	}
	if(!Game.keys['bomb']) { shieldstate = 0;}
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER;

PlayerShip.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
  var hit1 = new Audio('sounds/explosion2.mp3');
	hit1.play();
    loseGame();
  }
};


var PlayerMissile = function(x,y,sx,sy,sprite,dmg) {
  this.setup(sprite,{ vx: sx, vy: sy, damage: dmg });
  this.x = x - this.w/2;
  this.y = y - this.h; 
};

PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.step = function(dt)  {
	this.x += this.vx * dt;
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }
};
 
 // JASON'S ADDITION: PLAYER BOMB
var PlayerBomb = function(x,y, sx) {
  this.setup('pew',{ vx: sx, vy: -1000, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h; 
};

PlayerBomb.prototype = new Sprite();
//PlayerBomb.prototype.type = OBJECT_PLAYER_PROJECTILE;
PlayerBomb.prototype.type = OBJECT_PLAYER_BOMB;

PlayerBomb.prototype.step = function(dt)  {
	this.x += this.vx * dt;
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }
};
// END JASON'S ADDITION: PLAYER BOMB 

 // JASON'S ADDITION: PLAYER SHIELD
var PlayerShield = function(x,y,TheShip) {
  this.setup('shield',{ vx: 0, vy: -100, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h*4; 
};

PlayerShield.prototype = new Sprite();
//PlayerBomb.prototype.type = OBJECT_PLAYER_PROJECTILE;
PlayerShield.prototype.type = OBJECT_PLAYER_SHIELD;

PlayerShield.prototype.step = function(dt)  {

    if(Game.keys['left']) { this.vx = -200; }
    else if(Game.keys['right']) { this.vx = 200; }
    else { this.vx = 0; }
	
  // this.y += this.vy * dt;
  this.x += this.vx * dt;
  
  var collision = this.board.collide(this,OBJECT_ENEMY_PROJECTILE);
  if(collision) {
    collision.hit(this.damage);
    // this.board.remove(this);
	// powerlevel += -5;
	Game.setBoard(12,new PowerLevel(powerlevel));
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }
  
  if (!Game.keys['bomb']) {
	this.board.remove(this);
	shieldstate = 0;
  } else {
	powerlevel += -0.1;
	Game.setBoard(12,new PowerLevel(powerlevel));
  }
  
  if (powerlevel <= 0) {
	this.board.remove(this);
	shieldstate = 0;
	}
};
// END JASON'S ADDITION: PLAYER SHIELD

var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};

Enemy.prototype = new Sprite();
Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0,
								   fireRate: 0.01,
								   missiles: 1
								   };

Enemy.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  }

  if(Math.random() < this.fireRate && this.reload <= 0) {
    this.reload = this.reloadTime;
    if(this.missiles == 2) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h,'enemy_missile'));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h,'enemy_missile'));
    } else if (this.missiles == 1) {
      this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h,'enemy_missile'));
    } else if (this.missiles == 3) {
      // this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      // this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
	  this.board.add(new EnemyMissile(this.x+45,this.y+this.h/1.4,'fireblast'));
	  if (Math.random() < 0.10)
	  {
		this.board.add(new Enemy(enemies['circle'], {x: this.x, y: this.y}));
	  }
	}

  }
  this.reload-=dt;
    if (this.sprite == 'boss') {
	Game.setBoard(11,new BossLife(Math.round(this.health)));
  }

  if(this.y > Game.height ||
     this.x < -this.w ||
     this.x > Game.width) {
       this.board.remove(this);
  }
};

Enemy.prototype.hit = function(damage) {
  this.health -= damage;
  // if (this.sprite == 'boss') {
	// Game.setBoard(11,new BossLife(Math.round(this.health)));
  // }
  if(this.health <=0) {
    if(this.board.remove(this)) {
      Game.points += this.points || 100;
      this.board.add(new Explosion(this.x + this.w/2, 
                                   this.y + this.h/2));
	// JASON'S ADDITION: DROP A POWERUP
			this.board.add(new PowerUp(enemies['powerup'], { x: this.x, y: this.y}));
	// END JASON'S ADDITION: DROP A POWERUP
  	var hit = new Audio('sounds/explosion.mp3');
	hit.play();
    }
  }
};

var EnemyMissile = function(x,y,sprite) {
  this.setup(sprite,{ vy: 200, damage: 10 });
  this.x = x - this.w/2;
  this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y > Game.height) {
      this.board.remove(this); 
  }
};

// JASON'S ADDITION: POWERUP
var PowerUp = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};

PowerUp.prototype = new Sprite();
PowerUp.prototype.type = OBJECT_POWERUP;

PowerUp.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0 };

PowerUp.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    powerlevel++;
	Game.setBoard(12,new PowerLevel(powerlevel));
	Game.points++;
    this.board.remove(this);
  }

  // if(Math.random() < 0.01 && this.reload <= 0) {
    // this.reload = this.reloadTime;
    // if(this.missiles == 2) {
      // this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      // this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
    // } else {
      // this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
    // }

  // }
  // this.reload-=dt;

  if(this.y > Game.height ||
     this.x < -this.w ||
     this.x > Game.width) {
       this.board.remove(this);
  }
};

// PowerUp.prototype.hit = function(damage) {
  // this.health -= damage;
  // if(this.health <=0) {
    // if(this.board.remove(this)) {
      // Game.points += this.points || 100;
      // this.board.add(new Explosion(this.x + this.w/2, 
                                   // this.y + this.h/2));
    // }
  // }
// };
// END JASON'S ADDITION: POWERUP



var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 12) {
    this.board.remove(this);
  }
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});


