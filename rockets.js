




//Rocket Images:
var r1Thrust = new Image();
r1Thrust.src = 'Images/Rocket Ship 1 Thrust.png';
var r1 = new Image();
r1.src = 'Images/Rocket Ship 1.png';
var r2Thrust = new Image();
r2Thrust.src = 'Images/Rocket Ship 2 Thrust.png';
var r2 = new Image();
r2.src = 'Images/Rocket Ship 2.png';





//intializes rockets like config.js
//resets movement and position variables
//useful for level sequencing
function initializeRockets(){
  ROCKET1.x = (GAME.canvas.width-ROCKET1.width)/2;
  ROCKET1.y = (GAME.canvas.height-ROCKET1.height)/2;
  ROCKET1.xvel = 0;
  ROCKET1.xacc = 0;
  ROCKET1.yvel = 0;
  ROCKET1.yacc = 0;
  ROCKET1.rot = Math.PI/2;
  ROCKET1.tipping = false;

  //resets platform spot
  randomizePlatform();
}

//for rocket1
function handleRocketMovement() {
  collideTurtle();
  //if rocket is tp
  if (ROCKET1.tipping){
    if (ROCKET1.rot < Math.PI/2 && ROCKET1.rot > 0){
      ROCKET1.rot -= Math.abs(ROCKET1.rotspeed);
    }
    else if (ROCKET1.rot > Math.PI/2 && ROCKET1.rot < Math.PI){
      ROCKET1.rot += Math.abs(ROCKET1.rotspeed);
    }
    else{
      ROCKET1.tipping = false;
    }
  }
  animateTurtles();

  //if rocket is thrusting, it accelerates x and y components in the direction of rotation
  if (ROCKET1.thrusting){
    ROCKET1.yacc = -ROCKET1.power * Math.sin(ROCKET1.rot)+GAME.gravity;
    ROCKET1.xacc = ROCKET1.power * Math.cos(ROCKET1.rot);
    ROCKET1.fuel -= 1;
  }
  else{
    ROCKET1.xacc = 0;
    ROCKET1.yacc = GAME.gravity;
  }

  //changes xy velocities based on acceleration (handles acceleration)
  ROCKET1.xvel+=ROCKET1.xacc;
  ROCKET1.yvel+=ROCKET1.yacc;
  ROCKET1.x += ROCKET1.xvel;
  ROCKET1.y += ROCKET1.yvel;


  //||checkCollideObstacle
  if(checkCollidePlatform()||ROCKET1.fuel==0)
  {
    handleDeath1();
  }


  //if rocket at top of screen
  if (ROCKET1.y - ROCKET1.height/2 <0){
    ROCKET1.y = ROCKET1.height/2;
    PLATFORM.y-=ROCKET1.yvel;
    GAME.background.y-=ROCKET1.yvel/10;
    shiftFuelCans(0,ROCKET1.yvel);
    shiftObstacles(0,ROCKET1.yvel);
    if (!ROCKET1.thrusting){
      ROCKET1.yvel=0;
    }
  }
  //if rocket on the right side of the screen
  if (ROCKET1.x > GAME.canvas.width - ROCKET1.width/2){
    ROCKET1.x = GAME.canvas.width-ROCKET1.width/2;
    PLATFORM.x-=ROCKET1.xvel;
    GAME.background.x-=ROCKET1.xvel/10;
    shiftObstacles(ROCKET1.xvel,0);
    shiftFuelCans(ROCKET1.xvel,0);

  }
  // if rocket on the left side of screen
  if (ROCKET1.x - ROCKET1.width/2 <0){
    ROCKET1.x = ROCKET1.width/2;
    PLATFORM.x-=ROCKET1.xvel;
    shiftFuelCans(ROCKET1.xvel,0);
    shiftObstacles(ROCKET1.xvel,0);
    GAME.background.x-=ROCKET1.xvel/10;
  }

  //if rocket on the bottom of the screen
  if(ROCKET1.y >canvas.height-ROCKET1.height/2) {
    ROCKET1.y = canvas.height-ROCKET1.height/2;
    PLATFORM.y-=ROCKET1.yvel;
    shiftFuelCans(0,ROCKET1.yvel);
    shiftObstacles(0,ROCKET1.yvel);
    GAME.background.y-=ROCKET1.yvel/10;
  }

  if (ROCKET1.rotating){
    rotate1();
  }
}

function rotate1() {
  ROCKET1.rot += ROCKET1.rotspeed;
  if (ROCKET1.rot > Math.PI){
    ROCKET1.rot = Math.PI;
  }
  if (ROCKET1.rot < 0){
    ROCKET1.rot = 0;
  }
}

function handleDeath1() {
  ROCKET1.thrusting = false;
  GAME.started = false;

  if(ROCKET1.fuel<=0) {
    GAME.death = 4;
    GAME.level = 0;
    GAME.deathQual=1;
    if (scorePlayerOne > highScore){
      highScore = scorePlayerOne;
    }
    scorePlayerOne = 0;
    giveBackFuel();
  }
  else if(checkCollideBlackHole()) {
    GAME.death = 5;
    //ROCKET1.tipping = true;
    GAME.level=0;
    scorePlayerOne = 0;
    GAME.deathQual=1;
    ROCKET1.width=60;
    ROCKET1.height=120;
    giveBackFuel();
  }
  else if (ROCKET1.rot<Math.PI/2-0.25 || ROCKET1.rot > Math.PI/2+0.25){
    GAME.death = 2;
    //ROCKET1.tipping = true;
    GAME.level=0;
    scorePlayerOne = 0;
    GAME.deathQual=1;
    giveBackFuel();
  }
  else if(ROCKET1.yvel > 2 || Math.abs(ROCKET1.xvel) > 2){
    GAME.death = 3;
    GAME.level=0;
    scorePlayerOne = 0;
    GAME.deathQual=1;
    giveBackFuel();
  }
  else{ //GOOD LANDING
    ROCKET1.y = PLATFORM.y-ROCKET1.height/4
    ROCKET1.yvel = 0;
    ROCKET1.xvel = 0;
    GAME.death = 0;
    GAME.deathQual = 0;
    GAME.level++;
    scorePlayerOne = scorePlayerOne +1;
    if (scorePlayerOne>highScore){
      highScore = scorePlayerOne;
    }
    if (ROCKET1.rot < Math.PI/2 && ROCKET1.rot > 0){
      ROCKET1.rot += Math.abs(ROCKET1.rotspeed);
    }
    else if (ROCKET1.rot > Math.PI/2 && ROCKET1.rot < Math.PI){
      ROCKET1.rot -= Math.abs(ROCKET1.rotspeed);
    }
  }
}


function deathMessage (number) {
  if (number==0) {
    return "PLAYER 1 had an excellent landing";
  }
  else if (number==1) {
    return "GAME OVER: PLAYER 1 was lost in space!";
  }
  else if (number==2) {
    return "GAME OVER: PLAYER 1 had too much rotation";
  }
  else if (number==3) {
    return "GAME OVER: PLAYER 1 had too much speed";
  }
  else if (number==4) {
    return "GAME OVER: PLAYER 1 ran out of fuel";
  }
  else if(number==5) {
    return "ded to infinite space";
  }
}

function giveBackFuel(){
  ROCKET1.fuel = 500;
}

//deathMessage: destription of death
//qual: 0 if successful, 1 if unsuccessful
function die(deathMessage,qual) {
  GAME.death = deathMessage;
  GAME.deathQual = qual;
  GAME.started = false;

  if (qual==0) {
    //good landing
    level++;
  }
  else if (qual==1) {
    //explosion
  }
}
