var spr_blackhole = new Image(); spr_blackhole.src="Images/blackhole.png";
var spr_asteroid = new Image(); spr_asteroid.src="Images/tumbleweedman.png";


function Obstacle(type) {
  this.type=type;

  if(type=="black hole") {
    var xTemp;
    var yTemp;
    do {
      xTemp=Math.floor(Math.random()*(GAME.canvas.width-100))+50;
      yTemp=Math.floor(Math.random()*(GAME.canvas.height-200))+100;
    }while((xTemp>PLATFORM.x-40&&xTemp<PLATFORM.x+PLATFORM.width+40)||(xTemp>GAME.canvas.width/2-70&&xTemp<GAME.canvas.width/2+70));

    this.x=xTemp;
    this.y=yTemp;
    this.rotation=0;
  }
  else if(type=="asteroid") {
    this.x=0;
    this.y=Math.floor(Math.random()*(GAME.canvas.height-100))+50;
    this.rotation=0;
    this.speed=2;
  }
  else {

  }
}

function addObstacle(type) {
  GAME.obstacles.push(new Obstacle(type));
}


var asteroidTimer = 50;
function animateObstacles() {
  for(var o = 0; o < GAME.obstacles.length; o++) {
    if(GAME.obstacles[o].type=="black hole") {
      GAME.obstacles[o].rotation+=0.01;
      affectGravity(o);
    }
    else if(GAME.obstacles[o].type=="asteroid") {
      GAME.obstacles[o].x+=GAME.obstacles[o].speed;
      GAME.obstacles[o].rotation+=0.01*GAME.obstacles[o].speed;
    }
    else {

    }
  }
}

//A unique method for black hole type obstacles.
//Pulls the rocket towards the black hole
var xDirection,yDirection,distance;
function affectGravity(index) {
  //Reset rocket movement from handleRocketMovement

  ROCKET1.x -= ROCKET1.xvel;
  ROCKET1.y -= ROCKET1.yvel;
  ROCKET1.xvel-=ROCKET1.xacc;
  ROCKET1.yvel-=ROCKET1.yacc;

  //Perform calculations
  xDirection=(GAME.obstacles[index].x-ROCKET1.x)/Math.abs(GAME.obstacles[index].x-ROCKET1.x);
  yDirection=(GAME.obstacles[index].y-ROCKET1.y)/Math.abs(GAME.obstacles[index].y-ROCKET1.y);
  distance=Math.sqrt(Math.pow(GAME.obstacles[index].x-ROCKET1.x,2)+Math.pow(GAME.obstacles[index].y-ROCKET1.y,2));

  //Apply gravity effect
  if(distance>20) {
    if(distance>1000) {

    }
    else if(distance>200) {
      ROCKET1.xacc+=xDirection*0.01;
      ROCKET1.yacc+=yDirection*0.01;
    }
    else if(distance>150) {
      ROCKET1.xacc+=xDirection*0.025;
      ROCKET1.yacc+=yDirection*0.025;
    }

    else {
      ROCKET1.xacc+=xDirection*0.05;
      ROCKET1.yacc+=yDirection*0.05;
    }

    ROCKET1.xvel+=ROCKET1.xacc;
    ROCKET1.yvel+=ROCKET1.yacc;
    ROCKET1.x += ROCKET1.xvel;
    ROCKET1.y += ROCKET1.yvel;
  }
  else {

  }
}

function checkCollideBlackHole() {
  for(var o = 0; o < GAME.obstacles.length; o++) {
    if(GAME.obstacles[o].type=="black hole") {
      if(Math.sqrt(Math.pow(GAME.obstacles[o].x-ROCKET1.x,2)+Math.pow(GAME.obstacles[o].y-ROCKET1.y,2))<=20) {
        return true;
      }

    }
  }
  return false;
}


function manageObstacles() {
  while(GAME.obstacles.length>0){GAME.obstacles.pop();}
  //Manage black hole generation
  if(GAME.level>0) {
    addObstacle("black hole");
  }
  //Manage asteroid generation
  if(GAME.level>0) {
      addObstacle("asteroid");
  }
}


function renderObstacles(context) {
  for(var o = 0; o < GAME.obstacles.length; o++) {
    if(GAME.obstacles[o].type=="black hole") {
      drawRotatedImage(context,spr_blackhole,GAME.obstacles[o].x,GAME.obstacles[o].y,150,150, GAME.obstacles[o].rotation);
    }
    else if(GAME.obstacles[o].type=="asteroid") {
      drawRotatedImage(context,spr_asteroid,GAME.obstacles[o].x,GAME.obstacles[o].y,80,80, GAME.obstacles[o].rotation);
    }
  }
}

function shiftObstacles(dx,dy) {
    for (var i=0; i<GAME.obstacles.length; i++) {
      GAME.obstacles[i].x-=dx;
      GAME.obstacles[i].y-=dy;
    }
}
