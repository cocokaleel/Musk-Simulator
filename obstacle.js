var spr_blackhole = new Image(); spr_blackhole.src="Images/blackhole.png";


function Obstacle(type) {
  this.type=type;

  if(type=="black hole") {
    var xTemp;
    var yTemp;
    do {
      xTemp=Math.floor(Math.random()*(GAME.canvas.width-200))+100;
      yTemp=Math.floor(Math.random()*(GAME.canvas.height-200))+100;
    }while(xTemp>PLATFORM.x&&xTemp<PLATFORM.x+PLATFORM.width);

    this.x=xTemp;
    this.y=yTemp;
    this.rotation=0;
  }
  else {

  }
}

function addObstacle(type) {
  GAME.obstacles.push(new Obstacle(type));
}

function animateObstacles() {
  for(var o = 0; o < GAME.obstacles.length; o++) {
    if(GAME.obstacles[o].type=="black hole") {

      GAME.obstacles[o].rotation+=0.01;
      affectGravity(o);


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



  xDirection=(GAME.obstacles[index].x-ROCKET1.x)/Math.abs(GAME.obstacles[index].x-ROCKET1.x);
  yDirection=(GAME.obstacles[index].y-ROCKET1.y)/Math.abs(GAME.obstacles[index].y-ROCKET1.y);
  distance=Math.sqrt(Math.pow(GAME.obstacles[index].x-ROCKET1.x,2)+Math.pow(GAME.obstacles[index].y-ROCKET1.y,2));
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
}


function manageObstacles() {
  while(GAME.obstacles.length>0){GAME.obstacles.pop();}
  if(GAME.level>3) {
    addObstacle("black hole");
  }
}


function renderObstacles(context) {
  for(var o = 0; o < GAME.obstacles.length; o++) {
    if(GAME.obstacles[o].type=="black hole") {
      drawRotatedImage(context,spr_blackhole,GAME.obstacles[o].x,GAME.obstacles[o].y,150,150, GAME.obstacles[o].rotation);
      context.beginPath();
      context.strokeStyle='red';
		  context.moveTo(GAME.obstacles[o].x,GAME.obstacles[o].y);
		  context.lineTo(ROCKET1.x,ROCKET1.y);
		  context.stroke();
      context.closePath();
    }
  }
}

function shiftObstacles(dx,dy) {
    for (var i=0; i<GAME.obstacles.length; i++) {
      GAME.obstacles[i].x-=dx;
      GAME.obstacles[i].y-=dy;
    }
}
